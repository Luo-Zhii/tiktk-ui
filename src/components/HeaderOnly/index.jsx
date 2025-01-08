import Header from "./Header";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";
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

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};
export default HeaderOnly;
