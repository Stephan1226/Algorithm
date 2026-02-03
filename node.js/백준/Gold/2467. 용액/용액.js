const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

const N = +input[0];
const arr = [];
for (let i = 1; i <= N; i++) {
    arr.push(+input[i]);
}

let minAbs = Infinity;
let ans = [0, 0];

for (let i = 0; i < N - 1; i++) {
    let current = arr[i];
    
    let left = i + 1;
    let right = N - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let sum = current + arr[mid];

        if (Math.abs(sum) < minAbs) {
            minAbs = Math.abs(sum);
            ans[0] = current;
            ans[1] = arr[mid];
        }

        if (sum < 0) {
            left = mid + 1;
        } else if (sum > 0) {
            right = mid - 1;
        } else {
            console.log(`${current} ${arr[mid]}`);
            return;
        }
    }
}

console.log(`${ans[0]} ${ans[1]}`);