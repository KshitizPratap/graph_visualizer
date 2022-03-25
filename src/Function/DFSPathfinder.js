export function DFSPathfinder(grid, visited, startCoordinate, endCoordinate){
    let animated = [];
    let visi = [];

    console.log("[startCoordinate]", startCoordinate);
    console.log("[endCoordinate]", endCoordinate);

    for(let i=0; i<visited.length; i++)
        visi[i] = visited[i].slice();

    dfs(animated, grid, visi, startCoordinate, endCoordinate, [-1, -1])

    return animated;
} 

const safe = (i, j, visi, n, m) => {
    if(i>=0 && i<n && j>=0 && j<m && !visi[i][j]){
        return true;
    }

    return false;
}

const dfs = (animated, grid, visi, startCoordinate, endCoordinate, parent) => {
    startCoordinate.push(parent[0]);
    startCoordinate.push(parent[1]);
    animated.push(startCoordinate);

    visi[startCoordinate[0]][startCoordinate[1]] = true;

    if(startCoordinate[0] === endCoordinate[0] && startCoordinate[1] === endCoordinate[1])
        return true;

    const col = [1, 0, -1, 0];
    const row = [0, 1, 0, -1];

    for(let i=0; i<4; i++)
    {
        if(safe(startCoordinate[0]+row[i], startCoordinate[1]+col[i], visi, grid.length, grid[0].length)){
            let newStart = [startCoordinate[0]+row[i], startCoordinate[1]+col[i]];
            parent = [startCoordinate[0], startCoordinate[1]];
            if(dfs(animated, grid, visi, newStart, endCoordinate, parent))
                return true;
        }
    }

    return false;
}   
