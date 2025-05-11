
import { useEffect, useState } from "react";
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
import { Category, User } from "@/lib/types";
import axios from "axios";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food & Beverages",
  "Home Decor",
  "Books",
  "Others",
];

interface SellerObj {
  seller: User
}

const CustomOrderButton = ({ seller }: SellerObj) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  
  const BASE_URL = import.meta.env.VITE_API_URL;


  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>(null);
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [qty, setQty] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
 

  useEffect(() => {
    initializaData();
  }, []);



  const initializaData = async () => {
    const userObj = localStorage.getItem("user");
    const buyer:User =await JSON.parse(userObj);
    if(!buyer)  return;
    setCity(buyer.city);
    setLocality(buyer.locality);
    setDistrict(buyer.district);
    setState(buyer.state);
    setPincode(buyer.pincode);
  };

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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userObj = localStorage.getItem("user");
    const buyer =await JSON.parse(userObj);
    let authToken = localStorage.getItem('authToken');
    authToken =await JSON.parse(authToken);


    if (!buyer || !authToken) {
      navigate("/login");
      toast({
        title: "Error",
        description: "Please login before order",
      })
      return;
    }

    // Create custom order object
    const customOrder = {
      name,
      description,
      // category,
      locality,
      city,
      district,
      state,
      pincode,
      qty,
      orderDate: new Date(),
      image:"",
      buyer: buyer,
      seller: seller,
      status: "pending",
    };

    const formData = new FormData();

    if (image && image.size > 0) {
      formData.append("file", image);
    } else {
      console.warn(
        "No image file provided or file is empty. Adding an empty image placeholder."
      );
      const emptyImage = new Blob([], { type: "image/png" }); // Create an empty image file
      formData.append("file", emptyImage, "placeholder.png"); // Append it with a default name
    }

    formData.append(
      "product",
      new Blob([JSON.stringify(customOrder)], { type: "application/json" })
    );
console.log(image)
console.log(customOrder)


    const res = await axios.post(`${BASE_URL}/v1/custom-order/saveorupdate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`,
        'ngrok-skip-browser-warning' : '1'
      },
    });

    if (res.data.status) {
      toast({
        title: "Success",
        description: "order successfully",
      });

      setOpen(false);
      resetForm();
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory(null);
    setLocality("");
    setCity("");
    setQty("");
    setDistrict("");
    setState("");
    setPincode("");
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

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4 text-gray-500" />
              <label htmlFor="name" className="text-sm font-medium">Quantity</label>
            </div>
            <Input
              id="qty"
              placeholder="Enter quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4 text-gray-500" />
              <label htmlFor="description" className="text-sm font-medium">Describe</label>
            </div>
            <Textarea
              id="description"
              placeholder="Describe your custom order requirements"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
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

export default CustomOrderButton;