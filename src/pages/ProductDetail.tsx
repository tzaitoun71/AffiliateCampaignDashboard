import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { Product } from "../types/product";
import { StarIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg mt-10">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500 text-lg mt-10">Product not found.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-white p-12">
      <div className="relative w-full max-w-5xl bg-white shadow-xl rounded-2xl p-16 flex gap-12 items-center transform transition-all duration-300 hover:shadow-2xl">
        
        {/* Back Button - Positioned in the top-left corner */}
        <button 
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-md transition-all duration-200"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        {/* Product Content Wrapper */}
        <div className="flex flex-col w-full items-center">
          <div className="flex items-center gap-10">
            {/* Product Image Section */}
            <div className="w-1/3 flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-72 h-72 object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="w-2/3">
              {/* Product ID */}
              <p className="text-sm text-gray-500">Product ID: {product.id}</p>

              {/* Product Title */}
              <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>

              {/* Product Description */}
              <p className="text-lg text-gray-600 mt-4">{product.description}</p>
              
              {/* Price & Commission */}
              <p className="text-4xl font-semibold text-blue-600 mt-6">${product.price.toFixed(2)}</p>
              <p className="text-lg text-green-600 font-medium mt-2">
                Commission (10%): <span className="font-bold">${(product.price * 0.10).toFixed(2)}</span>
              </p>

              {/* Ratings */}
              <div className="flex items-center mt-4 space-x-2">
                <span className="text-gray-800 font-semibold text-lg">{product.rating.rate.toFixed(1)}</span>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-md ml-2">({product.rating.count} reviews)</span>
              </div>

              {/* Category Tag */}
              <span className="mt-6 px-5 py-2 inline-block bg-blue-100 text-blue-900 rounded-full text-md font-semibold shadow-md">
                {product.category}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;