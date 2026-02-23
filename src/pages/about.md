---
layout: "../layouts/PostLayout.astro"
title: "About Me"
---


## 前言

在我们的实验中, 我们是先利用位移的估计子绘出时域信号, 再利用算法来估计波形中的参数, 其中我们主要关心的是频率. 在实验上, 我们是先利用位移的估计子来得到波形, 再从波形得到频率. 我们可以采用最小二乘估计来实现这个实验. 取函数最小值又可以利用梯度下降算法来迭代, 直到达到我们要的目标精度. 

另外, 在文献中提到, 简单的求平均的估计子是一个不好的估计子, 容易受到噪声影响. 由于我们需要用位移的估计子来获得时域信号, 同时又由于课题本质上是一个性能对比实验, 这要求 SPADE 和 DI 的估计子都是最好的. 这样 DI 就不能选取简单的求平均的估计子来对比. 所以我使用梯度下降算法实现了 DI 的最大似然估计, 结果发现最大似然估计子能够在有噪声的情况下也给出非常准确的估计值, 但缺点是算法复杂度高, 处理比较慢.

## 估计波形中的参数

在 *Fundamantals of Statistical Signal Processing* 书中提到, 一个采集到的信号可以分解为以下形式:
$$
x[n] = s[n] + w[n]\qquad n=0,1,\cdots,N-1
$$
其中 $s[n]$ 是发送者发送的真实信号, $w[n]$ 是采集过程中被带入的噪声. 为了简单起见, 在这里只讨论 $w[n]$ 是一个零均值的高斯白噪声 (white Gaussian noise, WGN) 的情况, 同时 $w[0]\sim \mathcal{N}(0, \sigma^2)$. 

### 波形中的参数的 CRB

假设信号是依赖于参数 $\theta$ 的, 信号就可以写为如下形式:
$$
x[n] = s[n;\theta] + w[n]
$$
因为 $w[n]$ 是 WGN, 可以把 $w[n]$ 看作是一个均值随着时间变化的随机变量 $\mathcal{N}(s[n;\theta],\sigma^2)$. 这样似然函数就可以写为:
$$
p(\vb x;\theta)=\frac1{\sqrt{(2\pi\sigma^2)^N}}\exp\qty{-\frac1{2\sigma^2}\sum^{N-1}_{n=0}(x[n]-s[n;\theta])^2}
$$
取对数后求导:
$$
\pdv{\ln p(\vb x;\theta)}{\theta} =\frac1{\sigma^2}\sum^{N-1}_{n=0}(x[n]-s[n;\theta])\pdv{s[n;\theta]}{\theta}
$$
求二阶导:
$$
\pdv[2]{\ln p(\vb x;\theta)}{\theta} = \frac1{\sigma^2}\sum^{N-1}_{n=0}\qty{(x[n]-s[n;\theta])\pdv[2]{s[n;\theta]}{\theta}-\qty(\pdv{s[n;\theta]}{\theta})^2}
$$
取数学期望后就得到了经典 Fisher 信息:
$$
\begin{align}
F_\theta=\mathbb{E}\qty[\pdv[2]{\ln p(\vb x;\theta)}{\theta}]&=\int\pdv[2]{\ln p(\vb x;\theta)}{\theta}p(\vb x;\theta)\dd {\vb x}\\
&=\frac1{\sigma^2}\sum^{N-1}_{n=0}\qty(\pdv{s[n;\theta]}{\theta})^2
\end{align}
$$