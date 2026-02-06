function solution(numbers) {
    const primeSet = new Set();
    const nums = numbers.split('');
    const visited = new Array(nums.length).fill(false);

    function dfs(currentStr) {
        if (currentStr.length > 0) {
            primeSet.add(Number(currentStr));
        }

        for (let i = 0; i < nums.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(currentStr + nums[i]);
                visited[i] = false;
            }
        }
    }

    dfs("");

    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    let count = 0;
    for (const num of primeSet) {
        if (isPrime(num)) {
            count++;
        }
    }

    return count;
}