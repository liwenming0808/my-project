/**
 *
 * @param {*}
 * nodeList: {  // 节点的唯一值
 *  target: 1, // 从什么节点出发
    source: 2  // 连接到什么节点
 * }
    注意点：编辑时，需要找到所有连接的节点信息
 */

export const isClosedLoop = (nodeList) => {
// 获取所有的节点
const edges = nodeList;

const nodes = [];

const list = {}; // 邻接表

const queue = []; // 入度为0的节点集合

const indegree = {};

edges.forEach(e => {

  const { source, target } = e;

  if (!nodes.includes(source)) {

      nodes.push(source);

  }

  if (!nodes.includes(target)) {

      nodes.push(target);

  }

  addEdge(source, target);

});

const V = nodes.length;

nodes.forEach(node => {

  if (!indegree[node]) indegree[node] = 0;

  if (!list[node]) list[node] = [];

});

function addEdge(source, target) {

  if (!list[source]) list[source] = [];

  if (!indegree[target]) indegree[target] = 0;

  list[source].push(target);

  indegree[target] += 1;

}

function sort() {

  Object.keys(indegree).forEach(id => {

      if (indegree[id] === 0) {

      queue.push(id);

  }

});

let count = 0;

while (queue.length) {

  ++count;

  const currentNode = queue.pop();

  const nodeTargets = list[currentNode];

  for (let i = 0; i < nodeTargets.length; i++) {

      const target = nodeTargets[i];

      indegree[target] -= 1;

      if (indegree[target] === 0) {

          queue.push(target);

      }

  }

}

// false 没有输出全部顶点，有向图中有回路

return !(count < V);

}

return sort()
}
