import React, { useState } from 'react';
import { MapPin, ShoppingCart, Info, Truck } from 'lucide-react';
import type { Product } from '../types';
import { USER_LOCATION } from '../data/mockProducts';
import { calculateDistance, calculatePriceWithDistance, isDeliveryPossible } from '../utils/distance';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const distance = calculateDistance(
    USER_LOCATION.coordinates.lat,
    USER_LOCATION.coordinates.lng,
    product.location.coordinates.lat,
    product.location.coordinates.lng
  );

  const adjustedPrice = calculatePriceWithDistance(product.basePrice, distance);
  const canDeliver = isDeliveryPossible(product.maxDeliveryDistance, distance);

  const handleAddToCart = () => {
    if (!canDeliver) {
      alert('This product cannot be delivered to your location due to distance constraints.');
      return;
    }

    setIsAdding(true);
    
    addToCart({
      productId: product.id,
      name: product.name,
      quantity,
      price: adjustedPrice,
      unit: product.unit
    });

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            canDeliver ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {canDeliver ? 'Deliverable' : 'Too Far'}
          </span>
          <button 
            className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
            onClick={() => alert(`Product Details:\n${product.description}`)}
          >
            <Info size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        
        <div className="flex items-center mt-2 text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{product.location.city}, {product.location.state}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{distance} km away</span>
        </div>

        <div className="mt-2 flex items-center text-gray-500">
          <Truck size={16} className="mr-1" />
          <span className="text-sm">Max delivery: {product.maxDeliveryDistance} km</span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-green-600">
                ₹{adjustedPrice}/{product.unit}
              </span>
              {distance > 0 && (
                <div className="text-sm text-gray-500">
                  Base: ₹{product.basePrice}/{product.unit}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button 
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>
          <button 
            className={`w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 ${
              !canDeliver || isAdding ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            onClick={handleAddToCart}
            disabled={!canDeliver || isAdding}
          >
            <ShoppingCart size={20} />
            <span>{isAdding ? 'Adding...' : canDeliver ? 'Add to Cart' : 'Cannot Deliver'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}