
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, Product } from '@/lib/types';
import { allCategories } from '@/lib/mockData';
import { Upload } from 'lucide-react';
import axios from 'axios';

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' >,imgfile:File) => void;
}

const ProductForm = ({ product, isOpen, onClose, onSave }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [category, setCategory] = useState<Category>(product?.category || null);
  const [description, setDescription] = useState(product?.description || '');
  const [sellunit, setSellunit] = useState(product?.sellunit || 'kg');
  const [image, setImage] = useState(product?.image || '');
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const [categoryList, setCategoryList] = useState<Category[]>()
  const [imgfile,setImgfile]=useState<File>(null);

  useEffect(() => {
    getAllCategory();
  }, []);

  const BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    resetForm();
  }, [product]);

  const getAllCategory = async () => {
    const authToken = localStorage.getItem('authToken');
    const token = JSON.parse(authToken)
    if (!token) {
      console.error('Please login');
      return;
    }
    const res = await axios.get(`${BASE_URL}/v1/api/categories/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning' : '1'
      }
    });
    setCategoryList(res.data);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgfile(file);
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

    const newProduct: Omit<Product, 'id' > = {
      name,
      price: parseFloat(price),
      category,
      description,
      sellunit,
      seller:null,
      image: image || 'https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60',
    };
    console.log(newProduct)
    onSave(newProduct,imgfile);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    if (!product) {
      setName('');
      setPrice('');
      setCategory(null);
      setDescription('');
      setSellunit('kg');
      setImage('');
      setImagePreview(null);
      setImgfile(null);
    } else {
      setName(product.name);
      setPrice(product?.price?.toString());
      setCategory(product.category);
      setDescription(product.description);
      setSellunit(product.sellunit);
      setImage(product.image);
      setImagePreview(product.image);
      setImgfile(null);
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
            {product?.id ? 'Edit Product' : 'Add New Product'}
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
                    <Select value={sellunit} onValueChange={setSellunit}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="litter">Litter</SelectItem>
                        <SelectItem value="pic">Piece</SelectItem>
                        <SelectItem value="set">set</SelectItem>
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
                         src={imgfile && imgfile.size>0?imagePreview:`data:image/jpeg;base64,${imagePreview}`}
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
                <Select
                  value={category?.name}
                  onValueChange={(value) => {
                    const selectedCategory = categoryList?.find((cat) => cat.name === value);
                    setCategory(selectedCategory || null);
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList &&
                      categoryList.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat?.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
            <Button type="submit">{product?.id ? 'Update Product' : 'Add Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
