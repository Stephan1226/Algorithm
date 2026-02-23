const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0]);
const parents = input[1].split(' ').map(Number);
const deleteNode = parseInt(input[2]);

// 트리의 각 노드별 자식 노드들을 저장할 2차원 배열
const tree = Array.from({ length: N }, () => []);
let rootNode = -1;

// 1. 트리 구조 생성하기
for (let i = 0; i < N; i++) {
    const parent = parents[i];
    if (parent === -1) {
        rootNode = i; // 부모가 -1이면 루트 노드
    } else {
        tree[parent].push(i); // 부모 노드의 배열에 현재 노드(자식)를 추가
    }
}

let leafCount = 0;

// 2. DFS 탐색 함수
function dfs(node) {
    // 만약 현재 탐색하려는 노드가 삭제할 노드라면 바로 종료
    if (node === deleteNode) return;
    
    let isLeaf = true;
    
    // 현재 노드의 자식들을 순회
    for (let child of tree[node]) {
        // 자식이 삭제될 노드가 아니라면
        if (child !== deleteNode) {
            isLeaf = false; // 온전한 자식이 있으므로 현재 노드는 리프 노드가 아님
            dfs(child);     // 자식 노드로 계속 탐색 진행
        }
    }
    
    // 온전한 자식이 하나도 없었다면 리프 노드로 카운트
    if (isLeaf) {
        leafCount++;
    }
}

// 3. 실행 및 결과 출력
// 루트 노드 자체가 삭제되는 경우가 아니라면 탐색 시작
if (rootNode !== deleteNode) {
    dfs(rootNode);
}

console.log(leafCount);