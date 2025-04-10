import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

import { DefaultLayout } from "./Layouts";
import { Fragment } from "react";
import MouseTracker from "./components/MouseTracker";

function App() {
  return (
    <Router>
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
        </Routes>
        {/* <MouseTracker/> */}

      </div>
    </Router>
  );
}

export default App;
 