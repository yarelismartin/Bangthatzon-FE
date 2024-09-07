import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { getProducts, getProductsInCategory } from '../api/ProductData';
import ProductCard from '../components/ProductCard';
import getAllCategories from '../api/CategoryData';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Search by Category');

  const getAllProducts = () => {
    getProducts().then(setProducts);
  };

  const handleCategoryClick = (id, name) => {
    if (id) {
      getProductsInCategory(id).then(setProducts);
    } else {
      getAllProducts();
    }
    setSelectedCategory(name);
  };

  const getCategories = () => {
    getAllCategories().then(setCategories);
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  return (
    <div className="text-center align-content-center container mt-5">
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title={selectedCategory}
        className="drop-down-filter"
      >
        <Dropdown.Item as="button" onClick={() => handleCategoryClick(null, 'All Products')}>
          All Products
        </Dropdown.Item>
        {categories.map((category) => (
          <div key={category.id}>
            <Dropdown.Item as="button" onClick={() => handleCategoryClick(category.id, category.categoryName)}>{category.categoryName}</Dropdown.Item>
          </div>
        ))}
      </DropdownButton>
      <div className="home-product-container flex">{
          products.map((p) => (
            <ProductCard productObj={p} key={p.id} />
          ))
        }
      </div>
    </div>
  );
}
