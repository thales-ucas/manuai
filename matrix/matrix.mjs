/**
 * 数学矩阵
 */
class Matrix {
  constructor(m, n) {
    if (Array.isArray(m)) { // 非数字用作数组
      this.check(m);
      this._arr = m;  
    } else {
      if (m >= 1 && n >= 1) { // 数字的话必须行列大于等于1
        this._arr = new Array(m).fill(0).map(() => new Array(n).fill(0));
      } else {
        throw(new Error('m & n must le 1'));
      }
    }
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
   * @param {Matrix} mat 要相加的同形矩阵
   * @returns {Matrix} 矩阵
   */
  plus(mat) {
    if (this.m !== mat.m || this.n !== mat.n) { // 矩阵需要相同
      throw(new Error('two matrixs must be same'));
    }
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
   * @param {Matrix} mat 要相减的同形矩阵
   * @returns {Matrix} 矩阵
   */
   minus(mat) {
    if (this.m !== mat.m || this.n !== mat.n) { // 矩阵需要相同
      throw(new Error('two matrixs must be same'));
    }
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
    if (this.n !== mat.m) { // 相乘矩阵行需等于当前矩阵列
      throw(new Error('this n of matrix must equal to multipy m of matrix'));
    }
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