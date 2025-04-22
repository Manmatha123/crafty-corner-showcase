
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCategories, allLocations } from '@/lib/mockData';
import { Filter } from 'lucide-react';

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
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

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location" className="mt-1">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {allLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor="price-range">Price Range</Label>
            <span className="text-sm text-gray-500">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            id="price-range"
            defaultValue={[0, maxPrice]}
            max={maxPrice}
            step={0.5}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
