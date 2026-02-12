const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

let cursor = 0;
const T = +input[cursor++];
const results = [];

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

for (let t = 0; t < T; t++) {
    const H = +input[cursor++];
    const W = +input[cursor++];
    
    const grid = [];
    for (let i = 0; i < H; i++) {
        grid.push(input[cursor++].split(''));
    }

    let count = 0;

    const dfs = (x, y) => {
        grid[y][x] = '.'; 

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx >= 0 && nx < W && ny >= 0 && ny < H && grid[ny][nx] === '#') {
                dfs(nx, ny);
            }
        }
    };

    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            if (grid[y][x] === '#') {
                count++;
                dfs(x, y);
            }
        }
    }
    results.push(count);
}

console.log(results.join('\n'));