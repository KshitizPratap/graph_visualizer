import React, { useEffect, useState } from "react";
import Node from "../component/Node/Node";
import classes from "./GraphVisualizer.module.css";
import { shortestPath } from "../Function/ShortestPath";

function GraphVisualizer() {
  const [grid, setGrid] = useState([], []);
  const [visited, setVisited] = useState([], []);

  const [wall, setWall] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const [startCoordinate, setStartCoordinate] = useState([]);
  const [endCoordinate, setEndCoordinate] = useState([]);

  const [prevWall, setPrevWall] = useState([-1, -1]);

  // if (document.getElementsByClassName("tableNodes")[0] !== undefined)
  //   console.dir(document.getElementsByClassName("tableNodes")[0].children[0]);

  useEffect(() => {
    let temp = Array(80)
      .fill(0)
      .map((row) => new Array(50).fill(false));
    setVisited(temp);

    let arr = Array(80)
      .fill(0)
      .map((row) => new Array(50).fill(0));

    for (let i = 0; i < 80; i++) {
      for (let j = 0; j < 50; j++) arr[i][j] = [i, j];
    }
    setGrid(arr);
  }, []);

  const startHandler = () => {
    setStart(true);
    setEnd(false);
    setWall(false);
  };

  const endHandler = () => {
    setStart(false);
    setEnd(true);
    setWall(false);
  };

  const NodeClickHandler = (row, col) => {
    if (start) {
      setStartCoordinate([row, col]);
    }

    if (end) {
      setEndCoordinate([row, col]);
    }
  };

  const mouseDownHandler = () => {
    console.log("[Mouse Down]");
    setWall(true);
  };

  const mouseMoveHandler = (row, col) => {
    if (wall && (row !== prevWall[0] || col != prevWall[1])) {
      setPrevWall([row, col]);

      console.log(row, col);

      setVisited((temp) => {
        temp[row][col] = true;
        return temp;
      });
    }
  };

  const mouseUpHandler = () => {
    setWall(false);
  };

  const pathMaker = (animated) => {
    const n = animated.length;

    let path = [];
    path.push([animated[n - 1][0], animated[n - 1][1]]);

    let i = animated[n - 1][2],
      j = animated[n - 1][3];
    path.push([i, j]);

    for (let k = n - 1; k >= 0; k--) {
      if (animated[k][0] === i && animated[k][1] === j) {
        i = animated[k][2];
        j = animated[k][3];

        path.push([i, j]);
      }
    }

    path.reverse();
    path.push(endCoordinate);

    let arr = document.getElementsByClassName("tableNodes");

    for (let i = 0; i < path.length; i++) {
      if (path[i][0] === undefined) continue;

      setTimeout(() => {
        arr[path[i][0]].children[path[i][1]].style.backgroundColor = "yellow";
      }, 50 * i);
    }
  };

  const shortestPathMain = () => {
    let animated = shortestPath(grid, visited, startCoordinate, endCoordinate);

    let arr = document.getElementsByClassName("tableNodes");
    for (let i = 0; i < animated.length; i++) {
      setTimeout(() => {
        if (i !== animated.length - 1)
          arr[animated[i][0]].children[animated[i][1]].style = {
            backgroundColor: "yellow",
            animationName: "animation",
            animationDuration: "0.4s",
          };
        else
        {
          // arr[animated[i][0]].children[animated[i][1]].className = classes.animatedNodes
        }  

        if (i > 0) {
          arr[animated[i - 1][0]].children[
            animated[i - 1][1]
          ].className = classes.animatedNodes

          console.dir(arr[animated[i][0]].children[animated[i][1]]);

        }
      }, 20 * i);
    }

    if (
      animated[animated.length - 1][0] === endCoordinate[0] &&
      animated[animated.length - 1][1] === endCoordinate[1]
    ) {
      setTimeout(() => {
        pathMaker(animated);
      }, 20 * animated.length);
    } else {
      setTimeout(() => {
        alert("Path not found");
      }, 20 * animated.length);
    }
  };

  const table =
    grid.length !== 0
      ? grid.map((arr) => {
          return (
            <div className="tableNodes">
              {arr.map((node) => {
                return (
                  <Node
                    key={node[0].toString() + "," + node[1].toString()}
                    row={node[0]}
                    col={node[1]}
                    clickHandler={() => NodeClickHandler(node[0], node[1])}
                    start={start}
                    end={end}
                    startCoordinate={startCoordinate}
                    endCoordinate={endCoordinate}
                    visited={visited}
                    mouseMoveHandler={() => mouseMoveHandler(node[0], node[1])}
                    mouseDownHandler={mouseDownHandler}
                    mouseUpHandler={mouseUpHandler}
                  />
                );
              })}
            </div>
          );
        })
      : null;

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Nav}>Navigation Bar</div>
      <div className={classes.Buttons}>
        <button onClick={startHandler}>Start</button>
        <button onClick={endHandler}>End</button>
        <button onClick={shortestPathMain}>Solve</button>
      </div>

      <div className={classes.Table} onMouseLeave={() => setWall(false)}>
        {table}
      </div>
    </div>
  );
}

export default GraphVisualizer;
