import React from "react";
import { ReactComponent as Loading } from "../images/loading.svg";
import styled from "styled-components";

export default function Loader() {
  return (
    <LoaderStyle>
      <Loading width={60} height={60} />
    </LoaderStyle>
  );
}

const LoaderStyle = styled.div`
  top: 0;
  background-color:white;
  z-index:5;
  position: fixed;
  float: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;