# 矩阵


在数学中，矩阵（Matrix）是一个按照长方阵列排列的复数或实数集合


最早来自于方程组的系数及常数所构成的方阵，这一概念由19世纪英国数学家凯利首先提出


多元计算时候，矩阵很常见


人工智能中，多元计算很常见，现在我们来实现一下矩阵的计算


## 代码实现


python代码numpy自己就有，但是我们现在给没有矩阵类的javascript添加一个矩阵类


```js
/**
 * 数学矩阵
 */
class Matrix {
  constructor(arr) {
    this._arr = arr;
  }
  /**
   * 矩阵数组
   */
  get arr() {
    return this._arr;
  }
  /**
   * 行
   */
  get m() {
    return this._arr.length;
  }
  /**
   * 列
   */
  get n() {
    return this._arr[0].length;
  }
  /**
   * 转置
   */
  get T() {
    const arr = new Array(this.n);
    for (let i = 0; i < this.n; i++) {
      arr[i] = new Array(this.m);
      for (let j = 0; j < this.m; j++) {
        arr[i][j] = this._arr[j][i];
      }
    }
    return new Matrix(arr);
  }
  /**
   * 克隆矩阵
   * @returns {Array} 矩阵数组
   */
  clone() {
    const arr = new Array(this.m);
    for (let i = 0; i < this.m; i++) {
      arr[i] = new Array(this.n);
      for (let j = 0; j < this.n; j++) {
        arr[i][j] = this._arr[i][j];
      }
    }
    return new Matrix(arr);
  }
  /**
   * 获取整列
   * @param {int} n 索引
   * @returns {Array} 列
   */
  col(index) {
    const arr = [];
    this._arr.forEach(row => {
      arr.push(row[index]);
    });
    return arr;
  }
}
```


我们可以用一个二维数组创建一个矩阵


```js
// node --experimental-modules mat-init.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[1,3], [5,7], [9,1]]);
console.log('矩阵类', a);
console.log('矩阵尺寸', a.m, a.n);
console.log('矩阵第一行', a.row(0));
console.log('矩阵第一列', a.col(0));
console.log('转置', a.T);
```


可以看到我们的输出


```
矩阵类 Matrix { _arr: [ [ 1, 3 ], [ 5, 7 ], [ 9, 1 ] ] }
矩阵尺寸 3 2
矩阵第一行 [ 1, 3 ]
矩阵第一列 [ 1, 5, 9 ]
转置 Matrix { _arr: [ [ 1, 5, 9 ], [ 3, 7, 1 ] ] }
```


# 矩阵加法(Matrix addition)


矩阵加法，数学术语，定义为在数学里，矩阵加法一般是指两个矩阵把其相对应元素加在一起的运算


> 矩阵还有个定义叫“直和”(&oplus;)千万别跟加法弄混了


## 加法


通常的矩阵加法被定义在两个相同大小的矩阵


两个m×n矩阵A和B的和，标记为A+B，一样是个m×n矩阵，其内的各元素为其相对应元素相加后的值


例如：


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}&plus;\begin{bmatrix}2&2\\4&0\\6&8\end{bmatrix}=\begin{bmatrix}1&plus;2&3&plus;2\\5&plus;4&7&plus;0\\9&plus;6&1&plus;8\end{bmatrix}=\begin{bmatrix}3&5\\9&7\\15&9\end{bmatrix}" title="\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}+\begin{bmatrix}2&2\\4&0\\6&8\end{bmatrix}=\begin{bmatrix}1+2&3+2\\5+4&7+0\\9+6&1+8\end{bmatrix}=\begin{bmatrix}3&5\\9&7\\15&9\end{bmatrix}" />


> 两个矩阵必须行列都一样才能想加，比如上面的式子都是3&times;2的矩阵


## 减法


也可以做矩阵的减法，只要其大小相同的话。A-B内的各元素为其相对应元素相减后的值，且此矩阵会和A、B有相同大小


例如：


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}-\begin{bmatrix}2&2\\4&0\\6&8\end{bmatrix}=\begin{bmatrix}1-2&3-2\\5-4&7-0\\9-6&1-8\end{bmatrix}=\begin{bmatrix}-1&1\\1&7\\3&-7\end{bmatrix}" title="\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}-\begin{bmatrix}2&2\\4&0\\6&8\end{bmatrix}=\begin{bmatrix}1-2&3-2\\5-4&7-0\\9-6&1-8\end{bmatrix}=\begin{bmatrix}-1&1\\1&7\\3&-7\end{bmatrix}" />

## 代码实现


我们在刚才的Matrix类增加两个方法分别是加法和减法


```js
class Matrix {
  ……
  /**
   * 矩阵相加
   * @param {Matrix} mat 要想加的同形矩阵
   * @returns {Matrix} 矩阵
   */
  plus(mat) {
    const arr = new Array(this.m);
    for (let i = 0; i < this.m; i++) {
      arr[i] = new Array(this.n);
      for (let j = 0; j < this.n; j++) {
        arr[i][j] = this._arr[i][j] + mat.arr[i][j];
      }
    }
    return new Matrix(arr);
  }
  /**
   * 矩阵相减
   * @param {Matrix} mat 要想加的同形矩阵
   * @returns {Matrix} 矩阵
   */
   minus(mat) {
    const arr = new Array(this.m);
    for (let i = 0; i < this.m; i++) {
      arr[i] = new Array(this.n);
      for (let j = 0; j < this.n; j++) {
        arr[i][j] = this._arr[i][j] - mat.arr[i][j];
      }
    }
    return new Matrix(arr);
  }
}
```


我们调用一下看看


```js
// node --experimental-modules mat-addtion.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[1,3], [5,7], [9,1]]);
const b = new Matrix([[2,2], [4,0], [6,8]]);
console.log('相加', a.plus(b));
console.log('相减', a.minus(b));
```


输出结果为


```
相加 Matrix { _arr: [ [ 3, 5 ], [ 9, 7 ], [ 15, 9 ] ] }
相减 Matrix { _arr: [ [ -1, 1 ], [ 1, 7 ], [ 3, -7 ] ] }
```


# 矩阵乘法(Matrix multiplication)


矩阵相乘最重要的方法是一般矩阵乘积。


它只有在第一个矩阵的列数（column）和第二个矩阵的行数（row）相同时才有意义


一般单指矩阵乘积时，指的便是一般矩阵乘积


> 千万不要跟“克罗内克积”(&otimes;)弄混


## 定义


设A为m&times;p的矩阵，B为p&times;n的矩阵，那么m&times;n的矩阵C为矩阵A与B的乘积，记作C=AB


例如：


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;A=\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}" title="A=\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}" />

> 

<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;B=\begin{bmatrix}2&2\\4&0\\6&8\end{bmatrix}" title="B=\begin{bmatrix}2&2\\4&0\\6&8\end{bmatrix}" />


如果A和B还是之前那样的是不能乘的，因为A的行必须跟B的列相等，A的行是3，B的列是2


B必须列等于3才能相乘


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;A=\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}" title="A=\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}" />

>

<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;B=\begin{bmatrix}2&4&6\\2&0&8\end{bmatrix}" title="B=\begin{bmatrix}2&4&6\\2&0&8\end{bmatrix}" />

>

<img src="https://latex.codecogs.com/png.image?C=AB=\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}\times\begin{bmatrix}2&4&6\\2&0&8\end{bmatrix}\\=\begin{bmatrix}1\times2&plus;3\times2&1\times4&plus;3\times0&1\times6&plus;3\times8\\5\times2&plus;7\times2&4\times2&plus;7\times2&0\times6&plus;7\times8\\9\times2&plus;1\times2&9\times4&plus;1\times0&9\times6&plus;1\times8\end{bmatrix}=\begin{bmatrix}8&4&30\\24&20&86\\20&36&62\end{bmatrix}" title="C=AB=\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}\times\begin{bmatrix}2&4&6\\2&0&8\end{bmatrix}\\=\begin{bmatrix}1\times2+3\times2&1\times4+3\times0&1\times6+3\times8\\5\times2+7\times2&4\times2+7\times2&0\times6+7\times8\\9\times2+1\times2&9\times4+1\times0&9\times6+1\times8\end{bmatrix}=\begin{bmatrix}8&4&30\\24&20&86\\20&36&62\end{bmatrix}" />


一个3&times;2的矩阵乘以一个2&times;3的矩阵，最后是3&times;3的矩阵


> 注意，AB不等于BA


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;D=BA=\begin{bmatrix}2&4&6\\2&0&8\end{bmatrix}\times\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}\\=\begin{bmatrix}2\times1&plus;4\times5&plus;6\times9&2\times3&plus;4\times7&plus;6\times1\\2\times1&plus;0\times5&plus;8\times9&2\times3&plus;0\times7&plus;8\times1\end{bmatrix}=\begin{bmatrix}76&40\\74&14\end{bmatrix}" title="D=BA=\begin{bmatrix}2&4&6\\2&0&8\end{bmatrix}\times\begin{bmatrix}1&3\\5&7\\9&1\end{bmatrix}\\=\begin{bmatrix}2\times1+4\times5+6\times9&2\times3+4\times7+6\times1\\2\times1+0\times5+8\times9&2\times3+0\times7+8\times1\end{bmatrix}=\begin{bmatrix}76&40\\74&14\end{bmatrix}" />


一个2&times;3的矩阵乘以一个3&times;2的矩阵，最后是2&times;2的矩阵


## 代码实现


```js
class Matrix {
  ……
  /**
   * 矩阵相乘
   * @param {Matrix} mat 相乘的矩阵
   * @returns {Matrix} 矩阵
   */
  multiply(mat) {
    const arr = new Array(this.m);
    for (let i = 0; i < this.m; i++) {
      arr[i] = new Array(mat.n);
      for (let j = 0; j < mat.n; j++) {
        arr[i][j] = 0;
        for (let k = 0; k < this.n; k++) {
          arr[i][j] += this.arr[i][k] * mat.arr[k][j];
        }
      }
    }
    return new Matrix(arr);
  }
}
```


调用一下看看


```js
// node --experimental-modules mat-multipy.mjs
import Matrix from './matrix.mjs';
const a = new Matrix([[1,3], [5,7], [9,1]]);
const b = new Matrix([[2,4,6], [2,0,8]]);
console.log('AB', a.multiply(b));
console.log('BA', b.multiply(a));
```


输出结果


```
AB Matrix { _arr: [ [ 8, 4, 30 ], [ 24, 20, 86 ], [ 20, 36, 62 ] ] }
BA Matrix { _arr: [ [ 76, 40 ], [ 74, 14 ] ] }
```


## 应用


可能你会好奇矩阵乘法什么情况下应用呢？


其实很常见，比如考研分数

编号 | 初试 | 复试
-- | -- | --
1 | 400 | 80
2 | 381 | 82
3 | 380 | 90
4 | 376 | 71
5 |	351 | 66
6 |	350 | 82
7 | 350 | 93
8 | 349 | 81
9	|	348 | 69

现在我们需要初试成绩除以500乘以50，复试成绩乘以50%，然后加在一起，是最后的成绩


编号 | 初试 | 复试
-- | -- | --
0 | 50/500 | 50/100


> 编号不能加，所以乘以0


```js
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
```


最终结果


```
最终分数 Matrix {
  _arr: [
    [ 80 ],
    [ 79.1 ],
    [ 83 ],
    [ 73.1 ],
    [ 68.1 ],
    [ 76 ],
    [ 81.5 ],
    [ 75.4 ],
    [ 69.30000000000001 ]
  ]
}
```


本次我们讲到这里，之后的人工智能模型会经常用到这个矩阵


源码:


- https://gitee.com/thales-ucas/manuai/tree/main/matrix
- https://github.com/thales-ucas/manuai/tree/main/matrix