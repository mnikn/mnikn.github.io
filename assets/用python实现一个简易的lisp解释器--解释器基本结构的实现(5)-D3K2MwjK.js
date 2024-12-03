const e={publish:"1",date:"2024-04-24T07:46:10.000Z",tags:["编程","造轮子","lisp解释器"]},n=`<p>本文我们将实现一个解释器的基本结构。</p>
<h2>思路</h2>
<p>一个解释器的执行主要靠两个函数：<code>eval</code> 和 <code>apply</code>。</p>
<p><code>eval</code> 会把你输入的表达式分解成更小的表达式并逐个执行，而 <code>apply</code> 会执行你的表达式。基本流程是这样的，例如你输入一个表达式 <code>(+ 1 2 (/ 3 3))</code>，首先 <code>eval</code> 会把 <code>(+ 1 2 (/ 3 3))</code> 视为一整个表达式，然后会递归执行 <code>eval</code> 解析 <code>(/ 3 3)</code> ，最后 <code>(/ 2 3)</code> 这个表达式已经不可再分解了，就会调用 <code>apply</code> 执行 <code>/</code> 的操作，最后返回结果给上一个表达式，得 <code>(+ 1 2 1)</code>，再执行 <code>apply</code> 得出最终结果 <code>4</code>。</p>
<p>其中 <code>primitive</code> 为默认的操作符，例如 <code>+</code>，<code>-</code>，<code>*</code>，<code>/</code>，我们之后再实现。</p>
<h2>实现</h2>
<pre><code class="language-python">class Evaluator:
    def __init__(self,primitives):
        self._exp_parser = ExpressionParser()
        self._primitives = primitives
    def eval(self,exp,env):
        if exp == []: return

        if isinstance(exp,Expression) == False:
            exp = self._exp_parser.parse(exp,env)
        return exp.eval(self,env)
    def apply(self,proc,args):
        if isinstance(proc,ProcedureExpression):
            proc.env = Environment.extend_environment(dict(zip(proc.args, args)),proc.env)
            return proc.eval(self,proc.env)
        return proc(*args)

def init_primitives():
    global_env.get_frame().set_variables(primitives)

def run_evaluator():
    run_evaluator()

if __name__ == '__main__':
    global_env = Environment()
    exp_formattor = ExpressionFormattor()
    primitives = {
        &quot;+&quot;: add,
        &quot;-&quot;: subtract,
        &quot;*&quot;: multiply,
        &quot;/&quot;: divide,
        &quot;=&quot;: equal,
        &quot;list&quot;: to_list,
        &quot;cons&quot;: cons,
        &quot;car&quot;: car,
        &quot;cdr&quot;: cdr,
        &quot;null?&quot;: null}
    init_primitives()
    evaluator = Evaluator(primitives)
    run_evaluator()
</code></pre>
`,o=`本文我们将实现一个解释器的基本结构。

## 思路

一个解释器的执行主要靠两个函数：\`eval\` 和 \`apply\`。

\`eval\` 会把你输入的表达式分解成更小的表达式并逐个执行，而 \`apply\` 会执行你的表达式。基本流程是这样的，例如你输入一个表达式 \`(+ 1 2 (/ 3 3))\`，首先 \`eval\` 会把 \`(+ 1 2 (/ 3 3))\` 视为一整个表达式，然后会递归执行 \`eval\` 解析 \`(/ 3 3)\` ，最后 \`(/ 2 3)\` 这个表达式已经不可再分解了，就会调用 \`apply\` 执行 \`/\` 的操作，最后返回结果给上一个表达式，得 \`(+ 1 2 1)\`，再执行 \`apply\` 得出最终结果 \`4\`。

其中 \`primitive\` 为默认的操作符，例如 \`+\`，\`-\`，\`*\`，\`/\`，我们之后再实现。

## 实现

\`\`\`python
class Evaluator:
    def __init__(self,primitives):
        self._exp_parser = ExpressionParser()
        self._primitives = primitives
    def eval(self,exp,env):
        if exp == []: return

        if isinstance(exp,Expression) == False:
            exp = self._exp_parser.parse(exp,env)
        return exp.eval(self,env)
    def apply(self,proc,args):
        if isinstance(proc,ProcedureExpression):
            proc.env = Environment.extend_environment(dict(zip(proc.args, args)),proc.env)
            return proc.eval(self,proc.env)
        return proc(*args)

def init_primitives():
    global_env.get_frame().set_variables(primitives)

def run_evaluator():
    run_evaluator()

if __name__ == '__main__':
    global_env = Environment()
    exp_formattor = ExpressionFormattor()
    primitives = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
        "=": equal,
        "list": to_list,
        "cons": cons,
        "car": car,
        "cdr": cdr,
        "null?": null}
    init_primitives()
    evaluator = Evaluator(primitives)
    run_evaluator()
\`\`\`
`,r=[{level:"2",content:"&#x601D;&#x8DEF;"},{level:"2",content:"&#x5B9E;&#x73B0;"}];export{e as attributes,n as html,o as markdown,r as toc};
//# sourceMappingURL=用python实现一个简易的lisp解释器--解释器基本结构的实现(5)-D3K2MwjK.js.map
