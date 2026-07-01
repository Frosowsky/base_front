import React, { useState } from 'react';
import { Search, Plus, Package, Edit, Trash2, Tag, Image as ImageIcon } from 'lucide-react';
import { ProductFormModal } from '../components/ProductFormModal';

// Mock Data for MVP
const mockProducts = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: `Produkt Testowy ${i + 1}`,
  sku: `PROD-${String(i + 1).padStart(4, '0')}`,
  price: (Math.random() * 500 + 50).toFixed(2),
  stockQuantity: Math.floor(Math.random() * 100),
  category: i % 2 === 0 ? 'Elektronika' : 'Akcesoria',
  images: [{ url: `https://picsum.photos/seed/${i}/400/400`, isDefault: true }]
}));

export const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Katalog Produktów</h1>
          <p className="text-gray-500 mt-1">Zarządzaj swoimi produktami, zestawami i atrybutami.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Szukaj produktu..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span>Dodaj Produkt</span>
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden flex flex-col">
            {/* Image Placeholder */}
            <div className="relative h-48 bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
               {product.images?.[0] ? (
                  <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
               )}
               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(product)} className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-sm backdrop-blur-sm transition-all"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-lg shadow-sm backdrop-blur-sm transition-all"><Trash2 className="w-4 h-4" /></button>
               </div>
               {product.stockQuantity < 10 && (
                 <span className="absolute bottom-2 left-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md">
                   Niski stan ({product.stockQuantity})
                 </span>
               )}
            </div>
            
            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{product.sku}</span>
                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                 <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{product.category}</span>
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 flex-1">{product.name}</h3>
              
              <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
                 <div>
                   <p className="text-sm text-gray-500 mb-1">Cena brutto</p>
                   <p className="font-bold text-gray-900 text-xl">{product.price} PLN</p>
                 </div>
                 <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    {product.stockQuantity} szt.
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (reusable component later) */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-sm">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Pokazuję <span className="font-medium">1</span> do <span className="font-medium">18</span> z <span className="font-medium">97</span> wyników
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                &larr;
              </button>
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">1</button>
              <button className="relative inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">2</button>
              <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</button>
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};
