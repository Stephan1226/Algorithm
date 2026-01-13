class Stack {
  constructor() {
    this._storage = new Object();
    this._size = 0;
  }

  push(element) {
    this._size++;
    this._storage[this._size] = element;
  }

  pop() {
    let removed = this._storage[this._size];
    delete this._storage[this._size];
    this._size--;
    return removed;
  }

  top() {
    return this._storage[this._size];
  }

  size() {
    return this._size;
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let str = 0;
const result = [];
let temp = 0;
let yesOrNo = true;

const pair = {
  ')': '(',
  ']': '['
};


for(let i = 0; i < input.length - 1; i++) {
  const stack = new Stack();
  str = input[i];
  yesOrNo = true;

  for(let j = 0; j < str.length; j++) {

    if(str[j] == '(' || str[j] == '[') {

      stack.push(str[j]);
    } else if(str[j] == ')' || str[j] == ']') {

      temp = stack.pop();

      if(temp == pair[str[j]]) {

        continue;

      } else {

        yesOrNo = false;
        break;

      }
    }
  }

  if(yesOrNo && stack.size() == 0) {
    result.push('yes');
  } else {
    result.push('no');
  }
}

console.log(result.join('\n'));