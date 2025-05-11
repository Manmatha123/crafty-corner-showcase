
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, Image } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductC } from "@/lib/types";
import { mockProductCs } from "@/lib/mockData";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const CustomOrder = () => {
  const [buyer, setBuyer] = useState<string>("");
  const [seller, setSeller] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [status, setStatus] = useState<string>("PENDING");
  const [locality, setLocality] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  // New fields based on the user's request
  const [image, setImage] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleProductSelection = (productId: string) => {
    setSelectedProducts((current) => {
      if (current.includes(productId)) {
        return current.filter(id => id !== productId);
      } else {
        return [...current, productId];
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(file.name);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!buyer || !seller || selectedProducts.length === 0 || !date || !finalPrice || !orderId || !status || 
        !locality || !city || !district || !state || !pincode || !quantity || !name || !category || !deliveryAddress) {
      toast("Please fill all required fields", {
        description: "All fields are required to create a custom order",
      });
      return;
    }

    // Submit logic would go here in a real application
    toast("Custom order created successfully!", {
      description: `Order ID: ${orderId}`,
    });
    
    // Reset form
    setBuyer("");
    setSeller("");
    setSelectedProducts([]);
    setDate(undefined);
    setFinalPrice("");
    setOrderId("");
    setStatus("PENDING");
    setLocality("");
    setCity("");
    setDistrict("");
    setState("");
    setPincode("");
    setImage("");
    setQuantity("1");
    setDescription("");
    setName("");
    setCategory("");
    setDeliveryAddress("");
    setImagePreview(null);
    setDialogOpen(false);
  };

  const getSelectedProductsTotal = () => {
    return selectedProducts.reduce((total, productId) => {
      const product = mockProductCs .find(p => p.id === productId);
      return total + (product?.price || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Artisence</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">LAXMAN</span>
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Create Custom Order</h2>
          <Link to="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Custom Order Details</CardTitle>
            <CardDescription>
              Fill in all the required information to create a custom order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name - NEW FIELD */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Order Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Category - NEW FIELD */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Order Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                {/* Buyer Selection */}
                <div className="space-y-2">
                  <Label htmlFor="buyer">Buyer</Label>
                  <Select value={buyer} onValueChange={setBuyer}>
                    <SelectTrigger id="buyer">
                      <SelectValue placeholder="Select Buyer" />
                    </SelectTrigger>
                  </Select>
                </div>

                {/* Seller Selection */}
                <div className="space-y-2">
                  <Label htmlFor="seller">Seller</Label>
                  <Select value={seller} onValueChange={setSeller}>
                    <SelectTrigger id="seller">
                      <SelectValue placeholder="Select Seller" />
                    </SelectTrigger>
                  </Select>
                </div>

                {/* Order Date */}
                <div className="space-y-2">
                  <Label>Order Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Order ID */}
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>

                {/* Quantity - NEW FIELD */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                   
                  </Select>
                </div>

                {/* Final Price */}
                <div className="space-y-2">
                  <Label htmlFor="finalPrice">Final Price (₹)</Label>
                  <Input
                    id="finalPrice"
                    type="number"
                    placeholder="0.00"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Suggested: ₹{getSelectedProductsTotal()} based on selected products
                  </p>
                </div>

                {/* Image Upload - NEW FIELD */}
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="imageUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
                          </div>
                          <input 
                            id="imageUpload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      {image && <p className="mt-2 text-sm text-gray-500">{image}</p>}
                    </div>
                    {imagePreview && (
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 overflow-hidden rounded-md border">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Address - NEW FIELD */}
              <div className="space-y-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Textarea
                  id="deliveryAddress"
                  placeholder="Enter full delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Description - NEW FIELD */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter order description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Products Multi-select */}
              <div className="space-y-2">
                <Label>Select Products</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {mockProductCs .map(product => (
                    <div 
                      key={product.id} 
                      className={cn(
                        "border rounded-md p-3 cursor-pointer",
                        selectedProducts.includes(product.id) 
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      )}
                      onClick={() => handleProductSelection(product.id)}
                    >
                      <div className="flex justify-between">
                        <span>{product.name}</span>
                        <span className="font-semibold">₹{product.price}</span>
                      </div>
                      <div className="text-xs text-gray-500">{product.category}</div>
                    </div>
                  ))}
                </div>
                {selectedProducts.length === 0 && (
                  <p className="text-sm text-red-500">Please select at least one product</p>
                )}
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Physical Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      placeholder="Locality/Area"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="District"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Create Custom Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomOrder;
