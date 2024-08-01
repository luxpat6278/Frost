// App.tsx
import React from 'react';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';


const App: React.FC = () => {
  return (
    <div>
      <MainPage />
      <ProductPage />
    </div>

  );
};

export default App;
