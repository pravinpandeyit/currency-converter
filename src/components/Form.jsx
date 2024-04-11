import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import Dropdown from "./Dropdown";

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
    // console.log("first function", data[currency][to]);
  }

  const convertCurrency = () => {
    // console.log("second function", perUnitConversionAmount);
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
        <InputBox
          value={amount}
          setValue={setAmount}
          text="Amount"
          readOnly={false}
          customID="amountId"
        />
        <InputBox
          value={convertedAmount}
          setValue={setConvertedAmount}
          text="Converted Amount"
          readOnly={true}
          customID="convertedAmount"
        />
      </div>
      <div className="row">
        <Dropdown
          value={from}
          setValue={setFrom}
          allCurrency={allCurrency}
          customID="fromCurrency"
        />
        <Dropdown
          value={to}
          setValue={setTo}
          allCurrency={allCurrency}
          customID="toCurrency"
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-convert" onClick={handleSwap}>
          Swap
        </button>
      </div>
    </div>
  );
}
