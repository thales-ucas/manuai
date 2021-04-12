// node --experimental-modules mat-init.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[1,3], [5,7], [9,1]]);
console.log('矩阵类', a);
console.log('矩阵尺寸', a.m, a.n);
console.log('矩阵第一行', a.row(0));
console.log('矩阵第一列', a.col(0));
console.log('转置', a.T);