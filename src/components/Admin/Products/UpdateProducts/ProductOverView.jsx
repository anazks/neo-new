import React from 'react';

function ProductOverView({ product }) {
  console.log(product, "------------------");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Product Overview</h1>
        
        <div className="space-y-6">
          {product?.attributes?.map((obj, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <div className="mb-4">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                  {obj.attribute?.category.name}
                </span>
                <span className="text-xl font-semibold text-gray-100">
                  {obj.attribute?.name}
                </span>
              </div>
              
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-300 mb-3">Added Details</h3>
                <div className="space-y-3">
                  {obj.details.map((detail) => (
                    <div key={detail.id} className="flex items-center space-x-4 bg-gray-700 p-3 rounded-md">
                      <span className="text-gray-200 font-medium min-w-32">
                        {detail.value}
                      </span>
                    
                    </div>
                  ))}
                </div>
                 
              </div>
              <br />
               <input 
                        type="text" 
                        placeholder="Enter additional data..."
                        className="flex-1 bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
            </div>
          ))}
        </div>
        
        {(!product?.attributes || product.attributes.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No product attributes available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductOverView;

