import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Search, ArrowRight } from 'lucide-react';
import type { Product, SupplyChainStep } from '../types';

const SAMPLE_TRACE_DATA: SupplyChainStep[] = [
  {
    id: '1',
    date: '2024-02-20',
    location: 'Nashik, Maharashtra',
    action: 'Harvested',
    verifier: '0x1234...5678',
    temperature: 25,
    humidity: 65
  },
  {
    id: '2',
    date: '2024-02-21',
    location: 'Nashik, Maharashtra',
    action: 'Quality Check',
    verifier: '0x8765...4321',
    temperature: 24,
    humidity: 60
  },
  {
    id: '3',
    date: '2024-02-22',
    location: 'Mumbai, Maharashtra',
    action: 'In Transit',
    verifier: '0x9876...1234',
    temperature: 22,
    humidity: 55
  }
];

export function ProductTrace() {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [steps] = useState<SupplyChainStep[]>(SAMPLE_TRACE_DATA);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate blockchain query
    setProduct({
      id: productId,
      name: 'Organic Tomatoes',
      farmer: 'Ramesh Kumar',
      type: 'Vegetables',
      quantity: 100,
      price: 40,
      location: 'Nashik, Maharashtra',
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh, organically grown tomatoes from our family farm',
      transactionHash: '0x123...456',
      blockNumber: 12345678,
      timestamp: Date.now(),
      supplyChainSteps: steps
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Product</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Search size={20} />
            <span>Track</span>
          </button>
        </div>
      </form>

      {product && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600">Farmer</p>
                  <p className="font-medium">{product.farmer}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium">{product.location}</p>
                </div>
                <div>
                  <p className="text-gray-600">Transaction Hash</p>
                  <p className="font-medium">{product.transactionHash}</p>
                </div>
                <div>
                  <p className="text-gray-600">Block Number</p>
                  <p className="font-medium">{product.blockNumber}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                {steps.map((step, index) => (
                  <div key={step.id} className="relative pl-8 pb-8">
                    <div className="absolute left-2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-600" />
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{step.action}</h3>
                        <span className="text-gray-600">{step.date}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{step.location}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Temperature</p>
                          <p>{step.temperature}°C</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Humidity</p>
                          <p>{step.humidity}%</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Verified by: {step.verifier}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Product QR Code</h3>
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    value={`https://farmchain.com/trace/${product.id}`}
                    size={200}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Scan to verify product authenticity
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}