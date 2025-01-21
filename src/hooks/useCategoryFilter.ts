import { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { fetchProductsByCategory } from "../api/api";

const useCategoryFilter = (allProducts: Product[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(allProducts.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, [allProducts]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!selectedCategory) {
        setFilteredProducts(allProducts);
      } else {
        const products = await fetchProductsByCategory(selectedCategory);
        setFilteredProducts(products);
      }
    };
    fetchFilteredProducts();
  }, [selectedCategory, allProducts]);

  return { selectedCategory, setSelectedCategory, filteredProducts, categories };
};

export default useCategoryFilter;
