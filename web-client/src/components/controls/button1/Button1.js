import styles from "./Button1.module.css";
const Button1 = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};
export default Button1;
