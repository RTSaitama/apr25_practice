import React from 'react';
import categories from '../../api/categories';
import users from '../../api/users';

export const Block = ({
  searchValue,
  setSearchValue,
  selectedUser,
  handleSelectUser,
  сategorySelected,
  setCategorySelected,
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
              className="input input-with-x"
              placeholder="Search"
              value={searchValue}
              onChange={ev => setSearchValue(ev.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            {searchValue && (
              <button
                type="button"
                className="close-btn"
                onClick={() => setSearchValue('')}
              >
                <i className="fas fa-times-circle" aria-hidden="true" />
              </button>
            )}
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className="button is-success mr-6 is-outlined"
            onClick={() => setCategorySelected(null)}
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
                onClick={() => {
                  if (сategorySelected !== category.id) {
                    setCategorySelected(category.id);
                  }
                }}
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
            onClick={() => {
              setCategorySelected(null);
              setSearchValue('');
              handleSelectUser('all');
            }}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
