console.log('global:', global);
// 手动执行一次垃圾回收，保证获取的内存使用状态准确
global.gc(); 

// 查看内存占用的初始状态，heapUsed 为 4M 左右
console.log(process.memoryUsage()); 
/*{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }*/

let wm = new WeakMap();

let b = new Object();

global.gc();

// 此时，heapUsed 仍然为 4M 左右
console.log(process.memoryUsage()); 
/*{ rss: 20537344,
  heapTotal: 9474048,
  heapUsed: 3967272,
  external: 8993 }
*/
// 在 WeakMap 中添加一个键值对，
// 键名为对象 b，键值为一个 5*1024*1024 的数组  
wm.set(b, new Array(5*1024*1024));
// WeakMap {}

// 手动执行一次垃圾回收
global.gc();

// 此时，heapUsed 为 45M 左右
process.memoryUsage(); 
/*{ rss: 62652416,
  heapTotal: 51437568,
  heapUsed: 45911664,
  external: 8951 }*/

// 解除对象 b 的引用  
b = null;

// 再次执行垃圾回收
global.gc();

// 解除 b 的引用以后，heapUsed 变回 4M 左右
// 说明 WeakMap 中的那个长度为 5*1024*1024 的数组被销毁了
process.memoryUsage(); 
/*{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }*/