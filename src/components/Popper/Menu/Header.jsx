import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import PropTypes from "prop-types";

const cn = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Header({ title, onBack }) {
  return (
    <header className={cn("header")}>
      <button className={cn("back-btn")} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <h4 className={cn("header-title")}>{title}</h4>
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
export default Header;
