const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let lineIdx = 0;
const [V, E] = input[lineIdx++].split(' ').map(Number);
const K = Number(input[lineIdx++]);

const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 0; i < E; i++) {
    const [u, v, w] = input[lineIdx++].split(' ').map(Number);
    graph[u].push({ to: v, weight: w });
}

const INF = Infinity;
const dist = Array(V + 1).fill(INF);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[parentIdx].cost <= this.heap[index].cost) break;
            
            // 자리 바꾸기
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
        }
    }

    bubbleDown(index) {
        const length = this.heap.length;
        while (true) {
            let leftIdx = index * 2 + 1;
            let rightIdx = index * 2 + 2;
            let smallest = index;

            if (leftIdx < length && this.heap[leftIdx].cost < this.heap[smallest].cost) {
                smallest = leftIdx;
            }
            if (rightIdx < length && this.heap[rightIdx].cost < this.heap[smallest].cost) {
                smallest = rightIdx;
            }

            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function dijkstra(start) {
    const pq = new MinHeap();
    
    dist[start] = 0;
    pq.push({ node: start, cost: 0 });

    while (!pq.isEmpty()) {
        const { node: currNode, cost: currCost } = pq.pop();

        if (dist[currNode] < currCost) continue;

        for (const next of graph[currNode]) {
            const nextNode = next.to;
            const nextCost = currCost + next.weight;

            if (nextCost < dist[nextNode]) {
                dist[nextNode] = nextCost;
                pq.push({ node: nextNode, cost: nextCost });
            }
        }
    }
}

dijkstra(K);

const result = [];
for (let i = 1; i <= V; i++) {
    if (dist[i] === INF) {
        result.push("INF");
    } else {
        result.push(dist[i]);
    }
}

console.log(result.join('\n'));