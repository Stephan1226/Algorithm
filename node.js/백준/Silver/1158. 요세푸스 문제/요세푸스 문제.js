class CircularQueue {
    constructor(capacity) {
        this.capacity = capacity; 
        this.queue = new Array(capacity); 
        this.front = -1; 
        this.rear = -1;  
        this.size = 0;   
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    enq(item) {
        if (this.isFull()) {
            console.log("큐가 가득 찼습니다. 삽입 불가.");
            return false;
        }
        
        if (this.isEmpty()) {
            this.front = 0;
        }
        
        this.rear = (this.rear + 1) % this.capacity;
        this.queue[this.rear] = item;
        this.size++;
        return true;
    }

    deq() {
        if (this.isEmpty()) {
            console.log("큐가 비었습니다. 삭제 불가.");
            return null;
        }
        
        const item = this.queue[this.front];
        this.queue[this.front] = null;
        this.size--;
        
        if (this.isEmpty()) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[this.front];
    }

    printQueue() {
        console.log("Queue:", this.queue, "Front:", this.front, "Rear:", this.rear, "Size:", this.size);
    }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt"
const input = require("fs").readFileSync(filePath).toString().trim().split(" ")

// 요세푸스 순열 (n, k)
const n = input[0];
const k = input[1];

const result = [];

const cq = new CircularQueue(n);

for (let i = 1; i <= n; i++) {
  cq.enq(i);
}

for (; !cq.isEmpty(); ) {
  for (let i = 1; i < k; i++) {
    cq.enq(cq.deq());
  }
  result.push(cq.deq());
}

console.log('<'+result.join(', ')+'>');