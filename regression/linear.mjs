import Regression from './regression.mjs'

const regression = new Regression() // 构造回归模型
const x = [300,400,400,550,720,850,900,950];
const y = [300,350,490,500,600,610,700,660];
regression.fit(x, y); // 训练模型
const predictions = regression.predict([200, 1000]); // 预测数据
console.log(predictions);
