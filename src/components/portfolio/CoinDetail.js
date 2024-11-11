```javascript
import React from 'react';
import { useParams } from 'react-router-dom';

const CoinDetail = () => {
  const { coinId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Coin Details - {coinId}
      </h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="text-gray-600">
          This page will be updated with detailed information about {coinId} in the future.
        </p>
      </div>
    </div>
  );
};

export default CoinDetail;
```
