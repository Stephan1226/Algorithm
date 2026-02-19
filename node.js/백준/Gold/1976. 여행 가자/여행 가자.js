const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

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
    
    if (rootA < rootB) parent[rootB] = rootA;
    else parent[rootA] = rootB;
}

for (let i = 0; i < N; i++) {
    const row = input[i + 2].split(' ').map(Number);
    for (let j = 0; j < N; j++) {
        if (row[j] === 1) {
            union(i + 1, j + 1); 
        }
    }
}

const plan = input[N + 2].split(' ').map(Number);
const firstCityRoot = find(plan[0]);
let isPossible = true;

for (let i = 1; i < M; i++) {
    if (find(plan[i]) !== firstCityRoot) {
        isPossible = false;
        break;
    }
}

console.log(isPossible ? 'YES' : 'NO');