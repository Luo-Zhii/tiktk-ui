/* eslint-disable react/prop-types */
import Images from "../Images";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

const cn = classNames.bind(styles);

function AccountItems({ data }) {
  return (
    <Link to={`/tiktk-ui/profile/@${data.nickname}`} className={cn("wrapper")}>
      <Images className={cn("avatar")} src={data.avatar} alt={data.full_name} />
      <div className={cn("info")}>
        <h4 className={cn("name")}>
          <span>{data.full_name}</span>
          {data.tick && (
            <FontAwesomeIcon className={cn("check")} icon={faCheckCircle} />
          )}
        </h4>
        <span className={cn("username")}>{data.nickname}</span>
      </div>
    </Link>
  );
}

AccountItems.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItems;
