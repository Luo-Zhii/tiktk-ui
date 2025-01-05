import { useState, useEffect, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper as ProperWrapper } from "../../../Popper";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import AccountItems from "../../../AccountItems";
import useDebounce from "../../../../hooks/useDebounce";
const cn = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 600);

  // Handle search load events
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        debounced
      )}&type=less`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data), setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleHideSearchResults = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      interactive={true}
      render={(attrs) => (
        <div className={cn("search-result")} tabIndex="-1" {...attrs}>
          <ProperWrapper>
            <h4 className={cn("search-title")}>Account</h4>
            {searchResult.map((result) => (
              <AccountItems key={result.id} data={result} />
            ))}
          </ProperWrapper>
        </div>
      )}
      onClickOutside={handleHideSearchResults}
    >
      <div className={cn("search")}>
        <input
          value={searchValue}
          placeholder="feel the rush..."
          spellCheck={false}
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
        {!!searchValue && !loading && (
          <button className={cn("clear-btn")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {loading && (
          <FontAwesomeIcon className={cn("loading")} icon={faSpinner} />
        )}
        <button className={cn("search-btn")}>
          {<FontAwesomeIcon icon={faMagnifyingGlass} />}
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
