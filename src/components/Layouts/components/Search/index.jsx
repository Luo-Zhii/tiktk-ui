import { useState, useEffect, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import * as searchServices from "../../../../services/searchServices";
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

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounced);

      setSearchResult(result);
      setLoading(false);
    };

    fetchApi();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleHideSearchResults = () => {
    setShowResult(false);
  };

  const handleSearchInput = (e) => {
    let searchValue = e.target.value;
    if (searchValue[0] === " ") {
      searchValue = searchValue.trim();
    }
    setSearchValue(searchValue);
  };

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves
    // this by creating a new parentNode context.
    <div>
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
            onChange={handleSearchInput}
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
          <button
            className={cn("search-btn")}
            onClick={(e) => e.preventDefault()}
          >
            {<FontAwesomeIcon icon={faMagnifyingGlass} />}
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
