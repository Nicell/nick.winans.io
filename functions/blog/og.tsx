import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

import JetBrainsMono from "../fonts/JetBrainsMono.bin";

export const onRequest: PagesFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "use ?title=";
  const description = searchParams.get("description") || "use ?description=";
  const date = searchParams.get("date") || "use ?date=";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0px, #dcfce7, #dbeafe, #f3e8ff)",
          fontFamily: "JetBrainsMono",
          borderBottom: "1rem solid #4a00ff",
        }}
        tw="h-full flex flex-col justify-between w-full py-14 px-16 pb-10"
      >
        <div tw="flex flex-col">
          <div
            style={{
              fontFamily: "Lexend",
              lineHeight: "1.1em",
            }}
            tw="pb-5 text-6xl"
          >
            {title}
          </div>
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
              <span tw="text-5xl">Nick Winans</span>
              <span tw="text-4xl">
                nick.winans.io
              </span>
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
          data: JetBrainsMono,
          style: "normal",
        },
      ],
    }
  );
};
