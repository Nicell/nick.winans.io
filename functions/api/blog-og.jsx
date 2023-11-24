import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import LexendBlack from "../fonts/LexendDeca-Black.bin";
import Lexend from "../fonts/LexendDeca-ExtraBold.bin";
import Geologica from "../fonts/Geologica-Regular.bin";

export const onRequest = async ({request}) => {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const title = searchParams.get("title") || "use ?title=";
  const description = searchParams.get("description") || "use ?description=";
  const date = searchParams.get("date") || "use ?date=";
  const minutes = searchParams.get("minutes") || "use ?minutes=";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0px, #dcfce7, #dbeafe, #f3e8ff)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "55px 65px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily: "Lexend",
              lineHeight: "1.1em",
              paddingBottom: "20px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 48,
              fontFamily: "Geologica",
              lineHeight: "1.15em",
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 36,
              display: "flex",
              alignItems: "center",
              fontFamily: "Geologica",
            }}
          >
            <img
              src="https://github.com/Nicell.png"
              height="150px"
              width="150px"
              style={{ borderRadius: "75px", marginRight: "24px" }}
            />
            <span>
              {new Date(date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              | {minutes} min read
            </span>
          </div>
          <div
            style={{
              fontSize: 48,
              fontFamily: "LexendBlack",
            }}
          >
            nick.winans.io
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Lexend",
          data: Lexend,
          style: "normal",
        },
        {
          name: "LexendBlack",
          data: LexendBlack,
          style: "normal",
        },
        {
          name: "Geologica",
          data: Geologica,
          style: "normal",
        },
      ],
    }
  );
}
