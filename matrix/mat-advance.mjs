// node --experimental-modules mat-advance.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[0,3,1], [1,-1,1], [3,-1,2]]);
console.log('初始化', new Matrix(3, 2));
console.log(a);
console.log(a.determinant);
console.log(a.T);
console.log(a.H);
console.log(a.I);