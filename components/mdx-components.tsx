import Image from "next/image";
import Link from "next/link";
import { Link as I18nLink } from "@/i18n/routing";

const components = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 mb-4 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-4 mb-2 text-lg font-semibold tracking-tight" {...props} />
  ),

  // Paragraphs
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 text-base leading-7 text-foreground" {...props} />
  ),

  // Links
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    const LinkComponent = isExternal ? Link : I18nLink;

    return (
      <LinkComponent
        href={href || "#"}
        className="font-medium text-chart-2 hover:text-chart-2/80 underline underline-offset-4 transition-colors"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      />
    );
  },

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-base leading-7" {...props} />
  ),

  // Blockquote
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-4 border-chart-2/30 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),

  // Code
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !props.className;
    return isInline ? (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      />
    ) : (
      <code {...props} />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm"
      {...props}
    />
  ),

  // Horizontal rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),

  // Images
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;

    const srcString = typeof src === "string" ? src : "";
    if (!srcString) return null;

    // Handle external images
    if (srcString.startsWith("http")) {
      return (
        <img
          src={srcString}
          alt={alt}
          className="my-6 rounded-lg border border-border"
          {...props}
        />
      );
    }

    // Handle local images with Next.js Image
    // Extract props that shouldn't be passed to Image
    const { width, height, ...imageProps } = props;
    return (
      <div className="my-6">
        <Image
          src={srcString}
          alt={alt || ""}
          width={800}
          height={400}
          className="rounded-lg border border-border"
          {...imageProps}
        />
      </div>
    );
  },

  // Tables
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse border border-border"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-border" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
};

export default components;
