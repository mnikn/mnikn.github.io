const e={publish:"1",date:"2024-04-24T07:46:10.000Z",tags:["编程","造轮子","lisp解释器"]},n=`<p>在上文中，我们实现了格式表达式的转化，我们看到里面需要一个参数 <code>env</code>，每个表达式都需要根据当前的环境变量来寻找对应的变量或者函数。本文将实现环境变量。</p>
<h2>思路</h2>
<p>我们可以把环境变量看成是一个递归的 <code>hashmap</code>，每个 <code>environment</code> 都有一个 <code>frame</code>，<code>frame</code> 里面有当前环境里面的变量，还有一个 <code>parent_environment</code>，指向上一个 <code>environment</code>。所以我们找一个变量，就是从当前环境到其最上级的环境找这个变量。定义一个变量是把这个变量放入当前环境中。</p>
<h2>实现</h2>
<pre><code class="language-python">class Frame:
    def __init__(self,variables):
        self._vars = variables
    def set_variable(self,name,value):
        self._vars[name] = value
    def get_variable(self,name):
        return self._vars[name]
    def has_variable(self,name):
        return name in self._vars

class Environment:
    def __init__(self):
        self._frame = Frame({})
        self._parent_env = None
    def set_frame(self,frame):
        self._frame = frame
    def set_parent_env(self,env):
        self._parent_env = env
    def get_variable(self,name):
        if self._frame.has_variable(name):
            return self._frame.get_variable(name)
        if self._parent_env == None:
            return None
        return self._parent_env.get_variable(name)
    def set_variable(self,name,value):
        if self._frame.has_variable(name):
            return self._frame.set_variable(name,value)
        if self._parent_env == None:
            raise &quot;Cannot find variable &quot; + name
        return self._parent_env.set_variable(name,value)
    def define_variable(self,name,value):
        self._frame.set_variable(name,value)
    @staticmethod
    def extend_environment(env):
        new_env = Environment()
        new_env.set_parent_env(env)
        return new_env
</code></pre>
`,a=`在上文中，我们实现了格式表达式的转化，我们看到里面需要一个参数 \`env\`，每个表达式都需要根据当前的环境变量来寻找对应的变量或者函数。本文将实现环境变量。


## 思路

我们可以把环境变量看成是一个递归的 \`hashmap\`，每个 \`environment\` 都有一个 \`frame\`，\`frame\` 里面有当前环境里面的变量，还有一个 \`parent_environment\`，指向上一个 \`environment\`。所以我们找一个变量，就是从当前环境到其最上级的环境找这个变量。定义一个变量是把这个变量放入当前环境中。

## 实现

\`\`\`python
class Frame:
    def __init__(self,variables):
        self._vars = variables
    def set_variable(self,name,value):
        self._vars[name] = value
    def get_variable(self,name):
        return self._vars[name]
    def has_variable(self,name):
        return name in self._vars

class Environment:
    def __init__(self):
        self._frame = Frame({})
        self._parent_env = None
    def set_frame(self,frame):
        self._frame = frame
    def set_parent_env(self,env):
        self._parent_env = env
    def get_variable(self,name):
        if self._frame.has_variable(name):
            return self._frame.get_variable(name)
        if self._parent_env == None:
            return None
        return self._parent_env.get_variable(name)
    def set_variable(self,name,value):
        if self._frame.has_variable(name):
            return self._frame.set_variable(name,value)
        if self._parent_env == None:
            raise "Cannot find variable " + name
        return self._parent_env.set_variable(name,value)
    def define_variable(self,name,value):
        self._frame.set_variable(name,value)
    @staticmethod
    def extend_environment(env):
        new_env = Environment()
        new_env.set_parent_env(env)
        return new_env
\`\`\`
`,r=[{level:"2",content:"&#x601D;&#x8DEF;"},{level:"2",content:"&#x5B9E;&#x73B0;"}];export{e as attributes,n as html,a as markdown,r as toc};
//# sourceMappingURL=用python实现一个简易的lisp解释器--环境变量的实现(4)-B1jfUWTC.js.map
