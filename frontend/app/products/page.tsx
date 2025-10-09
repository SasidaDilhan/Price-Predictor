import { Laptop } from 'lucide-react';

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Dell XPS 15', price: '$1,299', category: 'Premium' },
    { id: 2, name: 'MacBook Pro 14"', price: '$1,999', category: 'Premium' },
    { id: 3, name: 'HP Pavilion', price: '$799', category: 'Budget' },
    { id: 4, name: 'Lenovo ThinkPad', price: '$1,099', category: 'Business' },
    { id: 5, name: 'ASUS ROG', price: '$1,499', category: 'Gaming' },
    { id: 6, name: 'Acer Aspire', price: '$599', category: 'Budget' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">All Products</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-48 flex items-center justify-center mb-4">
                <Laptop className="w-20 h-20 text-blue-600" />
              </div>
              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mb-2">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}