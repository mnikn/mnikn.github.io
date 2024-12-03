const n={publish:"1",date:"2024-04-24T07:46:10.000Z",tags:["编程","造轮子","lisp解释器"]},e=`<p>在上文中，我们提到了 <code>Evaluator</code> 有默认的操作符，本文将实现这些操作符。</p>
<h2>默认操作符的实现</h2>
<pre><code class="language-python">def accumulate(proc,init,args):
    result = init
    for i in args:
        result = proc(result,i)
    return result

def add(*args):
    return accumulate(lambda a,b:a + b,0,args)
def subtract(*args):
    return accumulate(lambda a,b:a - b,0,args)
def multiply(*args):
    return accumulate(lambda a,b:a * b,1,args)
def divide(*args):
    return accumulate(lambda a,b:a / b,1,args)

def to_list(*args):
    return accumulate(lambda a,b:a + [b],[],args)

def cons(first,second):
    return [first] + [second]
def car(pair):
    return pair[0]
def cdr(pair):
    if len(pair) == 2:
        return pair[1]
    return pair[1:]
def null(seq):
    return seq == []

</code></pre>
<h2>在 Evaluator 里设置默认操作符</h2>
<pre><code class="language-python">class Evaluator:
    def __init__(self):
        self._exp_parser = ExpressionParser()
        self._init_primitives()
    def eval(self,exp,env):
        if exp == []: return

        if isinstance(exp,Expression) == False:
            exp = self._exp_parser.parse(exp)

        if isinstance(exp,Expression) == False:
            if len(exp) == 1:
                exp = VariableExpression(exp)
            else:
                args = list(map(lambda arg: self.eval(arg,env),exp[1:]))
                proc = env.get_variable(exp[0])
                if proc == None:
                    proc = self._primitives[exp[0]]
                
                if isinstance(proc,ProcedureExpression):
                    for i in range(len(proc.args)):
                        proc.env.define_variable(proc.args[i],args[i])
                return self.apply(proc,args)
        return exp.eval(self,env)
    def apply(self,proc,args):
        if proc in self._primitives.values():
            return proc(*args)
        return self.eval(proc.proc,proc.env)
    def _init_primitives(self):
        self._primitives = {
            &quot;+&quot;: add,
            &quot;-&quot;: subtract,
            &quot;*&quot;: multiply,
            &quot;/&quot;: divide,
            &quot;list&quot;: to_list,
            &quot;cons&quot;: cons,
            &quot;car&quot;: car,
            &quot;cdr&quot;: cdr,
            &quot;null?&quot;: null
        }
</code></pre>
`,r=`在上文中，我们提到了 \`Evaluator\` 有默认的操作符，本文将实现这些操作符。


## 默认操作符的实现

\`\`\`python
def accumulate(proc,init,args):
    result = init
    for i in args:
        result = proc(result,i)
    return result

def add(*args):
    return accumulate(lambda a,b:a + b,0,args)
def subtract(*args):
    return accumulate(lambda a,b:a - b,0,args)
def multiply(*args):
    return accumulate(lambda a,b:a * b,1,args)
def divide(*args):
    return accumulate(lambda a,b:a / b,1,args)

def to_list(*args):
    return accumulate(lambda a,b:a + [b],[],args)

def cons(first,second):
    return [first] + [second]
def car(pair):
    return pair[0]
def cdr(pair):
    if len(pair) == 2:
        return pair[1]
    return pair[1:]
def null(seq):
    return seq == []

\`\`\`

## 在 Evaluator 里设置默认操作符

\`\`\`python
class Evaluator:
    def __init__(self):
        self._exp_parser = ExpressionParser()
        self._init_primitives()
    def eval(self,exp,env):
        if exp == []: return

        if isinstance(exp,Expression) == False:
            exp = self._exp_parser.parse(exp)

        if isinstance(exp,Expression) == False:
            if len(exp) == 1:
                exp = VariableExpression(exp)
            else:
                args = list(map(lambda arg: self.eval(arg,env),exp[1:]))
                proc = env.get_variable(exp[0])
                if proc == None:
                    proc = self._primitives[exp[0]]
                
                if isinstance(proc,ProcedureExpression):
                    for i in range(len(proc.args)):
                        proc.env.define_variable(proc.args[i],args[i])
                return self.apply(proc,args)
        return exp.eval(self,env)
    def apply(self,proc,args):
        if proc in self._primitives.values():
            return proc(*args)
        return self.eval(proc.proc,proc.env)
    def _init_primitives(self):
        self._primitives = {
            "+": add,
            "-": subtract,
            "*": multiply,
            "/": divide,
            "list": to_list,
            "cons": cons,
            "car": car,
            "cdr": cdr,
            "null?": null
        }
\`\`\`
`,a=[{level:"2",content:"&#x9ED8;&#x8BA4;&#x64CD;&#x4F5C;&#x7B26;&#x7684;&#x5B9E;&#x73B0;"},{level:"2",content:"&#x5728; Evaluator &#x91CC;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x64CD;&#x4F5C;&#x7B26;"}];export{n as attributes,e as html,r as markdown,a as toc};
//# sourceMappingURL=用python实现一个简易的lisp解释器--默认操作符的实现(6)-az3jrfFV.js.map
