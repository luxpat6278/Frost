import React from 'react';
import './Reviews.css';

const Reviews: React.FC = () => {
  return (
    <section className="reviews">
      <h2>Отзывы</h2>
      <div className="review">
        <p>Константин Константинович Константинопольский: ...</p>
      </div>
      <div className="review">
        <p>Дмитрий О.: ...</p>
      </div>
    </section>
  );
};

export default Reviews;