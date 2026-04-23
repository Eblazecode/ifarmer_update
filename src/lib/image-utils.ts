import type { ImageProps } from "next/image";

export function isRemoteImageSrc(src: ImageProps["src"]) {
  return typeof src === "string" && /^https?:\/\//.test(src);
}
