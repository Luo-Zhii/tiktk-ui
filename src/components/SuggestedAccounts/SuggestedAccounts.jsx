import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SuggestedAccounts.module.scss";
import AccountItem from "./AccountItem";
const cn = classNames.bind(styles);
function SuggestedAccounts({ label, data = [] }) {
  return (
    <div className={cn("wrapper")}>
      <p className={cn("label")}>{label}</p>
      {data.map((account) => (
        <AccountItem key={account.id} data={account} />
      ))}
      <p className={cn("more-btn")}>See all</p>
    </div>
  );
}
SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.node.isRequired,
  onClick: PropTypes.node,
};
export default SuggestedAccounts;
