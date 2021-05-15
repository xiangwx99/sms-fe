// const tree = [
//   { node: 2, children: [3, 4] },
//   { node: 1, children: [2] },
//   { node: 3, children: [null] },
//   { node: 4, children: [5] },
// ];

// function wideTravel(tree) {
//   let queue = [],
//     res = [];
//   // 查询根节点
//   let childArr = [];
//   tree.forEach((obj) => {
//     childArr = [...childArr, ...obj.children];
//   });
//   tree.forEach(
//     (obj) => childArr.indexOf(obj.node) === -1 && queue.push(obj.node)
//   );
//   while (queue.length > 0) {
//     let first = queue.splice(0, 1)[0];
//     res.push(first);
//     tree.forEach((obj) => {
//       if (obj.node === first) {
//         queue = queue.concat(...obj.children);
//       }
//     });
//   }
//   return res;
// }
// console.log(wideTravel(tree));
// const arr = [
//   { node: "a", children: ["b", "c"] },
//   { node: "d", children: ["a"] },
//   { node: "b", children: ["e", "i"] },
//   { node: "c", children: ["f"] },
//   { node: "f", children: ["g"] },
//   { node: "e", children: ["h"] },
// ];
// 输入 arr; 输出
