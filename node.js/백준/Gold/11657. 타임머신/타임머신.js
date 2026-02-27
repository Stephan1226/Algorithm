const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = [];

for (let i = 1; i <= M; i++) {
    edges.push(input[i].split(' ').map(Number));
}

const dist = Array(N + 1).fill(Infinity);
dist[1] = 0;
let hasNegativeCycle = false;

for (let i = 1; i <= N; i++) {
    for (let j = 0; j < M; j++) {
        const [u, v, w] = edges[j];
        
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            
            if (i === N) {
                hasNegativeCycle = true;
            }
        }
    }
}

if (hasNegativeCycle) {
    console.log("-1");
} else {
    const result = [];
    for (let i = 2; i <= N; i++) {
        if (dist[i] === Infinity) {
            result.push("-1");
        } else {
            result.push(dist[i]);
        }
    }
    console.log(result.join('\n'));
}