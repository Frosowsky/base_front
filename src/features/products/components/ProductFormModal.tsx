import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, Trash2, ImageIcon } from 'lucide-react';

interface ProductFormModalProps {
  product?: any;
  onClose: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onClose }) => {
  const [images, setImages] = useState<{ url: string; isDefault: boolean; file?: File }[]>(
    product?.images || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 8) {
      alert("Możesz dodać maksymalnie 8 zdjęć.");
      return;
    }

    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file), // Local preview url
      isDefault: false,
      file
    }));

    setImages(prev => {
      const updated = [...prev, ...newImages];
      // If there's no default, set the first one as default
      if (updated.length > 0 && !updated.find(img => img.isDefault)) {
        updated[0].isDefault = true;
      }
      return updated;
    });
  };

  const handleSetDefault = (index: number) => {
    setImages(prev => prev.map((img, i) => ({
      ...img,
      isDefault: i === index
    })));
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev];
      const removed = updated.splice(index, 1)[0];
      if (removed.file && removed.url.startsWith('blob:')) {
         URL.revokeObjectURL(removed.url); // cleanup
      }
      // If we removed the default image, set the first remaining one as default
      if (removed.isDefault && updated.length > 0) {
        updated[0].isDefault = true;
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Upload new files (the ones with `file` property) using FormData to /api/files/upload
    // 2. Get backend blob urls.
    // 3. Send final product data (with URLs, isDefault, order) to /api/products
    alert('Zapisywanie produktu: tu nastąpi wysłanie na backend m.in. nowo dodanych zdjęć.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Edytuj Produkt' : 'Nowy Produkt'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Images Section */}
          <section className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Zdjęcia (Max 8)</h3>
              <p className="text-sm text-gray-500">Dodaj zdjęcia produktu i zaznacz główne.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {/* Upload Button */}
               {images.length < 8 && (
                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                 >
                   <Upload className="w-6 h-6 mb-2" />
                   <span className="text-sm font-medium">Dodaj zdjęcie</span>
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     multiple 
                     accept="image/*" 
                     className="hidden" 
                     onChange={handleFileChange}
                   />
                 </div>
               )}

               {/* Thumbnails */}
               {images.map((img, index) => (
                 <div key={index} className={`relative h-32 rounded-xl overflow-hidden border-2 group ${img.isDefault ? 'border-blue-500 shadow-sm shadow-blue-500/20' : 'border-gray-200'}`}>
                   <img src={img.url} className="w-full h-full object-cover" alt={`Miniatura ${index}`} />
                   
                   {/* Overlay Actions */}
                   <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                     <div className="flex justify-between">
                       <button 
                         type="button" 
                         onClick={() => handleSetDefault(index)}
                         className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1 ${img.isDefault ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                       >
                         <Check className="w-3 h-3" /> {img.isDefault ? 'Główne' : 'Ustaw główne'}
                       </button>
                       <button 
                         type="button"
                         onClick={() => handleRemoveImage(index)}
                         className="p-1.5 bg-white hover:bg-red-50 text-red-600 rounded-md shadow-sm"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Details Section */}
          <section className="space-y-4">
             <h3 className="text-lg font-bold text-gray-900">Dane podstawowe</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Nazwa produktu</label>
                  <input type="text" defaultValue={product?.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">SKU</label>
                  <input type="text" defaultValue={product?.sku} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Cena brutto (PLN)</label>
                  <input type="number" step="0.01" defaultValue={product?.price} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Opis</label>
                  <textarea rows={3} defaultValue={product?.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
             </div>
          </section>

        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
           <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors">Anuluj</button>
           <button onClick={handleSubmit} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/30">Zapisz Produkt</button>
        </div>
      </div>
    </div>
  );
};
