import { type NextSeoProps } from "next-seo"

const config: NextSeoProps = {
  title: "URL Shortener",
  titleTemplate: "%s - slug",
  description: "A URL shortener built with T3 Stack",
  defaultTitle: "slug",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/img/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/img/apple-touch-icon-180x180.png",
      sizes: "180x180",
    },
    {
      rel: "apple-touch-icon",
      href: "/img/apple-touch-icon-152x152.png",
      sizes: "152x152",
    },
    {
      rel: "apple-touch-icon",
      href: "/img/apple-touch-icon-114x114.png",
      sizes: "114x114",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  openGraph: {
    site_name: "slug",
    url: "https://slug-link-shorten.vercel.app/",
    type: "website",
    locale: "en_IE",
    images: [
      {
        url: "/img/banner.jpg",
        width: 1920,
        height: 1080,
        type: "image/jpg",
      },
    ],
  },
  twitter: {
    handle: "@Kurumeii",
    site: "@Kurumeii",
    cardType: "summary_large_image",
  },
}
export default config
