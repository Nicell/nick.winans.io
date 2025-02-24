import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

async function loadGoogleFont(font: string, weight = "400") {
  const cache = caches.default;
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
  const cacheKey = new Request(url);
  let response = await cache.match(cacheKey);

  if (!response) {
    const css = await (await fetch(url)).text();
    const resource = css.match(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/
    );

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status == 200) {
        const clonedResponse = response.clone();
        await cache.put(cacheKey, clonedResponse);
        return await response.arrayBuffer();
      }
    }

    throw new Error("failed to load font data");
  }

  return await response.arrayBuffer();
}

export const onRequest: PagesFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "use ?title=";
  const description = searchParams.get("description") || "use ?description=";
  const date = searchParams.get("date") || "use ?date=";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#fcf8ed",
          color: "#332c2d",
          fontFamily: "JetBrainsMono",
          borderBottom: "1rem solid #0056a4",
        }}
        tw="h-full flex flex-col justify-between w-full py-14 px-16 pb-10"
      >
        <div tw="flex flex-col">
          <div tw="pb-5 text-6xl font-bold">{title}</div>
          <div
            style={{
              lineHeight: "1.15em",
            }}
            tw="text-5xl"
          >
            {description}
          </div>
        </div>
        <div tw="flex justify-between items-end">
          <div tw="flex text-4xl">
            <img
              src="https://github.com/Nicell.png"
              tw="w-36 h-36 rounded-full mr-6"
            />
            <div tw="flex flex-col justify-between py-5">
              <span tw="text-5xl font-bold">Nick Winans</span>
              <span tw="text-4xl">nick.winans.io</span>
            </div>
          </div>
          <span tw="text-4xl pb-5">
            {new Date(date).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "JetBrainsMono",
          data: await loadGoogleFont("JetBrains+Mono"),
          style: "normal",
          weight: 400,
        },
        {
          name: "JetBrainsMono",
          data: await loadGoogleFont("JetBrains+Mono", "700"),
          style: "normal",
          weight: 700,
        }
      ],
    }
  );
};
