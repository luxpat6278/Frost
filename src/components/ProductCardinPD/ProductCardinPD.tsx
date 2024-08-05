import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  images?: string[];
  availability: boolean;
  sku: string; // Артикул
  manufacturer: string; // Производитель
  models?: Model[]; // Make models optional
  brands?: { id: number; name: string; machine: Machine }[]; // Дополнительное поле для брендов
}

interface ProductCardinPDProps {
  product: Product;
}

const Container = styled.div`
  display: flex;
  align-items: flex-start; 
  padding: 16px;
  margin: 16px;
  justify-content: space-around;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin-right: 16px; 
`;

const MainImage = styled.img`
  width: 300px; 
  height: auto;
  margin-bottom: 20px;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Thumbnail = styled.img<{ $isSelected: boolean }>`
  width: 65px;
  height: 65px;
  cursor: pointer;
  opacity: ${props => (props.$isSelected ? 1 : 0.6)};
  border: ${props => (props.$isSelected ? '2px solid #000' : 'none')};
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around; 
  border: 1px solid #ddd;
  padding: 16px;
  margin-top: 16px;
  border-radius: 8px;
  height: 255px;
  margin-left: 10px;
`;

const Price = styled.p`
  font-size: 30px; 
  padding-top: 30px;
  margin: 0;
`;

const Availability = styled.div<{ available: boolean }>`
  color: ${props => (props.available ? 'green' : 'red')};
  margin-top: 10px;
`;

const Cities = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  color: #7A7A7A;
`;

const BuyButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #2156bd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 235px; 

  &:hover {
    background-color: #173a8c;
  }
`;

const InfoSection = styled.div`
  margin-top: 20px;
  color: #7A7A7A;
`;

const InfoItem = styled.div`
  margin-top: 30px; // Отступ для артикул
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-weight: bold; // Жирный шрифт для заголовков
`;

const InfoValue = styled.span`
  margin-left: 5px; // Небольшой отступ от двоеточия
`;

const CompatibilitySection = styled.div`
  margin-top: 20px;
`;

const CompatibilityTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CompatibilityList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CompatibilityItem = styled.li`
  margin-bottom: 5px;
`;


const placeholderImages = [
  'https://via.placeholder.com/600x400?text=Placeholder+1',
  'https://via.placeholder.com/600x400?text=Placeholder+2',
  'https://via.placeholder.com/600x400?text=Placeholder+3',
  'https://via.placeholder.com/600x400?text=Placeholder+4'
];

const ProductCardinPD: React.FC<ProductCardinPDProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    } else {
      setSelectedImage(placeholderImages[0]);
    }
  }, [product.images]);


  const imagesToShow = product.images && product.images.length > 0 ? product.images : placeholderImages;

  return (
    <Container>
      <GalleryContainer>
        <MainImage src={selectedImage} alt="Selected" />
        <ThumbnailsContainer>
          {imagesToShow.map((image, index) => (
            <Thumbnail
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              $isSelected={selectedImage === image} 
            />
          ))}
        </ThumbnailsContainer>
        <CompatibilitySection>
          <CompatibilityTitle>Применим к автомобилям: </CompatibilityTitle>
          <CompatibilityList>
            {product.models?.map((model) => (
              <CompatibilityItem key={model.id}>
                {model.machine.name} {model.name}
              </CompatibilityItem>
            )) || <CompatibilityItem>Данные отсутствуют</CompatibilityItem>}
          </CompatibilityList>
        </CompatibilitySection>
      </GalleryContainer>
      <ProductDetails>
        <h2>{product.name}</h2>
        <InfoSection>
          <InfoItem>
            <InfoLabel>Артикул:</InfoLabel>
            <InfoValue>{product.sku}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Производитель:</InfoLabel>
            <InfoValue>{product.manufacturer}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Описание:</InfoLabel>
            <InfoValue>{product.description}</InfoValue>
          </InfoItem>
        </InfoSection>
      </ProductDetails>
      <ProductInfo>
        <Price>{product.price} тг</Price>
        <Availability available={product.availability}>
          {product.availability ? 'В наличии' : 'Нет в наличии'}
        </Availability>
        <Cities>
          <div>г. Астана</div>
          <div>г. Алма-Ата</div>
        </Cities>
        <BuyButton>Купить</BuyButton>
      </ProductInfo>
    </Container>
  );
};

export default ProductCardinPD;

