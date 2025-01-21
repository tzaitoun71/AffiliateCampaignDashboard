import { useState, useMemo } from "react";
import { Product } from "../types/Product";

const useCategoryFilter = (products: Product[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return selectedCategory ? products.filter((p) => p.category === selectedCategory) : products;
  }, [products, selectedCategory]);

  return { selectedCategory, setSelectedCategory, filteredProducts, categories };
};

export default useCategoryFilter;
