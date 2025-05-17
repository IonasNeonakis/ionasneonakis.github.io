export function addBasePath(filePath: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}/${filePath}`.replace(/\/+/g, "/"); // Normalize slashes
}
