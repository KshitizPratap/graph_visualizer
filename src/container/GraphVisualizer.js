import React, { useEffect, useState } from 'react'
import Node from '../component/Node/Node'
import classes from './GraphVisualizer.module.css'
import { shortestPath } from '../Function/ShortestPath'

function GraphVisualizer() {

    const [grid, setGrid] = useState([], []);
    const [start, setStart] = useState(false);
    const [startCoordinate, setStartCoordinate] = useState([]);
    const [end, setEnd] = useState(false);
    const [endCoordinate, setEndCoordinate] = useState([]);
    
    useEffect(() => {

        let arr = Array(50).fill(0).map(row => new Array(20).fill(0));

        for(let i=0; i<50; i++)
        {
            for(let j=0; j<20; j++)
            {
                arr[i][j] = [i, j];
            }
        }
        setGrid(arr);
       
    }, []);

    const startHandler = () => {
        setStart(true);
        setEnd(false);
    }

    const endHandler = () => {
        setStart(false);
        setEnd(true);
    }

    const NodeClickHandler = (row, col) => {
        if(start){
            setStartCoordinate([row, col])
        }

        if(end){
            setEndCoordinate([row, col]);
        }

    }

    const pathMaker = (animated) => {
        const n = animated.length

        let path = [animated[n-1][0], animated[n-1][1]]
        let i = animated[n-1][2], j = animated[n-1][3]

        path.push([i, j]);

        for(let k=n-1; k>=0; k--)
        {
            if(animated[k][0] == i && animated[k][1] == j)
            {
                i = animated[k][2];
                j = animated[k][3];

                path.push([i, j]);
            }
        }

        let arr = document.getElementsByClassName('tableNodes');

        for(let i=0; i<path.length; i++)
        {
            if(path[i][0] === undefined)
                continue;

            setTimeout(() => {
                arr[path[i][0]].children[path[i][1]].style.backgroundColor = 'pink'
            }, 50*i)
        }

        console.log(path);
    }

    const shortestPathMain = () => {
        let animated = shortestPath(grid, startCoordinate, endCoordinate)

        let arr = document.getElementsByClassName('tableNodes');
        for(let i=0; i<animated.length; i++)
        {
            setTimeout(() => {
                arr[animated[i][0]].children[animated[i][1]].style.backgroundColor = 'yellow'

                if(i > 0){
                    arr[animated[i-1][0]].children[animated[i-1][1]].style.backgroundColor = 'blue'
                }

                if(i === animated.length-1)
                arr[animated[i][0]].children[animated[i][1]].style.backgroundColor = 'red'

            }, 20*i)
        }
        console.log(startCoordinate, endCoordinate);
        console.log(animated);

        setTimeout(() => {
            pathMaker(animated)

        }, 21*animated.length)
    }

    const table = grid.length !== 0 ? grid.map((arr) => {
        return(
            <div className='tableNodes'>
                {arr.map((node) => {
                    return <Node 
                                row = {node[0]}
                                col = {node[1]}
                                clickHandler = {() => NodeClickHandler(node[0], node[1])}
                                start = {start}
                                end = {end}
                                startCoordinate = {startCoordinate}
                                endCoordinate = {endCoordinate}
                            />
                })}
            </div>
        )
    }) : null;

    return(
        <div className={classes.Wrapper}>

            <div className={classes.Buttons}>
                <button onClick={startHandler}>Start</button>
                <button onClick={endHandler}>End</button>
                <button onClick={shortestPathMain}>Solve</button>
            </div>
            
            <div className={classes.Table}>
                {table}
            </div>
        </div> 
    );
}

export default GraphVisualizer