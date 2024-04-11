export default function Dropdown({ value, setValue, allCurrency, customID }) {
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor={customID}>From Currency:</label>
        <select
          className="form-control"
          id={customID}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
  );
}
