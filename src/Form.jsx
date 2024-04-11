import { useState, useEffect } from "react";

export default function Form() {
  const [allCurrency, setAllCurrency] = useState([]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [perUnitConversionAmount, setPerUnitConversionAmount] = useState(0);

  async function fetchCurrency(currency = "usd") {
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    );
    const data = await res.json();
    setAllCurrency(Object.keys(data[currency]));
    setPerUnitConversionAmount(data[currency][to]);
    console.log("first function", data[currency][to]);
  }

  const convertCurrency = () => {
    console.log("second function", perUnitConversionAmount);
    return setConvertedAmount(amount * perUnitConversionAmount);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    fetchCurrency(from);
  }, [amount, to, from]);

  useEffect(() => {
    convertCurrency();
  }, [perUnitConversionAmount, amount]);

  return (
    <div className="container">
      <h2 className="text-center">Currency Converter</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="amountId">Amount:</label>
            <input
              type="number"
              className="form-control"
              id="amountId"
              placeholder="Enter amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="convertedAmount">Converted Amount:</label>
            <input
              type="text"
              className="form-control"
              id="convertedAmount"
              placeholder="Converted amount"
              readOnly
              value={convertedAmount}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select
              className="form-control"
              id="fromCurrency"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {allCurrency &&
                allCurrency.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="toCurrency">To Currency:</label>
            <select
              className="form-control"
              id="toCurrency"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {allCurrency &&
                allCurrency.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-convert" onClick={handleSwap}>
          Swap
        </button>
      </div>
    </div>
  );
}
