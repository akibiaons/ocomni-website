import React, { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 0.75rem; /* mr-3 */
  transition: color 200ms ease-in-out;

  &:hover {
    color: #6b7280; /* text-gray-500 */
  }
`;

const PaginationList = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* gap-1 */
`;

const PaginationItem = styled.li`
  background-color: ${(props) =>
    props.isActive ? "#8b5cf6" : "transparent"}; /* bg-purple-600 or bg-none */
  color: ${(props) => (props.isActive ? "white" : "black")};
  padding: 0.5rem; /* px-2 */
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;

  &:hover {
    background-color: #374151; /* hover:bg-slate-700 */
    color: white; /* hover:text-white */
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem; /* Adjust icon size as needed */
`;

const Pagination = ({ totalPage }) => {
  const { search } = useLocation();
  const [pageNumbers, setPageNumbers] = useState([]);
  const page = Number(new URLSearchParams(search).get("page")) || 1;

  useEffect(() => {
    if (totalPage <= 1) return;
    if (totalPage < 5) {
      const newArr = [...Array(totalPage)].map((_, i) => i + 1);
      return setPageNumbers(newArr);
    }
    //totalPage >= 5
    let newArr = [];

    for (let index = 1; index <= 5; index++) {
      if (page <= 2) {
        newArr.push(index);
      }
      if (page > 2 && page < totalPage - 2) {
        newArr.push(page + index - 3);
      }
      if (page >= totalPage - 2) {
        newArr.push(index - 5 + totalPage);
      }
    }
    console.log(newArr);
  }, [totalPage, page]);

  console.log(page);
  return (
    <PaginationWrapper>
      <PaginationLink to={`?page=${page - 1 <= 1 ? 1 : page - 1}`}>
        <IconWrapper>
          <AiFillCaretLeft />
        </IconWrapper>
        Prev
      </PaginationLink>

      <PaginationList>
        {pageNumbers?.map((num) => (
          <PaginationLink>
            <Link to={`?page=${num}`} key={num}>
              <li>{num}</li>
            </Link>
          </PaginationLink>
        ))}
      </PaginationList>

      <PaginationLink
        to={`?page=${page + 1 >= totalPage ? totalPage : page + 1}`}
      >
        <p className="cursor-pointer hover:text-gray-500 transition duration-200 ease-in-out font-primarybody">
          Next
        </p>
        <AiFillCaretRight />
      </PaginationLink>
    </PaginationWrapper>
  );
};

export default Pagination;
