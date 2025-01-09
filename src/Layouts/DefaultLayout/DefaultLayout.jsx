import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import PropTypes from "prop-types";
const cn = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div className={cn("wrapper")}>
      <Header />
      <div className={cn("container")}>
        <Sidebar />
        <div className={cn("content")}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
