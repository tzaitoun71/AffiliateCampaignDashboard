import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Product } from "../types/Product";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen p-12 flex justify-center">
      <div className="w-[90%] max-w-[2000px] bg-white shadow-lg rounded-xl p-12">
        <h2 className="text-4xl font-semibold text-gray-900 text-center mb-4">Product Performance Tracker</h2>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[400px] px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading products...</p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left text-lg uppercase">
                  <th className="p-5 w-[500px]">Product</th>
                  <th className="p-5 w-[220px] whitespace-nowrap">Category</th>
                  <th className="p-5 w-[180px]">Price</th>
                  <th className="p-5 w-[180px]">Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr 
                    key={product.id} 
                    className="border-t hover:bg-gray-100 transition duration-200 cursor-pointer"
                  >
                    <td className="p-5 flex items-center space-x-6">
                      <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                      <span className="text-gray-900 font-medium text-lg">{product.title}</span>
                    </td>
                    <td className="p-5 w-[220px]">
                      <span className="px-4 py-2 text-md font-medium rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-5 text-gray-800 font-semibold text-lg">${product.price.toFixed(2)}</td>
                    <td className="p-5 text-yellow-500 font-medium text-lg">{product.rating.rate} ⭐</td>
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
