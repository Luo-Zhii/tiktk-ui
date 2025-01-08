import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cn = classNames.bind(styles);

function Header() {
  return (
    <header className={cn("wrapper")}>
      <div className={cn("inner")}></div>
    </header>
  );
}

export default Header;
