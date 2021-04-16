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

