"use client"; // Add this at the top

import { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type StockData = {
  date: string;
  price: number;
}[];

export default function Home() {
  const [stockData, setStockData] = useState<StockData>([]);
  const [symbol, setSymbol] = useState<string>("ZOMATO");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/stock?symbol=${symbol}`);
      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Indian Stock Market Tracker</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter Stock Symbol (e.g., RELIANCE)"
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={fetchStockData} className="p-2 bg-blue-600 text-white rounded w-full mb-4">
        Fetch Stock Data
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
