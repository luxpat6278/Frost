// ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCardinPD from '../components/ProductCardinPD/ProductCardinPD';
import Footer from '../components/Footer/Footer';
import styled from 'styled-components';
import Reviews from '../components/Reviews/Reviews';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 24px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 24px;
  color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
`;

const ReviewsContainer = styled.div`
  margin-top: 20px; 
  display: flex; 
  justify-content: center; 
`;

interface Machine {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
  machine: Machine;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  models: Model[];
  reviews: Review[];
}

interface Review {
  id: number;
  text: string;
  rating: number;
}

interface ProductPageProps {
  updateCartItemCount: (count: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ updateCartItemCount }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct(productId: number) {
      try {
        const response = await fetch(`https://frost.runtime.kz/api/products/${productId}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.id) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      const productId = Number(id);
      if (!isNaN(productId)) {
        fetchProduct(productId);
      } else {
        setError('Invalid product ID');
        setLoading(false);
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    // Обновите количество товаров в корзине
    updateCartItemCount(prevCount => prevCount + 1);
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>Error: {error}</ErrorContainer>;
  }

  return (
    <Container>
      <MainContent>
        {product && (
          <>
            <ProductCardinPD product={product} />
          </>
        )}
        <ReviewsContainer>
          {product && <Reviews productId={product.id} />}
        </ReviewsContainer>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default ProductPage;

