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
      this.y[i] = [].concat(v);
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

export default Regression;