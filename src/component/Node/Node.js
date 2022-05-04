import React from "react";

import classes from "./Node.module.css";

function Node(props) {
  let nodeStyle = null;

  if (
    props.startCoordinate[0] === props.row &&
    props.startCoordinate[1] === props.col
  ) {
    nodeStyle = classes.Start;
  } else if (
    props.endCoordinate[0] === props.row &&
    props.endCoordinate[1] === props.col
  ) {
    nodeStyle = classes.End;
  }

  if (props.visited[props.row][props.col]) {
    nodeStyle = classes.Wall;
  }

  let start =
    props.startCoordinate[0] === props.row &&
    props.startCoordinate[1] === props.col ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="black"
        className="bi bi-play-fill"
        viewBox="0 0 16 16"
      >
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
      </svg>
    ) : null;

  let end =
    props.endCoordinate[0] === props.row &&
    props.endCoordinate[1] === props.col ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="black"
        className="bi bi-award-fill"
        viewBox="0 0 16 16"
      >
        <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
      </svg>
    ) : null;

  return (
    <div
      className={[classes.Node, nodeStyle].join(" ")}
      onClick={props.clickHandler}
      onMouseDown={props.mouseDownHandler}
      onMouseEnter={props.mouseMoveHandler}
      onMouseUp={props.mouseUpHandler}
    >
      {start}
      {end}
    </div>
  );
}

export default Node;
