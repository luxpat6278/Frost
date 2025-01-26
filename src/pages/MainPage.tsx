import React, { useEffect, useState, useCallback } from 'react';
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

interface Filters {
  category: string;
  brand: string;
  model: string;
  generation: string;
  available: boolean;
}

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({
    category: 'Все категории',
    brand: 'Все марки',
    model: 'Все модели',
    generation: 'Все поколения',
    available: false,
  });

  const itemsPerPage = 6;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { category, brand, model, generation, available } = filters;
    try {
      const { data } = await axios.get('https://frost.runtime.kz/api/products', {
        params: {
          page: currentPage,
          size: itemsPerPage,
          category: category !== 'Все категории' ? category : undefined,
          brandId: brand !== 'Все марки' ? brand : undefined,
          modelId: model !== 'Все модели' ? model : undefined,
          generationId: generation !== 'Все поколения' ? generation : undefined,
          available: available ? 1 : undefined,
        },
      });

      setProducts(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка при получении данных';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <>
      <TDL filters={filters} setFilters={setFilters} />
      {filteredProducts.length > 0 ? (
        <>
        <ProductCards products={products} loading={loading} error={error} />
          {totalPages > 1 && (
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

