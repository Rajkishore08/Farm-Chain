import React from 'react';
import { Sliders, MapPin } from 'lucide-react';
import type { ProductFilter } from '../types';
import { USER_LOCATION } from '../data/mockProducts';

interface ProductFiltersProps {
  filters: ProductFilter;
  onFilterChange: (filters: ProductFilter) => void;
}

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const categories = ['Vegetables', 'Fruits', 'Grains', 'Spices'];
  const distances = [
    { value: 30, label: 'Within 30 km' },
    { value: 50, label: 'Within 50 km' },
    { value: 100, label: 'Within 100 km' },
    { value: 500, label: 'Within 500 km' },
    { value: 2000, label: 'Within 2000 km' },
    { value: 0, label: 'Any Distance' }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin size={20} className="text-green-600" />
          <div>
            <h3 className="font-medium">Your Location</h3>
            <p className="text-sm text-gray-600">{USER_LOCATION.city}, {USER_LOCATION.state}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Sliders size={20} className="text-green-600" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select 
              className="w-full border rounded-md p-2"
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Distance
            </label>
            <select
              className="w-full border rounded-md p-2"
              value={filters.maxDistance || 0}
              onChange={(e) => onFilterChange({ 
                ...filters, 
                maxDistance: Number(e.target.value)
              })}
            >
              {distances.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (₹)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded-md p-2"
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange({ 
                  ...filters, 
                  minPrice: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded-md p-2"
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange({ 
                  ...filters, 
                  maxPrice: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter city or state"
              className="w-full border rounded-md p-2"
              value={filters.location || ''}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}