import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "../types/product";

interface ProductRowProps {
  product: Product;
  onClick: () => void;
}

const ProductRow = ({ product, onClick }: ProductRowProps) => (
  <>
    {/* Desktop View (Table Row) */}
    <tr
      className="hidden md:table-row border-t transition-all duration-200 bg-white hover:shadow-md hover:bg-blue-100 cursor-pointer"
      onClick={onClick}
    >
      <td className="p-5 flex items-center space-x-6 text-left">
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 object-contain"
          />
        </div>
        <span className="text-gray-900 font-semibold text-lg">
          {product.title}
        </span>
      </td>

      <td className="p-5 text-center align-middle">
        <span className="px-4 py-2 text-md font-semibold rounded-full bg-blue-200 text-blue-900 whitespace-nowrap shadow-md">
          {product.category}
        </span>
      </td>

      <td className="p-5 text-gray-900 font-semibold text-lg text-center align-middle">
        ${product.price.toFixed(2)}
      </td>

      <td className="p-5 text-center align-middle">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-800 font-semibold">
            {product.rating.rate.toFixed(1)}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-md">
            ({product.rating.count} reviews)
          </span>
        </div>
      </td>
    </tr>

    {/* Mobile View (Card Format) */}
    <div
      className="md:hidden block bg-white shadow-lg rounded-lg p-4 mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="bg-gray-100 p-2 rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-900">
            {product.title}
          </h2>
          <p className="text-md text-gray-600">{product.category}</p>
          <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>

          {/* Ratings */}
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-gray-800 font-semibold">
              {product.rating.rate.toFixed(1)}
            </span>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ProductRow;
