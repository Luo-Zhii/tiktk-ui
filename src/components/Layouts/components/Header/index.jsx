import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../../assets/images";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const cn = classNames.bind(styles);

function Header() {
  return (
    <header className={cn("wrapper")}>
      <div className={cn("inner")}>
        <div className={cn("logo")}>
          <img src={images.logo} />
        </div>
        <div className={cn("search")}>
          <input placeholder="feel the rush..." spellCheck={false} />
          <button className={cn("clear_btn")}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <FontAwesomeIcon className={cn("loading")} icon={faSpinner} />
          <button className={cn("search_btn")}>
            {<FontAwesomeIcon icon={faMagnifyingGlass} />}
          </button>
        </div>
        <div className={cn("action")}>
          <button>Log in</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
