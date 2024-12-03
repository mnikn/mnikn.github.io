const e={publish:"1",date:"2024-04-24T07:46:10.000Z",tags:["编程","造轮子","lisp解释器"]},n=`<p>本文我们把格式化表达式转化为对应的表达式类。</p>
<h2>表达式的类型</h2>
<p>我们把 <code>scheme</code> 表达式分为以下类型：</p>
<ul>
<li>NumberExpression：表达式为单一数字，例如：34</li>
<li>StringExpression：表达式为单一字符串，例如：“fdsfds”</li>
<li>VariableExpression：表达式为变量</li>
<li>DefineExpression：表达式用于定义函数或变量，例如：<code>(define x 54)</code></li>
<li>AssignmentExpression：表达式用于赋值，例如：<code>(set! a 44)</code></li>
<li>IfExpression：If 语句表达式</li>
<li>LambdaExpression：lambda 语句表达式</li>
<li>SequenceExpression：表达式为一系列的表达式，例如：<code>(begin (set! a 4) (+3 4))</code></li>
<li>ProcedureExpression： 我们所定义的函数均属于 ProcedureExpression，程序表达式</li>
<li>ApplicationExpression： 不属于上述所有的表达式，视为应用表达式</li>
</ul>
<h2>表达式的实现</h2>
<p>每个表达式里面都有一个 <code>eval</code> 函数，用于执行自身，目前我们先不实现这个函数，其中的参数 <code>evaluator</code> 代表所用的解析器，而 <code>env</code> 代表当前的环境变量。</p>
<p>表达式的转化工作在构造函数中实现。</p>
<pre><code class="language-python">class Expression:
    def __init__(self):
        pass
    def eval(self,evaluator,env):
        raise &quot;Not implmented yet!&quot;

class NumberExpression(Expression):
    def __init__(self,exp):
        self.value = int(exp)
    def eval(self,evaluator,env):
        pass

class StringExpression(Expression):
    def __init__(self,exp):
        self.value = exp[1:len(exp)-1]
    def eval(self,evaluator,env):
        pass

class VariableExpression(Expression):
    def __init__(self,exp):
        self.name = exp
    def eval(self,evaluator,env):
        pass

class DefineExpression(Expression):
    def __init__(self,exp):
        if isinstance(exp[1],list):
            self.variable = exp[1][0]
            self.value = LambdaExpression(['lambda',exp[1][1:],exp[2]])
        else:
            self.variable = exp[1]
            self.value = exp[2]
    def eval(self,evaluator,env):
        pass

class AssignmentExpression(Expression):
    def __init__(self,exp):
        self.variable = exp[1]
        self.value = exp[2]
    def eval(self,evaluator,env):
        pass

class IfExpression(Expression):
    def __init__(self,exp):
        self.pred = exp[1]
        self.true_exp = exp[2]
        self.false_exp = exp[3]
    def eval(self,evaluator,env):
        pass

class CondExpression(Expression):
    def __init__(self,exp):
        self.conditions = exp[1:len(exp)-1]
        self.otherwise = exp[-1]
    def eval(self,evaluator,env):
        pass

class LambdaExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.body = exp[2]
    def eval(self,evaluator,env):
        pass

class SequenceExpression(Expression):
    def __init__(self,exp):
        self.exps = exp[1:]
    def eval(self,evaluator,env):
        pass

class ProcedureExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.proc = exp[2]
        self.env = exp[3]
    def eval(self,evaluator,env):
        pass

class ApplicationExpression(Expression):
    def __init__(self,exp):
        self.operator = exp[1]
        self.args = exp[2]
    def eval(self,evaluator,env):
        pass
</code></pre>
<h2>表达式的转化</h2>
<pre><code class="language-python">class ExpressionParser:
    def parse(self,exp,env):
        if exp == []: return []

        if isinstance(exp,list) == False:
            if exp.isdigit():
                exp = NumberExpression(exp)
            elif exp.find('&quot;') != -1 or exp[0].find(&quot;'&quot;) != -1:
                exp = StringExpression(exp)
            else:
                exp = VariableExpression(exp)
            return exp

        if exp[0] == &quot;define&quot;:
            exp = DefineExpression(exp)
        elif exp[0] == &quot;set!&quot;:
            exp = AssignmentExpression(exp)
        elif exp[0] == &quot;if&quot;:
            exp = IfExpression(exp)
        elif exp[0] == &quot;cond&quot;:
            exp = CondExpression(exp)
        elif exp[0] == &quot;lambda&quot;:
            exp = LambdaExpression(exp)
        elif exp[0] == &quot;begin&quot;:
            exp = SequenceExpression(exp)
        else:
            exp = ApplicationExpression([&quot;application&quot;,exp[0],exp[1:]])
        return exp
</code></pre>
`,s=`本文我们把格式化表达式转化为对应的表达式类。


## 表达式的类型

我们把 \`scheme\` 表达式分为以下类型：

- NumberExpression：表达式为单一数字，例如：34
- StringExpression：表达式为单一字符串，例如："fdsfds"
- VariableExpression：表达式为变量
- DefineExpression：表达式用于定义函数或变量，例如：\`(define x 54)\`
- AssignmentExpression：表达式用于赋值，例如：\`(set! a 44)\`
- IfExpression：If 语句表达式
- LambdaExpression：lambda 语句表达式
- SequenceExpression：表达式为一系列的表达式，例如：\`(begin (set! a 4) (+3 4))\`
- ProcedureExpression： 我们所定义的函数均属于 ProcedureExpression，程序表达式
- ApplicationExpression： 不属于上述所有的表达式，视为应用表达式

## 表达式的实现

每个表达式里面都有一个 \`eval\` 函数，用于执行自身，目前我们先不实现这个函数，其中的参数 \`evaluator\` 代表所用的解析器，而 \`env\` 代表当前的环境变量。

表达式的转化工作在构造函数中实现。

\`\`\`python
class Expression:
    def __init__(self):
        pass
    def eval(self,evaluator,env):
        raise "Not implmented yet!"

class NumberExpression(Expression):
    def __init__(self,exp):
        self.value = int(exp)
    def eval(self,evaluator,env):
        pass

class StringExpression(Expression):
    def __init__(self,exp):
        self.value = exp[1:len(exp)-1]
    def eval(self,evaluator,env):
        pass

class VariableExpression(Expression):
    def __init__(self,exp):
        self.name = exp
    def eval(self,evaluator,env):
        pass

class DefineExpression(Expression):
    def __init__(self,exp):
        if isinstance(exp[1],list):
            self.variable = exp[1][0]
            self.value = LambdaExpression(['lambda',exp[1][1:],exp[2]])
        else:
            self.variable = exp[1]
            self.value = exp[2]
    def eval(self,evaluator,env):
        pass

class AssignmentExpression(Expression):
    def __init__(self,exp):
        self.variable = exp[1]
        self.value = exp[2]
    def eval(self,evaluator,env):
        pass

class IfExpression(Expression):
    def __init__(self,exp):
        self.pred = exp[1]
        self.true_exp = exp[2]
        self.false_exp = exp[3]
    def eval(self,evaluator,env):
        pass

class CondExpression(Expression):
    def __init__(self,exp):
        self.conditions = exp[1:len(exp)-1]
        self.otherwise = exp[-1]
    def eval(self,evaluator,env):
        pass

class LambdaExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.body = exp[2]
    def eval(self,evaluator,env):
        pass

class SequenceExpression(Expression):
    def __init__(self,exp):
        self.exps = exp[1:]
    def eval(self,evaluator,env):
        pass

class ProcedureExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.proc = exp[2]
        self.env = exp[3]
    def eval(self,evaluator,env):
        pass

class ApplicationExpression(Expression):
    def __init__(self,exp):
        self.operator = exp[1]
        self.args = exp[2]
    def eval(self,evaluator,env):
        pass
\`\`\`

## 表达式的转化

\`\`\`python
class ExpressionParser:
    def parse(self,exp,env):
        if exp == []: return []

        if isinstance(exp,list) == False:
            if exp.isdigit():
                exp = NumberExpression(exp)
            elif exp.find('"') != -1 or exp[0].find("'") != -1:
                exp = StringExpression(exp)
            else:
                exp = VariableExpression(exp)
            return exp

        if exp[0] == "define":
            exp = DefineExpression(exp)
        elif exp[0] == "set!":
            exp = AssignmentExpression(exp)
        elif exp[0] == "if":
            exp = IfExpression(exp)
        elif exp[0] == "cond":
            exp = CondExpression(exp)
        elif exp[0] == "lambda":
            exp = LambdaExpression(exp)
        elif exp[0] == "begin":
            exp = SequenceExpression(exp)
        else:
            exp = ApplicationExpression(["application",exp[0],exp[1:]])
        return exp
\`\`\`
`,p=[{level:"2",content:"&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x7C7B;&#x578B;"},{level:"2",content:"&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;"},{level:"2",content:"&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8F6C;&#x5316;"}];export{e as attributes,n as html,s as markdown,p as toc};
//# sourceMappingURL=用python实现一个简易的lisp解释器--格式表达式的转化(3)-DZn0B1wF.js.map
