import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import type { Product, ProductFilter } from '../types';
import { MOCK_PRODUCTS, USER_LOCATION } from '../data/mockProducts';
import { calculateDistance, calculatePriceWithDistance } from '../utils/distance';

export function Marketplace() {
  const [filters, setFilters] = useState<ProductFilter>({});

  const filteredProducts = MOCK_PRODUCTS
    .map(product => {
      const distance = calculateDistance(
        USER_LOCATION.coordinates.lat,
        USER_LOCATION.coordinates.lng,
        product.location.coordinates.lat,
        product.location.coordinates.lng
      );
      
      return {
        ...product,
        distance,
        price: calculatePriceWithDistance(product.basePrice, distance)
      };
    })
    .filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.maxDistance && product.distance > filters.maxDistance) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.location && !product.location.city.toLowerCase().includes(filters.location.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => a.distance - b.distance);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <ProductFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              <strong>Your Location:</strong> {USER_LOCATION.city}, {USER_LOCATION.state}
            </p>
          </div>
        </aside>

        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Products</h2>
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                No products found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}