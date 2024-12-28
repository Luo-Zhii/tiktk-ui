import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const cn = classNames.bind(styles);

function AccountItems() {
  return (
    <div className={cn("wrapper")}>
      <img
        loading="lazy"
        className={cn("logo")}
        src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/118441977edc639baf728fd892d500b3~c5_300x300.webp?lk3s=a5d48078&nonce=66266&refresh_token=931affae56a47bd5e9735703a202710d&x-expires=1735556400&x-signature=goXWvT585nlEByQEbWFSlIoKL%2Fg%3D&shp=a5d48078&shcp=c1333099"
        alt="haha"
      />
      <div className={cn("info")}>
        <h4 className={cn("name")}>
          <span>Ut adipisicing non sint et.</span>
          <FontAwesomeIcon className={cn("check")} icon={faCheckCircle} />
        </h4>
        <span className={cn("username")}>
          Nostrud cupidatat proident commodo
        </span>
      </div>
    </div>
  );
}

export default AccountItems;
