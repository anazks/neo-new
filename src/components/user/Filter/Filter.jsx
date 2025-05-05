import React, { useEffect, useState } from 'react';
import { getCategory, getBrand } from '../../../Services/Settings';

function Filter({ products, setProducts }) {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedBrands, setFetchedBrands] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [originalProducts, setOriginalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const uiCategories = [
    "BY BRAND",
    "CATEGORY",
    "PRICE",
    "AVAILABILITY",
    "RATING",
  ];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const categoryRes = await getCategory();
        const brandRes = await getBrand();
        setFetchedCategories(Array.isArray(categoryRes.data) ? categoryRes.data : []);
        setFetchedBrands(Array.isArray(brandRes.data) ? brandRes.data : []);
      } catch (error) {
        console.error(error);
        setFetchedCategories([]);
        setFetchedBrands([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Save original products when first loaded
  useEffect(() => {
    if (products.length && originalProducts.length === 0) {
      setOriginalProducts(products);
    }
  }, [products]);

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
    setSelectedOption('');
  };

  const selectedLabel = uiCategories[activeCategory];
  const isCategorySelected = selectedLabel === "CATEGORY";
  const isBrandSelected = selectedLabel === "BY BRAND";
  const isPriceSelected = selectedLabel === "PRICE";
  const isAvailabilitySelected = selectedLabel === "AVAILABILITY";

  const handleFilter = () => {
    let filtered = [...originalProducts];

    if (isCategorySelected) {
      const selectedId = parseInt(selectedOption);
      filtered = filtered.filter(product => product.category === selectedId);
    } else if (isBrandSelected) {
      const selectedId = parseInt(selectedOption);
      filtered = filtered.filter(product => product.brand === selectedId);
    } else if (isPriceSelected) {
      filtered = filtered.sort((a, b) => {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return selectedOption === 'lowToHigh'
          ? priceA - priceB
          : priceB - priceA;
      });
    } else if (isAvailabilitySelected) {
      const isAvailable = selectedOption === 'true';
      filtered = filtered.filter(product => product.is_available === isAvailable);
    }

    setProducts(filtered);
  };

  const handleReset = () => {
    setSelectedOption('');
    setProducts(originalProducts);
  };

  return (
    <div className="w-full bg-white font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Category Column */}
          <div className="w-full md:w-64">
            {uiCategories.map((category, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-4 py-3 mb-2 rounded cursor-pointer border-l-[3px] transition-all duration-200 ${
                  activeCategory === index
                    ? 'bg-gray-100 border-l-blue-500 shadow-sm'
                    : 'bg-white border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'
                }`}
                onClick={() => toggleCategory(index)}
              >
                <h3
                  className={`text-xs uppercase font-medium tracking-wide ${
                    activeCategory === index ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {category}
                </h3>
                <span className="relative w-3 h-3">
                  <span
                    className={`absolute top-1/2 left-0 w-3 h-0.5 -mt-px ${
                      activeCategory === index ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                  ></span>
                  <span
                    className={`absolute top-0 left-1/2 h-3 w-0.5 -ml-px transition-transform duration-200 ${
                      activeCategory === index
                        ? 'bg-blue-500 rotate-90'
                        : 'bg-gray-500'
                    }`}
                  ></span>
                </span>
              </div>
            ))}
          </div>

          {/* Options Column */}
          <div className="w-full">
            {activeCategory !== null && (
              <div className="animate-fade-in">
                {loading ? (
                  <div className="text-center py-6 text-gray-500">Loading options...</div>
                ) : (
                  <div className="space-y-3">
                    <select
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-700 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      <option value="">Select option</option>
                      {isCategorySelected &&
                        Array.isArray(fetchedCategories) &&
                        fetchedCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      {isBrandSelected &&
                        Array.isArray(fetchedBrands) &&
                        fetchedBrands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                      {isPriceSelected && (
                        <>
                          <option value="lowToHigh">Low to High</option>
                          <option value="highToLow">High to Low</option>
                        </>
                      )}
                      {isAvailabilitySelected && (
                        <>
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </>
                      )}
                    </select>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <button
                        className="px-5 py-2 bg-blue-500 text-white font-medium rounded-full text-xs uppercase tracking-wide hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleFilter}
                      >
                        Apply Filter
                      </button>
                      <button
                        className="px-5 py-2 bg-white text-gray-700 border border-gray-300 font-medium rounded-full text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Filter;
