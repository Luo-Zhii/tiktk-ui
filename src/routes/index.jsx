import { HeaderOnly } from "../components/Layouts";

import Home from "../Pages/Home";
import Following from "../Pages/Following";
import Profile from "../Pages/Profile";
import Upload from "../Pages/Upload";
import Search from "../Pages/Search";
const publicRoutes = [
  { path: "/tiktk-ui", component: Home },
  { path: "/tiktk-ui/following", component: Following },
  { path: "/tiktk-ui/profile", component: Profile },
  { path: "/tiktk-ui/upload", component: Upload, layout: HeaderOnly },
  { path: "/tiktk-ui/search", component: Search, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
