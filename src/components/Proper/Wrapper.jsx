import classNames from "classnames/bind";
import styles from "./Proper.module.scss";
const cn = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Wrapper({ children }) {
  return <div className={cn("wrapper")}>{children}</div>;
}
export default Wrapper;
