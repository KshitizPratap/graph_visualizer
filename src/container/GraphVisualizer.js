import React, { useEffect, useState } from "react";
import Node from "../component/Node/Node";
import classes from "./GraphVisualizer.module.css";
import { BFSPathfinder } from "../Function/ShortestPath";
import { DFSPathfinder } from "../Function/DFSPathfinder";
import {
  VerticalRecursiveMaze,
  SimpleMaze,
  StaircaseMaze,
  HorizontalRecursiveMaze,
  RandomMaze,
} from "../Function/MazeFunction";

import Logo from "../assets/logo.png";

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

  const [algo, setAlgo] = useState("select");
  const [speed, setSpeed] = useState(20);

  let row, col;

  useEffect(() => {
    let height = window.innerHeight;
    let width = window.innerWidth;

    row = parseInt(width / 27);
    col = parseInt((0.9 * height) / 29);

    // row = 20;
    // col = 20;

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

  const clearPathHandler = () => {
    let arr = document.getElementsByClassName("tableNodes");
    let mazeArr = JSON.parse(sessionStorage.getItem("mazeArr"));

    let row = mazeArr.length,
      col = mazeArr[0].length;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (!mazeArr[i][j]) {
          arr[i].children[j].classList.remove(classes.animatedNodes);
          arr[i].children[j].classList.remove(classes.path);
        }
      }
    }
    setVisited(mazeArr);
  };

  const clearHandler = () => {
    let arr = document.getElementsByClassName("tableNodes");
    let row = visited.length,
      col = visited[0].length;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        arr[i].children[j].classList.remove(classes.animatedNodes);
        arr[i].children[j].classList.remove(classes.path);
      }
    }

    let temp = Array(row)
      .fill(0)
      .map(() => new Array(col).fill(false));

    setVisited(temp);
    sessionStorage.setItem("mazeArr", temp)
  };

  const speedHandler = (event) => {
    setSpeed(70 - event.target.value);
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

    let arr = document.getElementsByClassName("tableNodes");

    for (let i = 0; i < path.length; i++) {
      if (path[i][0] === undefined) continue;

      setTimeout(() => {
        arr[path[i][0]].children[path[i][1]].classList.add(classes.path);
      }, 50 * i);
    }
  };

  const BFSPathMain = () => {
    sessionStorage.setItem("mazeArr", JSON.stringify(visited));
    clearPathHandler();
    document.getElementById("visualize").disabled = true;

    let animated = BFSPathfinder(grid, visited, startCoordinate, endCoordinate);

    let arr = document.getElementsByClassName("tableNodes");

    for (let i = 1; i < animated.length; i++) {
      setTimeout(() => {
        {
          arr[animated[i - 1][0]].children[animated[i - 1][1]].classList.add(
            classes.animatedNodes
          );
        }
      }, speed * i);
    }

    if (
      animated[animated.length - 1][0] === endCoordinate[0] &&
      animated[animated.length - 1][1] === endCoordinate[1]
    ) {
      setTimeout(() => {
        pathMaker(animated);
      }, speed * animated.length + 1500);
    } else {
      setTimeout(() => {
      // document.getElementById("visualize").disabled = false;
        alert("Path not found");
      }, (speed + 2) * animated.length);
    }
  };

  const DFSPathMain = () => {
    sessionStorage.setItem("mazeArr", JSON.stringify(visited));
    clearPathHandler();

    let animated = DFSPathfinder(grid, visited, startCoordinate, endCoordinate);

    let arr = document.getElementsByClassName("tableNodes");
    for (let i = 0; i < animated.length; i++) {
      setTimeout(() => {
        arr[animated[i - 1][0]].children[animated[i - 1][1]].classList.add(
          classes.animatedNodes
        );
      }, (speed * 4) * i);
    }

    if (
      animated[animated.length - 1][0] === endCoordinate[0] &&
      animated[animated.length - 1][1] === endCoordinate[1]
    ) {
      setTimeout(() => {
        pathMaker(animated);
      }, speed * 4 * animated.length);
    } else {
      setTimeout(() => {
        alert("Path not found");
      }, speed * 4 * animated.length);
    }
  };

  const DijkstraMain = () => {
    this.BFSPathMain()
  }

  // const SimpleMazeHandler = () => {
  //   let animated = SimpleMaze(visited);
  //   sessionStorage.setItem("mazeArr", JSON.stringify(animated));

  //   row = visited.length;
  //   col = visited[0].length

  //   let temp = Array(row)
  //   .fill(0)
  //   .map((row) => new Array(col).fill(false));
  //   setVisited(temp);
    
  //   let arr = document.getElementsByClassName("tableNodes");
    
  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++)
  //     arr[i].children[j].classList.remove(classes.animatedWalls);
  //   }
    
  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++) {
  //       if (animated[i][j]) {
  //         setTimeout(() => {
  //           arr[i].children[j].classList.add(classes.animatedWalls);
  //         }, 10 * i + 10 * j);
  //       }
  //     }
  //   }
    
  //   setTimeout(() => {
  //     setVisited(animated);
  //   }, 10 * row + 10 * col + 400);
    
  // };

  // const StaircaseHandler = () => {
  //   let animated = StaircaseMaze(visited);
  //   sessionStorage.setItem("mazeArr", JSON.stringify(animated));

  //   row = visited.length;
  //   col = visited[0].length

  //   let temp = Array(row)
  //   .fill(0)
  //   .map((row) => new Array(col).fill(false));
  //   setVisited(temp);

  //   let arr = document.getElementsByClassName("tableNodes");

  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++)
  //       arr[i].children[j].classList.remove(classes.animatedWalls);
  //   }

  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++) {
  //       if (animated[i][j]) {
  //         setTimeout(() => {
  //           arr[i].children[j].classList.add(classes.animatedWalls);
  //         }, 10 * i + 10 * j);
  //       }
  //     }
  //   }
    
  //   setTimeout(() => {
  //     setVisited(animated);
  //   }, 10 * row + 10 * col + 400);

  // };

  // const VerticalRecursiveHandler = () => {
  //   let animated = VerticalRecursiveMaze(visited);
  //   sessionStorage.setItem("mazeArr", JSON.stringify(animated));

  //   row = visited.length;
  //   col = visited[0].length

  //   let temp = Array(row)
  //   .fill(0)
  //   .map((row) => new Array(col).fill(false));
  //   setVisited(temp);

  //   let arr = document.getElementsByClassName("tableNodes");

  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++)
  //       arr[i].children[j].classList.remove(classes.animatedWalls);
  //   }

  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++) {
  //       if (animated[i][j]) {
  //         setTimeout(() => {
  //           arr[i].children[j].classList.add(classes.animatedWalls);
  //         }, 10 * i + 10 * j);
  //       }
  //     }
  //   }
    
  //   setTimeout(() => {
  //     setVisited(animated);
  //   }, 10 * row + 10 * col + 400);

  // };

  // const HorizontalRecursiveHandler = () => {
  //   let animated = HorizontalRecursiveMaze(visited);
  //   sessionStorage.setItem("mazeArr", JSON.stringify(animated));

  //   row = visited.length;
  //   col = visited[0].length

  //   let temp = Array(row)
  //   .fill(0)
  //   .map((row) => new Array(col).fill(false));
  //   setVisited(temp);

  //   let arr = document.getElementsByClassName("tableNodes");

  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++)
  //       arr[i].children[j].classList.remove(classes.animatedWalls);
  //   }

  //   for (let i = 0; i < animated.length; i++) {
  //     for (let j = 0; j < animated[0].length; j++) {
  //       if (animated[i][j]) {
  //         setTimeout(() => {
  //           arr[i].children[j].classList.add(classes.animatedWalls);
  //         }, 10 * i + 10 * j);
  //       }
  //     }
  //   }
    
  //   setTimeout(() => {
  //     setVisited(animated);
  //   }, 10 * row + 10 * col + 400);

  // };

  const MainMazeHandler = (maze) => {
    let animated = [];

    if (maze === "random") animated = RandomMaze(visited);
    else if (maze === "simple") animated = SimpleMaze(visited);
    else if (maze === "staircase") animated = StaircaseMaze(visited);
    else if (maze === "vertical") animated = VerticalRecursiveMaze(visited);
    else if (maze === "horizontal") animated = HorizontalRecursiveMaze(visited);
    row = visited.length;
    col = visited[0].length
    
    let temp = Array(row)
    .fill(0)
    .map((row) => new Array(col).fill(false));
    setVisited(temp);

    sessionStorage.setItem("mazeArr", JSON.stringify(animated));

    let arr = document.getElementsByClassName("tableNodes");

    for (let i = 0; i < animated.length; i++) {
      for (let j = 0; j < animated[0].length; j++)
        arr[i].children[j].classList.remove(classes.animatedWalls);
    }

    for (let i = 0; i < animated.length; i++) {
      for (let j = 0; j < animated[0].length; j++) {
        if (animated[i][j]) {
          setTimeout(() => {
            arr[i].children[j].classList.add(classes.animatedWalls);
          }, 10 * i + 10 * j);
        }
      }
    }

    setTimeout(() => {
      setVisited(animated);
    }, 10 * row + 10 * col + 400);

  };

  const AlgoHandler = (event) => {
    setAlgo(event.target.value);
  };

  const MazeHandler = (event) => {
    let maze = event.target.value;

    MainMazeHandler(maze);
  };

  const VisualizeHandler = () => {
    if (algo === "select") alert("Please select an algorithm");
    if (algo === "bfs") BFSPathMain();
    else if (algo === "dfs") DFSPathMain();
     else if(algo === "dijkstra") DijkstraMain();
  };

  const heading = (
    <div className={classes.Heading}>
      <span style={{ fontSize: "30px", marginRight: "20px" }}>Maze</span>
      <span>Solver</span>
    </div>
  );

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
      <div className={classes.Nav}>
        <div>
          <img src={Logo} />
          {heading}
        </div>
        <div className={classes.ButtonWrapper}>
          <select name="maze" id="maze" onChange={MazeHandler}>
            <option value="maze" selected disabled hidden>
              Select Maze
            </option>
            <option value="random">Random Maze</option>
            <option value="simple">Simple Maze</option>
            <option value="staircase">Staircase Maze</option>
            <option value="vertical">Vertical Skew</option>
            <option value="horizontal">Horizontal Skew</option>
          </select>

          <a onClick={startHandler} className={classes.Button}>
            Start Point
          </a>
          <a onClick={endHandler} className={classes.Button}>
            End Point
          </a>

          <select name="algorithm" id="algorithm" onChange={AlgoHandler}>
            <option value="algo" selected disabled hidden>
              Select Algorithm
            </option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="dijkstra">Swarm Algorithm</option>
            <option value="bfs">Breath-First Search</option>
            <option value="dfs">Depth-First Search</option>
          </select>

          <a id="visualize" onClick={VisualizeHandler} className={classes.Button}>
            Visualize
          </a>

          <span className={classes.speedInput}>
            Speed
            <input
              type="range"
              onChange={speedHandler}
              defaultValue="30"
              min="10"
              max="60"
            />
          </span>

          <a onClick={clearPathHandler} className={classes.Button}>
            Clear Path
          </a>

          <a onClick={clearHandler} className={classes.Button}>
            Clear Board
          </a>
        </div>
      </div>

      <div className={classes.Table} onMouseLeave={() => setWall(false)}>
        {table}
      </div>
    </div>
  );
}

export default GraphVisualizer;
