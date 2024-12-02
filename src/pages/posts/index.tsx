export default function Posts() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">文章列表</h1>
      <div className="grid gap-6">
        {/* 示例文章卡片 */}
        <article className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">示例文章标题</h2>
          <p className="text-gray-600 mb-4">这是一篇示例文章的摘要内容...</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>发布于 2024-02-28</span>
            <span className="mx-2">·</span>
            <span>5 分钟阅读</span>
          </div>
        </article>
      </div>
    </div>
  )
}
