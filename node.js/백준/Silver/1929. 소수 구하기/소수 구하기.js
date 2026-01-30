const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

const M = +input[0];
const N = +input[1];

const isPrime = Array(N + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

for (let i = 2; i * i <= N; i++) {
    if (isPrime[i]) {
        for (let j = i * i; j <= N; j += i) {
            isPrime[j] = false;
        }
    }
}

const results = [];
for (let i = M; i <= N; i++) {
    if (isPrime[i]) {
        results.push(i);
    }
}

console.log(results.join('\n'));