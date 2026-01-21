const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const meetings = input.slice(1).map(line => line.split(' ').map(Number));

meetings.sort((a, b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0]; 
    }
    return a[1] - b[1];
});

let count = 0;
let lastEndTime = 0;

for(let i = 0; i < N; i++) {
    const startTime = meetings[i][0];
    const endTime = meetings[i][1];

    if (startTime >= lastEndTime) {
        count++;
        lastEndTime = endTime;
    }
}

console.log(count);