# 一元线性回归


人工智能里，最容易让人理解的应该就是 **回归** 这个用xls都可以做


开篇必须说几个概念，早就懂和不愿意看的直接跳过


- **回归**
    - 回归，指研究一组随机变量(Y1 ，Y2 ，…，Yi)和另一组(X1，X2，…，Xk)变量之间关系的统计分析方法，又称多重回归分析
    - 通常Y1，Y2，…，Yi是因变量，X1、X2，…，Xk是自变量
- **一元线性回归**
    - 回归分析只涉及到两个变量的，称一元回归分析
    - 当Y=f(X)的形式是一个直线方程时，称为一元线性回归


## 线性方程


我们初中时候就学过 **线性方程** (*linear equation*)


当初的线性方程公式是也就是 **斜截式** (*slope intercept form*)


y = kx + b


> 其实就是把系数a换成了k来表示



比如我们让k=2，b=1



![图形](./assets/linear.png)


## 代码实现


我们现在实现一下过程，便于我们好好理解人工智能的原理


比如y=2x+1的代码实现


Python
```py
def form(x):
    y = x * 2 + 1
    return y
```


javascript
```js
function form(x) {
    const y = x * 2 + 1;
    return y;
}
```


其他的不做累述了


简单来说，y=2x+1就是最终的模型


我们的 **人工智能** 做的就是找出这个 *2* 和 *1*


其实可以理解为y=kx+b的方程，已知y和x求k和b



# 回归分析


回归分析是通过规定因变量和自变量来确定变量之间的因果关系，建立回归模型


我们拿百度百科里面的数据来做一下分析


https://baike.baidu.com/item/%E4%B8%80%E5%85%83%E7%BA%BF%E6%80%A7%E5%9B%9E%E5%BD%92%E6%96%B9%E7%A8%8B


这里给了广告费和销售额的一组数据


广告费x(万元)|销售额y(百万元)
-- | --
300|300
400|350
400|490
550|500
720|600
850|610
900|700
950|660


画散点图展示


![散点图](./assets/scatter.png)


其实这个是有一个趋势的，我们可以用一条线表示出来，这就是回归



## 确定方程


我们中学时候学过，两点确定一条直线


如果我们只有两个数据可以确定一条直线



广告费x(万元)|销售额y(百万元)
-- | --
300|300
950|660


![两点](./assets/double.png)


## 最小平方法


选择多，烦恼多，那么多点，怎么确定直线呢？


那么就看每个点到这个直线的距离的和最小，那么说明误差最小


> 实际上是离差平方的总和，抵消正负，并且方便对比波动


就是把所有的实际的y减去预测的模型算出来的y


## 回归模型


$y_i = \alpha + \beta x_i + \varepsilon_i$


我们可以先不管$\varepsilon_i$(之后会详细介绍)


只看$y_i = \alpha + \beta x_i$


那么，多个已知x和y求&#945;和&#946;就是如下


$\sum\limits_{i=1}^n(y_i - \hat{y}_i)^2$


> &#8721;就是总共i个x和y的组合，加载一起，还不懂就看看高中数学书，找“西格玛”


因为


$\hat{y} = \alpha + \beta x_i$


所以我们最后得到方程式


$\sum\limits_{i=1}^n[y_i - (\alpha + \beta x_i)]^2$


我们求这个方程的最小值


利用 **微分法** 得到两个正规方程


$\begin{cases} \sum{y_i} = n\alpha + \beta \sum{x_i} \\ \sum{x_i y_i} = \alpha \sum{x_i} + \beta \sum{x_i^2} \end{cases}$


然后把方程变成求&#945;和&#946;


$\begin{cases} \beta = \frac{\sum{(x_i - \bar{x})(y_i - \bar{y})}}{\sum{(x_i - \bar{x})^2}} = \frac{n\sum{x_i y_i} - \sum{x_i} \sum{y_i}}{n\sum{x_i^2} - (\sum{x_i})^2} \\ \alpha = \frac{\sum{y_i}}{n} - \beta \times \frac{\sum{x_i}}{n} = \bar{y} - \beta\bar{x} \end{cases}$



## 代码实现


数学公式看不懂没关系，咱们直接上代码就是了


Python


定义一个类计算
```py
class Regression:
  def __init__(self, x, y):
    self.n = len(x)
    self.x = np.array(x)
    self.y = np.array(y)
  def getBeta(self):
    self.beta = (np.sum(self.x * self.y) * self.n - np.sum(self.x) * np.sum(self.y)) / (self.n * np.sum(self.x ** 2) - np.sum(self.x) ** 2)
    return self.beta
  def getAlpha(self):
    self.alpha = np.average(self.y) - self.beta * np.average(self.x)
    return self.alpha
```


实际的值带进去


```py
x = [300,400,400,550,720,850,900,950]
y = [300,350,490,500,600,610,700,660]
regression = Regression(x, y)
"b=%f, a=%f" % (regression.getBeta(), regression.getAlpha())
```


最后我们得到了


```
'b=0.530961, a=189.753472'
```


我们的公式就是 y = 189.753472 + 0.530961 * x


在我们的散点图上表现一下


![plot](./assets/plot.png)


