import classNames from "classnames/bind";
import styles from "../../Pages/Home/Home.module.scss";

const cn = classNames.bind(styles);
const BottomNav = () => {
    return (
      <nav className={cn("bottom-nav")}>
        <a className="navbar-brand" href="/">
          <i className="fa fa-home"></i>
        </a>
        <a className= {cn("navbar-brand")} href="/">
          <i className="fa fa-search"></i>
        </a>
        <a className={cn("navbar-brand")} href="/">
          <i className="fa fa-plus"></i>
        </a>
        <a className={cn("navbar-brand")} href="/">
          <i className="fa fa-commenting"></i>
        </a>
        <a className={cn("navbar-brand")} href="/">
          <i className="fa fa-user"></i>
        </a>
      </nav>
    );
  };
  
  export default BottomNav;