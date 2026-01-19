const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const result = [];
const sortedUniqueArr = [...new Set(arr)].sort((a, b) => a - b);
const map = new Map();

sortedUniqueArr.forEach((val, idx) => {
    map.set(val, idx);
})

for(let i = 0; i < N; i++) {
  result.push(map.get(arr[i]));
}

console.log(result.join(' '));