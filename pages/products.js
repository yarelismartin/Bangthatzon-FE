import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { getProducts, getProductsInCategory } from '../api/ProductData';
import ProductCard from '../components/ProductCard';
import getAllCategories from '../api/CategoryData';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [categories, setCategories] = useState([]);

  const getAllProducts = () => {
    getProducts().then(setProducts);
  };

  const handleCategoryClick = (id, name) => {
    getProductsInCategory(id).then(setProducts);
    setActiveFilter(`Category: ${name}`);
  };

  const getCategories = () => {
    getAllCategories().then(setCategories);
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  return (
    <div>
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title="Search by Category"
        className="drop-down-filter"
      >
        {categories.map((category) => (
          <div key={category.id}>
            <Dropdown.Item as="button" onClick={() => handleCategoryClick(category.id, category.categoryName)}>{category.categoryName}</Dropdown.Item>
          </div>
        ))}
      </DropdownButton>
      <h2>Results for {activeFilter}</h2>
      { products.length <= 0 ? (
        <p>No Products Available</p>
      ) : (
        products.map((p) => (
          <ProductCard productObj={p} key={p.id} />
        ))
      )}
    </div>
  );
}
