import React, { useState, useMemo, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import OrderDialog from "@/components/OrderDialog";
import { useProducts } from "@/contexts/ProductContext";
import { Category, Product } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomOrderButton from "@/components/CustomOrderButton";

const HomePage = () => {

  const BASE_URL = import.meta.env.VITE_API_URL;
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<Category>(null);
  const [location, setLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    quantity: number;
  } | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const { products, addOrder, setFilteredProducts } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { categoryId } = useParams(); // Extract categoryId from the URL
  const urlLocation = useLocation();
  const queryParams = new URLSearchParams(urlLocation.search);
  const paramCategory = queryParams.get("category");
  const productParamName = queryParams.get("name");

  const Fetchfilterproducts = async () => {
    try {
      let authToken = localStorage.getItem("authToken");
      authToken = JSON.parse(authToken);
      setFilteredProducts([]);
      const responsedata = await axios.post(
        `${BASE_URL}/v1/public/api/product/filter`,
        {
          name: searchTerm || null,
          category: category == null ? null : category,
          location: location === "All Locations" ? null : location,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "1"
          },
        }
      );
      if (responsedata.data) {
        console.log(responsedata.data);
        setFilteredProducts(responsedata.data);
      }
    } catch (error) {
      console.error("Failed to fetch filtered products", error);
    }
  };
 const countRef = useRef(0); // Use useRef to persist count across renders

  useEffect(() => {
    if (paramCategory && productParamName && countRef.current === 0) {
      const categoryObj: Category = {
        id: Number(paramCategory),
        name: "",
      };
      countRef.current = 1; // Update the ref value
      setCategory(categoryObj);
      setSearchTerm(decodeURI(productParamName));
    } else if (categoryId && countRef.current === 0) {
      const categoryObj: Category = {
        id: Number(categoryId),
        name: "",
      };
      countRef.current = 1; // Update the ref value
      setCategory(categoryObj);
    } else {
      Fetchfilterproducts();
      countRef.current = 1; // Update the ref value
    }
  }, [paramCategory, productParamName, categoryId, searchTerm, category, location, priceRange]);

  // useEffect(() => {

  //   Fetchfilterproducts();
  // }, [searchTerm, category, location, priceRange]);


  // Apply filters
  const filteredProducts = products;

  const handleOrderClick = (product: Product, quantity: number) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setSelectedProduct({ product, quantity });
    setIsOrderDialogOpen(true);
  };

  const handlePlaceOrder = (order: any) => {
    addOrder(order);
    setIsOrderDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            New & Creative Products
          </h1>
          <p className="text-gray-600 mt-2">
            Discover the best products from local sellers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProductFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={category}
              setCategory={setCategory}
              location={location}
              setLocation={setLocation}
              priceRange={priceRange}
              setPriceRange={(value) => {
                setPriceRange(value); // Correctly update the state
                console.log(value); // Log the updated value for debugging
              }}
              maxPrice={10000}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOrder={handleOrderClick}
                    pageName="home"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg border text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500">
                  Try changing your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedProduct && (
        <OrderDialog
          products={[selectedProduct]}
          isOpen={isOrderDialogOpen}
          onClose={() => {
            setIsOrderDialogOpen(false);
            setSelectedProduct(null);
          }}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

    </div>
  );
};

export default HomePage;
