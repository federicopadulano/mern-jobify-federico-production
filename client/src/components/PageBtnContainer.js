import React from "react";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const prevPage = () => {
    let prevPage = page - 1;
    if (prevPage < 1) {
      prevPage = numOfPages;
    }
    changePage(prevPage);
  };
  const nextPage = () => {
    let nextPage = page + 1;
    if (nextPage > numOfPages) {
      nextPage = 1;
    }
    changePage(nextPage);
  };
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map((pageBtn) => {
          return (
            <button
              className={page === pageBtn ? "active pageBtn" : "pageBtn"}
              type="button"
              key={pageBtn}
              onClick={() => changePage(pageBtn)}
            >
              {pageBtn}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
