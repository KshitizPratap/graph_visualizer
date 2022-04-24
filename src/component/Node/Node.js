import React from "react";

import classes from './Node.module.css';

function Node(props){
    let nodeStyle = null;

    if(props.startCoordinate[0] === props.row && 
        props.startCoordinate[1] === props.col){
            nodeStyle = classes.Start;
    }

    else if(props.endCoordinate[0] === props.row && 
        props.endCoordinate[1] === props.col){
            nodeStyle = classes.End;
        }

    if(props.visited[props.row][props.col]){
        nodeStyle = classes.Wall;
    }


    return(
        <div 
            className= {[classes.Node, nodeStyle].join(' ')} 
            onClick = {props.clickHandler}
            onMouseDown = {props.mouseDownHandler}
            onMouseEnter = {props.mouseMoveHandler}
            onMouseUp = {props.mouseUpHandler}
        ></div>
    )
}

export default Node;