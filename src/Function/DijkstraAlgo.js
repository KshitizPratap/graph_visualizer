export function Dijkstra(grid, visited, startCoordinate, endCoordinate){
    let animated = [];
    let visi = [];

    for(let i=0; i<visited.length; i++)
        visi[i] = visited[i].slice();

    algo(animated, grid, visi, startCoordinate, endCoordinate)

    return animated;
}

const algo = (animated, grid, visi, startCoordinate, endCoordinate) => {
    let row = visited.length;
    let col = visited[0].length;

    for(let i=0; i<row; i++)
    {
        for(let j=0; j<col; j++)
        {
            
        }
    }
}