interface MarkdownContent {
  content: string
  attributes: {
    title?: string
    date?: string
    [key: string]: any
  }
}

export const loadMarkdownFiles = async () => {
  const markdownFiles = (import.meta as any).glob('../../data/posts/**/*.md', {
    // eager: true,
    // as: 'raw',
  })

  const promises: Promise<{ fileName: string; content: MarkdownContent }>[] = []
  Object.entries(markdownFiles).forEach(([path, content]) => {
    const fileName = path.split('/').pop()?.replace('.md', '')
    promises.push(
      (content as any)().then((fileContent: any) => {
        console.log(fileContent)
        if (!fileContent?.attributes?.title) {
          fileContent.attributes.title = fileName || fileContent?.toc[0]?.content || 'Untitled'
        }
        // if (!fileContent?.attributes?.date) {
        //   fileContent.attributes.date = new Date().toString()
        // }
        if (!fileContent?.attributes?.description) {
          fileContent.attributes.description =
            fileContent?.markdown.length > 1000
              ? fileContent?.markdown.substring(0, 1000) + '...'
              : fileContent?.markdown
        }

        return {
          fileName,
          content: {
            content: fileContent.markdown,
            attributes: fileContent.attributes,
          } as MarkdownContent,
        }
      })
    )
  })

  return await Promise.all(promises)
}
