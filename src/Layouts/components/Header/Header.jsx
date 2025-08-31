// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callLogout } from "../../../config/api";
import { setLogoutAction, setUserLoginInfo } from "../../../redux/slice/accountSlide";
import { jwtDecode } from "jwt-decode";

const cn = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Lấy trạng thái từ Redux
  const reduxIsAuthenticated = useAppSelector((state) => state.account.isAuthenticated);
  const user = useAppSelector((state) => state.account.user);

  // Kiểm tra localStorage; nếu có token, coi như đã đăng nhập
  const localToken = localStorage.getItem("access_token");
  const isAuthenticated = reduxIsAuthenticated || !!localToken;

  // Nếu có token trong localStorage, decode token và cập nhật Redux state (nếu chưa có)
  useEffect(() => {
    if (localToken && !reduxIsAuthenticated) {
      try {
        const decoded = jwtDecode(localToken);
        const decodedUser = {
          _id: decoded._id,
          email: decoded.email,
          name: decoded.name || "Unknown User",
        };
        console.log("Decoded user:", decodedUser);
        dispatch(setUserLoginInfo(decodedUser));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [localToken, reduxIsAuthenticated, dispatch]);


  const MENU_ITEMS = [
    {
      icon: <Language />,
      title: "English",
      children: {
        title: "Language",
        data: [
          { type: "Language", code: "en", title: "English" },
          { type: "Language", code: "vi", title: "Tiếng Việt" },
          { type: "Language", code: "fi", title: "Suomi" },
          { type: "Language", code: "no", title: "Norsk" },
          { type: "Language", code: "se", title: "Svenska" },
          { type: "Language", code: "dk", title: "Dansk" },
          { type: "Language", code: "ch", title: "Schweizerdeutsch" },
          { type: "Language", code: "nl", title: "Nederlands" },
          { type: "Language", code: "fr", title: "Français" },
          { type: "Language", code: "de", title: "Deutsch" },
          { type: "Language", code: "es", title: "Español" },
          { type: "Language", code: "it", title: "Italiano" },
          { type: "Language", code: "jp", title: "日本語" },
          { type: "Language", code: "kr", title: "한국어" },
          { type: "Language", code: "zh", title: "中文" },
          { type: "Language", code: "ru", title: "Русский" },
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
    { icon: <User />, title: "View Profile", to: "/user"},
    { icon: <Coins />, title: "Get Coins", to: "/coins" },
    { icon: <Creator />, title: "Creator tools", to: "/creator" },
    { icon: <Settings />, title: "Settings", to: "/settings" },
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

  console.log("auth", isAuthenticated);
  console.log("user", user);

  return (
    <header className={cn("wrapper")} >
      <div className={cn("inner")} data-area="header">
        
        <Link to={routesConfig.home}>
          <img src={images.logo} alt="Logo" data-area="logo" />
        </Link>   

        <Search />

        <div className={cn("action")}>
          {isAuthenticated ? (
            <>
              <Button
                to="/upload"
                types="no-color"
                size="medium"
                leftIcon={<FontAwesomeIcon icon={faPlus} 
                data-area="upload"
                />}
              >
                <span data-area="upload">Upload</span>
              </Button>
              <Tippy delay={[0, 200]} placement="bottom" content="Inbox">
                <button className={cn("user-mess")} data-area="inbox">
                  <Inbox /> 
                </button>
              </Tippy>

      <span>Welcome {user?.email}</span>
              <Menu items={USER_ITEM} onChange={handleMenuChange}>
                <Images
                  className={cn("user-avatar")}
                  src={images.vn}
                  alt="User Avatar"
                  data-area="user-avatar"
                />
              </Menu>
            </>
          ) : (
            <>
              <Button types="text" size="">
                Upload
              </Button>
              <Link to={routesConfig.login}>
                <Button types="primary">Log in</Button>
              </Link>
              <Menu items={MENU_ITEMS} onChange={handleMenuChange} />
              <button className={cn("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
