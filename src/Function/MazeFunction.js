const boundaryMaker = (visi) => {
    const row = visi.length;
    const col = visi[0].length;

    for(let i=0; i<row; i++)
        visi[i][0] = true;
    
    for(let i=row-1; i>=0; i--)
        visi[i][col-1] = true;

    for(let i=0; i<col; i++)
        visi[0][i] = true;

    for(let i=col-1; i>=0; i--)
        visi[row-1][i] = true;
}

export function SimpleMaze(visited){
    const row = visited.length;
    const col = visited[0].length;

    let visi = Array(row)
      .fill(0)
      .map((row) => new Array(col).fill(false));

    boundaryMaker(visi)

    for(let i=3; i+2<row; i+=6){
        for(let j=0; j<3*col/4; j++)
            visi[i][j] = true;
    }

    for(let i=6; i+2<row; i+=6){
        for(let j=col-1; j>=col/4; j--)
            visi[i][j] = true;
    }

    return visi;
}

const stairMaker = (i, j, visi) => {
    const row = visi.length;
    const col = visi[0].length;

    let count = 2;
    while(i<row-2 && j<col-2)
    {
        visi[i][j] = true;

        if(count > 0)
        {
            j++;
            count--;
        }
        else
        {
            i++;
            count--;
            if(count === -2)
                count = 2;
        }
    }
}

export function StaircaseMaze(visited){
    const row = visited.length;
    const col = visited[0].length;

    let visi = Array(row)
    .fill(0)
    .map((row) => new Array(col).fill(false));
    
    boundaryMaker(visi)    

    for(let i=2; i<row; i+=6)
        stairMaker(i, 2, visi);

    for(let i=2; i<col; i+=6)
        stairMaker(2, i, visi);

    return visi; 
}