import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import useDebounce from "../hooks/useDebounce";
import Spinner from "./Spinner";

const usePagination = (items, itemsPerPage, currentPage) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return { totalPages, currentItems };
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [productsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const filteredProducts = useMemo(() => {
    const loweredSearchTerm = debouncedSearchTerm.toLowerCase();
    return products.filter((prod) =>
      prod.title.toLowerCase().includes(loweredSearchTerm)
    );
  }, [debouncedSearchTerm, products]);

  const { totalPages, currentItems } = usePagination(
    filteredProducts,
    productsPerPage,
    currentPage
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {!loading && (
        <Navbar
          inputValue={searchTerm}
          handleInputValue={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {currentItems.length === 0 ? (
              <h1 className="text-2xl">No products found</h1>
            ) : (
              currentItems.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white shadow-lg rounded p-4 flex flex-col gap-2.5"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="h-80 w-full cursor-grab hover:scale-x-110 duration-500 ease-in-out"
                  />
                  <span className="text-gray-500 font-semibold">
                    {prod.title}
                  </span>
                  <p className="truncate text-gray-500">{prod.description}</p>
                  <span className="font-semibold">Price : {prod.price} $</span>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-3 py-2 text-white bg-blue-600 rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-3 py-2 font-bold">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className={`px-3 py-2 text-white bg-blue-600 rounded`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
