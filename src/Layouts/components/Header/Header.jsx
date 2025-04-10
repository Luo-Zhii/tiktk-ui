import { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../../assets/images";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "../../../components/Button";
import Menu from "../../../components/Popper/Menu";
import {
  Inbox,
  Language,
  Question,
  Moon,
  User,
  Coins,
  Creator,
  Settings,
  SignOut,
} from "../../../components/Icons";
import Images from "../../../components/Images";
import Search from "../Search";
import routesConfig from "../../../config/routes";

const cn = classNames.bind(styles);
function Header() {
  const [currentUser, setCurrentUser] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const logIn = () => {
    setCurrentUser(true);
  };
  // eslint-disable-next-line no-unused-vars
  const logOut = () => {
    setCurrentUser(false);
  };
  const MENU_ITEMS = [
    {
      icon: <Language />,
      title: "English",
      children: {
        title: "Language",
        data: [
          {
            type: "Language",
            code: "en",
            title: "English",
          },
          {
            type: "Language",
            code: "vi",
            title: "Tiếng Việt",
          },
          {
            type: "Language",
            code: "fi",
            title: "Suomi",
          },
          {
            type: "Language",
            code: "no",
            title: "Norsk",
          },
          {
            type: "Language",
            code: "se",
            title: "Svenska",
          },
          {
            type: "Language",
            code: "dk",
            title: "Dansk",
          },
          {
            type: "Language",
            code: "ch",
            title: "Schweizerdeutsch",
          },
          {
            type: "Language",
            code: "nl",
            title: "Nederlands",
          },
          {
            type: "Language",
            code: "fr",
            title: "Français",
          },
          {
            type: "Language",
            code: "de",
            title: "Deutsch",
          },
          {
            type: "Language",
            code: "es",
            title: "Español",
          },
          {
            type: "Language",
            code: "it",
            title: "Italiano",
          },
          {
            type: "Language",
            code: "jp",
            title: "日本語",
          },
          {
            type: "Language",
            code: "kr",
            title: "한국어",
          },
          {
            type: "Language",
            code: "zh",
            title: "中文",
          },
          {
            type: "Language",
            code: "ru",
            title: "Русский",
          },
        ],
      },
    },
    {
      icon: <Question />,
      title: "Feedback and help",
      to: "/feedback",
    },
    {
      icon: <Moon />,
      title: "Dark mode",
    },
  ];
  const USER_ITEM = [
    {
      icon: <User />,
      title: "View Profile",
      to: "/user",
    },
    {
      icon: <Coins />,
      title: "Get Coins",
      to: "/coins",
    },
    {
      icon: <Creator />,
      title: "Creator tools",
      to: "/creator",
    },
    {
      icon: <Settings />,
      title: "Settings",
      to: "/settings",
    },
    ...MENU_ITEMS,
    {
      icon: <SignOut />,
      title: "Log out",
      separate: true,
    },
  ];

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "Language":
        console.log("Language selected:", menuItem.code);
        break;
      default:
        break;
    }
  };

  return (
    <header className={cn("wrapper")}>
      <div className={cn("inner")}>
        <Link to={routesConfig.home}>
          <img src={images.logo} />
        </Link>

        <Search />

        <div className={cn("action")}>
          {currentUser ? (
            <>
              <Button
                to="/"
                types="no-color"
                size="medium"
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                <span>Upload</span>
              </Button>
              <Tippy delay={[0, 200]} placement="bottom" content="Inbox">
                <button className={cn("user-mess")}>
                  <Inbox />
                </button>
              </Tippy>

              <Menu items={USER_ITEM} onChange={handleMenuChange}>
                <Images
                  className={cn("user-avatar")}
                  src={images.vn}
                  alt="haha"
                />
              </Menu>
            </>
          ) : (
            <>
              <Button types="text" size="">
                Upload
              </Button>
              <Button types="primary">Log in</Button>
              <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                <button className={cn("more-btn")}>
                  {<FontAwesomeIcon icon={faEllipsisVertical} />}
                </button>
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
