  import PropTypes from "prop-types";

  /* eslint-disable react/prop-types */
  import Button from "../../Button";
  import classNames from "classnames/bind";
  import styles from "./Menu.module.scss";
import { callLogout } from "../../../config/api";
import { setLogoutAction } from "../../../redux/slice/accountSlide";
import { useDispatch } from "react-redux";
  const cn = classNames.bind(styles);

  function MenuItem({ data, onClick }) {
    const dispatch = useDispatch();
    const classes = cn("menu-item", { separate: data.separate });
  
    const handleClick = () => {
      if (data.title === "Log out") {
        callLogout().then((res) => {
          if (res && res.data) {
            dispatch(setLogoutAction());
            message.success("Đăng xuất thành công");
          }
        });
      } else if (onClick) {
        onClick();
      }
    };
  
    return (
      <Button
        className={classes}
        leftIcon={data.icon}
        to={data.to}
        onClick={handleClick}
      >
        {data.title}
      </Button>
    );
  }

  MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  };
  export default MenuItem;
