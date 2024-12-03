const t={publish:"1",date:"2024-04-24T07:45:10.000Z",tags:["开发笔记"]},e=`<p>我看了很多次 autotile 和 tileset 相关的视频了，看视频时能理解，但是到了自己真正要做 autotile 要用的 tileset 时基本上不知道怎么做，想来想去原因应该是 tileset 的 tile 比较多，做起来不知道 autotile 时怎么对应，所以我把每一个 tile 的制作的对应方式都记录下来。</p>
<p>tileset 的形式我是参考 <a href="https://www.youtube.com/watch?v=MsXB2mK23Ng&amp;t=809s"># Godot 4 Tutorial - Heart Platformer P7 - Autotile + Sloped Tiles</a>，可以作为参考对比。</p>
<h3>autotile 的规则</h3>
<p>在做 autotile 用的 tileset 时，先简单讲下 autotile 的规则，由于我用 godot，这里就以 godot4 的 autotile 设置方式为例， godot4 中 autotile 的规则有 Match Corners and Sides、Match Corners、Match Sides 三种，Match Corners、Match Sides 实际上都是简化版本，例子中是以 Match Corners and Sides 为例。</p>
<p>![[Pasted image 20231009123936.png]]</p>
<p>在设置 autotile 时，每个 tile 会被细分为 9 个小块，以下面的 1-9 标记为例，这 9 个小块的设置方式决定了当前这个 tile 是否会出现。</p>
<p>当你设置了 “5” 时，代表着当前的 title 启用，如果没有设置 “5” 的话，即使再怎么设置其他小块，这个 title 也不会启用。</p>
<p>那旁边 1~9 的小块标记又是什么意思呢？这个代表着当前 title 在什么情况下出现。1~9 小块标记的是其他 tile 出现的方向，如 1 是左上方、4 是正左方、9 是右下方这种。如你只标记了 “4” 和 “5” 的话，当前 title 就会在只有正左方有 tile，同时其他方向（左上方、左下方、正上方等等）没有 title 的情况下，当前 title 才会使用。</p>
<p>![[Pasted image 20231009124432.png]]</p>
<h3>开始做 titleset</h3>
<p>回归正题，我们从零开始做一个完整 autotile 用的 tileset，这里每个 tile 的大小是 16x16，首先看看最终图的 autotile 设置方式：
![[Pasted image 20231009224122.png]]</p>
<p>其中主要的难点在于衔接用的 tile 太多，根本不知道怎么对应，不过实际上衔接用的 tile也是从基础 tile 演变来的，我们先做基础 tile。</p>
<h3>基础 tile</h3>
<p><strong>基础大块 9 格</strong></p>
<p>首先是基础的大块 9 格，可以说后面其他 tile 都是从这 9 格演变来的：
![[Pasted image 20231009130629.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009130711.png]]</p>
<p><strong>竖长条 3 格</strong></p>
<p>竖长条的 3 格，一般是从大块 9 格中拿边缘然后拼接：
![[Pasted image 20231009131052.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009131118.png]]</p>
<p><strong>横长条 3 格</strong></p>
<p>横长条的 3 格，一般是从大块 9 格中拿边缘然后拼接：
![[Pasted image 20231009131231.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009131500.png]]</p>
<p><strong>单格</strong></p>
<p>最后一个单独的一格 tile，一般是从大块 9 格中拿边缘然后拼接成一格：
![[Pasted image 20231009131623.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009131636.png]]</p>
<p><strong>基础 tile 完成！</strong></p>
<p>有了上面这些基础的 tile 后，用 autotile 大体看起来是正常的，但是如果你画一些不太方正、不规则的 map 时，会发现连接处有点不协调：
![[Pasted image 20231009132027.png]]
接下来就是要做不同情况下衔接用的 tile 了，这部分也是最复杂的地方。</p>
<h3>衔接用 tile</h3>
<p>衔接用的 tile 众多，不过其实大部分都是复制粘贴。</p>
<p><strong>大块 16 格</strong></p>
<p>我们从大块 16 格衔接开始，如下图：
![[Pasted image 20231009214557.png]]
发现规律了吗，外围边缘其实是和基础 tile 的 9 格一样的，不同的只是里面衔接内容，而这里的衔接内容怎么画呢。一般会先画最里面的 4 格确定左上，左下，右上，右下四角的衔接内容，然后向四方扩散画周边 tile，把对应的衔接内容复制过去就好：
![[Pasted image 20231009215614.png]]
对应 autotile 设置：
![[Pasted image 20231009215808.png]]</p>
<p><strong>竖长条 4 格</strong></p>
<p>接下来是竖长条的 4 格，一般是从上面大块 16 抽取拼接：
![[Pasted image 20231009221104.png]]</p>
<p>![[Pasted image 20231009221217.png]]
对应 autotile 的设置方式：
![[Pasted image 20231009221347.png]]</p>
<p><strong>横长条 4 格</strong></p>
<p>横长条的 4 格，一般是从上面大块 16 抽取拼接：
![[Pasted image 20231009222005.png]]
![[Pasted image 20231009222118.png]]
对应 autotile 的设置方式：
![[Pasted image 20231009222159.png]]</p>
<p><strong>单格</strong></p>
<p>四角都有衔接的单格：
![[Pasted image 20231009223000.png]]
![[Pasted image 20231009223115.png]]
对应 autotile 的设置方式：
![[Pasted image 20231009223144.png]]</p>
<p><strong>L 型 6 格</strong></p>
<p>最后是零散的没有边缘各种衔接内容的排列组合，我把这些称为 L 型 6 格：
![[Pasted image 20231009223311.png]]
![[Pasted image 20231009224006.png]]
对应 autotile 的设置：
![[Pasted image 20231009224032.png]]</p>
<h3>小结</h3>
<p>至此一个 autotile 用的 tileset 基本上完成了，在制作的过程中一定会发现有很多重复的地方，实际上我记得有工具只要给出几个基础 tile 就能生成完整的 tileset，不过我忘记那个工具叫什么名字了（有认识的朋友可以说下），记得主要是要收费所以我还是自己搞算了。</p>
<p>上述做出来的文件在：<a href="https://mnikn.itch.io/autotile-template">https://mnikn.itch.io/autotile-template</a></p>
`,n=`我看了很多次 autotile 和 tileset 相关的视频了，看视频时能理解，但是到了自己真正要做 autotile 要用的 tileset 时基本上不知道怎么做，想来想去原因应该是 tileset 的 tile 比较多，做起来不知道 autotile 时怎么对应，所以我把每一个 tile 的制作的对应方式都记录下来。

tileset 的形式我是参考 [# Godot 4 Tutorial - Heart Platformer P7 - Autotile + Sloped Tiles](https://www.youtube.com/watch?v=MsXB2mK23Ng&t=809s)，可以作为参考对比。

### autotile 的规则

在做 autotile 用的 tileset 时，先简单讲下 autotile 的规则，由于我用 godot，这里就以 godot4 的 autotile 设置方式为例， godot4 中 autotile 的规则有 Match Corners and Sides、Match Corners、Match Sides 三种，Match Corners、Match Sides 实际上都是简化版本，例子中是以 Match Corners and Sides 为例。


![[Pasted image 20231009123936.png]]


在设置 autotile 时，每个 tile 会被细分为 9 个小块，以下面的 1-9 标记为例，这 9 个小块的设置方式决定了当前这个 tile 是否会出现。

当你设置了 “5” 时，代表着当前的 title 启用，如果没有设置 "5" 的话，即使再怎么设置其他小块，这个 title 也不会启用。 

那旁边 1~9 的小块标记又是什么意思呢？这个代表着当前 title 在什么情况下出现。1~9 小块标记的是其他 tile 出现的方向，如 1 是左上方、4 是正左方、9 是右下方这种。如你只标记了 "4" 和 “5” 的话，当前 title 就会在只有正左方有 tile，同时其他方向（左上方、左下方、正上方等等）没有 title 的情况下，当前 title 才会使用。

![[Pasted image 20231009124432.png]]


### 开始做 titleset

回归正题，我们从零开始做一个完整 autotile 用的 tileset，这里每个 tile 的大小是 16x16，首先看看最终图的 autotile 设置方式：
![[Pasted image 20231009224122.png]]

其中主要的难点在于衔接用的 tile 太多，根本不知道怎么对应，不过实际上衔接用的 tile也是从基础 tile 演变来的，我们先做基础 tile。

### 基础 tile

**基础大块 9 格**

首先是基础的大块 9 格，可以说后面其他 tile 都是从这 9 格演变来的：
![[Pasted image 20231009130629.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009130711.png]]

**竖长条 3 格**

竖长条的 3 格，一般是从大块 9 格中拿边缘然后拼接：
![[Pasted image 20231009131052.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009131118.png]]

**横长条 3 格**

横长条的 3 格，一般是从大块 9 格中拿边缘然后拼接：
![[Pasted image 20231009131231.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009131500.png]]

**单格**

最后一个单独的一格 tile，一般是从大块 9 格中拿边缘然后拼接成一格：
![[Pasted image 20231009131623.png]]
对应 auto tile 的设置方式：
![[Pasted image 20231009131636.png]]

**基础 tile 完成！**

有了上面这些基础的 tile 后，用 autotile 大体看起来是正常的，但是如果你画一些不太方正、不规则的 map 时，会发现连接处有点不协调：
![[Pasted image 20231009132027.png]]
接下来就是要做不同情况下衔接用的 tile 了，这部分也是最复杂的地方。


### 衔接用 tile

衔接用的 tile 众多，不过其实大部分都是复制粘贴。

**大块 16 格**

我们从大块 16 格衔接开始，如下图：
![[Pasted image 20231009214557.png]]
发现规律了吗，外围边缘其实是和基础 tile 的 9 格一样的，不同的只是里面衔接内容，而这里的衔接内容怎么画呢。一般会先画最里面的 4 格确定左上，左下，右上，右下四角的衔接内容，然后向四方扩散画周边 tile，把对应的衔接内容复制过去就好：
![[Pasted image 20231009215614.png]]
对应 autotile 设置：
![[Pasted image 20231009215808.png]]


**竖长条 4 格**

接下来是竖长条的 4 格，一般是从上面大块 16 抽取拼接：
![[Pasted image 20231009221104.png]]

![[Pasted image 20231009221217.png]]
对应 autotile 的设置方式：
 ![[Pasted image 20231009221347.png]]

**横长条 4 格**

横长条的 4 格，一般是从上面大块 16 抽取拼接：
![[Pasted image 20231009222005.png]]
![[Pasted image 20231009222118.png]]
对应 autotile 的设置方式：
![[Pasted image 20231009222159.png]]

**单格**

四角都有衔接的单格：
![[Pasted image 20231009223000.png]]
![[Pasted image 20231009223115.png]]
对应 autotile 的设置方式：
![[Pasted image 20231009223144.png]]

**L 型 6 格**

最后是零散的没有边缘各种衔接内容的排列组合，我把这些称为 L 型 6 格：
![[Pasted image 20231009223311.png]]
![[Pasted image 20231009224006.png]]
对应 autotile 的设置：
![[Pasted image 20231009224032.png]]


### 小结

至此一个 autotile 用的 tileset 基本上完成了，在制作的过程中一定会发现有很多重复的地方，实际上我记得有工具只要给出几个基础 tile 就能生成完整的 tileset，不过我忘记那个工具叫什么名字了（有认识的朋友可以说下），记得主要是要收费所以我还是自己搞算了。

上述做出来的文件在：[https://mnikn.itch.io/autotile-template](https://mnikn.itch.io/autotile-template)
`,i=[{level:"3",content:"autotile &#x7684;&#x89C4;&#x5219;"},{level:"3",content:"&#x5F00;&#x59CB;&#x505A; titleset"},{level:"3",content:"&#x57FA;&#x7840; tile"},{level:"3",content:"&#x8854;&#x63A5;&#x7528; tile"},{level:"3",content:"&#x5C0F;&#x7ED3;"}];export{t as attributes,e as html,n as markdown,i as toc};
//# sourceMappingURL=用笨方法学做 autotile 用的 tileset-DHWhgO8l.js.map
