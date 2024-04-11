export default function InputBox({
  value,
  setValue,
  text,
  readOnly,
  customID,
}) {
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor={customID}>{text}:</label>
        <input
          type="number"
          className="form-control"
          id={customID}
          placeholder="Enter amount"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
