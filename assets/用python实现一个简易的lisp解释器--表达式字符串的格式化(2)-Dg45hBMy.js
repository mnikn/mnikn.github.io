const n={publish:"1",date:"2024-04-24T07:46:10.000Z",tags:["编程","造轮子","lisp解释器"]},e=`<p>本文我们实现表达式字符串的格式化。</p>
<h2>要得到的格式</h2>
<p>设想一下我们要输入的表达式字符串是：</p>
<pre><code class="language-scheme">(* 2 (+ 3 4 (- 1 2)) 5)
</code></pre>
<p>而我们的目标格式是一个 <code>list</code>：</p>
<pre><code class="language-python">[* 2 [+ 3 [1 2]] 5] 
</code></pre>
<p>以下是解析代码：</p>
<pre><code class="language-python">class ExpressionFormattor:
    def format(self,exp):
        if exp.isdigit() or (exp.find(&quot;'&quot;) != -1 or exp.find('&quot;') != -1) or (exp.find(&quot;(&quot;) == -1 and exp.find(&quot;)&quot;) == -1):
            return exp
        exp = exp.replace(&quot;\\n&quot;,&quot; &quot;)
        return self._convert_to_list(exp)
    def _convert_to_list(self,exp):
        if exp.find(&quot;(&quot;) == -1:
            return exp != &quot;&quot; and [exp] or []
        exp_list = []
        word = &quot;&quot;
        i = 1
        while i &lt; len(exp)-1:
            if exp[i].isspace():
                if word != &quot;&quot;:
                    exp_list.append(word)
                    word = &quot;&quot;
                i += 1
            elif exp[i] == &quot;'&quot;:
                i += 1
            elif exp[i] == &quot;(&quot;:
                right_par_index = self._find_right_parenthesis(exp,i)
                exp_list.append(self._convert_to_list(exp[i:right_par_index+1]))
                i = right_par_index + 1
            else:
                word += exp[i]
                i += 1
        if word != &quot;&quot;:
            exp_list.append(word)
        return exp_list
    def _find_right_parenthesis(self,exp,left_index):
        count = 0
        for i in range(left_index,len(exp) - 1):
            if exp[i] == &quot;(&quot;:
                count += 1
            elif exp[i] == &quot;)&quot;:
                count -= 1
                if count == 0:
                    return i
        return -1
</code></pre>
`,t=`本文我们实现表达式字符串的格式化。


## 要得到的格式

设想一下我们要输入的表达式字符串是：

\`\`\`scheme
(* 2 (+ 3 4 (- 1 2)) 5)
\`\`\`

而我们的目标格式是一个 \`list\`：

\`\`\`python
[* 2 [+ 3 [1 2]] 5] 
\`\`\`

以下是解析代码：

\`\`\`python
class ExpressionFormattor:
    def format(self,exp):
        if exp.isdigit() or (exp.find("'") != -1 or exp.find('"') != -1) or (exp.find("(") == -1 and exp.find(")") == -1):
            return exp
        exp = exp.replace("\\n"," ")
        return self._convert_to_list(exp)
    def _convert_to_list(self,exp):
        if exp.find("(") == -1:
            return exp != "" and [exp] or []
        exp_list = []
        word = ""
        i = 1
        while i < len(exp)-1:
            if exp[i].isspace():
                if word != "":
                    exp_list.append(word)
                    word = ""
                i += 1
            elif exp[i] == "'":
                i += 1
            elif exp[i] == "(":
                right_par_index = self._find_right_parenthesis(exp,i)
                exp_list.append(self._convert_to_list(exp[i:right_par_index+1]))
                i = right_par_index + 1
            else:
                word += exp[i]
                i += 1
        if word != "":
            exp_list.append(word)
        return exp_list
    def _find_right_parenthesis(self,exp,left_index):
        count = 0
        for i in range(left_index,len(exp) - 1):
            if exp[i] == "(":
                count += 1
            elif exp[i] == ")":
                count -= 1
                if count == 0:
                    return i
        return -1
\`\`\`
`,i=[{level:"2",content:"&#x8981;&#x5F97;&#x5230;&#x7684;&#x683C;&#x5F0F;"}];export{n as attributes,e as html,t as markdown,i as toc};
//# sourceMappingURL=用python实现一个简易的lisp解释器--表达式字符串的格式化(2)-Dg45hBMy.js.map
