import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 });
  }

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}.BSE&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
    console.log("Fetching:", url);
    const response = await axios.get(url);
    console.log("API Response:", response.data);

    if (!response.data["Time Series (Daily)"]) {
      return NextResponse.json({ error: "Stock data not found" }, { status: 404 });
    }

    const formattedData = Object.keys(response.data["Time Series (Daily)"])
      .slice(0, 10)
      .map((date) => ({
        date,
        price: parseFloat(response.data["Time Series (Daily)"][date]["4. close"]),
      }));

    return NextResponse.json(formattedData.toReversed());
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
