// 최대 50만이라는 숫자가 들어오는 조건이기 때문에, 이는 배열로 구현하면 시간 초과가 남. deq를 할 때 bigO(1)로 시간 복잡도를 줄이기 위해 아래처럼 구현.
class Queue {
  constructor() {
    this._storage = {};
    this._front = 0;
    this._rear = 0;
    this._temp = 0;
  }

  size() {
    if(this._storage[this._rear] === undefined) {
      return 0;
    } else {
      return this._rear - this._front + 1;
    }
  }

  enq(item) {
    if(this.size() === 0) {
      this._storage['0'] = item;
    } else {
      this._rear += 1;
      this._storage[this._rear] = item;
    }
  }

  deq() {
    if(this._front === this._rear) {
      this._temp = this._storage[this._front];
      delete this._storage[this._front];

      this._front = 0;
      this._rear = 0;
    } else {
      this._temp = this._storage[this._front];
      delete this._storage[this._front];
      this._front += 1;
    }

    return this._temp;
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const n = input[0];

const queue = new Queue();

let isKeep = false;

for(let i = 1; i <= n; i++) {
  queue.enq(i);
}

while(queue.size() !== 1) {
  if(isKeep) {
    queue.enq(queue.deq());
    isKeep = false;
  } else {
    queue.deq();
    isKeep = true;
  }
}

console.log(queue.deq());