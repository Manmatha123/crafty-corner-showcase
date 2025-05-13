
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCategories, allLocations } from '@/lib/mockData';
import { Filter } from 'lucide-react';
import { Category } from '@/lib/types';
import axios from 'axios';

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: Category;
  setCategory: (value: Category) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  maxPrice: number;
}

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  location,
  setLocation,
  priceRange,
  setPriceRange,
  maxPrice
}: ProductFiltersProps) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAllcategory();
  }, []);
 
  const fetchAllcategory = async () => {
    const res = await axios.get(`${BASE_URL}/v1/api/categories/list`,{
      headers: {
        'ngrok-skip-browser-warning': '1',
      }
    });
    setCategoryList(res.data);
  }

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-brand-600" />
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
        <Select
  value={category?.id ? String(category?.id) : "null"}
  onValueChange={(value) => {
    if (value === "null") {
      setCategory(null); // Set category to null for "All"
    } else {
      const selectedCategory = categoryList.find((cat) => String(cat.id) === value);
      if (selectedCategory) {
        setCategory(selectedCategory);
      }
    }
  }}
>
  <SelectTrigger id="category" className="mt-1">
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent className="max-h-300px overflow-y-auto z-50" style={{maxHeight:"300px"}}>
    <SelectItem key="nullvalue" value="null">All</SelectItem>
    {categoryList && categoryList.map((cat) => (
      <SelectItem key={cat.id} value={String(cat.id)}>
        {cat.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>


        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor="price-range">Price Range</Label>
            <span className="text-sm text-gray-500">
            ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </div>
          <Slider
            id="price-range"
            defaultValue={[0, maxPrice]}
            max={maxPrice}
            step={0.5}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) =>{ setPriceRange([value[0], value[1]])
              console.log(value)
            }}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
