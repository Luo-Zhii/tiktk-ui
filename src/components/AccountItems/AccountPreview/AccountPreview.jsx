/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import styles from "./AccountPreview.module.scss";

const cn = classNames.bind(styles);
function AccountPreview({ data }) {
  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <img className={cn("avatar")} src={data.avatar} alt={data.nickname} />
        <Button types="primary" className={cn("follow-btn")}>
          Follow
        </Button>
      </div>
      <div className={cn("body")}>
        <p className={cn("nickname")}>
          <strong>{data.nickname}</strong>
          {data.tick && (
            <FontAwesomeIcon className={cn("check")} icon={faCheckCircle} />
          )}
        </p>
        <p className={cn("name")}>
          {data.first_name} {data.last_name}
        </p>
        <p className={cn("analytics")}>
          <strong className={cn("value")}>{data.followers_count}</strong>
          <span className={cn("label")}>Followers</span>
          <strong className={cn("value")}>{data.likes_count} </strong>
          <span className={cn("label")}>Likes</span>
        </p>
      </div>
    </div>
  );
}
export default AccountPreview;
