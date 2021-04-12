/**
 * 数学矩阵
 */
class Matrix {
  constructor(arr) {
    this.check(arr);
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
   * 检测合法性
   * @param arr 二维数组
   */
  check(arr) {
    if (!Array.isArray(arr)) {
      throw(new Error('paramater not an array'));
    }
    if (arr.length == 0) {
      throw(new Error('paramater is an empty array'));
    }
    if (!Array.isArray(arr[0])) {
      throw(new Error('paramater need a two dimensional matrix'));
    }
    const len = arr[0].length;
    for (const row of arr) {
      if(row.length !== len) {
        throw(new Error('matrix is invalid'));
      }
      for (const col of row) {
        if(isNaN(col)) {
          throw(new Error('matrix value should be number'));
        }
      }
    }
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
  /**
   * 获取整行
   * @param {int} index 索引
   * @returns {Array} 行
   */
  row(index) {
    return this._arr[index];
  }
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

export default Matrix;