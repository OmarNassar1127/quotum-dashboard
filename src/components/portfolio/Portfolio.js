import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();

  const coins = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 36789.52,
      price_change_percentage_24h: 2.5
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2045.67,
      price_change_percentage_24h: 1.8
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      current_price: 1.00,
      price_change_percentage_24h: 0.1
    },
    {
      id: 'realio-network',
      name: 'Realio Network',
      symbol: 'RIO',
      image: 'https://assets.coingecko.com/coins/images/12206/standard/Rio.png?1696512042',
      current_price: 0.234,
      price_change_percentage_24h: -1.2
    },
    {
      id: 'gamercoin',
      name: 'GamerCoin',
      symbol: 'GHX',
      image: 'https://assets.coingecko.com/coins/images/14714/standard/ghx_icon.png?1696514385',
      current_price: 0.0067,
      price_change_percentage_24h: -0.8
    },
    {
      id: 'argocoin',
      name: 'ArgoCoin',
      symbol: 'AGC',
      image: 'https://assets.coingecko.com/coins/images/34256/standard/Argocoin.jpg?1729941668',
      current_price: 0.089,
      price_change_percentage_24h: 1.5
    },
    {
      id: 'panoverse',
      name: 'Panoverse',
      symbol: 'PANO',
      image: 'https://assets.coingecko.com/coins/images/32812/standard/1000366603.jpg?1719371841',
      current_price: 0.045,
      price_change_percentage_24h: -2.1
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 58.23,
      price_change_percentage_24h: 3.2
    }
  ];

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

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
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{coin.name}</h3>
                <p className="text-sm text-gray-500">{coin.symbol}</p>
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
