import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import NotFound from "./components/Share/not.found";
import { DefaultLayout } from "./Layouts";
import { Fragment, useEffect } from "react";
import MouseTracker from "./components/MouseTracker";
import LayoutApp from './components/Share/layout.app';
import { fetchAccount } from './redux/slice/accountSlide';
import { useAppDispatch } from "./redux/hooks";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount())
  }, [])



  return (

    <Router>
      <LayoutApp>
      <div className="myApp">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          <Route
            path="*"
            element={
              <DefaultLayout>
                <NotFound />
              </DefaultLayout>
            }
          />
        </Routes>
        <MouseTracker/>
      </div>
      </LayoutApp>
    </Router>
  );
}

export default App;
