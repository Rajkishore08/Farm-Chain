import React, { useState } from 'react';
import { Menu, User, ShoppingCart, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useCart } from '../context/CartContext';
import { Cart } from './Cart';

export function Header() {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden"
              onClick={() => document.body.classList.toggle('mobile-menu-open')}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold">FarmChain</Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-200">Marketplace</Link>
            <Link to="/farmers" className="hover:text-green-200">Farmers</Link>
            <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
            <Link to="/trace" className="hover:text-green-200">Track Product</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {wallet.isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
                <button 
                  onClick={disconnectWallet}
                  className="bg-green-700 px-3 py-1 rounded-md hover:bg-green-800 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="flex items-center space-x-2 bg-green-700 px-3 py-1 rounded-md hover:bg-green-800 transition-colors"
              >
                <Wallet size={18} />
                <span>Connect Wallet</span>
              </button>
            )}
            <button 
              className="hover:text-green-200 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </button>
            <button 
              className="hover:text-green-200"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <User size={24} />
            </button>
          </div>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {isProfileOpen && (
        <div className="absolute right-4 top-16 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => alert('Profile settings...')}
            >
              Profile Settings
            </button>
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => alert('Order history...')}
            >
              Order History
            </button>
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-600"
              onClick={() => alert('Logging out...')}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}