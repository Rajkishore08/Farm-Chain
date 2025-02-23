import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { WalletProvider } from './context/WalletContext';
import { CartProvider } from './context/CartContext';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { ProductTrace } from './pages/ProductTrace';
import { Marketplace } from './pages/Marketplace';
import { Farmers } from './pages/Farmers';

function App() {
  return (
    <Router>
      <WalletProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/dashboard" element={<FarmerDashboard />} />
              <Route path="/trace" element={<ProductTrace />} />
            </Routes>
          </div>
        </CartProvider>
      </WalletProvider>
    </Router>
  );
}

export default App