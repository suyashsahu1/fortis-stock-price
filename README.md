# Fortis Stock Ticker - React App

A React 19 + Vite stock price ticker for Fortis Healthcare, displaying NSE and BSE stock prices with real-time updates.

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   The app will open automatically at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Features

- **Real-time Stock Prices**: Fetches current prices for FORTIS.NS (NSE) and FORTIS.BO (BSE)
- **Price Change Tracking**: Displays price changes and percentage changes
- **Color-coded Indicators**: Green for price increases, red for decreases
- **Auto-refresh**: Updates stock prices every 30 seconds
- **Responsive Design**: Works on all screen sizes
- **Modern Stack**: Built with React 19 and Vite for optimal performance

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx              # Main app component
├── App.css              # App styles
└── components/
    ├── StockTicker.jsx  # Stock ticker component
    ├── StockTicker.css  # Ticker styles
    ├── StockBlock.jsx   # Individual stock block component
    └── StockBlock.css   # Stock block styles
```

## Technologies

- **React 19**: Latest React version
- **Vite**: Fast build tool and dev server
- **Yahoo Finance API**: Real-time stock data (via allorigins proxy)
