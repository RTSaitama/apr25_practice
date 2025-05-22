import React from 'react';
import categories from '../../api/categories';
import users from '../../api/users';

export const Block = ({
  searchValue,
  setSearchValue,
  selectedUser,
  handleSelectUser,
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
              <span className="icon is-right">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  onClick={() => setSearchValue('')}
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                />
              </span>
            )}
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className="button is-success mr-6 is-outlined"
            // onClick={() => setCategorySelected(null)}
            onClick={() => setCategorySelected([])}
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
                //    onClick={() => {
                // setCategorySelected(prev => {
                //   const isSelected = prev.some(
                //     item => item.id === category.id);
                onClick={() => {
                  setCategorySelected(prev => {
                    const isSelected = prev?.some(
                      item => item.id === category.id,
                    );

                    if (isSelected) {
                      return prev.filter(item => item.id !== category.id);
                    }

                    return [...prev, category];
                  });
                }}
              >
                {category.title}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
