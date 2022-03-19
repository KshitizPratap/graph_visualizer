import { useState } from 'react';

function visualizer(){
    const [grid, setGrid] = useState([]);

    // for(let i=0; i<25; i++)
    // {
    //     for(let j=0; j<100; j++)
    //     {
    //         let node = {i, j};
    //         setGrid(...grid, node);
    //     }
    // }

    // const table = grid.map(() => {
    //     <Node />
    // })

    return(
        <div>
            {/* {table} */}
        </div>
    );
}

export default visualizer;