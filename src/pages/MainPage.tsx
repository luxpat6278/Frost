import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TDL from '../components/ToDoList/ToDoList';
import ProductCards from '../components/Prod/Prod';
import Pagination from '../components/PagesSelection/PageSelection';
import axios from 'axios';
import styled from 'styled-components';

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

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: white;
`;

interface Product {
  id: number;
  name: string;
  price: number;
}

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
        console.log('Полученные продукты:', response.data.items);
        setProducts(response.data.items);
        setTotalPages(response.data.totalPages);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Отфильтрованные продукты:', filteredProducts);

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <TDL />
      {filteredProducts.length > 0 ? (
        <>
          <ProductCards products={filteredProducts} />
          {totalPages > 1 && ( // Изменено условие для отображения переключателя страниц
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <NotFoundContainer>Компрессор не найден</NotFoundContainer>
      )}
      <Footer />
    </>
  );
};

export default MainPage;
