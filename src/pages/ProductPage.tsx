// src/pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import ProductCardinPD from '../components/ProductCardinPD/ProductCardinPD'; 
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
`;

interface Product {
    id: number; 
    name: string;
    description: string;
    price: number;

}

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null); // Added error state
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Fetch data from the API
        async function fetchProduct(productId) {
          alert('abc')
          try {
            const response = await fetch(`https://frost.runtime.kz/api/products/${productId}`);
            
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
        
            const data = await response.json();
            // Do something with the data
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }
        
        // Call the function with a valid product ID
        fetchProduct(1);
        
    }, []);

    return (
        <Container>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {product && <ProductCardinPD product={product} />}
        </Container>
    );
};

export default ProductPage;

