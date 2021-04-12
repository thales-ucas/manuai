// node --experimental-modules mat-addtion.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[1,3], [5,7], [9,1]]);
const b = new Matrix([[2,2], [4,0], [6,8]]);
console.log('相加', a.plus(b));
console.log('相减', a.minus(b));
