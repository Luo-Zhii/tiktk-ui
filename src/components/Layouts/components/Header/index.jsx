import { useState, useEffect } from "react";
import images from "../../../../assets/images";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookAtlas,
  faCircleQuestion,
  faCircleXmark,
  faEllipsisVertical,
  faMagnifyingGlass,
  faMoon,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper as ProperWrapper } from "../../../Popper";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import AccountItems from "../AccountItems";
import Button from "../Button";
import Menu from "../../../Popper/Menu";
const cn = classNames.bind(styles);
function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faBookAtlas} />,
      title: "English",
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: "Feedback and help",
      to: "/feedback",
    },
    {
      icon: <FontAwesomeIcon icon={faMoon} />,
      title: "Dark mode",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 3000);
  }, []);
  return (
    <header className={cn("wrapper")}>
      <div className={cn("inner")}>
        <div className={cn("logo")}>
          <img src={images.logo} />
        </div>
        <Tippy
          visible={searchResult.length > 0}
          interactive={true}
          render={(attrs) => (
            <div className={cn("search-result")} tabIndex="-1" {...attrs}>
              <ProperWrapper>
                <h4 className={cn("search-title")}>Account</h4>
                <AccountItems />
                <AccountItems />
                <AccountItems />
                <AccountItems />
                <AccountItems />
              </ProperWrapper>
            </div>
          )}
        >
          <div className={cn("search")}>
            <input placeholder="feel the rush..." spellCheck={false} />
            <button className={cn("clear-btn")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cn("loading")} icon={faSpinner} />
            <button className={cn("search-btn")}>
              {<FontAwesomeIcon icon={faMagnifyingGlass} />}
            </button>
          </div>
        </Tippy>
        <div className={cn("action")}>
          <Button types="text" size="">
            Upload
          </Button>
          <Button types="primary">Log in</Button>
          <Menu items={MENU_ITEMS}>
            <button className={cn("more-btn")}>
              {<FontAwesomeIcon icon={faEllipsisVertical} />}
            </button>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
