// const loop = (a, b, c) => {
//   for (;;) {
//     if (a > 2 * b) {
//       break;
//     }
//     a += c - b;
//     b++;
//     c--;
//   }
//   console.log() c - a;
// };

// console.log(loop(2, 5, 7));

let a = ["Z", "X", "C"];
let b;
for (let i = 0; i < 5; i++) {
  b = a[0];
  a[0] = a[2];
  a[1] = b;
  a[2] = a[1];
}
console.log(a);

let amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let numbers = [1, 2, 3, 4, 2, 9, 3];
for (let i = 0; i < numbers.length; i++) {
  amount[numbers[i]]++;
}
console.log(amount[1]);
