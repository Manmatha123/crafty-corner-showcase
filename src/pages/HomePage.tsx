import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import OrderDialog from "@/components/OrderDialog";
import { useProducts } from "@/contexts/ProductContext";
import { Product } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const { products, addOrder, setFilteredProducts } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    quantity: number;
  } | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  // Calculate max price for the slider
  const maxPrice = useMemo(() => {
    const highest = Math.max(...products.map((p) => p.price));
    return Math.ceil(highest / 10) * 10;
  }, [products]);

  // Reset price range when maxPrice changes
  React.useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  //Get product from backemd

  useEffect(() => {
    const Fetchfilterproducts = async () => {
      try {
        let authToken = localStorage.getItem("authToken");
        authToken = JSON.parse(authToken);
        const responsedata = await axios.post(
          "http://localhost:8082/v1/api/product/filter",
          {
            name: searchTerm || null,
            category: category === "All Categories" ? null : { id: 1,name:category },
            location: location === "All Locations" ? null : location,
            price: priceRange[1],
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (responsedata.data) {
          setFilteredProducts(responsedata.data);
        }
      } catch (error) {
        console.error("Failed to fetch filtered products", error);
      }
    };
    Fetchfilterproducts();
  }, [searchTerm, category, location, priceRange]);

  // Apply filters
const filteredProducts=products;

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
            Fresh & Local Products
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
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
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
