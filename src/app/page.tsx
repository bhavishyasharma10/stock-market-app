"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [symbol, setSymbol] = useState<string>("ZOMATO");
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [currentQty, setCurrentQty] = useState<number>(10);
  const [currentAvg, setCurrentAvg] = useState<number>(234.7);
  const [newQty, setNewQty] = useState<number>(0);
  const [newAvgPrice, setNewAvgPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(`/api/stock?symbol=${symbol}`);
        setLivePrice(response.data.price);
      } catch (error) {
        console.error("Error fetching stock data", error);
      }
    };

    fetchStockPrice();
    const interval = setInterval(fetchStockPrice, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  useEffect(() => {
    if (newQty > 0 && livePrice) {
      const newAvg =
        (currentQty * currentAvg + newQty * livePrice) / (currentQty + newQty);
      setNewAvgPrice(parseFloat(newAvg.toFixed(2)));
    } else {
      setNewAvgPrice(null);
    }
  }, [newQty, livePrice, currentQty, currentAvg]);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stock Buy Average Calculator</h1>

      {/* Select Stock Symbol */}
      <div className="mb-4">
        <label className="block font-semibold">Stock Symbol:</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="p-2 border rounded w-full text-black"
        />
      </div>

      {/* Live Stock Price */}
      <div className="mb-4">
        <label className="block font-semibold">Live Market Price:</label>
        <p className="text-lg font-bold">
          {livePrice ? `₹${livePrice.toFixed(2)}` : "Loading..."}
        </p>
      </div>

      {/* User's Current Holdings */}
      <div className="mb-4">
        <label className="block font-semibold">Your Current Holdings:</label>
        <input
          type="number"
          value={currentQty}
          onChange={(e) => setCurrentQty(parseInt(e.target.value) || 0)}
          className="p-2 border rounded w-full mb-2 text-black"
          placeholder="Enter your quantity"
        />
        <input
          type="number"
          value={currentAvg}
          onChange={(e) => setCurrentAvg(parseFloat(e.target.value) || 0)}
          className="p-2 border rounded w-full text-black"
          placeholder="Enter your avg price"
        />
      </div>

      {/* Buy More Shares */}
      <div className="mb-4">
        <label className="block font-semibold">New Quantity to Buy:</label>
        <input
          type="number"
          value={newQty}
          onChange={(e) => setNewQty(parseInt(e.target.value) || 0)}
          className="p-2 border rounded w-full text-black"
        />
      </div>

      {/* New Average Price Calculation */}
      {newAvgPrice !== null && (
        <>
          <label className="block font-semibold">New Average Price:</label>
          <div className="mb-4 bg-gray-100 p-4 rounded">
            <p className="text-l text-black">
              If you buy {newQty} more shares, your new average price will be:
            </p>
            <p className="text-xl font-bold text-blue-600">₹{newAvgPrice}</p>
          </div>
        </>
      )}

    </div>
  );
}
