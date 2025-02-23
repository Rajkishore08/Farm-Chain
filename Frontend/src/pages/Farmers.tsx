import React, { useState } from 'react';
import { Star, MapPin, ChevronDown, Filter, Search } from 'lucide-react';
import type { Farmer } from '../types';

const SAMPLE_FARMERS: Farmer[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    location: 'Nashik, Maharashtra',
    products: [
      {
        id: '1',
        name: 'Organic Tomatoes',
        farmer: 'Ramesh Kumar',
        type: 'Vegetables',
        quantity: 100,
        price: 40,
        location: 'Nashik, Maharashtra',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
        description: 'Fresh, organically grown tomatoes'
      }
    ],
    rating: 4.8,
    joinedDate: '2023-01-15',
    walletAddress: '0x1234...5678',
    totalSales: 15000,
    verificationStatus: 'verified'
  },
  {
    id: '2',
    name: 'Sukhwinder Singh',
    location: 'Amritsar, Punjab',
    products: [
      {
        id: '2',
        name: 'Premium Basmati Rice',
        farmer: 'Sukhwinder Singh',
        type: 'Grains',
        quantity: 500,
        price: 85,
        location: 'Amritsar, Punjab',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
        description: 'High-quality basmati rice'
      }
    ],
    rating: 4.9,
    joinedDate: '2023-03-20',
    walletAddress: '0x9876...4321',
    totalSales: 25000,
    verificationStatus: 'verified'
  },
  {
    id: '3',
    name: 'Prakash Patil',
    location: 'Ratnagiri, Maharashtra',
    products: [
      {
        id: '3',
        name: 'Fresh Alphonso Mangoes',
        farmer: 'Prakash Patil',
        type: 'Fruits',
        quantity: 200,
        price: 400,
        location: 'Ratnagiri, Maharashtra',
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
        description: 'Premium Alphonso mangoes'
      }
    ],
    rating: 4.7,
    joinedDate: '2023-02-10',
    walletAddress: '0x5678...9012',
    totalSales: 20000,
    verificationStatus: 'verified'
  }
];

export function Farmers() {
  const [farmers] = useState<Farmer[]>(SAMPLE_FARMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const locations = Array.from(new Set(farmers.map(farmer => farmer.location)));

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || farmer.location === selectedLocation;
    return matchesSearch && matchesLocation;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'sales') return b.totalSales - a.totalSales;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Verified Farmers</h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search farmers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={20} />
              <span>Filters</span>
              <ChevronDown size={20} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="rating">Rating</option>
                      <option value="sales">Total Sales</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map(farmer => (
          <div key={farmer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{farmer.name}</h2>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{farmer.location}</span>
                  </div>
                </div>
                <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  <span className="font-medium">{farmer.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {farmer.products.map(product => (
                      <span 
                        key={product.id}
                        className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full"
                      >
                        {product.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Member Since</p>
                    <p className="font-medium">{new Date(farmer.joinedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Sales</p>
                    <p className="font-medium">₹{farmer.totalSales.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => alert(`Viewing ${farmer.name}'s products...`)}
                  >
                    View Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No farmers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}