import { useState, useMemo } from "react";
import { Product } from "../types/Product";

type SortKey = "price" | "rating";
type SortOrder = "asc" | "desc";

const useSorting = (products: Product[]) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (!sortKey) return 0;
      const aValue = sortKey === "rating" ? a.rating.rate : a[sortKey];
      const bValue = sortKey === "rating" ? b.rating.rate : b[sortKey];

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [products, sortKey, sortOrder]);

  const toggleSort = (key: SortKey, order?: SortOrder) => {
    setSortKey(key);
    setSortOrder(order || (sortOrder === "asc" ? "desc" : "asc"));
  };

  return { sortedProducts, sortKey, sortOrder, toggleSort };
};

export default useSorting;
