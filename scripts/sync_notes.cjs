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
function copyFiles(source, target) {
  // 读取源目录
  const files = fs.readdirSync(source)

  files.forEach(file => {
    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)

    const stat = fs.statSync(sourcePath)

    if (stat.isDirectory()) {
      // 忽略 .trash 目录
      if (['.trash', '.obsidian'].includes(file)) {
        return
      }

      // 如果是目录则递归复制
      const subFiles = fs.readdirSync(sourcePath)
      let hasPublishedFiles = false

      // 检查子目录中是否有需要发布的文件
      for (const subFile of subFiles) {
        const subSourcePath = path.join(sourcePath, subFile)
        const subStat = fs.statSync(subSourcePath)

        if (subStat.isFile() && subFile.endsWith('.md')) {
          const fileContent = fs.readFileSync(subSourcePath, 'utf8')
          const { data } = matter(fileContent)
          if (data.publish === '1') {
            hasPublishedFiles = true
            break
          }
        }
      }

      // 只有当目录包含需要发布的文件时才创建目录
      if (hasPublishedFiles) {
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true })
        }
        copyFiles(sourcePath, targetPath)
      }
    } else if (file.endsWith('.md')) {
      const fileContent = fs.readFileSync(sourcePath, 'utf8')
      const { data } = matter(fileContent)
      // 只复制 markdown 文件
      if (data.publish === '1') {
        fs.copyFileSync(sourcePath, targetPath)
        console.log(`已复制: ${file}`)
      }
    }
  })
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
