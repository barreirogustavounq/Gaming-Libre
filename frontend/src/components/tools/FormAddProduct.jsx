import "../../style/FormAddProduct.css";

const FormAddProduct = (props) => {
  const label = props.label;
  const placeholder = props.placeholder;
  const type = props.type;
  const value = props.value;
  const myFunction = props.function;

  return (
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          {label}
        </span>
      </div>
      <input
        type={type}
        className="form-control"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          myFunction(e.target.value);
        }}
        required
      />
    </div>
  );
};

export default FormAddProduct;
