
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/lib/types';
import { allCategories } from '@/lib/mockData';
import { Upload } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => void;
}

const ProductForm = ({ product, isOpen, onClose, onSave }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [category, setCategory] = useState(product?.category || '');
  const [description, setDescription] = useState(product?.description || '');
  const [sellUnit, setSellUnit] = useState(product?.sellUnit || 'kg');
  const [location, setLocation] = useState(product?.location || '');
  const [image, setImage] = useState(product?.image || '');
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo purposes, we'll just create a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Omit<Product, 'id' | 'sellerId' | 'sellerName'> = {
      name,
      price: parseFloat(price),
      category,
      description,
      sellUnit,
      location,
      image: image || 'https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60',
    };
    
    onSave(newProduct);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    if (!product) {
      setName('');
      setPrice('');
      setCategory('');
      setDescription('');
      setSellUnit('kg');
      setLocation('');
      setImage('');
      setImagePreview(null);
    } else {
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setDescription(product.description);
      setSellUnit(product.sellUnit);
      setLocation(product.location);
      setImage(product.image);
      setImagePreview(product.image);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      resetForm();
      onClose();
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr_200px] gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">Sell Unit</Label>
                    <Select value={sellUnit} onValueChange={setSellUnit}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                        <SelectItem value="pic">Piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="mt-1 flex flex-col items-center">
                  <div className="h-32 w-full bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mb-2">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Upload className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product"
                className="resize-none h-20"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onClose();
            }}>
              Cancel
            </Button>
            <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
