const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const T = Number(input[index++]);
const ans = [];

for (let i = 0; i < T; i++) {
  const N = Number(input[index++]);
  const arr = [];

  for (let j = 0; j < N; j++) {
    arr.push(input[index++].trim().split(/\s+/).map(Number));
  }

  arr.sort((a, b) => a[0] - b[0]);

  let cnt = 1;
  let minRank = arr[0][1];

  for (let j = 1; j < N; j++) {
    if (arr[j][1] < minRank) {
      cnt++;
      minRank = arr[j][1];
    }
  }

  ans.push(cnt);
}

console.log(ans.join('\n'));