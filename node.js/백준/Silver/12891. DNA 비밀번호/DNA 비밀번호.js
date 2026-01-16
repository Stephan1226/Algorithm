const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [strLen, subStrLen] = input[0].split(' ').map(Number);
const str = input[1];
const required = input[2].split(' ').map(Number);

const currentCount = [0, 0, 0, 0]; 
let pwCounter = 0;

function getCharIndex(char) {
    switch(char) {
        case 'A': return 0;
        case 'C': return 1;
        case 'G': return 2;
        case 'T': return 3;
        default: return -1;
    }
}

function checkValid() {
    for(let i = 0; i < 4; i++) {
        if(currentCount[i] < required[i]) return false;
    }
    return true;
}

for(let i = 0; i < subStrLen; i++) {
    const idx = getCharIndex(str[i]);
    if(idx !== -1) currentCount[idx]++;
}

if(checkValid()) pwCounter++;

for(let i = subStrLen; i < strLen; i++) {
    
    const prevCharIdx = getCharIndex(str[i - subStrLen]);
    if(prevCharIdx !== -1) currentCount[prevCharIdx]--;

    const newCharIdx = getCharIndex(str[i]);
    if(newCharIdx !== -1) currentCount[newCharIdx]++;

    if(checkValid()) pwCounter++;
}

console.log(pwCounter);