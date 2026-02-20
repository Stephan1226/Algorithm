const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');

const N = parseInt(input[0], 10);
const K = parseInt(input[1], 10);
const MAX = 100000;

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }
    
    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let pIdx = Math.floor((idx - 1) / 2);
            if (this.heap[pIdx].cost <= this.heap[idx].cost) break;
            [this.heap[pIdx], this.heap[idx]] = [this.heap[idx], this.heap[pIdx]];
            idx = pIdx;
        }
    }
    
    bubbleDown() {
        let idx = 0;
        const len = this.heap.length;
        while (true) {
            let lIdx = idx * 2 + 1;
            let rIdx = idx * 2 + 2;
            let smallest = idx;
            
            if (lIdx < len && this.heap[lIdx].cost < this.heap[smallest].cost) smallest = lIdx;
            if (rIdx < len && this.heap[rIdx].cost < this.heap[smallest].cost) smallest = rIdx;
            
            if (smallest === idx) break;
            
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

const dist = Array(MAX + 1).fill(Infinity);
const pq = new MinHeap();

dist[N] = 0;
pq.push({ node: N, cost: 0 });

while (!pq.isEmpty()) {
    const { node, cost } = pq.pop();

    if (node === K) {
        console.log(cost);
        break;
    }

    if (dist[node] < cost) continue;

    const nextSteps = [
        { n: node * 2, c: cost },
        { n: node + 1, c: cost + 1 },
        { n: node - 1, c: cost + 1 }
    ];

    for (const { n, c } of nextSteps) {
        if (n >= 0 && n <= MAX && c < dist[n]) {
            dist[n] = c;
            pq.push({ node: n, cost: c });
        }
    }
}