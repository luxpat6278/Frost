import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReviewsContainer = styled.section`
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc; /* Добавим рамку для визуализации */
  background-color: #333; /* Фоновый цвет для контраста */
`;

const Message = styled.p`
  color: white; /* Цвет текста белый */
  cursor: pointer;
`;

interface Review {
  id: number;
  user: { // Изменено для учета структуры объекта пользователя
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  review: string;
}

interface ReviewsProps {
  productId: number; // Ожидаем, что productId будет передан как пропс
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) {
        setError('Отсутствует ID продукта.');
        return;
      }

      try {
        const response = await fetch(`https://frost.runtime.kz/api/reviews?productId=${productId}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке отзывов');
        }
        const data = await response.json();
        console.log(data); // Проверка структуры данных

        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setError('Неверная структура данных. Ожидался массив отзывов.');
        }
      } catch (error: any) {
        setError('Ошибка при получении отзывов: ' + error.message);
      }
    };

    fetchReviews();
  }, [productId]); // productId в зависимостях

  return (
    <ReviewsContainer>
      <h2>Отзывы</h2>
      <Message>
        Чтобы оставить отзыв, <a href="/login" style={{ color: 'white' }}>войдите на сайт</a>.
      </Message>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку красным цветом */}
      {reviews.length === 0 && !error && <p>Отзывов пока нет.</p>} {/* Сообщение, если нет отзывов */}
      {reviews.map((review) => (
        <ReviewItem key={review.id}>
          <p>
            <strong>{review.user.firstName || 'Неизвестный автор'}</strong> {/* Выводим имя пользователя */}
          </p>
          <p>{review.review || 'Нет содержания'}</p> {/* Если содержимого нет, показываем 'Нет содержания' */}
        </ReviewItem>
      ))}
    </ReviewsContainer>
  );
};

<<<<<<< HEAD
export default Reviews;
=======
export default Reviews;

>>>>>>> fbc986a5be23c5c961697f45b493b123b5c8c7ee
