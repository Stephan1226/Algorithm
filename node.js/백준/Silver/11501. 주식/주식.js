const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
// const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");

/*
가장 비싼 날 인덱스를 구한다.
그 인덱스 -1까지 다 사고 그 날 인덱스가 왔을 때 판다.
(이때 주식 갯수와, 쓴 돈을 저장해두고 (파는 돈 * 주식 개수) - 쓴 돈, 으로 이익+=차익을 한다.)
그리고 그 다음 인덱스 값을 초기 인덱스 값으로 지정한다.
(다음 인덱스 값이 없을 경우 종료한다.)
반복한다.

-> 문제 발생: 이렇게 할 경우 O(n^2)의 시간 복잡도가 나올 수 있음(최댓값 탐색 할 때)
그렇기에 끝에서부터 탐색하는 방법을 사용할 것임.

새로운 방법
마지막 날을 최댓값으로 설정한다.
앞 인덱스의 값과 비교한다.
앞 인덱스의 값이 크거나 같다면 최댓값 변경, 작다면 최댓값 - 현재값의 결과를 토탈에 더함.
*/

let testCaseN = parseInt(input[0]);
let inputIdx = 1;
let arrIdx = 0;
let totalProfit = 0;
let maxPrice = 0;
const result = [];
let nowPrice = 0;

while(testCaseN) {
  totalProfit = 0;
  maxPrice = 0;
  const tempArr = input[inputIdx + 1].split(' ');

  for(arrIdx = parseInt(input[inputIdx]) - 1; arrIdx >= 0; arrIdx--) {
    nowPrice = parseInt(tempArr[arrIdx]);
    if(nowPrice < maxPrice) {
      totalProfit += maxPrice - nowPrice;
      /*
      console.log('===now total profit===');
      console.log(maxPrice - nowPrice);
      console.log(nowPrice);
      console.log(maxPrice);
      */
    } else {
      maxPrice = nowPrice;
    }
  }

  result.push(totalProfit);

  inputIdx += 2;
  testCaseN--;
  totalProfit = 0;
}

console.log(result.join('\n'));