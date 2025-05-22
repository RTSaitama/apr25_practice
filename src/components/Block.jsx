import React from 'react';
import categories from '../api/categories';
import users from '../api/users';

export const Block = ({
  searchValue,
  setSearchValue,
  selectedUser,
  handleSelectUser,
}) => {
  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            className={selectedUser === null ? 'is-active' : ''}
            onClick={() => handleSelectUser('all')}
          >
            All
          </a>
          {users.map(user => {
            return (
              <a
                data-cy="FilterUser"
                href="#/"
                key={user.id}
                className={selectedUser?.id === user.id ? 'is-active' : ''}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            );
          })}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={searchValue}
              onChange={ev => setSearchValue(ev.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            {searchValue && (
              <span
                className="icon is-right"
                onClick={() => setSearchValue('')}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSearchValue('');
                  }
                }}
                role="button"
                tabIndex="0"
                aria-label="Clear search"
              >
                <i className="fas fa-times-circle" aria-hidden="true" />
              </span>
            )}
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className="button is-success mr-6 is-outlined"
          >
            All
          </a>
          {categories.map(category => {
            return (
              <a
                key={category.id}
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                {category.title}
              </a>
            );
          })}
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-fullwidth"
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
