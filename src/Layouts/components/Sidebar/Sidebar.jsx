import { useState, useEffect } from "react";
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

function Sidebar() {
  const [suggested, setSuggested] = useState([]);
  // const [isSeeAll, setIsSeeAll] = useState(false);
  // const [page, setPage] = useState([]);
  useEffect(() => {
    useServices
      .suggested({ page: INIT_PAGE, perPage: 5 })
      .then((data) => {
        setSuggested(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleClickPrintMore = () => {
  //   setPage((prev) => prev + 1);
  //   useServices
  //     .suggested({ page: page, perPage: 5 })
  //     .then((data) => {
  //       setSuggested([...suggested, ...data]);
  //     })
  //     .catch((error) => console.log(error));
  // };

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
        data={suggested}
        // onClick={handleClickPrintMore}
      />
    </aside>
  );
}

export default Sidebar;
