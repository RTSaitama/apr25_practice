import React from 'react';

export const TableContainer = ({ productsWithCategories, columns }) => {
  return (
    <div className="box table-container">
      {productsWithCategories.length === 0 && (
        <p data-cy="NoMatchingMessage">No products </p>
      )}

      <table
        data-cy="ProductTable"
        className="table is-striped is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {columns.map(column => {
              return (
                <th key={column}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {column}

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {productsWithCategories.map(product => {
            return (
              <tr data-cy="Product" key={product.id}>
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>
                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">
                  {product.category.icon} - {product.category.title}
                </td>
                <td data-cy="ProductUser" className="has-text-link">
                  {product.owner.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
