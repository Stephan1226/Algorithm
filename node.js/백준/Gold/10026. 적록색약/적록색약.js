const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
let grid = input.slice(1).map(line => line.trim().split(''));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function dfs(x, y, visited, color) {
    visited[y][x] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
            if (!visited[ny][nx] && grid[ny][nx] === color) {
                dfs(nx, ny, visited, color);
            }
        }
    }
}

function getCount() {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let count = 0;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!visited[i][j]) {
                dfs(j, i, visited, grid[i][j]);
                count++;
            }
        }
    }
    return count;
}

const normalResult = getCount();

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (grid[i][j] === 'G') grid[i][j] = 'R';
    }
}

const blindResult = getCount();

console.log(`${normalResult} ${blindResult}`);