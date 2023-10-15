import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CrawlingPage.css";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { PiWarningCircleLight } from "react-icons/pi";

function CrawlingPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [entities, setEntities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchingResult, setSearchingResult] = useState(true);

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("searchResult") != null) {
      try {
        setEntities(JSON.parse(localStorage.getItem("searchResult")));
        setIsSearching(false);
        console.log(entities);
      } catch (error) {
        console.error("Error fetching additional data: ", error);
      } finally {
        setIsSearching(false);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true); // 검색 중임을 표시
    setSearchingResult(true);
    // localStorage.removeItem("searchResult");
    try {
      setEntities("");
      const response = await axios.post("/api/searchSubmit", searchKeyword, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.length > 0) {
        // localStorage.removeItem("searchResult");

        const formattedEntities = response.data.map((entity) => ({
          ...entity,
          price: formatNumber(entity.price), // 가격 포맷팅
        }));
        setEntities(formattedEntities);

        console.log(response.data);
        setSearchingResult(true);
        console.log("entities.lenght!=0");
      } else {
        // (entities.length===0)
        setSearchingResult(false);
        console.log("entities.length==0");
      }
    } catch (error) {
      console.error("Error fetching additional data: ", error);
      // setSearchResult(false);
    } finally {
      setIsSearching(false); // 검색이 완료되면 검색 중 상태를 해제
    }
  };

  return (
    <div className="recommendStart">
      <div className="recommendStartMain">
        <form className="crawlingForm" onSubmit={onSubmit}>
          <input
            className="crawlingInput"
            placeholder="찾으시는 식물을 입력해주세요!"
            value={searchKeyword}
            onChange={handleInputChange}
          />

          <label className="input-label">
            <PiMagnifyingGlassBold />
            <input
              className="crawlingButton"
              type="submit"
              value={isSearching ? "검색 중..." : "검색"}
              disabled={isSearching}
            />
          </label>
        </form>
        <div className="failMessage">
          {searchingResult == false ? (
            <div>
              <PiWarningCircleLight size={50} color="184914" />
              <p>검색 결과가 없습니다</p>
            </div>
          ) : null}
        </div>
        {/*{entities.length === 0 && !isSearching && <p>검색 결과가 없습니다</p>}*/}

        {/* 검색 결과를 표시 */}
        {entities.length > 0 && !isSearching && (
          <div className="entity-list">
            {entities.map((entity, index) => (
              <div className="entity" key={index}>
                <a href={entity.storeLink} target="blank">
                  <img
                    className="entity-image"
                    src={entity.imgUrl}
                    alt={entity.storeName}
                  />
                </a>
                <div className="entity-content">
                  <div className="entityStore">{entity.storeTitle}</div>
                  {/* <div>가격</div> */}
                  <div>{entity.price}원</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CrawlingPage;
