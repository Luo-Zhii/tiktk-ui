import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cn = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cn("wrapper")}>
      <h2>Sidebar</h2>
    </aside>
  );
}

export default Sidebar;
