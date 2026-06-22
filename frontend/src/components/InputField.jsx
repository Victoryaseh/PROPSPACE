import { forwardRef } from 'react';

const InputField = forwardRef(({ label, error, ...props }, ref) => (
  <div>
    {label && <label className="form-label">{label}</label>}
    <input className="input-field" ref={ref} {...props} />
    {error && <p className="form-error">{error}</p>}
  </div>
));

InputField.displayName = 'InputField';

export default InputField;
