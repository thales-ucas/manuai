// node --experimental-modules mat-apply.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([
    [1,400,80],
    [2,381,82],
    [3,380,90],
    [4,376,71],
    [5,351,66],
    [6,350,82],
    [7,350,93],
    [8,349,81],
    [9,348,69]
]);
const b = new Matrix([
    [0],
    [0.1],
    [0.5]
]);
console.log('最终分数', a.multiply(b));
