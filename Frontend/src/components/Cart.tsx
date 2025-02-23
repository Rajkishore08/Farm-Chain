import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const MIN_ORDER_VALUE = 1000;

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cart.total < MIN_ORDER_VALUE) {
      alert(`Minimum order value is ₹${MIN_ORDER_VALUE}. Please add more items.`);
      return;
    }
    alert('Proceeding to checkout...');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map(item => (
                  <div key={item.productId} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} per {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                          onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₹{cart.total}</span>
              </div>
              {cart.total < MIN_ORDER_VALUE && (
                <p className="text-red-500 text-sm">
                  Add ₹{MIN_ORDER_VALUE - cart.total} more to meet minimum order value
                </p>
              )}
            </div>
            <button
              className={`w-full py-2 px-4 rounded-md ${
                cart.total >= MIN_ORDER_VALUE
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleCheckout}
              disabled={cart.total < MIN_ORDER_VALUE}
            >
              Checkout (₹{cart.total})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}