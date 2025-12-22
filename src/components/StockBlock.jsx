import React from 'react'
import './StockBlock.css'

function StockBlock({ symbol, price, change, isUp }) {
  return (
    <div className="stock-block">
      <div className="symbol">{symbol}</div>
      <div className="price">{price}</div>
      <div className={`change ${isUp === true ? 'up' : isUp === false ? 'down' : ''}`}>
        {change}
      </div>
    </div>
  )
}

export default StockBlock
