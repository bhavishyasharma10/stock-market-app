# Stock Buy Average Calculator

Welcome to the Stock Buy Average Calculator! This tool helps investors calculate the new average price of their holdings when purchasing additional shares.

## Motivation

As a newcomer to the Indian stock market, I began my investment journey in September 2024. During this period, the market experienced significant volatility:

- **September 2024**: The Sensex dropped by 900 points on September 30, influenced by weak global cues and pressures on key sectors.
- **November 2024**: Both the Nifty 50 and Sensex saw losses, with the Nifty 50 dropping 2.5% and the Sensex falling 2.4% in the week ending November 18.
- **February 2025**: Indian small-cap stocks entered a bear market, falling over 20% from their peak on December 11, with analysts predicting further declines.

Using INDMoney as my stock broker app, I noticed the absence of a feature to calculate the new average price when buying additional shares. To address this, I developed the Stock Buy Average Calculator.

## Features

- **Real-Time Stock Prices**: Fetches live stock prices using the Alpha Vantage API.
- **User Holdings Management**: Allows users to input and save their current holdings, including quantity and average buy price.
- **Average Price Calculation**: Calculates the new average price dynamically when users input additional shares to purchase.

## Technologies Used

- **Next.js**: For server-side rendering and building the React application.
- **Tailwind CSS**: For styling the user interface.
- **TypeScript**: For type safety and better development experience.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bhavishyasharma10/stock-market-app.git
cd stock-buy-average-calculator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your Alpha Vantage API key:

```env
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

- **Input Stock Symbol**: Enter the stock symbol (e.g., `ZOMATO`) to fetch live prices.
- **Manage Holdings**: Input your current quantity and average buy price.
- **Calculate New Average**: Enter the number of shares you plan to buy to see the updated average price.
