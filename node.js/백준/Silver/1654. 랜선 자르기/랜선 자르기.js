const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

const K = +input[0];
const N = +input[1];

const lines = [];
for (let i = 2; i < 2 + K; i++) {
    lines.push(+input[i]);
}

let min = 1;
let max = Math.max(...lines);

let answer = 0;

while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    
    const count = lines.reduce((acc, line) => acc + Math.floor(line / mid), 0);

    if (count >= N) {
        answer = mid;
        min = mid + 1;
    } else {
        max = mid - 1;
    }
}

console.log(answer);