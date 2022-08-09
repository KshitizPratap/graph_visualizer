const boundaryMaker = (visi) => {
  const row = visi.length;
  const col = visi[0].length;

  for (let i = 0; i < row; i++) visi[i][0] = true;

  for (let i = row - 1; i >= 0; i--) visi[i][col - 1] = true;

  for (let i = 0; i < col; i++) visi[0][i] = true;

  for (let i = col - 1; i >= 0; i--) visi[row - 1][i] = true;
};

export function SimpleMaze(visited) {
  const row = visited.length;
  const col = visited[0].length;

  let visi = Array(row)
    .fill(0)
    .map((row) => new Array(col).fill(false));

  boundaryMaker(visi);

  for (let i = 3; i + 2 < row; i += 6) {
    for (let j = 0; j < (3 * col) / 4; j++) visi[i][j] = true;
  }

  for (let i = 6; i + 2 < row; i += 6) {
    for (let j = col - 1; j >= col / 4; j--) visi[i][j] = true;
  }

  return visi;
}

const stairMaker = (i, j, visi) => {
  const row = visi.length;
  const col = visi[0].length;

  let count = 2;
  while (i < row - 2 && j < col - 2) {
    visi[i][j] = true;

    if (count > 0) {
      j++;
      count--;
    } else {
      i++;
      count--;
      if (count === -2) count = 2;
    }
  }
};

export function StaircaseMaze(visited) {
  const row = visited.length;
  const col = visited[0].length;

  let visi = Array(row)
    .fill(0)
    .map((row) => new Array(col).fill(false));

  boundaryMaker(visi);

  for (let i = 2; i < row; i += 6) stairMaker(i, 2, visi);

  for (let i = 2; i < col; i += 6) stairMaker(2, i, visi);

  return visi;
}

const divMaker = (rowMin, rowMax, colMin, colMax, visi) => {
  let arr = document.getElementsByClassName("tableNodes");

  const col = visi[0].length;
  const row = visi.length;

  rowMin = parseInt(rowMin);
  rowMax = parseInt(rowMax);
  colMin = parseInt(colMin);
  colMax = parseInt(colMax);

  const range = Math.floor(Math.random() * (9 - 7) + 7);
  let rangeRow = Math.floor(Math.random() * (rowMax - rowMin) + rowMin);
  let rangeCol = Math.floor(Math.random() * (colMax - colMin) + colMin);

  if (col - rangeCol > rangeCol) {
    for (let i = rangeRow; i - rangeRow <= range && i < row - 1; i++) {
      for (let j = rangeCol; j > 0 && j < col; j--) {
        if (
          (i > rangeRow && i < row - 2 && rangeCol - j === 2 && j < col - 1) ||
          (i - rangeRow == 1 && i < row - 2 && rangeCol - j > 2 && j > 1) ||
          (i > rangeRow + 2 && rangeCol - j === 4 && j > 1)
        ) {
          visi[i][j] = true;
        } else visi[i][j] = false;
      }
    }
  } else {
    for (let i = rangeRow; i - rangeRow < range && i < row - 1; i++) {
      for (let j = rangeCol; j < col - 1; j++) {
        if (
          (i > rangeRow && i < row - 2 && j - rangeCol === 2) ||
          (i - rangeRow == 1 && i < row - 2 && j - rangeCol > 3 && j < col) ||
          (i - rangeRow == 3 &&
            i < row - 2 &&
            j - rangeCol > 2 &&
            j < col - 2) ||
          (i > rangeRow + 3 &&
            i < row - 2 &&
            i - rangeRow < range - 1 &&
            j - rangeCol === 4 &&
            j < col - 2)
        ) {
          visi[i][j] = true;
        } else visi[i][j] = false;
      }
    }
  }

  for (let i = 0; i < range && rangeRow + i < row; i++)
    visi[rangeRow + i][rangeCol] = true;
};

const VerticalMazeMaker = (visi) => {
  const row = visi.length;
  const col = visi[0].length;

  let rowArr = [];
  for (let i = 2; i < row - 2; i += 2) rowArr.push(i);

  for (let i = 0; i < rowArr.length; i++) {
    let recol = Math.floor((col / 2) * Math.random());
    let recol2 = Math.floor(col * Math.random());

    if (recol == 0) recol = 2;
    else if (recol == col - 1) recol = col - 2;

    if (recol2 == 0) recol2 = 4;
    else if (recol2 == col - 1) recol2 = col - 4;

    for (let j = 0; j < col; j++) {
      visi[rowArr[i]][j] = true;
    }
    visi[rowArr[i]][recol] = false;
    visi[rowArr[i]][recol2] = false;
  }

  divMaker(2, row / 2 - 5, col / 4, col / 2 - 1, visi);
  divMaker(row / 2 + 5, row - 2, col / 2 + 1, (3 * col) / 4, visi);
  divMaker(2, row / 2 - 5, col / 2 + 1, (3 * col) / 4, visi);
  divMaker(row / 2 + 5, row - 2, col / 4, col / 2 - 1, visi);
};

const cornerCheck = (visi) => {
  let arr = document.getElementsByClassName("tableNodes");

  let row = visi.length;
  let col = visi[0].length;

  for (let i = 1; i < row - 2; i++) {
    for (let j = 1; j < col - 2; j++) {
      if (visi[i][j] && visi[i + 1][j + 1]) {
        if (visi[i + 1][j] || visi[i][j + 1]) continue;
        else {
          if (visi[i - 1][j] && visi[i + 1][j + 2]) {
            visi[i + 1][j] = true;
          } else if (visi[i][j - 1] && visi[i + 2][j + 1]) {
            visi[i][j + 1] = true;
          }
        }
      } else if (visi[i + 1][j] && visi[i][j + 1]) {
        if (visi[i][j] || visi[i + 1][j + 1]) continue;
        else {
          if (visi[i + 2][j] && visi[i][j + 2]) {
            visi[i][j] = true;
          } else if (visi[i + 1][j - 1] && visi[i - 1][j + 1]) {
            visi[i + 1][j + 1] = true;
          }
        }
      }
    }
  }
};

export function VerticalRecursiveMaze(visited) {
  const row = visited.length;
  const col = visited[0].length;

  let visi = Array(row)
    .fill(0)
    .map(() => new Array(col).fill(false));

  boundaryMaker(visi);

  VerticalMazeMaker(visi);

  cornerCheck(visi);

  return visi;
}

const HorizontalDivMaker = (rowMin, rowMax, colMin, colMax, visi) => {
  let arr = document.getElementsByClassName("tableNodes");

  const col = visi[0].length;
  const row = visi.length;

  rowMin = parseInt(rowMin);
  rowMax = parseInt(rowMax);
  colMin = parseInt(colMin);
  colMax = parseInt(colMax);

  const range = Math.floor(Math.random() * (6 - 4) + 4);
  let rangeRow = Math.floor(Math.random() * (rowMax - rowMin) + rowMin);
  let rangeCol = Math.floor(Math.random() * (colMax - colMin) + colMin);

  if (row - rangeRow > rangeRow) {
    for (let j = rangeCol; j - rangeCol <= range && j < col - 1; j++) {
      for (let i = 1; i <= rangeRow && i < row - 1; i++) {
        if (
          (i === rangeRow - 2 && i > 3 && j - rangeCol <= range) ||
          (i === rangeRow - 4 &&
            i > 3 &&
            j - rangeCol <= range &&
            j > rangeCol) ||
          (i < rangeRow - 4 && i > 3 && j === rangeCol + 1 && j < col - 2) ||
          (i < rangeRow - 4 &&
            i > 1 &&
            j === rangeCol + 3 &&
            j < range + rangeCol &&
            j < col - 2) ||
          (i === 2 && i + 2 < rangeRow && j < range + rangeCol && j < col)
        ) {
          visi[i][j] = true;
        } else visi[i][j] = false;
      }
    }
  } else {
    for (let j = rangeCol; j - rangeCol <= range && j < col - 1; j++) {
      for (let i = rangeRow; i < row - 1; i++) {
        if (
          (i === rangeRow + 2 && i < row - 2 && j - rangeCol <= range) ||
          (i === rangeRow + 4 &&
            i < row - 2 &&
            j - rangeCol < range &&
            j > rangeCol) ||
          (i >= rangeRow + 4 &&
            j === rangeCol + 1 &&
            j !== col - 4 &&
            j < col - 2) ||
          (i === rangeRow + 6 && i < row - 2 && j - rangeCol <= range) ||
          (i >= rangeRow + 6 &&
            (j === col - 3 || (j - rangeCol === range - 1 && j !== col - 4)) &&
            j < col - 2)
        ) {
          visi[i][j] = true;
        } else visi[i][j] = false;
      }
    }
  }

  for (let j = rangeCol; j - rangeCol <= range - 1; j++)
    visi[rangeRow][j] = true;
};

const HorizontalMazeMaker = (visi) => {
  const row = visi.length;
  const col = visi[0].length;

  let colArr = [];
  for (let i = 2; i < col - 2; i += 2) colArr.push(i);

  for (let i = 0; i < colArr.length; i++) {
    let rerow = Math.floor((row / 2) * Math.random());
    let rerow2 = Math.floor(row * Math.random());
    let rerow3 = Math.floor(Math.random() * (row / 4) + (3 * row) / 4);

    if (rerow == 0) rerow = 2;
    else if (rerow == row - 1) rerow = row - 2;

    if (rerow2 == 0) rerow2 = 4;
    else if (rerow2 == row - 1) rerow2 = row - 4;

    if (rerow3 > row - 2) rerow3 = row - 3;

    for (let j = 0; j < row; j++) {
      visi[j][colArr[i]] = true;
    }
    visi[rerow][colArr[i]] = false;
    visi[rerow2][colArr[i]] = false;
    visi[rerow3][colArr[i]] = false;
  }

  HorizontalDivMaker(2, row / 2 - 5, 2, col / 4, visi);
  HorizontalDivMaker(2, row / 2 - 5, (3 * col) / 4, col - 2, visi);
  HorizontalDivMaker(row / 2 + 5, row - 2, 2, col / 4, visi);
  HorizontalDivMaker(row / 2 + 5, row - 2, (3 * col) / 4, col - 2, visi);
};

export function HorizontalRecursiveMaze(visited) {
  const row = visited.length;
  const col = visited[0].length;

  let visi = Array(row)
    .fill(0)
    .map(() => new Array(col).fill(false));

  boundaryMaker(visi);

  HorizontalMazeMaker(visi);

  cornerCheck(visi);

  return visi;
}

const RandomMazeMaker = (visi) => {
  const row = visi.length;
  const col = visi[0].length;

  for (let j = 0; j < col; j++) {
    let rowArr = new Set();

    for (let i = 0; i < row / 3; i++)
      rowArr.add(Math.floor(Math.random() * row));

    for (let i = 0; i < row; i++) {
      if (rowArr.has(i)) visi[i][j] = true;
    }
  }
};

export function RandomMaze(visited) {
  const row = visited.length;
  const col = visited[0].length;

  let visi = Array(row)
    .fill(0)
    .map(() => new Array(col).fill(false));

  boundaryMaker(visi);

  RandomMazeMaker(visi);

  return visi;
}
