import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface MarkdownContent {
  slug: string
  content: string
  frontmatter: {
    title: string
    date: string
    description: string
    [key: string]: any
  }
}

export function getMarkdownFiles(directory: string): MarkdownContent[] {
  const files = fs.readdirSync(path.join(process.cwd(), directory))

  return files.map(filename => {
    const slug = filename.replace('.md', '')
    const filePath = path.join(process.cwd(), directory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    return {
      slug,
      content,
      frontmatter: frontmatter as MarkdownContent['frontmatter'],
    }
  })
}

export function getMarkdownFileBySlug(directory: string, slug: string): MarkdownContent {
  const filePath = path.join(process.cwd(), directory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)

  return {
    slug,
    content,
    frontmatter: frontmatter as MarkdownContent['frontmatter'],
  }
}
