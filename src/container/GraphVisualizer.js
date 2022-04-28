import React, { useEffect, useState } from "react";
import Node from "../component/Node/Node";
import classes from "./GraphVisualizer.module.css";
import { shortestPath } from "../Function/ShortestPath";
import { DFSPathfinder } from "../Function/DFSPathfinder";
import { RecursiveMaze, SimpleMaze, StaircaseMaze } from "../Function/MazeFunction";

function GraphVisualizer() {
  const [grid, setGrid] = useState([], []);
  const [visited, setVisited] = useState([], []);

  const [wall, setWall] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const [startCoordinate, setStartCoordinate] = useState([]);
  const [endCoordinate, setEndCoordinate] = useState([]);

  const [prevWall, setPrevWall] = useState([-1, -1]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let height = window.innerHeight;
    let width = window.innerWidth;

    let row = parseInt(width/27);
    let col = parseInt((0.8*height)/29)

    let temp = Array(row)
      .fill(0)
      .map((row) => new Array(col).fill(false));
    setVisited(temp);

    let arr = Array(row)
      .fill(0)
      .map(() => new Array(col).fill(0));

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) arr[i][j] = [i, j];
    }
    setGrid(arr);
  }, [reload]);

  const reportWindowSize = () => {
    setReload((prev) => !prev);
  };

  window.onresize = reportWindowSize;

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

  const clearHandler = () => {
    window.location.reload();
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
    setWall(true);
  };

  const mouseMoveHandler = (row, col) => {
    if (wall && (row !== prevWall[0] || col != prevWall[1])) {
      setPrevWall([row, col]);

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

  const BFSPathMain = () => {
    let animated = shortestPath(grid, visited, startCoordinate, endCoordinate);

    let arr = document.getElementsByClassName("tableNodes");
    for (let i = 0; i < animated.length; i++) {
      setTimeout(() => {
         {
          arr[animated[i - 1][0]].children[animated[i - 1][1]].className =
            classes.animatedNodes;
        }
      }, 20 * i);
    }

    if (
      animated[animated.length - 1][0] === endCoordinate[0] &&
      animated[animated.length - 1][1] === endCoordinate[1]
    ) {
      setTimeout(() => {
        pathMaker(animated);
      }, 20 * animated.length + 1500);
    } 
    else {
      setTimeout(() => {
        alert("Path not found");
      }, 21 * animated.length);
    }
  };

  const DFSPathMain = () => {
    let animated = DFSPathfinder(grid, visited, startCoordinate, endCoordinate);
    console.log("[Animated DFS]", animated);

    let arr = document.getElementsByClassName("tableNodes");
    for (let i = 0; i < animated.length; i++) {
      setTimeout(() => {
        if (i !== animated.length - 1)
          arr[animated[i][0]].children[animated[i][1]].style = {
            backgroundColor: "yellow",
            animationName: "animation",
            animationDuration: "0.4s",
          };

        if (i > 0) {
          arr[animated[i - 1][0]].children[animated[i - 1][1]].className =
            classes.animatedNodes;
        }
      }, 25 * i);
    }

    if (
      animated[animated.length - 1][0] === endCoordinate[0] &&
      animated[animated.length - 1][1] === endCoordinate[1]
    ) {
      setTimeout(() => {
        pathMaker(animated);
      }, 21 * animated.length);
    } else {
      setTimeout(() => {
        alert("Path not found");
      }, 26 * animated.length);
    }
  };

  const SimpleMazeHandler = () => {
    let animated = SimpleMaze(visited);
    setVisited(animated)

    let arr = document.getElementsByClassName("tableNodes");

    for(let i=0; i<animated.length; i++)
    {
      for(let j=0; j<animated[0].length; j++)
         arr[i].children[j].classList.remove(classes.animatedWalls)
    }
        
    for(let i=0; i<animated.length; i++)
    {
      for(let j=0; j<animated[0].length; j++)
      {
        if(animated[i][j]){
          setTimeout(() => {
            arr[i].children[j].classList.add(classes.animatedWalls)
          }, 10*i + 10*j);
        }
      }
    }
  };

  const StaircaseHandler = () => {
    let animated = StaircaseMaze(visited);
    setVisited(animated)
    let arr = document.getElementsByClassName("tableNodes");
    
    for(let i=0; i<animated.length; i++)
    {
      for(let j=0; j<animated[0].length; j++)
         arr[i].children[j].classList.remove(classes.animatedWalls)
    }

    for(let i=0; i<animated.length; i++)
    {
      for(let j=0; j<animated[0].length; j++)
      {
        if(animated[i][j]){
          setTimeout(() => {
            arr[i].children[j].classList.add(classes.animatedWalls)
          }, 10*i + 10*j);
        }
      }
    }
  }

  const RecursiveHandler = () => {
    let animated = RecursiveMaze(visited)

    setVisited(animated)
    let arr = document.getElementsByClassName("tableNodes");
    
    for(let i=0; i<animated.length; i++)
    {
      for(let j=0; j<animated[0].length; j++)
         arr[i].children[j].classList.remove(classes.animatedWalls)
    }

    for(let i=0; i<animated.length; i++)
    {
      for(let j=0; j<animated[0].length; j++)
      {
        if(animated[i][j]){
          setTimeout(() => {
            arr[i].children[j].classList.add(classes.animatedWalls)
          }, 10*i + 10*j);
        }
      }
    }
  }

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
      <div className={classes.ButtonWrapper}>
        <button onClick={startHandler} className={classes.Button}>
          Start
        </button>
        <button onClick={endHandler} className={classes.Button}>
          End
        </button>
        <button onClick={clearHandler} className={classes.Button}>
          Clear Board
        </button>

        <button onClick={BFSPathMain} className={classes.Button}>
          BFS
        </button>

        <button onClick={DFSPathMain} className={classes.Button}>
          DFS
        </button>

        <button onClick={SimpleMazeHandler} className={classes.Button}>
          Simple Maze
        </button>

        <button onClick={StaircaseHandler} className={classes.Button}>
          Staircase Maze
        </button>

        <button onClick={RecursiveHandler} className={classes.Button}>
          New Maze
        </button>
      </div>

      <div className={classes.Table} onMouseLeave={() => setWall(false)}>
        {table}
      </div>
    </div>
  );
}

export default GraphVisualizer;
