const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt"
const input = require("fs").readFileSync(filePath).toString().trim().split("\n")

// 듣도 못한 사람 n, 보도 못한 사람 m
const nm = input[0].toString().split(' ');
const n = parseInt(nm[0]);
const m = parseInt(nm[1]);

const map = new Map();

const result = [];

for (let i=1; i<=n; i++) {
    map.set(input[i], true);
}

for (let i=1; i<=m; i++) {
    if (map.has(input[i+n])) {
        result.push(input[i+n]);
    }
}

result.sort();

console.log(result.length);
console.log(result.join('\n'));