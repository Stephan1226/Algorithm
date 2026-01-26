const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const board = [];
for (let i = 1; i <= N; i++) {
    board.push(input[i].split(' ').map(Number));
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const queue = [];
let unripeTomatoes = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (board[i][j] === 1) {
            queue.push([i, j]);
        } else if (board[i][j] === 0) {
            unripeTomatoes++;
        }
    }
}

if (unripeTomatoes === 0) {
    console.log(0);
    process.exit();
}

let head = 0;
let days = 0;

while (queue.length > head) {
    const [x, y] = queue[head++];
    
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
            if (board[nx][ny] === 0) {
                board[nx][ny] = board[x][y] + 1;
                queue.push([nx, ny]);
                unripeTomatoes--;
            }
        }
    }
}

if (unripeTomatoes > 0) {
    console.log(-1);
} else {
    const [lastX, lastY] = queue[queue.length - 1];
    console.log(board[lastX][lastY] - 1);
}