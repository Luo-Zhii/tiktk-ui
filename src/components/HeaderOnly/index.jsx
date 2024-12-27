import Header from "./Header";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
