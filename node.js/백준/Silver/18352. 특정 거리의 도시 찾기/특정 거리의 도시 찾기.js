const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K, X] = input[0].split(' ').map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u].push(v);
}

const INF = Infinity;
const dist = Array(N + 1).fill(INF);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
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
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[parentIdx].cost <= this.heap[index].cost) break;
      [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
      index = parentIdx;
    }
  }

  bubbleDown() {
    let index = 0;
    while (true) {
      let leftIdx = index * 2 + 1;
      let rightIdx = index * 2 + 2;
      let smallest = index;

      if (leftIdx < this.heap.length && this.heap[leftIdx].cost < this.heap[smallest].cost) {
        smallest = leftIdx;
      }
      if (rightIdx < this.heap.length && this.heap[rightIdx].cost < this.heap[smallest].cost) {
        smallest = rightIdx;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
  
  size() {
    return this.heap.length;
  }
}

function dijkstra(start) {
  const pq = new MinHeap();
  
  dist[start] = 0;
  pq.push({ node: start, cost: 0 });

  while (pq.size() > 0) {
    const { node: currNode, cost: currCost } = pq.pop();

    if (dist[currNode] < currCost) continue;

    for (const nextNode of graph[currNode]) {
      const nextCost = currCost + 1;

      if (nextCost < dist[nextNode]) {
        dist[nextNode] = nextCost;
        pq.push({ node: nextNode, cost: nextCost });
      }
    }
  }
}

dijkstra(X);

const result = [];
for (let i = 1; i <= N; i++) {
  if (dist[i] === K) result.push(i);
}

if (result.length === 0) console.log(-1);
else console.log(result.join('\n'));