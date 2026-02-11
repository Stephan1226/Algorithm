const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const dp = new Array(n);
dp[0] = arr[0];
let max = arr[0];

for (let i = 1; i < n; i++) {
    dp[i] = Math.max(arr[i], dp[i - 1] + arr[i]);
    if (dp[i] > max) max = dp[i];
}

console.log(max);