# 多元线性回归


之前做了一元线性回归，但是现实中影响因素往往不是一个，而是多个，有x~1~、x~2~、x~3~、……、x~n~


## 线性方程


方程也有多个未知数x以及相对应的系数&beta;


y = &beta;~0~ + &beta;~1~x~1~ + &beta;~2~x~2~ + &beta;~3~x~3~  + &hellip; + &beta;~n~x~n~ + &epsilon;


## 矩阵式


大写的X和Y代表了x和y的集合


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;Y=\begin{bmatrix}y_1\\y_2\\\vdots\\y_n\end{bmatrix}" title="Y=\begin{bmatrix}y_1\\y_2\\\vdots\\y_n\end{bmatrix}" />

>

<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;X=\begin{bmatrix}1&x_{11}&\cdots&x_{1p}\\1&x_{21}&\cdots&x_{2p}\\\vdots&\vdots&\ddots&\vdots\\1&x_{n1}&\cdots&x_{np}\end{bmatrix}" title="X=\begin{bmatrix}1&x_{11}&\cdots&x_{1p}\\1&x_{21}&\cdots&x_{2p}\\\vdots&\vdots&\ddots&\vdots\\1&x_{n1}&\cdots&x_{np}\end{bmatrix}" />

>

<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;\beta=\begin{bmatrix}\beta0\\\beta_1\\\beta_2\\\vdots\\\beta_n\end{bmatrix}" title="\beta=\begin{bmatrix}\beta0\\\beta_1\\\beta_2\\\vdots\\\beta_n\end{bmatrix}" />

> 注意，&beta;是从0开始，X在x值的矩阵的基础上，最左侧加了一列都是1的列


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;\epsilon=\begin{bmatrix}\epsilon_1\\\epsilon_2\\\vdots\\\epsilon_n\end{bmatrix}" title="\epsilon=\begin{bmatrix}\epsilon_1\\\epsilon_2\\\vdots\\\epsilon_n\end{bmatrix}" />


那么这个时候的多元线性回归的表示就变成了


Y=X&beta;+&epsilon;


其中X我们一般称为**设计矩阵**


使用最小二乘算出&beta;


<img src="https://latex.codecogs.com/png.image?\dpi{110}&space;\hat{\beta}=(X^TX)^{-1}X^TY" title="\hat{\beta}=(X^TX)^{-1}X^TY" />


## 推导过程


Y=X&beta;+&epsilon;


Y-X&beta;=&epsilon;


> 我们把等式两边都转置，然后乘以X矩阵


(Y-X&beta;)^T^X=&epsilon;^T^X


> 我们要让&epsilon;的加和等于0，其实就是&epsilon;^T^[1, x~1~, x~2~ ... x~n~]=0


(Y-X&beta;)^T^X=0


> 转置运算


(Y^T^-&beta;^T^X^T^)X=0


Y^T^X-&beta;^T^X^T^X=0


Y^T^X=&beta;^T^X^T^X


X^T^Y=X^T^X&beta;


&beta;=(X^T^X)^-1^X^T^Y


这样就可以求出&beta;了


## 代码实现


用之前的矩阵类，逻辑上，比之前的一元线性回归更简单


[matrix类请看之前的介绍](../matrix/README.md)


```js
import Matrix from '../matrix/matrix.mjs'
class Regression {
  constructor() {
    this.x = []; // x数据
    this.y = []; // y数据
    this.beta = null; // beta矩阵
  }
  /**
   * 适配
   * @param {Array} x 
   * @param {Array} y 
   */
  fit(x, y) {
    this.x = new Array(x.length);
    x.forEach((v, i) => {
      this.x[i] = [1].concat(v);
    });
    this.y = new Array(y.length);
    y.forEach((v, i) => {
      this.y[i] = [v];
    });
    this.beta = this.getBeta();
  }
  /**
   * 预测
   * @param {Array}  x 数据集
   * @returns {Array} 预测结果数据集
   */
  predict(x) {
    const xMat = new Matrix(x.length, 1);
    x.forEach((v, i) => {
      xMat.arr[i] = [1].concat(v);
    });
    const y = xMat.multiply(this.beta);
    return y.arr;
  }
  /**
   * 获取beta
   * @returns {Matrix}  参数矩阵
   */
  getBeta() {
    const xMat = new Matrix(this.x);
    const yMat = new Matrix(this.y);
    const beta = (xMat.T.multiply(xMat)).I.multiply(xMat.T.multiply(yMat)); // beta矩阵公式
    return beta;
  }
}
```


拿上次的数据试一试


```js
// node --experimental-modules multiple.mjs
import Regression from './regression.mjs'
const model = new Regression() // 构造回归模型
const x = [300,400,400,550,720,850,900,950];
const y = [300,350,490,500,600,610,700,660];
model.fit(x, y); // 训练模型
const predictions = model.predict([200, 1000]); // 预测数据
console.log(predictions);
```


跟之前的几乎一样


```
[ [ 295.9456698782535 ], [ 720.7144631863723 ] ]
```


## 测试多元数据


我们的模型是要适用于多元回归的，找个多个条件的数据来试试看


价格（千美元）|面积（平方英尺）|邻近区域的质量比率（1-5）|一般条件的比率（1-5）
-- | -- | -- | --
350|2100|2|5
280|1560|4|4
285|2420|4|2
210|1201|5|3
450|3020|4|3
465|4200|3|4
405|2100|3|5
440|2356|5|3
345|4005|3|2
375|1980|3|5
290|2220|2|3
490|4500|5|1
250|1450|5|4
235|2300|2|4
105|1354|1|3
310|3560|3|2
215|2580|1|3
440|2300|5|5
415|3890|2|4
270|2100|4|1


总共20条数据，我们把前75%作为训练集，后25%作为测试集看看效果


```js
// node --experimental-modules multiple.mjs
import Regression from './regression.mjs'
const model = new Regression() // 构造回归模型
const data = [ // 数据
  [350,2100,2,5],
  [280,1560,4,4],
  [285,2420,4,2],
  [210,1201,5,3],
  [450,3020,4,3],
  [465,4200,3,4],
  [405,2100,3,5],
  [440,2356,5,3],
  [345,4005,3,2],
  [375,1980,3,5],
  [290,2220,2,3],
  [490,4500,5,1],
  [250,1450,5,4],
  [235,2300,2,4],
  [105,1354,1,3],
  [310,3560,3,2],
  [215,2580,1,3],
  [440,2300,5,5],
  [415,3890,2,4],
  [270,2100,4,1]
]
const train = data.slice(0, -5); // 训练集
const test = data.slice(-5); // 测试集
const x = new Array(train.length);
const y = new Array(train.length);
train.forEach((row, index) => {
  x[index] = row.slice(1);
  y[index] = row[0];
});
const testX = new Array(test.length);
test.forEach((row, index) => {
  testX[index] = row.slice(1);
})
model.fit(x, y); // 训练模型
const predictions = model.predict(testX); // 预测数据
console.log(predictions);
```


输出结果


```
[
  [ 354.86904381189044 ],
  [ 233.23653638019994 ],
  [ 457.350958770799 ],
  [ 448.711744540383 ],
  [ 200.66698220958207 ]
]
```


完全自己用代码写一遍，是不是更能有助于理解机器学习呢？



源码:


- https://gitee.com/thales-ucas/manuai.git
- https://github.com/thales-ucas/manuai.git