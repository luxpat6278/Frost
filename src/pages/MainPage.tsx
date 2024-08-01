import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TDL from '../components/ToDoList/ToDoList';
import ProductCards from '../components/Prod/Prod';
import Pagination from '../components/PagesSelection/PageSelection';
import axios from 'axios';
import styled from 'styled-components';

// Стили
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: red;
`;

// Типы
interface Product {
  id: number;
  name: string;
  price: number;
}

// Главный компонент
const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://frost.runtime.kz/api/products', {
          params: {
            page: currentPage,
            size: itemsPerPage,
          },
        });
        console.log('Полученные продукты:', response.data.items); // Логирование полученных данных
        setProducts(response.data.items);
        setTotalPages(response.data.totalPages); // Предполагаем, что API возвращает общее количество страниц под ключом "totalPages"
        setLoading(false);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Ошибка при получении данных';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Router>
      <Header />
      <TDL />
      <ProductCards products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </Router>
  );
};

export default MainPage;