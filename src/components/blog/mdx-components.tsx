import Image from 'next/image'
import Link from 'next/link'
import { Callout } from './callout'

export const mdxComponents = {
  Callout,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-sm-text-primary mt-10 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-sm-text-primary mt-8 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold text-sm-text-primary mt-6 mb-2" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold text-sm-text-primary mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm-text-secondary leading-relaxed mb-4" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm-accent-primary hover:underline"
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href || '#'} className="text-sm-accent-primary hover:underline" {...props}>
        {children}
      </Link>
    )
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-sm-text-secondary" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-sm-text-secondary" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-sm-accent-primary pl-4 my-6 italic text-sm-text-secondary"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-sm-border-default" />,
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-6">
      <Image
        src={src as string || ''}
        alt={alt || ''}
        width={800}
        height={450}
        className="rounded-lg w-full h-auto"
      />
      {alt && (
        <figcaption className="text-center text-sm text-sm-text-muted mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="rounded-lg overflow-x-auto my-6 text-sm [&>code]:block [&>code]:p-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (not inside pre)
    const isBlock = typeof props.children === 'string' && props.children.includes('\n')
    if (isBlock) return <code {...props} />
    return (
      <code
        className="bg-sm-surface-secondary text-sm-accent-primary px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    )
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-sm-border-default" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="bg-sm-surface-secondary border border-sm-border-default px-4 py-2 text-left font-semibold text-sm-text-primary" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-sm-border-default px-4 py-2 text-sm-text-secondary" {...props} />
  ),
}
