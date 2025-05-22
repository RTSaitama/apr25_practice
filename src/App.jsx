import React, { useState } from 'react';
import { COLUMNS } from './Constants';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Block } from './components/Block';
import { TableContainer } from './components/TableContainer';

// 3 в 1 аррей
export const productsWithCategories = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    categoriya => categoriya.id === product.categoryId,
  );

  const user = usersFromServer.find(
    userFound => userFound.id === category.ownerId,
  );

  return {
    ...product,
    owner: {
      name: user.name,
      sex: user.sex,
      id: user.id,
    },
    category: {
      title: category.title,
      icon: category.icon,
      id: category.id,
    },
  };
});

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [categorySelected, setCategorySelected] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [reversed, setReversed] = useState(false);

  const filteredProducts = productsWithCategories.filter(product => {
    const productName = product.name.toLowerCase();

    return productName.includes(searchValue.toLowerCase());
  });

  const filteredFully = selectedUser
    ? filteredProducts.filter(
      product => product.owner.id === selectedUser.id,
      )
    : filteredProducts;

  const handleSelectUser = user => {
    if (user === 'all') {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const categoryFiltered = categorySelected?.length
    ? filteredFully.filter(product =>
      categorySelected.some(cat => cat.id === product.category.id)
      )
    : filteredFully;

  const sorted = [...categoryFiltered].sort((a, b) => {
    let result = 0;

    switch (sortBy) {
      case 'ID':
        result = a.id - b.id;
        break;
      case 'Product':
        result = a.name.localeCompare(b.name);
        break;
      case 'Category':
        result = a.category.title.localeCompare(b.category.title);
        break;
      case 'User':
        result = a.owner.name.localeCompare(b.owner.name);
        break;
      default:
        break;
    }

    return reversed ? -result : result;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Block
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedUser={selectedUser}
          handleSelectUser={handleSelectUser}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />

        <TableContainer
          productsWithCategories={sorted}
          categorySelected={categorySelected}
          columns={COLUMNS}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sorted={sorted}
          reversed={reversed}
          setReversed={setReversed}
        />
      </div>
    </div>
  );
};
