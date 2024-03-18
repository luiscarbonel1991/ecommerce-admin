import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {aspectRatioOptions} from "@/constans/aspect-ratio";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`)
  } else if (typeof error === 'string') {
    console.error(error);
    throw new Error(`Error: ${error}`)
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`)
  }
}

export const isInteger = (value: string) => {
  return /^\d+$/.test(value);
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
    shimmer(1000, 1000)
)}`;

export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
    type: string,
    image: any,
    dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
        aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
        1000
    );
  }
  return image?.[dimension] || 1000;
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
