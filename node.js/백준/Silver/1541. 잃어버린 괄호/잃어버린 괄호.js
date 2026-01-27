const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim();

const groups = input.split('-');

let result = 0;

const firstGroup = groups[0].split('+').map(Number);
for (let num of firstGroup) {
    result += num;
}

for (let i = 1; i < groups.length; i++) {
    const subGroup = groups[i].split('+').map(Number);
    let sum = 0;
    for (let num of subGroup) {
        sum += num;
    }
    result -= sum;
}

    console.log(result);