export function shortestPath(grid, visited, startCoordinate, endCoordinate){
    let animated = [];    
    let visi = [];

    for (var i = 0; i < visited.length; i++)
        visi[i] = visited[i].slice();
    
    bfs(animated, grid, visi, startCoordinate, endCoordinate)

    return animated;
}

const safe = (i, j, visi, n, m) => {
    if(i>=0 && i<n && j>=0 && j<m && !visi[i][j]){
        return true;
    }

    return false;
}

const bfs = (animated, grid, visi, startCoordinate, endCoordinate) => {
    let queue = [];
    let i = 0;
    const col = [1, 0, -1, 0];
    const row = [0, 1, 0, -1];

    queue.push(startCoordinate);

    while(i < queue.length && queue.length > 0)
    {
        let curr = queue[i];
        i++;

        visi[curr[0]][curr[1]] = true;
        
        if(i > 1){
            animated.push(curr);
        }

        for(let j=0; j<4; j++)
        {
            if(safe(curr[0]+row[j], curr[1]+col[j], visi, grid.length, grid[0].length))
            {
                if(curr[0]+row[j] === endCoordinate[0] && curr[1]+col[j] === endCoordinate[1])
                {
                    animated.push(curr)
                    animated.push([endCoordinate[0], endCoordinate[1], curr[0], curr[1]]);
                    return;
                }

                let node = [...grid[curr[0]+row[j]][curr[1]+col[j]]];
                node.push(curr[0])
                node.push(curr[1]);
                queue.push(node);
                
                visi[curr[0]+row[j]][curr[1]+col[j]] = true;
            }
        }
    }
}