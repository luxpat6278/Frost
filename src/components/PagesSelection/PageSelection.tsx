import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // Правое выравнивание
  margin: 20px 0; 
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 10px;
  margin: 0 5px;
  background-color: ${({ isActive }) => (isActive ? '#0056b3' : '#e0e0e0')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <PaginationContainer>
      {currentPage > 1 && ( // Кнопка "Назад" появляется только если мы не на первой странице
        <Button onClick={handlePreviousPage}>
          Назад
        </Button>
      )}
      
      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          isActive={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}

      {currentPage < totalPages && ( // Кнопка "Далее" исчезает на последней странице
        <Button onClick={handleNextPage}>
          Далее
        </Button>
      )}
    </PaginationContainer>
  );
};


export default Pagination;

