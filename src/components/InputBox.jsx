export default function InputBox({
  value,
  setValue,
  text,
  readOnly,
  customID,
}) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor={customID}>{text}:</label>
        <input
          type="number"
          className="form-control"
          id={customID}
          placeholder="Enter amount"
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
