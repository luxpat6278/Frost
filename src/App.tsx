import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Redux Provider
import store from './slice/store'; // Импортируйте ваш Redux store
import { CartProvider } from './context/localizationContext/LocalizationContext'; // Импортируйте CartProvider
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Поиск:', query);
  };

  return (
    <Provider store={store}> 
      <CartProvider> 
        <Header onSearch={handleSearch} />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Provider>
  );
};

export default App;
