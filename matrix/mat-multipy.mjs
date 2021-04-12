// node --experimental-modules mat-multipy.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[1,3], [5,7], [9,1]]);
const b = new Matrix([[2,4,6], [2,0,8]]);
console.log('AB', a.multiply(b));
console.log('BA', b.multiply(a));
