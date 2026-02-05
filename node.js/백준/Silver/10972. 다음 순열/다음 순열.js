const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

const N = +input[0];
const arr = [];
for (let k = 1; k <= N; k++) {
    arr.push(+input[k]);
}

function solve() {
    let i = N - 1;
    while (i > 0 && arr[i - 1] >= arr[i]) {
        i--;
    }

    if (i <= 0) {
        console.log(-1);
        return;
    }

    let j = N - 1;
    while (arr[j] <= arr[i - 1]) {
        j--;
    }

    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];

    let k = N - 1;
    while (i < k) {
        [arr[i], arr[k]] = [arr[k], arr[i]];
        i++;
        k--;
    }

    console.log(arr.join(' '));
}

solve();