const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [V, E] = input[0].split(' ').map(Number);
const edges = [];

for (let i = 1; i <= E; i++) {
    edges.push(input[i].split(' ').map(Number));
}

edges.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: V + 1 }, (_, i) => i);

function find(x) {
    if (parent[x] === x) return x;
    return parent[x] = find(parent[x]);
}

function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    
    if (rootA !== rootB) {
        parent[rootB] = rootA;
        return true;
    }
    return false;
}

let answer = 0;
let connectedEdges = 0;

for (let i = 0; i < E; i++) {
    const [A, B, C] = edges[i];
    
    if (union(A, B)) {
        answer += C;
        connectedEdges++;
        if (connectedEdges === V - 1) break;
    }
}

console.log(answer);