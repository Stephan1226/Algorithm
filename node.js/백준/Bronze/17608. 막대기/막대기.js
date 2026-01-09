// 스택 구현 블로그 참고
class Stack {
  constructor() {
    this.storage = new Object();
    this.size = 0;
  }

  push(element) {
    this.size++;
    this.storage[this.size] = element;
  }

  pop() {
    let removed = this.storage[this.size];
    delete this.storage[this.size];
    this.size--;
    return removed;
  }

  top() {
    return this.storage[this.size];
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const stack = new Stack();

let countOfStick = 0;
let maxNum = 0;
let now = 0;

for (let i = 1; i < input.length; i++) {
  stack.push(input[i]);
}

for (let i = 1; i < input.length; i++) {
  now = parseInt(stack.pop());
  if (now > maxNum) {
    maxNum = now;
    countOfStick++;
  }
}

console.log(countOfStick);