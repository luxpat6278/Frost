import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 1480px;
`;

interface PaginationButtonProps {
  active: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: ${props => (props.active ? '#007bff' : '#f0f0f0')};
  color: ${props => (props.active ? 'white' : 'black')};
  cursor: pointer;

  &:hover:not(.active) {
    background-color: #ddd;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationButton
          key={i}
          onClick={() => onPageChange(i)}
          active={i === currentPage}
        >
          {i}
        </PaginationButton>
      );
    }
    return pageNumbers;
  };

  return <PaginationContainer>{renderPageNumbers()}</PaginationContainer>;
};

export default Pagination;
