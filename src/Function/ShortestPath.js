export function shortestPath(grid, startCoordinate, endCoordinate){
    let animated = [];
    let visited = Array(50).fill(0).map(row => new Array(20).fill(false));
    
    bfs(animated, grid, visited, startCoordinate, endCoordinate)

    return animated;
}

const safe = (i, j, visited, n, m) => {
    if(i>=0 && i<n && j>=0 && j<m && !visited[i][j]){
        return true;
    }

    return false;
}

const bfs = (animated, grid, visited, startCoordinate, endCoordinate) => {
    let queue = [];
    let i = 0;
    const col = [1, 0, -1, 0];
    const row = [0, 1, 0, -1];

    queue.push(startCoordinate);

    while(i < queue.length && queue.length > 0)
    {
        let curr = queue[i];
        i++;

        visited[curr[0]][curr[1]] = true;
        
        if(i !== 1){
            animated.push([curr[0], curr[1]]);
        }

        for(let j=0; j<4; j++)
        {
            if(safe(curr[0]+row[j], curr[1]+col[j], visited, grid.length, grid[0].length) === true)
            {
                if(curr[0]+row[j] === endCoordinate[0] && curr[1]+col[j] === endCoordinate[1])
                    return;

                queue.push(grid[curr[0]+row[j]][curr[1]+col[j]]);
                visited[curr[0]+row[j]][curr[1]+col[j]] = true;
            }
        }
    }


}