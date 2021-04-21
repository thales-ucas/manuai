// node --experimental-modules mat-advance.mjs
import Matrix from './matrix.mjs';
console.log('零矩阵', new Matrix(3, 2));
console.log('二阶行列式', new Matrix([[1,2], [3,4]]).det);
console.log('三阶行列式', new Matrix([[1,2,3], [4,5,6], [7,8,9]]).det);
console.log('伴随矩阵', new Matrix([[1,2,3], [4,5,6], [7,8,9]]).H);
console.log('逆矩阵', new Matrix([[1,2], [3,4]]).I);