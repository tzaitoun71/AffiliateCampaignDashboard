import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Product } from "../types/Product";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid";
import useSorting from "../hooks/useSorting"; // Import the sorting hook

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Use custom sorting hook
  const { sortedProducts, sortOption, setSortOption } = useSorting(products);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen min-w-full p-12 flex flex-col items-center bg-gradient-to-br from-blue-200 via-blue-50 to-white">
      <div className="w-[90%] max-w-[1800px] bg-white shadow-2xl rounded-2xl p-8 transition-all duration-300">
        
        {/* Search + Sorting Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <div className="w-[400px] relative">
            <MagnifyingGlassIcon className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
            />
          </div>

          {/* Sorting Dropdown */}
          <div>
            <select
              className="px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-high">Rating: Best to Worst</option>
              <option value="rating-low">Rating: Worst to Best</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading products...</p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-700 text-white text-left text-lg uppercase rounded-t-lg">
                  <th className="p-5 w-[600px]">Product</th>
                  <th className="p-5 w-[250px] whitespace-nowrap">Category</th>
                  <th className="p-5 w-[200px]">Price</th>
                  <th className="p-5 w-[200px] text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-t transition-all duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:shadow-md hover:bg-blue-100`}
                  >
                    <td className="p-5 flex items-center space-x-6">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-lg transition-all duration-300"
                      />
                      <span className="text-gray-900 font-semibold text-lg">{product.title}</span>
                    </td>
                    <td className="p-5 w-[250px]">
                      <span className="px-4 py-2 text-md font-semibold rounded-full bg-blue-200 text-blue-900 whitespace-nowrap shadow-md">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-5 text-gray-900 font-semibold text-lg">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-5 text-yellow-500 font-medium text-lg text-center flex items-center justify-center space-x-1">
                      <span className="font-semibold">{product.rating.rate.toFixed(1)}</span>
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
