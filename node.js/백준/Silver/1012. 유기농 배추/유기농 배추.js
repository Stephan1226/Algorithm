const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split(/\s+/);

let cursor = 0;
const T = +input[cursor++];

const dx = [0, 0, 1, -1];
const dy = 1;
const dyArr = [1, -1, 0, 0];

const results = [];

function dfs(x, y, M, N, graph) {
    graph[y][x] = 0;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dyArr[i];

        if (nx >= 0 && nx < M && ny >= 0 && ny < N && graph[ny][nx] === 1) {
            dfs(nx, ny, M, N, graph);
        }
    }
}

for (let i = 0; i < T; i++) {
    const M = +input[cursor++];
    const N = +input[cursor++];
    const K = +input[cursor++];

    const graph = Array.from({ length: N }, () => Array(M).fill(0));

    for (let j = 0; j < K; j++) {
        const x = +input[cursor++];
        const y = +input[cursor++];
        graph[y][x] = 1;
    }

    let wormCount = 0;

    for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
            if (graph[y][x] === 1) {
                wormCount++;
                dfs(x, y, M, N, graph);
            }
        }
    }
    
    results.push(wormCount);
}

console.log(results.join('\n'));