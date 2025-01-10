import { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu, { MenuItem } from "./Menu";
import routes from "../../../config/routes";

import * as useServices from "../../../services/useServices";
import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  LiveIcon,
  LiveActiveIcon,
} from "../../../components/Icons";
import SuggestedAccounts from "../../../components/SuggestedAccounts";

const cn = classNames.bind(styles);
const INIT_PAGE = 1;
const PER_PAGE = 5;
function Sidebar() {
  const [listAccountSuggest, setListAccountSuggest] = useState([]);
  const [numPage, setNumPage] = useState(INIT_PAGE);

  const handleSeeMoreAccounts = useCallback(() => {
    setNumPage((prev) => prev + 1);
  }, [numPage]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await useServices.suggested(numPage, PER_PAGE);
      setListAccountSuggest((prev) => [...prev, ...data]);
    };
    fetchApi();
  }, [numPage]);
  return (
    <aside className={cn("wrapper")}>
      <Menu>
        <MenuItem
          title={"For you"}
          to={routes.home}
          icon={<HomeIcon />}
          activeIcon={<HomeActiveIcon />}
        />
        <MenuItem
          title={"Following"}
          to={routes.following}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
        />
        <MenuItem
          title={"Explore"}
          to={routes.explore}
          icon={<LiveIcon />}
          activeIcon={<LiveActiveIcon />}
        />
      </Menu>
      <SuggestedAccounts
        label="Suggested accounts"
        data={listAccountSuggest}
        onClick={handleSeeMoreAccounts}
      />
    </aside>
  );
}

export default Sidebar;
