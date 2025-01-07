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

  return (
    <Tippy
      interactive
      hideOnClick={hideOnClick}
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cn("menu-lists")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cn("menu-popper")}>
            {history.length > 1 && (
              <Header
                title="Language"
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            <div className={cn("menu-body")}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
