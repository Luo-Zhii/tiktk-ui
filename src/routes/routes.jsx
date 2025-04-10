import { HeaderOnly } from "../Layouts";
import routesConfig from "../config/routes";

import Home from "../Pages/Home";
import Following from "../Pages/Following";
import Profile from "../Pages/Profile";
import Upload from "../Pages/Upload";
import Search from "../Pages/Search";
import Explore from "../Pages/Explore";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.following, component: Following },
  { path: routesConfig.profile, component: Profile },
  { path: routesConfig.explore, component: Explore },
  { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
  { path: routesConfig.search, component: Search, layout: null },
  { path: routesConfig.login, component: Login, layout: null },
  { path: routesConfig.register, component: Register, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
