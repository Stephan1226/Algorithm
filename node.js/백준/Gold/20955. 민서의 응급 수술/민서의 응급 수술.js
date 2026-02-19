const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

const N = parseInt(input[0], 10);
const M = parseInt(input[1], 10);

const parent = Array.from({ length: N + 1 }, (_, i) => i);

function find(x) {
    if (parent[x] === x) return x;
    return parent[x] = find(parent[x]);
}

function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    
    if (rootA === rootB) return false;

    if (rootA < rootB) parent[rootB] = rootA;
    else parent[rootA] = rootB;
    return true;
}

let cutCount = 0;
let index = 2;

for (let i = 0; i < M; i++) {
    const u = parseInt(input[index++], 10);
    const v = parseInt(input[index++], 10);
    
    if (!union(u, v)) {
        cutCount++;
    }
}

let componentCount = 0;
for (let i = 1; i <= N; i++) {
    if (parent[i] === i) {
        componentCount++;
    }
}

const linkCount = componentCount - 1;
console.log(cutCount + linkCount);