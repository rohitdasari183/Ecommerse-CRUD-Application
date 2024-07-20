import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getProductDetails();
    }, []);

    const update = async () => {
        try {
            const response = await fetch(`http://localhost:9000/product/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to update product.');
            }
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
            setErrorMessage('Failed to update product. Please try again.');
        }
    };

    const getProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:9000/product/${params.id}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details.');
            }
            const result = await response.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setErrorMessage('Failed to fetch product details. Please try again.');
        }
    };

    return (
        <>
            <h1>Update Product</h1>
            <div className="container">
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inputBox"
                />
                <input
                    type="text"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="inputBox"
                />
                <input
                    type="text"
                    placeholder="Enter product category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="inputBox"
                />
                <input
                    type="text"
                    placeholder="Enter product company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="inputBox"
                />
                {errorMessage && <span className="invalid">{errorMessage}</span>}
                <button onClick={update} type="button" className="button">Update Product</button>
            </div>
        </>
    );
};

export default UpdateProduct;
