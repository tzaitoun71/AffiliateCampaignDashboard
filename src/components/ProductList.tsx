import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/api";
import { Product } from "../types/product";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid";
import useCategoryFilter from "../hooks/useCategoryFilter";
import useSorting from "../hooks/useSorting";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Set number of products per page

  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Use Category Filter Hook
  const { selectedCategory, setSelectedCategory, filteredProducts, categories } =
    useCategoryFilter(products);

  // Use Sorting Hook
  const { sortedProducts, sortKey, sortOrder, toggleSort } = useSorting(filteredProducts);

  // Filter by Search Query
  const searchedProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = searchedProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-300 via-blue-100 to-white p-12">
      <div className="w-[90%] max-w-[1800px] bg-white shadow-2xl rounded-2xl p-8 transition-all duration-300">
        {/* Search and Filters Row */}
        <div className="flex items-center space-x-4 mb-8">
          {/* Search Bar */}
          <div className="w-[400px] relative">
            <MagnifyingGlassIcon className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className="px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Sorting Dropdown for Price & Rating */}
          <select
            className="px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
            value={`${sortKey}-${sortOrder}`}
            onChange={(e) => {
              const [key, order] = e.target.value.split("-");
              toggleSort(key as "price" | "rating", order as "asc" | "desc");
            }}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading products...</p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-700 text-white text-center text-lg uppercase rounded-t-lg">
                  <th className="p-5 w-[600px] text-left">Product</th>
                  <th className="p-5 w-[250px]">Category</th>
                  <th className="p-5 w-[200px]">Price</th>
                  <th className="p-5 w-[250px]">Rating</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-t transition-all duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:shadow-md hover:bg-blue-100 cursor-pointer`}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <td className="p-5 flex items-center space-x-6 text-left">
                      <div className="bg-white p-3 rounded-lg shadow-lg">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <span className="text-gray-900 font-semibold text-lg">{product.title}</span>
                    </td>
                    <td className="p-5 w-[250px] text-center">
                      <span className="px-4 py-2 text-md font-semibold rounded-full bg-blue-200 text-blue-900 whitespace-nowrap shadow-md">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-5 text-gray-900 font-semibold text-lg text-center">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-5 text-yellow-500 font-medium text-lg text-center flex items-center justify-center space-x-2">
                      <span className="text-gray-800">{product.rating.rate.toFixed(1)}</span>
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-md">({product.rating.count} reviews)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls*/}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg shadow-md text-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;