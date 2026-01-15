const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const numbers = input[1].split(' ').map(Number);
const M = Number(input[2]);

const sumArr = new Array(numbers.length + 1).fill(0);

numbers.forEach((num, index) => {
    sumArr[index + 1] = sumArr[index] + num;
});

const result = [];

for(let i = 3; i < M + 3; i++) {
    const [start, end] = input[i].split(' ').map(Number);
    result.push(sumArr[end] - sumArr[start - 1]);
}

console.log(result.join('\n'));