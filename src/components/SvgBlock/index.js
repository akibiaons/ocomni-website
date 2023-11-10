import React from "react";
import styled from "styled-components";

const Rb = styled.div`
  display: flex-col;
  justify-content: center;
  align-items: center;
  width: 5%;
  position: relative;
  /* z-index: 10; */
  svg {
    width: 100%;
    height: auto;
  }
  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;

const SvgBlock = ({ svg }) => {
  const SvgIcon = require(`../../assets/${svg}`).default;
  //console.log(SvgIcon);
  return <Rb id="svgBlock"></Rb>;
};

export default SvgBlock;
