function solution(n, times) {
    times.sort((a, b) => a - b);
    
    let left = 1n;
    let right = BigInt(times[times.length - 1]) * BigInt(n);
    let answer = right;

    while (left <= right) {
        const mid = (left + right) / 2n;
        let count = 0n;

        for (const t of times) {
            count += mid / BigInt(t);
            
            if (count >= BigInt(n)) break;
        }

        if (count >= BigInt(n)) {
            answer = mid;
            right = mid - 1n;
        } else {
            left = mid + 1n;
        }
    }

    return Number(answer);
}