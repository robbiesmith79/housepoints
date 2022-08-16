import React, { useState } from "react";
import { usePapaParse } from "react-papaparse";

const HOUSE_POINTS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS86f6k_9eQABY2sUgI5lPAXW25EPjEB4P3SF8JqV_O7kZ9aMz81wRZdM71ac-0be5evaOqfMk3wt-8/pub?gid=746757530&single=true&output=csv";

export default function ReadRemoteFile(props) {
  const { readRemoteFile } = usePapaParse();

  const handleReadRemoteFile = () => {
    readRemoteFile(HOUSE_POINTS, {
      complete: (results) => {
        props.results = results;
        console.log("---------------------------");
        console.log("Results:", results);
        console.log("---------------------------");
      },
    });
  };

  return <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>;
}
