const fs = require('fs')
const os = require('os')
const path = require('path')

const matter = require('gray-matter') // 添加 gray-matter

// 源目录和目标目录
const sourceDir = path.join(os.homedir(), 'OneDrive', 'obsidian', 'notes')
const targetDir = path.join(__dirname, '..', 'data', 'posts')

// 清空目标目录
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true })
  console.log('已清空目标目录')
}

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// 复制文件函数
function copyFiles(source) {
  const stat = fs.statSync(source)
  if (stat.isFile() && source.endsWith('.md')) {
    const fileContent = fs.readFileSync(source, 'utf8')
    const { data, content } = matter(fileContent)
    // 只复制 markdown 文件
    if (data.publish === '1') {
      // 获取文件最后修改时间
      const stats = fs.statSync(source)
      const date = stats.birthtime.toISOString()

      const pathArray = path
        .dirname(source)
        .replace(sourceDir, '')
        .split(path.sep)
        .filter(segment => segment.length > 0)
      // 更新 frontmatter
      const updatedContent = matter.stringify(content, {
        ...data,
        date,
        tags: pathArray,
      })

      // 写入新文件
      const targetPath = path.join(targetDir, source.replace(sourceDir, ''))
      const targetDirPath = path.dirname(targetPath)
      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true })
      }
      fs.writeFileSync(targetPath, updatedContent)
      console.log(`已复制: ${source}`)
    }

    // const fileContent = fs.readFileSync(sourcePath, 'utf8')
    // const { data } = matter(fileContent)
    // // 只复制 markdown 文件
    // if (data.publish === '1') {
    //   fs.copyFileSync(sourcePath, targetPath)
    //   console.log(`已复制: ${file}`)
    // }
    return
  } else if (stat.isDirectory()) {
    // 忽略 .trash 目录
    if (['.trash', '.obsidian'].includes(source)) {
      return
    }

    const subFiles = fs.readdirSync(source)
    subFiles.forEach(file => {
      const subSourcePath = path.join(source, file)
      copyFiles(subSourcePath)
    })
    return
  }
}

try {
  // 开始同步
  console.log('开始同步笔记...')
  copyFiles(sourceDir, targetDir)
  console.log('同步完成!')
} catch (err) {
  console.error('同步出错:', err)
  process.exit(1)
}
