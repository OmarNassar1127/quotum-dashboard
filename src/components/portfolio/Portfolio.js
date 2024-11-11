```javascript
import React from 'react';

const Portfolio = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder for 8 coin containers */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
              <h3 className="text-lg font-semibold text-center">Coin {index + 1}</h3>
              <div className="text-center text-gray-600">
                <p>Price: $0.00</p>
                <p>24h: 0%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
```
