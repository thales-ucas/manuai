# 矩阵(线性回归中的应用)


我们在多元线性回归中使用了加减乘除之外的几个定义

- 零矩阵(null matrix)
- 行列式(determinant)
- 伴随矩阵(conjugate)
- 逆(inverse)


# 零矩阵(null matrix)


所有元素皆为0的矩阵


我们改造一下之前的类，除了用数组初始化之外，还可以用m和n(行和列)初始化


```js
class Matrix {
  constructor(m, n) {
    if (Array.isArray(m)) { // 非数字用作数组
      this._arr = m;  
    } else {
      if (m >= 1 && n >= 1) { // 数字的话必须行列大于等于1
        this._arr = new Array(m).fill(0).map(() => new Array(n).fill(0));
      } else {
        throw(new Error('m & n must le 1'));
      }
    }
  }
}
```


实际操作一下，创造一个3行2列的零矩阵


```js
// node --experimental-modules mat-advance.mjs
import Matrix from './matrix.mjs';
console.log('零矩阵', new Matrix(3, 2));
```


看结果


```
零矩阵 Matrix {
  _arr: [
    [ 0, 0 ],
    [ 0, 0 ],
    [ 0, 0 ]
  ]
}
```


# 行列式(determinant)


在 n 维欧几里得空间中，行列式描述的是一个线性变换对“体积”所造成的影响


> 行列式计算必须是方阵，也就是m等于n的矩阵


## 表达式


D = |A| = detA = det(a~ij~)


$D=\begin{vmatrix}A\end{vmatrix}=
\begin{vmatrix}
a_{11}&a_{12}&\cdots&a_{1n}
\\
a_{21}&a_{22}&\cdots&a_{2n}
\\
\vdots&\vdots&\ddots&\vdots
\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{vmatrix}
=\sum{(-1)^{k}a_{1k_{1}}a_{2k_{2}}\cdots a_{nk_{n}}}
$


## 示例


$\begin{vmatrix}
1&2
\\
3&4
\end{vmatrix}
=1\times4-2\times3=4-6=-2
$


$\begin{vmatrix}
1&2&3
\\
4&5&6
\\
7&8&9
\end{vmatrix}
=1\times5\times9+2\times6\times7+3\times4\times8-1\times6\times8-2\times4\times9-3\times5\times7=45+84+96-48-72-105=0
$


## 代码实现


一阶，二阶，三阶和n阶，分开计算


```js
class Matrix {
  constructor(m, n) {
    if (Array.isArray(m)) { // 非数字用作数组
      this._arr = m;  
    } else {
      if (m >= 1 && n >= 1) { // 数字的话必须行列大于等于1
        this._arr = new Array(m).fill(0).map(() => new Array(n).fill(0));
      } else {
        throw(new Error('m & n must le 1'));
      }
    }
  }
  ……
  /**
   * 行列式
   */
  get determinant() {
    if (this.m !== this.n) { // 行列式必须是方阵
      throw(new Error('determinant must be a square'));
    }
    const n = this.m;// 方阵阶数
    let res = 0;
    if (n > 3) {
      for (let column = 0; column < n; column++) {// n 阶
        const mat = new Matrix(n - 1, n - 1)// 去掉第 0 行第 column 列的矩阵
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - 1; j++) {
            if (j < column) {
              mat.arr[i][j] = this._arr[i + 1][j];
            } else {
              mat.arr[i][j] = this._arr[i + 1][j + 1];
            }
          }
        }
        res += this._arr[0][column] * Math.pow(-1, 0 + column) * mat.determinant;
      }
    } else if (n === 3) {// 3 阶
      res = this._arr[0][0] * this._arr[1][1] * this._arr[2][2] +
            this._arr[0][1] * this._arr[1][2] * this._arr[2][0] +
            this._arr[0][2] * this._arr[1][0] * this._arr[2][1] -
            this._arr[0][2] * this._arr[1][1] * this._arr[2][0] -
            this._arr[0][1] * this._arr[1][0] * this._arr[2][2] -
            this._arr[0][0] * this._arr[1][2] * this._arr[2][1];
    } else if (n === 2) {// 2 阶
      res = this._arr[0][0] * this._arr[1][1] - this._arr[0][1] * this._arr[1][0];
    } else if (n === 1) {// 1 阶
      res = this._arr[0][0];
    }
    return res;
  }
  /**
   * determinant的简写
   */
  get det() {
    return this.determinant;
  }
  ……
}
```


程序把刚才的二阶三阶行列式算算看


```js
// node --experimental-modules mat-advance.mjs
import Matrix from './matrix.mjs';
console.log('二阶行列式', new Matrix([[1,2], [3,4]]).det);
console.log('三阶行列式', new Matrix([[1,2,3], [4,5,6], [7,8,9]]).det);
```


可以看到我们的输出


```
二阶行列式 -2
三阶行列式 0
```


# 伴随矩阵(conjugate)


与原矩阵形成映射


说伴随矩阵之前，先要了解代数余子式


## 代数余子式(algebraic cofactor)


在n阶行列式中，把元素aₒₑ所在的第o行和第e列划去后，留下来的n-1阶行列式叫做元素aₒₑi的余子式，记作Mₒₑ


将余子式Mₒₑ再乘以-1的o+e次幂记为Aₒₑ，Aₒₑ叫做元素aₒₑ的代数余子式


$D=\begin{vmatrix}
1&2&3
\\
4&5&6
\\
7&8&9
\end{vmatrix}\\
A_{11}=(-1)^{1+1}\times\begin{vmatrix}
5&6
\\
8&9
\end{vmatrix}$


> A~11~就是去除了第一行和第一列，只剩下后面的内容


## 表达式


回来继续说伴随矩阵


一个矩阵的伴随矩阵就是所有位置对应的代数余子式组成的矩阵


$A=(a_{ij})_{n\times n}\\
A^{*}=\begin{vmatrix}
A_{11}&A_{12}&\cdots&A_{1n}
\\
A_{21}&A_{22}&\cdots&A_{2n}
\\
\vdots&\vdots&\ddots&\vdots
\\
A_{n1}&A_{n2}&\cdots&A_{nn}
\end{vmatrix}$


## 示例


$A=\begin{bmatrix}
1&2&3
\\
4&5&6
\\
7&8&9
\end{bmatrix}\\
A_{11}=(-1)^{1+1}\times\begin{vmatrix}
5&6
\\
8&9
\end{vmatrix}=1\times(5\times9-6\times8)=45-48=-3\\
A_{12}=(-1)^{1+2}\times\begin{vmatrix}
4&6
\\
7&9
\end{vmatrix}=-1\times(4\times9-6\times7)=-1\times(36-42)=6\\
A_{13}=(-1)^{1+3}\times\begin{vmatrix}
4&5
\\
7&8
\end{vmatrix}=-3\\
A_{21}=(-1)^{2+1}\times\begin{vmatrix}
2&3
\\
8&9
\end{vmatrix}=6\\
A_{22}=(-1)^{2+2}\times\begin{vmatrix}
1&3
\\
7&9
\end{vmatrix}=-12\\
A_{23}=(-1)^{2+3}\times\begin{vmatrix}
1&2
\\
7&8
\end{vmatrix}=6\\
A_{31}=(-1)^{3+1}\times\begin{vmatrix}
2&3
\\
5&6
\end{vmatrix}=-3\\
A_{32}=(-1)^{3+2}\times\begin{vmatrix}
1&3
\\
4&6
\end{vmatrix}=6\\
A_{33}=(-1)^{3+3}\times\begin{vmatrix}
1&2
\\
4&5
\end{vmatrix}=-3\\
A^{*}=\begin{bmatrix}
-3&6&-3\\
6&-12&6\\
-3&6&-3
\end{bmatrix}
$


## 代码实现


我们在刚才的Matrix类增加两个方法分别是加法和减法


```js
class Matrix {
  ……
  /**
   * 伴随矩阵
   */
  get H() {
    if (this.m !== this.n) { // 行列式必须是方阵
      throw(new Error('determinant must be a square'));
    }
    let n = this.arr.length;
    if (n === 1) {
      return new Matrix([[1]]);
    }
    const mat = new Matrix(n, n);
    for (let row = 0; row < n; row++) {
      for (let column = 0; column < n; column++) {
        const amat = this.clone();
        amat.arr.splice(row, 1);// 去掉第 row 行第 column 列的矩阵
        amat.arr.map(arr => arr.splice(column, 1));
        mat.arr[row][column] = Math.pow(-1, row + column) * amat.determinant;
      }
    }
    return mat.T;
  }
  ……
}
```


我们调用一下看看


```js
// node --experimental-modules mat-addtion.mjs
import Matrix from './matrix.mjs';
console.log('伴随矩阵', new Matrix([[1,2,3], [4,5,6], [7,8,9]]).H);
```


输出结果为


```
伴随矩阵 Matrix { _arr: [ [ -3, 6, -3 ], [ 6, -12, 6 ], [ -3, 6, -3 ] ] }
```


# 逆(inverse)


设A是一个n阶矩阵，若存在另一个n阶矩阵B，使得： AB=BA=E ，则称方阵A可逆，并称方阵B是A的逆矩阵


若矩阵A是可逆的，则A的逆矩阵是唯一的，并记作A的逆矩阵为A^-1^ 


## 表达式


$A^{-1}=\frac{1}{\begin{vmatrix}A\end{vmatrix}}A^{*}$


伴随矩阵除以行列式就是逆矩阵


根据表达式，行列式为0是不可逆的


## 代码实现


```js
class Matrix {
  ……
  /**
   * 逆矩阵
   */
  get I() {
    if (this.m !== this.n) { // 行列式必须是方阵
      throw(new Error('determinant must be a square'));
    }
    let mat = this.H;    
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        mat.arr[i][j] /= this.determinant;
      }
    }
    return mat;
  }
  ……
}
```


调用一下看看


```js
// node --experimental-modules mat-multipy.mjs
import Matrix from './matrix.mjs';
console.log('逆矩阵', new Matrix([[1,2], [3,4]]).I);
```


输出结果


```
逆矩阵 Matrix { _arr: [ [ -2, 1 ], [ 1.5, -0.5 ] ] }
```



源码:


- https://gitee.com/thales-ucas/manuai/tree/main/matrix
- https://github.com/thales-ucas/manuai/tree/main/matrix