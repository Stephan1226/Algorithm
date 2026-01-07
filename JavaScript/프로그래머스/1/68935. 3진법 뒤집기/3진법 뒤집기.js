function solution(n) {
    
    let answer = 0;
    let reversed = 0n;
    let stringReversed = ' ';
    let reversedNumLength = 0;
    let indexCounter = 0;

    while (n > 0) {
        reversed *= 10n;
        reversed += (BigInt(n) % 3n);
        n = Math.floor(n / 3);
    }

    stringReversed = reversed.toString();
    reversedNumLength = stringReversed.length;
    indexCounter = reversedNumLength - 1;

    for (let i = 0; i < reversedNumLength; i++) {
        answer += stringReversed[indexCounter] * 3**i;
        indexCounter -= 1;
    }
    
    return answer;
}