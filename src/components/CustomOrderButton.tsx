
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, List, Upload, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food & Beverages",
  "Home Decor",
  "Books",
  "Others",
];

const CustomOrderButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderDate, setOrderDate] = useState<Date | undefined>(new Date());
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create custom order object
    const customOrder = {
      name,
      description,
      category,
      locality,
      city,
      district,
      state,
      pincode,
      orderDate,
      image,
      status: "PENDING",
    };
    
    console.log("Custom Order:", customOrder);
    
    // Close dialog
    setOpen(false);
    
    // Navigate to custom order page (optional)
    // navigate("/custom-order");
    
    // Reset form
    resetForm();
  };
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setLocality("");
    setCity("");
    setDistrict("");
    setState("");
    setPincode("");
    setOrderDate(new Date());
    setImage(null);
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Custom Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a Custom Order</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a custom order tailored to your specific requirements.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4 text-gray-500" />
              <label htmlFor="name" className="text-sm font-medium">Name</label>
            </div>
            <Input
              id="name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4 text-gray-500" />
              <label htmlFor="description" className="text-sm font-medium">Description</label>
            </div>
            <Textarea
              id="description"
              placeholder="Describe your custom order requirements"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-gray-500" />
              <label htmlFor="category" className="text-sm font-medium">Category</label>
            </div>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* Image Upload */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-gray-500" />
              <label htmlFor="image" className="text-sm font-medium">Upload Image</label>
            </div>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-md border border-gray-300" 
                />
              </div>
            )}
          </div>
          
          {/* Order Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <label htmlFor="orderDate" className="text-sm font-medium">Order Date</label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !orderDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {orderDate ? format(orderDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={orderDate}
                  onSelect={setOrderDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Address Fields */}
          <div className="space-y-4">
            <h3 className="font-medium">Delivery Address</h3>
            
            {/* Locality */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <label htmlFor="locality" className="text-sm font-medium">Locality</label>
              </div>
              <Input
                id="locality"
                placeholder="Enter locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                required
              />
            </div>
            
            {/* City */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <label htmlFor="city" className="text-sm font-medium">City</label>
              </div>
              <Input
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            
            {/* District */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <label htmlFor="district" className="text-sm font-medium">District</label>
              </div>
              <Input
                id="district"
                placeholder="Enter district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
            
            {/* State */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <label htmlFor="state" className="text-sm font-medium">State</label>
              </div>
              <Input
                id="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            
            {/* Pincode */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
              </div>
              <Input
                id="pincode"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default  CustomOrderButton;