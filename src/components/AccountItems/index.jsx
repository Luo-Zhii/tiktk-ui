/* eslint-disable react/prop-types */
import Images from "../Images";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const cn = classNames.bind(styles);

function AccountItems({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cn("wrapper")}>
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

export default AccountItems;
