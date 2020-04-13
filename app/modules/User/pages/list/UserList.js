import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/es/List';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';
import { toast } from 'react-toastify';

import * as userActionCreator from '../../userActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import Modal from '../../../../components/atoms/Modal';
import Message from '../../../../components/atoms/Message';
import translate from '../../../../locale';
import UserRow from '../../templates/UserRow';
import UserDetails from '../../templates/UserDetails';
import SearchInput from '../../molecules/SearchInput';
import AnalyticService from '../../../../services/analyticService';

import './UserList.scss';

const UserListPage = ({
  userState: { loading, users, errors, userDetails },
  userActions
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // make api call at the begining to fetch all users
  useEffect(() => {
    userActions.getUsers();
  }, [userActions]);

  // show toast message if any errror occurrs
  useEffect(() => {
    if (errors) {
      AnalyticService.track(AnalyticService.EVENT.ERROR, 'Error occurred in fetching user list');
      toast.error(errors);
    }
  }, [errors]);

  const head = (
    <Helmet key="user-list-page">
      <title>{translate('user.listTitle')}</title>
      <meta property="og:title" content="User list" />
      <meta
        name="description"
        content="Get list of all users in TIVO"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  const onOpenUserDetails = (index) => {
    setModalOpen(true);
    AnalyticService.track(AnalyticService.EVENT.DETAILS, 'Open user details');
    userActions.getUserDetails(users[index]);
  };

  const onSearchUser = (text) => {
    AnalyticService.track(AnalyticService.EVENT.SEARCH, 'search user');
    userActions.getUsers('name', text);
  };

  const listRowRenderer = ({ index, isScrolling, key, style }) => {
    const { ...rest } = users[index];
    const rowProps = {
      index,
      style,
      ...rest
    };

    return (
      <UserRow
        key={`list-row-${index.toString()}`}
        {...rowProps}
        onClick={onOpenUserDetails}
      />
    );
  };

  return (
    <div className="user-page-container">
      {head}
      {loading && <LoadingIndicator />}
      {modalOpen && userDetails && (
        <Modal onClose={() => setModalOpen(false)}>
          <UserDetails details={userDetails} />
        </Modal>
      )}
      <SearchInput onSearch={onSearchUser} />
      {users.length === 0
        ? <Message description={translate('user.noUserFound')} />
        : (
          <div className="list-container">
            <WindowScroller>
              {({ height }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      overscanRowCount={10}
                      rowCount={users.length}
                      rowHeight={60}
                      rowRenderer={listRowRenderer}
                      width={width}
                      height={height}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

UserListPage.propTypes = {
  userState: PropTypes.object,
  userActions: PropTypes.object
};

UserListPage.defaultProps = {
  userState: {},
  userActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
