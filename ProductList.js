import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:9000/products', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setProducts(result);
      } else {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch products. Please try again.');
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value.trim();
    try {
      if (key) {
        const response = await fetch(`http://localhost:9000/search/${key}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setProducts(data);
      } else {
        getProducts();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to search products. Please try again.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/product/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getProducts();
      } else {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage('Failed to delete product. Please try again.');
    }
  };
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input type="text" className="search-box" placeholder="Search here..." onChange={searchHandle} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button onClick={() => deleteProduct(item._id)}>Delete</button>
                  <Link to={`/update/${item._id}`}>
                    <button>Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No products found</h3>
      )}
    </div>
  );
};

export default ProductList;
