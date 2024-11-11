```javascript
import React from 'react';

const Videos = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placeholder for 4 video containers */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold">Video Title {index + 1}</h3>
            <p className="text-gray-600">Video description placeholder</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
```
