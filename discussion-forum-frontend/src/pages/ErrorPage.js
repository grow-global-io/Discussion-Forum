import React from 'react'
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
const override = {
  display: "block",
  marginTop: "20%",
  marginLeft: "50%"
};
const ErrorPage = () => {
  return (
    <>
      <BeatLoader
        color="#722282"
        size={20}
        cssOverride={override}
      />
    </>
  )
}

export default ErrorPage
