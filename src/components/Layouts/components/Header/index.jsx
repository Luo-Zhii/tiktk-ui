import { useState } from "react";
import images from "../../../../assets/images";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
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
} from "../../../Icons";
import Images from "../../../Images";
import Search from "../Search";

const cn = classNames.bind(styles);
function Header() {
  const [currentUser, setCurrentUser] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const logIn = () => {
    setCurrentUser;
  };
  const MENU_ITEMS = [
    {
      icon: <Language />,
      title: "English",
      children: {
        title: "language",
        data: [
          {
            type: "language",
            code: "en",
            title: "English",
          },
          {
            type: "language",
            code: "vi",
            title: "Tiếng Việt",
          },
          {
            type: "language",
            code: "fi",
            title: "Suomi",
          },
          {
            type: "language",
            code: "no",
            title: "Norsk",
          },
          {
            type: "language",
            code: "se",
            title: "Svenska",
          },
          {
            type: "language",
            code: "dk",
            title: "Dansk",
          },
          {
            type: "language",
            code: "ch",
            title: "Schweizerdeutsch",
          },
          {
            type: "language",
            code: "nl",
            title: "Nederlands",
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
      case "language":
        console.log("Language selected:", menuItem.code);
        break;
      default:
        break;
    }
  };

  return (
    <header className={cn("wrapper")}>
      <div className={cn("inner")}>
        <div className={cn("logo")}>
          <img src={images.logo} />
        </div>

        <Search />

        <div className={cn("action")}>
          {currentUser ? (
            <>
              <Button
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
                  src="data:image/png;base64,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"
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
