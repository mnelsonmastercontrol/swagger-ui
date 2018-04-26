import React, { PropTypes } from "react"

export default function (system) {
  return {
    statePlugins: {
      spec: {
        selectors: {
          allowTryItOutFor,
        }
      }
    }
  }
}


function allowTryItOutFor(state) {
  return false;
}