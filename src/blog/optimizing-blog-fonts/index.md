---
title: Making My Blog 3x Faster
description: Optimizing fonts to slash load times
pubDate: 2023-06-27
---

Custom fonts are a great way to make your website stand out, but for simple static websites, they can be a huge performance bottleneck. Let me show you how I reduced the First Contentful Paint of my blog from **2.5s to 0.9s, a nearly 3x improvement**, by optimizing fonts.

## Font overview

On my blog, I use three fonts: Lexend Deca for headings, Geologica for the body text, and JetBrains Mono for code blocks. Then, I use the Google Fonts CDN to load them.

Google Fonts offers a simple way to load fonts on your website. It generates a few `link` tags that you add to your `head` element. Here's the snippet my blog used:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geologica&family=JetBrains+Mono:wght@400;600&family=Lexend+Deca:wght@400;600;700;800;900&display=swap" rel="stylesheet">
```

## Why is Google Fonts slow?

![Google PageSpeed Insights when using Google Fonts, 88 Performance, 2.5s FCP](./before.png)

Above you can see the results of running [Google PageSpeed Insights](https://pagespeed.web.dev/) on my blog. It gives me a score of 88 for performance and a First Contentful Paint of 2.5s. That's not great for a basic static website.

While Google Fonts is extremely easy to use, that simplicity comes at a cost. Because the fonts are hosted on a separate domain, the browser has to:

 - Make a DNS request to resolve the domain
 - Make an HTTP request to fetch the CSS definitions for the fonts
 - Make another request to download the fonts from the CSS definitions
 
That's a lot of work! The DNS request can be slow, and the chained request of CSS and then font is very slow on mobile networks that have high latency.

## Hosting Fonts Locally

By hosting the font locally, we avoid the DNS request and the chained request. This way, we're just doing the font download step, which is much faster.

To host the fonts locally, we need to download the font files and add them to our project. I downloaded the base variable fonts from Google Fonts and added them to my project in the public `fonts` directory.

Then I added inline CSS to my `head` element in the layout file that's used for every page:

```html
  <style>
    @font-face {
      font-family: "Geologica";
      src: url("/fonts/Geologica.ttf") format("truetype");
      font-display: fallback;
    }
    @font-face {
      font-family: "Lexend Deca";
      src: url("/fonts/LexendDeca.ttf") format("truetype");
      font-display: fallback;
    }
    @font-face {
      font-family: "JetBrains Mono";
      src: url("/fonts/JetBrainsMono.ttf") format("truetype");
      font-display: fallback;
    }
  </style>
```

### Quick Aside on `font-display`

I also added `font-display: fallback` to the CSS to make sure that the fallback font is used while the custom font is loading. This is slightly different from `font-display: swap`. `fallback` gives the custom font 100ms of blank loading time for the custom font to load before switching to the fallback font. `swap` switches to the fallback font immediately and then switches to the custom font when it's loaded. I prefer `fallback` because it usually avoids the flash of unstyled text that `swap` can cause.

### Local Font Results

![Google PageSpeed Insights when using basic local fonts, 98 Performance, 0.9s FCP](./basic-local.png)

As we can see, the results are much better! We get a score of 98 for performance and a First Contentful Paint of 0.9s. That's a nearly 3x improvement in First Contentful Paint already!

There are still some improvements to be done, though. The default variable fonts we downloaded from Google Fonts are huge. 

![Total download 305 KB, fonts download 231 KB](./basic-local-size.png)

The total download size of the page is 305 KB, which is pretty good. However, the fonts are 231 KB, which is over 75% of the total download size! This is resulting in a Largest Contentful Paint that hasn't changed much, and there's still layout shift as the fonts load.

## Optimizing Local Fonts

As you might suspect, Google Fonts doesn't serve these original variable fonts to the browser. Instead, it serves a subset of the font, optimizes it, and compresses it. We can do the same thing to our local fonts to get the same benefits.

We'll be using the `pyftsubset` tool from `fonttools` to subset and optimize the fonts. First, we need to install `fonttools`:

```bash
pip install fonttools brotli zopfli
```

Then, we can run `pyftsubset` on our fonts to subset and optimize them:

```bash
pyftsubset\
  LexendDeca.ttf \
  --output-file="LexendDeca.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,calt,ccmp,locl,mark,mkmk,\
  onum,pnum,smcp,c2sc,frac,lnum,tnum,subs,sups,\
  cswh,dlig,ss01,ss03,zero"\
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,\
  U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,\
  U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

Let's break down what each of these options are doing:

 - `--flavor=woff2` tells `pyftsubset` to output a WOFF2 file, which is a compressed font format that's supported by all modern browsers.
 - `--layout-features` lets us select the OpenType features we want to include in the font. We're selecting all the ones we should need.
 - `--unicodes` lets us select the Unicode characters we want to include in the font. We're selecting the same range that Google Fonts uses for their Latin subset. You can change this depending on if you need to support other languages.

*For further reading on why these options are being chosen, please check out the [amazing article](https://markoskon.com/creating-font-subsets/) from Markos Konstantopoulos that gives much more detail to this process.*

Now that we have our subsetted and optimized font, we can update our CSS to use the WOFF2 file instead of the TTF file:

```css
@font-face {
  font-family: "Lexend Deca";
  src: url("/fonts/LexendDeca.woff2") format("woff2");
  font-display: fallback;
}
```

After completing this, the home page fonts download size was reduced from 231 KB to 82 KB and the total download size was reduced from 305 KB to 153 KB.

### Optimized Local Font Results

![Google PageSpeed Insights when using optimized local fonts, 100 Performance, 0.9s FCP](./optimized-local.png)

And now we've achieved the coveted 100 performance score! The reduction in the font download size helped us reduce the Largest Contentful Paint by a whole second and eliminated the layout shift entirely.

## Optimize Your Fonts!

Fonts are often overlooked when optimizing the speed of a website, but they can have a huge impact, particularly on simple static websites. By taking the simple step of hosting the fonts locally and optimizing them, we're able to dramatically improve the performance of our website.

Give it a try on your own website, and hopefully you'll see some impressive results!
