const n={publish:"1",date:"2024-04-24T07:45:11.000Z",tags:["创作笔记"]},e=`<p>因为我一直想做个 rpg 游戏，而对于做 rpg 来说，科学地管理游戏剧情是不可或缺的，所以我对于这方面做了一些探索。</p>
<h3>初期探索阶段</h3>
<p>计算机领域有句话叫不要重复造轮子，意思就是与其自己从零开始探索制作，不如借助已有的东西。我作为一个懒惰的人也深谙此道，所以一开始我就探索了各式各类的剧情管理软件，最后发现主要是这几个比较能够用于实战：</p>
<ul>
<li><a href="https://blurymind.github.io/YarnClassic/">yarn</a>：脚本语言和卡片的结合管理，算是在灵活和方便管理中取个折中。</li>
<li><a href="https://www.inklestudios.com/ink/">ink</a>：完全由脚本语言管理剧情，优点是极致的灵活，用写代码的思路来管理剧情。缺点也很明显，基本上不支持多语言。</li>
<li><a href="https://www.articy.com/en/">articy draft</a>：基于卡片式管理剧情，更像是一个游戏的数据库，能够定义各类数据嵌入，但是灵活程度有限（至少是不方便在剧情中嵌入代码，或者是有方法但是我不知道？）</li>
<li>excel：没错！大道至简大巧不工，也有不少人用 excel 管理一整个游戏剧情，毕竟 excel 都能用来玩三国杀，管理游戏剧情也自然不在话下是吧</li>
</ul>
<p>上面一圈试用下来，每个软件都有一些我的不爽点。例如大部分卡片式的剧情管理软件都是让你拖线连接创建卡片，我是觉得手动拖线基本上属于伪需求，因为大部分情况下剧情都是线性执行，只有在一些关键节点才会做跳转，为了小部分的场景就要大部分时间都要浪费在拖线连接上属于得不偿失了。然后我是打算在剧情管理软件中嵌入一些游戏逻辑，所以需要软件能够给个特殊的节点触发事情或者能够直接嵌入代码。</p>
<p>虽然上述软件都有实战案例，我也很清楚它们虽然可能不是那么完美，但是做一些骚操作应该能够满足我的需求，但是一个 rpg 大部分时间都要放在搞剧情上，一个好的剧情管理软件能够极大提升开发心情，所以最后我还是打算自己撸一个简易的剧情管理软件。</p>
<h3>第一次尝试</h3>
<p>经过上述的尝试我大致得出以下需求：</p>
<ul>
<li>绝对不要手动拖线，不要玩连连看</li>
<li>能够看情况触发事件</li>
</ul>
<p>当时看到一个 <a href="https://www.bilibili.com/video/BV19T4y137qV/?spm_id_from=333.999.0.0">开发者实现的剧情管理系统</a> 感觉挺符合我的想法的，于是就按照视频上的软件的形式做了一个。</p>
<p>我是用 godot 引擎来做游戏，由于 godot 做插件拓展能力强，所以当时也很自然直接在 godot 上实现了这样一个剧情管理的插件：</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/image.5c10u2agpu.png" alt="image"></p>
<p>可以看出，我在这个软件根据情况设置了一些的数据类型，基本上整体是按照树形的结构来往下堆数据，在当时暂时满足了我的需求，而且感觉用得还挺愉快，直到…</p>
<h3>不爽</h3>
<p>树形管理的方式有个比较致命的缺点，那就是很难自由地从一个对话点随意跳到另外一个对话点上，而随着我的游戏开发进展，这种灵活性是必要的。</p>
<p>虽然我尝试在这基础上修修补补来实现这一点，但是即使功能能够实现，从管理来说也不太直观，我感觉到没办法再继续这样妥协下去了。</p>
<h3>新的构思</h3>
<p>由于中途过了一段时间，我也有了各种奇奇怪怪的积累和想法，例如为了管理游戏中各种数据搞了一个 <a href="https://indienova.com/u/mnikn/blogread/30436">通用游戏数据管理软件</a>，中途参加了各类的 gamejam 和一些平时的想法做了各形各类的游戏，发现只做一个游戏可能只用市面上现成的软件凑合下能勉强做出来，但是如果想做一系列游戏就必须整合自己的工具链才能多快好省地实现，而我倾向是与其花大精力做一个游戏，不如花不大不小的精力做多个游戏。</p>
<p>基于这个理念，我对于自己做出来的软件要求是足够灵活，能够适应自己做不同游戏的需求，同时我看了一篇关于<a href="https://indienova.com/indie-game-development/the-disappearing-arrow-new-way-of-creating-no-branching-plots/">剧情管理的文章</a> 深受启发，而且我想做的游戏剧情点也较为分散，符合文章中 storylet 的想法，于是打算结合这篇文章的想法再做个软件。</p>
<h3>重构！</h3>
<p>既要追求刺激，那就要贯彻到底了，这时候我打算做得与其说是一个单独管理剧情的软件，不如说是一个定位相当于 articy draft 的游戏数据库，当然功能肯定不会有它那么全，反正我也不太需要太多功能，重要的是简洁并高效，这时我的需求如下：</p>
<ul>
<li>还是不要玩连连看，这个是底线</li>
<li>灵活与方便管理间取得平衡，可以各节点间动态自由跳转，可以嵌入代码</li>
<li>支持多语言</li>
</ul>
<p>确定好方向后，后面的开发就水到渠成了，为了美观还有开发效率，就使用我最熟悉的 web 技术栈实现了。</p>
<h3>成品</h3>
<p>经过了一段时间的开发和调整，最后做出来这样的东西：</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/image.ic5xxqb2t.webp" alt="image"></p>
<p>这个软件管理剧情的方式是分散式的，侧边栏展示每个故事片段或者数据，因为这个软件定位是一个游戏数据库，所以除了管理故事还要管理一些静态数据例如物品、敌人这些。</p>
<p>对于故事的管理是采用思维导图式的操作方式和一个横向排列的树，每个节点分为三大类：sentence、branch 和 action，前两个很好理解就是普通的对话语句和分支，action 节点则负责做一些特殊逻辑和演出。</p>
<p>对于静态数据的管理，会先定义一个 schema，然后能根据 schema 动态生成表单，之后在表单上填数据就好了。这个动态生成表单的能力在整个软件中都有体现，可以说这个软件所有的表单都是动态生成的。</p>
<h4>故事例子1</h4>
<p>我们以一个简单的例子看下这个软件是怎么处理故事的：</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-2.3gog1fzpbq.webp" alt="shove-db-2"></p>
<p>绿色的是 sentence 节点，蓝色的是 branch 节点，红色的是 action 节点。整个逻辑基本上就是从左边走到右边，遇到 branch 节点的话，那些连接到 branch 节点的相当于是一个选项了，所以你会看到这些节点左边有个白色的选项名。选中选项就会跳到对应的节点继续执行。</p>
<h3>故事例子2</h3>
<p>刚才的例子比较线性，但是如果遇到一些节点需要判断状态才能执行的怎么办呢？下面这个是例子：
<img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-3.73tzoyvhti.webp" alt="shove-db-3">
<img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-4.175fhyeyux.webp" alt="shove-db-4"></p>
<p>这个例子中一开始就有个分叉，但是注意到的是这个分叉前可不是 branch 节点，所以是不会有选项的，那么怎么判断要走哪个节点呢？
其实每个节点都会有个 Enable check 的字段，这个相当于代码判断，由外部调用判断返回值，如果匹配相当于这个节点可用，否则就是不可用，通过这个判断机制就能灵活选择走哪个节点。首先整个处理逻辑是从左向右，先尝试执行右边第一个节点，如果第一个节点不可用就尝试第二个以此类推。</p>
<h3>复杂但实际的故事例子</h3>
<p>上面的例子都是在我游戏中比较简单的实例，而有没有更复杂的例子呢，答案是有的，且看下面：</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-5.4n7ra1olx4.webp" alt="shove-db-5"></p>
<p>上面是一个故事片段的大体样子，看上去挺复杂是吧，我讲下这个故事片段的大体过程。队伍发现了一个上锁的宝箱，然后玩家有四种选项：砸开，撬开、用钥匙打开和离开，用钥匙打开这个节点可用的前提是需要物品栏中有钥匙，而砸开或者撬开的话又需要选择队伍中的人，选择后要进行能力判定，判断成功就能打开宝箱，判断失败就不行，而且为了让剧情更灵活一点，选择不同的人时这个人在成功和失败时还要说不同的话，而且如果选择砸开或者撬开的话即使打开了宝箱也要进行陷阱的伤害判定。</p>
<p>上面一大串需求中比起之前还需要以下能力：能够从一个节点任意跳到另一任意节点、节点内容复用，那么这个软件是怎么处理的呢？</p>
<p>首先是节点复用，我先定义这两个需要复用的节点，分别是获得物品的和触发陷阱的，这两个节点都是 action 节点， 这些逻辑我都是通过在节点里面编辑代码实现了。</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-6.7lk1djwveg.webp" alt="shove-db-6"></p>
<p>然后 action 节点中会定义个 copy 的类型，能够把目标节点上的内容抄到当前节点，这就实现复用了。</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-7.syzr36nzr.webp" alt="shove-db-7">
<img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-8.1ziazovkl3.webp" alt="shove-db-8"></p>
<p>跳转也是相同的道理，定义个 jump 类型，然后选要跳转的节点。</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-9.41y3nqu5mh.webp" alt="shove-db-9">
<img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-10.9dd08gg8aj.webp" alt="shove-db-10"></p>
<p>记得我们之前说的触发陷阱要做伤害判定的逻辑嘛，其实判定伤害后也是需要展示伤害值的，如果按照之前的处理是给每个队伍的人创作一个 sentence 节点写受到了多少点伤害，不过由于节点的处理是动态的，这就意味着我能够在执行时插入新的节点，所以这些 sentence 节点我就都由代码创建了。</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-11.5fkmrs57ng.webp" alt="shove-db-11"></p>
<h4>动态修改节点表单</h4>
<p>上面的例子中我们看到每个节点都有不同的编辑表单，不过像我之前说的，其实所有表单都是动态生成的。在设置中会有每类节点的 schema 设置，理论上这些节点的数据甚至都可以改成和剧情管理完全没关系，改下 schema 变成个事件管理软件也完全没问题。</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-12.2vesf55919.webp" alt="shove-db-12">
<img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-13.8hgit06jul.webp" alt="shove-db-13"></p>
<h4>静态数据管理</h4>
<p>其实有了动态创建表单的能力，管理一些静态数据是很简单的事情，而且这些数据还能和故事中的数据联动。</p>
<p><img src="https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-14.2obkjpj3lh.webp" alt="shove-db-14"></p>
<h4>示例视频</h4>
<p>下面就展示我实际场景中是怎么编辑故事的：</p>
<video src="https://github.com/mnikn/picx-images-hosting/raw/refs/heads/master/shove-db-video.mp4" />
<h3>小结</h3>
<p>目前这个软件我用了一段时间感觉还不错，基本上符合我的需求，虽然理论上是可以做成公用，不过我可没精力去维护和管理别人的各式各类需求，所以我是会开放源码和一些简易的使用文档，不过具体的教程和要求我就懒得搞了，有兴趣的人更倾向于自己 fork 一份自己改成想要的样子。</p>
<p>源码：<a href="https://github.com/mnikn/shovel-db">https://github.com/mnikn/shovel-db</a>
windows 版：<a href="https://github.com/mnikn/shovel-db/releases/tag/0.1.0">https://github.com/mnikn/shovel-db/releases/tag/0.1.0</a></p>
<p>参考资料：</p>
<ul>
<li><a href="https://indienova.com/indie-game-development/tools-for-branching-dialogs-and-narrative/">分支剧情创作中的挑战和工具</a></li>
<li><a href="https://indienova.com/indie-game-development/the-disappearing-arrow-new-way-of-creating-no-branching-plots/">消失的箭头：一种创作（无）分支剧情的新思路</a></li>
</ul>
`,t=`因为我一直想做个 rpg 游戏，而对于做 rpg 来说，科学地管理游戏剧情是不可或缺的，所以我对于这方面做了一些探索。


### 初期探索阶段

计算机领域有句话叫不要重复造轮子，意思就是与其自己从零开始探索制作，不如借助已有的东西。我作为一个懒惰的人也深谙此道，所以一开始我就探索了各式各类的剧情管理软件，最后发现主要是这几个比较能够用于实战：

- [yarn](https://blurymind.github.io/YarnClassic/)：脚本语言和卡片的结合管理，算是在灵活和方便管理中取个折中。
- [ink](https://www.inklestudios.com/ink/)：完全由脚本语言管理剧情，优点是极致的灵活，用写代码的思路来管理剧情。缺点也很明显，基本上不支持多语言。
- [articy draft](https://www.articy.com/en/)：基于卡片式管理剧情，更像是一个游戏的数据库，能够定义各类数据嵌入，但是灵活程度有限（至少是不方便在剧情中嵌入代码，或者是有方法但是我不知道？）
- excel：没错！大道至简大巧不工，也有不少人用 excel 管理一整个游戏剧情，毕竟 excel 都能用来玩三国杀，管理游戏剧情也自然不在话下是吧


上面一圈试用下来，每个软件都有一些我的不爽点。例如大部分卡片式的剧情管理软件都是让你拖线连接创建卡片，我是觉得手动拖线基本上属于伪需求，因为大部分情况下剧情都是线性执行，只有在一些关键节点才会做跳转，为了小部分的场景就要大部分时间都要浪费在拖线连接上属于得不偿失了。然后我是打算在剧情管理软件中嵌入一些游戏逻辑，所以需要软件能够给个特殊的节点触发事情或者能够直接嵌入代码。

虽然上述软件都有实战案例，我也很清楚它们虽然可能不是那么完美，但是做一些骚操作应该能够满足我的需求，但是一个 rpg 大部分时间都要放在搞剧情上，一个好的剧情管理软件能够极大提升开发心情，所以最后我还是打算自己撸一个简易的剧情管理软件。

### 第一次尝试

经过上述的尝试我大致得出以下需求：
- 绝对不要手动拖线，不要玩连连看
- 能够看情况触发事件



当时看到一个 [开发者实现的剧情管理系统](https://www.bilibili.com/video/BV19T4y137qV/?spm_id_from=333.999.0.0) 感觉挺符合我的想法的，于是就按照视频上的软件的形式做了一个。

我是用 godot 引擎来做游戏，由于 godot 做插件拓展能力强，所以当时也很自然直接在 godot 上实现了这样一个剧情管理的插件：

![image](https://github.com/mnikn/picx-images-hosting/raw/master/image.5c10u2agpu.png)

可以看出，我在这个软件根据情况设置了一些的数据类型，基本上整体是按照树形的结构来往下堆数据，在当时暂时满足了我的需求，而且感觉用得还挺愉快，直到...

### 不爽

树形管理的方式有个比较致命的缺点，那就是很难自由地从一个对话点随意跳到另外一个对话点上，而随着我的游戏开发进展，这种灵活性是必要的。

虽然我尝试在这基础上修修补补来实现这一点，但是即使功能能够实现，从管理来说也不太直观，我感觉到没办法再继续这样妥协下去了。

### 新的构思

由于中途过了一段时间，我也有了各种奇奇怪怪的积累和想法，例如为了管理游戏中各种数据搞了一个 [通用游戏数据管理软件](https://indienova.com/u/mnikn/blogread/30436)，中途参加了各类的 gamejam 和一些平时的想法做了各形各类的游戏，发现只做一个游戏可能只用市面上现成的软件凑合下能勉强做出来，但是如果想做一系列游戏就必须整合自己的工具链才能多快好省地实现，而我倾向是与其花大精力做一个游戏，不如花不大不小的精力做多个游戏。

基于这个理念，我对于自己做出来的软件要求是足够灵活，能够适应自己做不同游戏的需求，同时我看了一篇关于[剧情管理的文章](https://indienova.com/indie-game-development/the-disappearing-arrow-new-way-of-creating-no-branching-plots/) 深受启发，而且我想做的游戏剧情点也较为分散，符合文章中 storylet 的想法，于是打算结合这篇文章的想法再做个软件。

### 重构！

既要追求刺激，那就要贯彻到底了，这时候我打算做得与其说是一个单独管理剧情的软件，不如说是一个定位相当于 articy draft 的游戏数据库，当然功能肯定不会有它那么全，反正我也不太需要太多功能，重要的是简洁并高效，这时我的需求如下：

- 还是不要玩连连看，这个是底线
- 灵活与方便管理间取得平衡，可以各节点间动态自由跳转，可以嵌入代码
- 支持多语言



确定好方向后，后面的开发就水到渠成了，为了美观还有开发效率，就使用我最熟悉的 web 技术栈实现了。

### 成品

经过了一段时间的开发和调整，最后做出来这样的东西：

![image](https://github.com/mnikn/picx-images-hosting/raw/master/image.ic5xxqb2t.webp)



这个软件管理剧情的方式是分散式的，侧边栏展示每个故事片段或者数据，因为这个软件定位是一个游戏数据库，所以除了管理故事还要管理一些静态数据例如物品、敌人这些。

对于故事的管理是采用思维导图式的操作方式和一个横向排列的树，每个节点分为三大类：sentence、branch 和 action，前两个很好理解就是普通的对话语句和分支，action 节点则负责做一些特殊逻辑和演出。

对于静态数据的管理，会先定义一个 schema，然后能根据 schema 动态生成表单，之后在表单上填数据就好了。这个动态生成表单的能力在整个软件中都有体现，可以说这个软件所有的表单都是动态生成的。

#### 故事例子1

我们以一个简单的例子看下这个软件是怎么处理故事的：

![shove-db-2](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-2.3gog1fzpbq.webp)


绿色的是 sentence 节点，蓝色的是 branch 节点，红色的是 action 节点。整个逻辑基本上就是从左边走到右边，遇到 branch 节点的话，那些连接到 branch 节点的相当于是一个选项了，所以你会看到这些节点左边有个白色的选项名。选中选项就会跳到对应的节点继续执行。


### 故事例子2

刚才的例子比较线性，但是如果遇到一些节点需要判断状态才能执行的怎么办呢？下面这个是例子：
![shove-db-3](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-3.73tzoyvhti.webp)
![shove-db-4](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-4.175fhyeyux.webp)

这个例子中一开始就有个分叉，但是注意到的是这个分叉前可不是 branch 节点，所以是不会有选项的，那么怎么判断要走哪个节点呢？
其实每个节点都会有个 Enable check 的字段，这个相当于代码判断，由外部调用判断返回值，如果匹配相当于这个节点可用，否则就是不可用，通过这个判断机制就能灵活选择走哪个节点。首先整个处理逻辑是从左向右，先尝试执行右边第一个节点，如果第一个节点不可用就尝试第二个以此类推。


### 复杂但实际的故事例子

上面的例子都是在我游戏中比较简单的实例，而有没有更复杂的例子呢，答案是有的，且看下面：

![shove-db-5](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-5.4n7ra1olx4.webp)

上面是一个故事片段的大体样子，看上去挺复杂是吧，我讲下这个故事片段的大体过程。队伍发现了一个上锁的宝箱，然后玩家有四种选项：砸开，撬开、用钥匙打开和离开，用钥匙打开这个节点可用的前提是需要物品栏中有钥匙，而砸开或者撬开的话又需要选择队伍中的人，选择后要进行能力判定，判断成功就能打开宝箱，判断失败就不行，而且为了让剧情更灵活一点，选择不同的人时这个人在成功和失败时还要说不同的话，而且如果选择砸开或者撬开的话即使打开了宝箱也要进行陷阱的伤害判定。

上面一大串需求中比起之前还需要以下能力：能够从一个节点任意跳到另一任意节点、节点内容复用，那么这个软件是怎么处理的呢？

首先是节点复用，我先定义这两个需要复用的节点，分别是获得物品的和触发陷阱的，这两个节点都是 action 节点， 这些逻辑我都是通过在节点里面编辑代码实现了。

![shove-db-6](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-6.7lk1djwveg.webp)


然后 action 节点中会定义个 copy 的类型，能够把目标节点上的内容抄到当前节点，这就实现复用了。


![shove-db-7](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-7.syzr36nzr.webp)
![shove-db-8](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-8.1ziazovkl3.webp)

跳转也是相同的道理，定义个 jump 类型，然后选要跳转的节点。

![shove-db-9](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-9.41y3nqu5mh.webp)
![shove-db-10](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-10.9dd08gg8aj.webp)


记得我们之前说的触发陷阱要做伤害判定的逻辑嘛，其实判定伤害后也是需要展示伤害值的，如果按照之前的处理是给每个队伍的人创作一个 sentence 节点写受到了多少点伤害，不过由于节点的处理是动态的，这就意味着我能够在执行时插入新的节点，所以这些 sentence 节点我就都由代码创建了。

![shove-db-11](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-11.5fkmrs57ng.webp)

#### 动态修改节点表单

上面的例子中我们看到每个节点都有不同的编辑表单，不过像我之前说的，其实所有表单都是动态生成的。在设置中会有每类节点的 schema 设置，理论上这些节点的数据甚至都可以改成和剧情管理完全没关系，改下 schema 变成个事件管理软件也完全没问题。

![shove-db-12](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-12.2vesf55919.webp)
![shove-db-13](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-13.8hgit06jul.webp)

#### 静态数据管理

其实有了动态创建表单的能力，管理一些静态数据是很简单的事情，而且这些数据还能和故事中的数据联动。

![shove-db-14](https://github.com/mnikn/picx-images-hosting/raw/master/shove-db-14.2obkjpj3lh.webp)


#### 示例视频

下面就展示我实际场景中是怎么编辑故事的：

<video src="https://github.com/mnikn/picx-images-hosting/raw/refs/heads/master/shove-db-video.mp4" />



### 小结

目前这个软件我用了一段时间感觉还不错，基本上符合我的需求，虽然理论上是可以做成公用，不过我可没精力去维护和管理别人的各式各类需求，所以我是会开放源码和一些简易的使用文档，不过具体的教程和要求我就懒得搞了，有兴趣的人更倾向于自己 fork 一份自己改成想要的样子。

源码：[https://github.com/mnikn/shovel-db](https://github.com/mnikn/shovel-db)
windows 版：[https://github.com/mnikn/shovel-db/releases/tag/0.1.0](https://github.com/mnikn/shovel-db/releases/tag/0.1.0)

参考资料：
- [分支剧情创作中的挑战和工具](https://indienova.com/indie-game-development/tools-for-branching-dialogs-and-narrative/)
- [消失的箭头：一种创作（无）分支剧情的新思路](https://indienova.com/indie-game-development/the-disappearing-arrow-new-way-of-creating-no-branching-plots/)
`,i=[{level:"3",content:"&#x521D;&#x671F;&#x63A2;&#x7D22;&#x9636;&#x6BB5;"},{level:"3",content:"&#x7B2C;&#x4E00;&#x6B21;&#x5C1D;&#x8BD5;"},{level:"3",content:"&#x4E0D;&#x723D;"},{level:"3",content:"&#x65B0;&#x7684;&#x6784;&#x601D;"},{level:"3",content:"&#x91CD;&#x6784;&#xFF01;"},{level:"3",content:"&#x6210;&#x54C1;"},{level:"4",content:"&#x6545;&#x4E8B;&#x4F8B;&#x5B50;1"},{level:"3",content:"&#x6545;&#x4E8B;&#x4F8B;&#x5B50;2"},{level:"3",content:"&#x590D;&#x6742;&#x4F46;&#x5B9E;&#x9645;&#x7684;&#x6545;&#x4E8B;&#x4F8B;&#x5B50;"},{level:"4",content:"&#x52A8;&#x6001;&#x4FEE;&#x6539;&#x8282;&#x70B9;&#x8868;&#x5355;"},{level:"4",content:"&#x9759;&#x6001;&#x6570;&#x636E;&#x7BA1;&#x7406;"},{level:"4",content:"&#x793A;&#x4F8B;&#x89C6;&#x9891;"}];export{n as attributes,e as html,t as markdown,i as toc};
//# sourceMappingURL=剧情管理的探索之路-BXJCCttN.js.map
