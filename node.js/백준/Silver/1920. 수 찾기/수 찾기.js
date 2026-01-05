const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt"
let input = require("fs").readFileSync(filePath).toString().trim().split("\n")

const hasSet = new Set(input[1].split(' '));
const needCheck = input[3].split(' ');

for (let inputIndexCounter = 0; inputIndexCounter < needCheck.length; inputIndexCounter++) {
  console.log(hasSet.has(needCheck[inputIndexCounter])? 1: 0);
}