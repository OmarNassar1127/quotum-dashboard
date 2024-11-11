import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';

const Portfolio = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error loading coins: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Crypto Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => handleCoinClick(coin.id)}
            className="bg-white shadow-sm rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{coin.name}</h3>
                <p className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  ${coin.current_price.toLocaleString()}
                </p>
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    coin.price_change_percentage_24h >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
