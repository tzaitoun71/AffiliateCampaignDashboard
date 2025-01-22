import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/api";
import { Product } from "../types/product";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useCategoryFilter from "../hooks/useCategoryFilter";
import useSorting from "../hooks/useSorting";
import ProductRow from "./ProductRow";
import Pagination from "./Pagination";

const itemsPerPage = 5; // Number of products per page

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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
  const {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
  } = useCategoryFilter(products);

  // Use Sorting Hook
  const { sortedProducts, sortKey, sortOrder, toggleSort } =
    useSorting(filteredProducts);

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
  const paginatedProducts = searchedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
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

          {/* Sorting Dropdown */}
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
          <p className="text-center text-gray-500 text-lg">
            Loading products...
          </p>
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
                {paginatedProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;