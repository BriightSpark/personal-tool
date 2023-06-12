export interface RichTextModel {
  id: string
  assets: {
    url: string
    description: string
  }[]
}

export interface LocationModel {
  lat: number
  lon: number
}

export interface CustomMarkdownOptionsModel {
  links: {
    assets: {
      block: any
    }
  }
  json?: any
}

export interface Tag {
  id: string
  name: string
}

export interface Post {
  author: {
    avatar: {
      url: string
    }
    name: string
  }
  banner: {
    url: string
  }
  content: CustomMarkdownOptionsModel
  contentfulMetadata: {
    tags: Tag[]
  }
  date: string,
  excerpt: string
  slug: string
  title: string
}