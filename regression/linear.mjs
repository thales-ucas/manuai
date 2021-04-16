// node --experimental-modules linear.mjs
// import Regression from './linear-regression.mjs'
import Regression from './regression.mjs'
const model = new Regression() // 构造回归模型
const x = [300,400,400,550,720,850,900,950];
const y = [300,350,490,500,600,610,700,660];
model.fit(x, y); // 训练模型
const predictions = model.predict([200, 1000]); // 预测数据
console.log(predictions);

