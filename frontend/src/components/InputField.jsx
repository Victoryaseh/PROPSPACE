const InputField = ({ label, error, ...props }) => (
  <div>
    {label && <label className="form-label">{label}</label>}
    <input className="input-field" {...props} />
    {error && <p className="form-error">{error}</p>}
  </div>
);

export default InputField;
