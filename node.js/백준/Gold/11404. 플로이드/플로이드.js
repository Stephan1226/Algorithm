const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const m = parseInt(input[1]);

const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

for (let i = 1; i <= n; i++) {
    dist[i][i] = 0;
}

for (let i = 2; i < 2 + m; i++) {
    const [u, v, w] = input[i].split(' ').map(Number);
    if (w < dist[u][v]) {
        dist[u][v] = w;
    }
}

for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (dist[i][k] + dist[k][j] < dist[i][j]) {
                dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }
}

let result = '';
for (let i = 1; i <= n; i++) {
    let row = [];
    for (let j = 1; j <= n; j++) {
        if (dist[i][j] === Infinity) {
            row.push(0);
        } else {
            row.push(dist[i][j]);
        }
    }
    result += row.join(' ') + '\n';
}

console.log(result.trim());