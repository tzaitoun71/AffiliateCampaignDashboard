import { useState, useEffect } from "react";
import { Product } from "../types/Product";

const useSorting = (products: Product[]) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    const sorted = [...products];

    if (sortOption === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-high") {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortOption === "rating-low") {
      sorted.sort((a, b) => a.rating.rate - b.rating.rate);
    }

    setSortedProducts(sorted);
  }, [sortOption, products]);

  return { sortedProducts, sortOption, setSortOption };
};

export default useSorting;
