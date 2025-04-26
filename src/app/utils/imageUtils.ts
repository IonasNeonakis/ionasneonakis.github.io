import path from "path";

export function addBasePath(filePath: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return path.join(basePath, filePath);
}