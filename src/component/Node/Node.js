import React from "react";

import classes from './Node.module.css';

function Node(props){
    let color =  "transparent";

    if(props.startCoordinate[0] === props.row && 
        props.startCoordinate[1] === props.col){
            color = "yellow";
    }

    else if(props.endCoordinate[0] === props.row && 
        props.endCoordinate[1] === props.col){
            color = "red";
        }

    return(
        <div 
            className= {classes.Node} 
            onClick = {props.clickHandler}
            style = 
                {{backgroundColor : color}}
        ></div>
    )
}

export default Node;