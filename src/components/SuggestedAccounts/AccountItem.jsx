/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import styles from "./SuggestedAccounts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountPreview from "../AccountItems/AccountPreview";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const cn = classNames.bind(styles);

function AccountItem({ data }) {
  const renderPreview = (props) => {
    return (
      <div className={cn("tippy-wrapper")} tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview data={data} />
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div>
      <Link
        to={`/tiktk-ui/profile/@${data.nickname}`}
        className={cn("wrapper")}
      >
        <Tippy
          interactive
          delay={[900, 0]}
          offset={[20, 0]}
          placement="bottom"
          render={renderPreview}
        >
          <div className={cn("account-item")}>
            <img src={data.avatar} alt="" className={cn("avatar")} />
            <div className={cn("item-info")}>
              <p className={cn("nickname")}>
                <strong>{data.nickname}</strong>
                {data.tick && (
                  <FontAwesomeIcon
                    className={cn("check")}
                    icon={faCheckCircle}
                  />
                )}
              </p>
              <p className={cn("name")}>
                {data.first_name} {data.last_name}
              </p>
            </div>
          </div>
        </Tippy>
      </Link>
    </div>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AccountItem;
