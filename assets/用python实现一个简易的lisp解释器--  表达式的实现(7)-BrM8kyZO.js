const e={publish:"1",date:"2024-04-24T07:46:10.000Z",tags:["编程","造轮子","lisp解释器"]},n=`<p>本文，我们将实现表达式里面的 <code>eval</code> 函数，这样一个简易的解释器就实现了。</p>
<h2>表达式的实现</h2>
<p>对于数字和字符串这种自己进行估算的表达式，我们直接返回值就行了：</p>
<pre><code class="language-python">class NumberExpression(Expression):
    def __init__(self,exp):
        self.value = int(exp)
    def eval(self,evaluator,env):
        return self.value

class StringExpression(Expression):
    def __init__(self,exp):
        self.value = exp[1:len(exp)-1]
    def eval(self,evaluator,env):
        return self.value
</code></pre>
<p>对于变量表达式，我们要根据环境变量找到变量的值并返回，而对赋值表达式，我们使用环境变量改变该变量的值：</p>
<pre><code class="language-python">class VariableExpression(Expression):
    def __init__(self,exp):
        self.name = exp
    def eval(self,evaluator,env):
        return env.get_variable(self.name)

class AssignmentExpression(Expression):
    def __init__(self,exp):
        self.variable = exp[1]
        self.value = exp[2]
    def eval(self,evaluator,env):
        value = evaluator.eval(exp.value,env)
        env.set_variable(self.variable,value)
        print(&quot;ok&quot;)
</code></pre>
<p>对于定义表达式，我们分为两种情况：定义函数和定义变量，对于定义函数，我们把函数里的内容转化为 lambda 表达式，再让 lambda 表达式进行 eval，转化为 Procedure 表达式。对于定义变量，直接使用环境变量定义即可：</p>
<pre><code class="language-python">class DefineExpression(Expression):
    def __init__(self,exp):
        if isinstance(exp[1],list):
            self.variable = exp[1][0]
            self.value = LambdaExpression(['lambda',exp[1][1:],exp[2]])
        else:
            self.variable = exp[1]
            self.value = exp[2]
    def eval(self,evaluator,env):
        value = evaluator.eval(self.value,env)
        env.define_variable(self.variable,value)
        print(&quot;ok&quot;)

class LambdaExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.body = exp[2]
    def eval(self,evaluator,env):
        return ProcedureExpression([&quot;procedure&quot;,self.args,self.body,env])

class ProcedureExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.proc = exp[2]
        self.env = exp[3]
    def eval(self,evaluator,env):
        return evaluator.eval(self.proc,env)
</code></pre>
<p>对于 If 表达式，我们先 eval 条件，然后根据 eval 结果再 eval 对应分支，而 cond 表达式则需要转化为嵌套的 if 表达式再进行 eval：</p>
<pre><code class="language-python">class IfExpression(Expression):
    def __init__(self,exp):
        self.pred = exp[1]
        self.true_exp = exp[2]
        self.false_exp = exp[3]
    def eval(self,evaluator,env):
        if evaluator.eval(self.pred,env):
            return evaluator.eval(self.true_exp,env)
        return evaluator.eval(self.false_exp,env)

class CondExpression(Expression):
    def __init__(self,exp):
        self.conditions = exp[1:len(exp)-1]
        self.otherwise = exp[-1]
    def eval(self,evaluator,env):
        exps = self._cond_to_if(self.conditions)
        return IfExpression(exps).eval(evaluator,env)
    def _cond_to_if(self,conditions):
        if len(conditions) == 1:
            return [&quot;if&quot;] + conditions[0] + [self.otherwise[-1]]
        conditions[0] += [self._cond_to_if(conditions[1:])]
        return [&quot;if&quot;] + conditions[0]
</code></pre>
<p>对于 SequenceExpression，我们直接迭代执行里面的表达式即可：</p>
<pre><code class="language-python">class SequenceExpression(Expression):
    def __init__(self,exp):
        self.exps = exp[1:]
    def eval(self,evaluator,env):
        result = None
        for exp in self.exps:
            result = evaluator.eval(exp,env)
        return result
</code></pre>
<p>对于 ApplicationExpression，我们需要先计算出参数的值，然后调用 evaluator 的 apply：</p>
<pre><code class="language-python">class ApplicationExpression(Expression):
    def __init__(self,exp):
        self.operator = exp[1]
        self.args = exp[2]
    def eval(self,evaluator,env):
        operator = evaluator.eval(self.operator,env)
        arg_values = map(lambda arg: evaluator.eval(arg,env),self.args)
        return evaluator.apply(operator,arg_values)
</code></pre>
`,s=`本文，我们将实现表达式里面的 \`eval\` 函数，这样一个简易的解释器就实现了。


## 表达式的实现

对于数字和字符串这种自己进行估算的表达式，我们直接返回值就行了：

\`\`\`python
class NumberExpression(Expression):
    def __init__(self,exp):
        self.value = int(exp)
    def eval(self,evaluator,env):
        return self.value

class StringExpression(Expression):
    def __init__(self,exp):
        self.value = exp[1:len(exp)-1]
    def eval(self,evaluator,env):
        return self.value
\`\`\`

对于变量表达式，我们要根据环境变量找到变量的值并返回，而对赋值表达式，我们使用环境变量改变该变量的值：

\`\`\`python
class VariableExpression(Expression):
    def __init__(self,exp):
        self.name = exp
    def eval(self,evaluator,env):
        return env.get_variable(self.name)

class AssignmentExpression(Expression):
    def __init__(self,exp):
        self.variable = exp[1]
        self.value = exp[2]
    def eval(self,evaluator,env):
        value = evaluator.eval(exp.value,env)
        env.set_variable(self.variable,value)
        print("ok")
\`\`\`

对于定义表达式，我们分为两种情况：定义函数和定义变量，对于定义函数，我们把函数里的内容转化为 lambda 表达式，再让 lambda 表达式进行 eval，转化为 Procedure 表达式。对于定义变量，直接使用环境变量定义即可：

\`\`\`python
class DefineExpression(Expression):
    def __init__(self,exp):
        if isinstance(exp[1],list):
            self.variable = exp[1][0]
            self.value = LambdaExpression(['lambda',exp[1][1:],exp[2]])
        else:
            self.variable = exp[1]
            self.value = exp[2]
    def eval(self,evaluator,env):
        value = evaluator.eval(self.value,env)
        env.define_variable(self.variable,value)
        print("ok")

class LambdaExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.body = exp[2]
    def eval(self,evaluator,env):
        return ProcedureExpression(["procedure",self.args,self.body,env])

class ProcedureExpression(Expression):
    def __init__(self,exp):
        self.args = exp[1]
        self.proc = exp[2]
        self.env = exp[3]
    def eval(self,evaluator,env):
        return evaluator.eval(self.proc,env)
\`\`\`

对于 If 表达式，我们先 eval 条件，然后根据 eval 结果再 eval 对应分支，而 cond 表达式则需要转化为嵌套的 if 表达式再进行 eval：

\`\`\`python
class IfExpression(Expression):
    def __init__(self,exp):
        self.pred = exp[1]
        self.true_exp = exp[2]
        self.false_exp = exp[3]
    def eval(self,evaluator,env):
        if evaluator.eval(self.pred,env):
            return evaluator.eval(self.true_exp,env)
        return evaluator.eval(self.false_exp,env)

class CondExpression(Expression):
    def __init__(self,exp):
        self.conditions = exp[1:len(exp)-1]
        self.otherwise = exp[-1]
    def eval(self,evaluator,env):
        exps = self._cond_to_if(self.conditions)
        return IfExpression(exps).eval(evaluator,env)
    def _cond_to_if(self,conditions):
        if len(conditions) == 1:
            return ["if"] + conditions[0] + [self.otherwise[-1]]
        conditions[0] += [self._cond_to_if(conditions[1:])]
        return ["if"] + conditions[0]
\`\`\`

对于 SequenceExpression，我们直接迭代执行里面的表达式即可：

\`\`\`python
class SequenceExpression(Expression):
    def __init__(self,exp):
        self.exps = exp[1:]
    def eval(self,evaluator,env):
        result = None
        for exp in self.exps:
            result = evaluator.eval(exp,env)
        return result
\`\`\`

对于 ApplicationExpression，我们需要先计算出参数的值，然后调用 evaluator 的 apply：

\`\`\`python
class ApplicationExpression(Expression):
    def __init__(self,exp):
        self.operator = exp[1]
        self.args = exp[2]
    def eval(self,evaluator,env):
        operator = evaluator.eval(self.operator,env)
        arg_values = map(lambda arg: evaluator.eval(arg,env),self.args)
        return evaluator.apply(operator,arg_values)
\`\`\`
`,l=[{level:"2",content:"&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;"}];export{e as attributes,n as html,s as markdown,l as toc};
//# sourceMappingURL=用python实现一个简易的lisp解释器--  表达式的实现(7)-BrM8kyZO.js.map
