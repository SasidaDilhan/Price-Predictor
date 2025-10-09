import Link from 'next/link';
import { Laptop, Award, TrendingUp, Shield, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const featuredLaptops = [
    {
      id: 1,
      name: 'Dell XPS 15',
      price: '$1,299',
      image: '💻',
      specs: 'Intel i7, 16GB RAM, 512GB SSD',
    },
    {
      id: 2,
      name: 'MacBook Pro 14"',
      price: '$1,999',
      image: '💻',
      specs: 'M3 Pro, 18GB RAM, 512GB SSD',
    },
    {
      id: 3,
      name: 'HP Pavilion',
      price: '$799',
      image: '💻',
      specs: 'Intel i5, 8GB RAM, 256GB SSD',
    },
    {
      id: 4,
      name: 'Lenovo ThinkPad',
      price: '$1,099',
      image: '💻',
      specs: 'Intel i7, 16GB RAM, 1TB SSD',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Compute Buddy</h1>
          <p className="text-xl mb-8">Your trusted partner for finding the perfect laptop</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Browse Laptops
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/signup"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Compute Buddy?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Best Quality</h3>
              <p className="text-gray-600">Only authentic products from trusted brands</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with great deals</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Warranty</h3>
              <p className="text-gray-600">1-year warranty on all products</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Variety</h3>
              <p className="text-gray-600">Wide range of laptops for every need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Laptops Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Laptops</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {featuredLaptops.map((laptop) => (
              <div
                key={laptop.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-48 flex items-center justify-center text-6xl">
                  {laptop.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{laptop.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{laptop.specs}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{laptop.price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Laptop?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers today!</p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}