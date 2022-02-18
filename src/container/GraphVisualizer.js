import React, { useEffect, useState } from 'react'
import Node from '../component/Node/Node'
import classes from './GraphVisualizer.module.css'

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
                arr[i][j] = {i, j};
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

    const table = grid.length !== 0 ? grid.map((arr) => {
        return(
            <div>
                {arr.map((node) => {
                    return <Node 
                                row = {node.i}
                                col = {node.j}
                                clickHandler = {() => NodeClickHandler(node.i, node.j)}
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

            <button onClick={startHandler}>Start</button>
            <button onClick={endHandler}>End</button>
            <button>Solve</button>
            
            <div className={classes.Table}>
                {table}
            </div>
        </div> 
    );
}

export default GraphVisualizer