const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
// const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");

/*
lower 또는 upper bound 함수를 작성하여 사용

가장 긴 증가하는 부분수열이라..

-> 핵심은 하나씩 탐색하면서 최적의 길이를 찾아나가는 것
-> 이때 lower bound라는 함수가 이분탐색을 사용하는 알고리즘
*/

const n = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);

const lis = [];

function lowerBound(target) {
  let start = 0;
  let end = lis.length;

  while(start < end) {
    let mid = Math.floor((start + end) / 2);
    if (lis[mid] >= target) end = mid;
    else start = mid + 1;
  }
    
  return start;
}

for (const num of arr) {
    if (lis.length === 0 || num > lis[lis.length - 1]) {
        lis.push(num);
    } else {
        const idx = lowerBound(num);
        lis[idx] = num;
    }
}

console.log(lis.length);
