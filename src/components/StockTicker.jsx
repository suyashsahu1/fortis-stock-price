import React, { useState, useEffect } from "react";
import StockBlock from "./StockBlock";
import "./StockTicker.css";
import fortisLogo from "../assets/images/fortisLogo.png";

function StockTicker() {
  const [nseData, setNseData] = useState({
    price: null,
    change: null,
    changePercent: null,
  });
  const [bseData, setBseData] = useState({
    price: null,
    change: null,
    changePercent: null,
  });
  const [loading, setLoading] = useState(true);

  const safeFixed = (n, d = 2) => {
    return typeof n === "number" && isFinite(n) ? n.toFixed(d) : "-";
  };

  const fetchStock = async (symbol) => {
    try {
      const url = encodeURIComponent(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
      );
      const res = await fetch("https://api.allorigins.win/get?url=" + url);
      const wrapper = await res.json();
      const data = JSON.parse(wrapper.contents);

      const meta = data.chart?.result?.[0]?.meta;
      if (!meta) throw new Error("Meta missing");

      return {
        price: meta.regularMarketPrice,
        prev: meta.chartPreviousClose,
        currency: meta.currency,
      };
    } catch (e) {
      console.error("Error fetching stock:", e);
      return { error: true };
    }
  };

  const processStockData = (data) => {
    if (data.error) {
      return { price: "Error", change: "-", isUp: null };
    }

    const price = Number(data.price);
    const prev = Number(data.prev);
    const diff = price - prev;
    const percent = (diff / prev) * 100;

    if (!isFinite(diff)) {
      return { price: `₹ ${safeFixed(price)}`, change: "-", isUp: null };
    }

    const sign = diff > 0 ? "+" : "";
    const changeText = `${sign}${safeFixed(diff)} (${safeFixed(percent)}%)`;

    return {
      price: `₹ ${safeFixed(price)}`,
      change: changeText,
      isUp: diff > 0,
    };
  };

  const loadPrices = async () => {
    setLoading(true);
    const [nse, bse] = await Promise.all([
      fetchStock("FORTIS.NS"),
      fetchStock("FORTIS.BO"),
    ]);

    setNseData(processStockData(nse));
    setBseData(processStockData(bse));
    setLoading(false);
  };

  useEffect(() => {
    loadPrices();
    const interval = setInterval(loadPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-wrap">
      <div className="ticker-label">
        <img src={fortisLogo} alt="Fortis Logo" className="fortis-logo" />
        STOCK PRICES:
      </div>

      <div className="stocks">
        <StockBlock
          symbol="FORTIS.NS (NSE)"
          price={loading ? "Loading..." : nseData.price}
          change={loading ? "-" : nseData.change}
          isUp={nseData.isUp}
        />

        <div className="sep"></div>

        <StockBlock
          symbol="FORTIS.BO (BSE)"
          price={loading ? "Loading..." : bseData.price}
          change={loading ? "-" : bseData.change}
          isUp={bseData.isUp}
        />
      </div>
    </div>
  );
}

export default StockTicker;
