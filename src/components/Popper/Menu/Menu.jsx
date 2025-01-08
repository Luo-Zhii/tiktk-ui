/* eslint-disable react/prop-types */
import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../index";
import MenuItem from "./MenuItem";
import Header from "./Header";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
const cn = classNames.bind(styles);
const defaultFn = () => {};
import PropTypes from "prop-types";
// eslint-disable-next-line react/prop-types
function Menu({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaultFn,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const renderResult = (attrs) => (
    <div className={cn("menu-lists")} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cn("menu-popper")}>
        {history.length > 1 && (
          <Header
            title={current.title}
            onBack={() => {
              setHistory((prev) => prev.slice(0, prev.length - 1));
            }}
          />
        )}
        <div className={cn("menu-body")}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );
  const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));
  return (
    <Tippy
      interactive
      hideOnClick={hideOnClick}
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={renderResult}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Menu;
