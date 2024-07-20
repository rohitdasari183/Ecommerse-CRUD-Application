import React, { useState } from "react";
import '../App.css';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    
    const submit = async () => {
        try {
            // Form validation
            if (!name || !price || !category || !company) {
                setError(true);
                return;
            }

            // Get user ID from localStorage
            const userId = JSON.parse(localStorage.getItem("user"))._id;

            // Send POST request to add-product endpoint
            const response = await fetch('http://localhost:9000/add-product', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({ name, price, category, company, userId }),
            });

            // Check if request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Reset form fields and error state after successful submission
            setName("");
            setPrice("");
            setCategory("");
            setCompany("");
            setError(false);

            // Log success message or handle response data
            const result = await response.json();
            console.log('Product added:', result);
            
            // Optionally, you can navigate to another page after successful submission
            // Example: navigate('/products');

        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error states or show error messages to the user
        }
    };

    return (
        <>
            <h1>Add Product</h1>
            <div className="container">
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inputBox"
                />
                {error && !name && <span className="invalid">Please enter product name</span>}
                
                <input
                    type="text"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="inputBox"
                />
                {error && !price && <span className="invalid">Please enter product price</span>}

                <input
                    type="text"
                    placeholder="Enter product category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="inputBox"
                />
                {error && !category && <span className="invalid">Please enter product category</span>}

                <input
                    type="text"
                    placeholder="Enter product company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="inputBox"
                />
                {error && !company && <span className="invalid">Please enter product company</span>}<br></br>

                <button onClick={submit} type="button" className="button">Add Product</button>
            </div>
        </>
    );
}

export default AddProduct;
