import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 });
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
    const response = await axios.get(url);

    if (!response.data["Global Quote"]) {
        /** Sample stock price data as the API rate limit is 25 a day */
        const sampleStockPrice = {
            symbol: "ZOMATO",
            open: 130.0,
            high: 135.0,
            low: 129.0,
            price: 132.5,
            volume: 1000000,
            latestTradingDay: "2021-10-01",
            previousClose: 128.0,
            change: 4.5,
            changePercent: "3.52%",
        };

        console.error("API Error:", response.data.Information);   
        return NextResponse.json(sampleStockPrice);
    }

    const stockData = response.data["Global Quote"];

    const stockPrice = {
      symbol: stockData["01. symbol"],
      open: parseFloat(stockData["02. open"]),
      high: parseFloat(stockData["03. high"]),
      low: parseFloat(stockData["04. low"]),
      price: parseFloat(stockData["05. price"]),
      volume: parseInt(stockData["06. volume"]),
      latestTradingDay: stockData["07. latest trading day"],
      previousClose: parseFloat(stockData["08. previous close"]),
      change: parseFloat(stockData["09. change"]),
      changePercent: stockData["10. change percent"],
    };

    return NextResponse.json(stockPrice);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
