// session and local storage management

// caching temporal data for immediate use
const defaultApiUrl: string = process.env.NEXT_PUBLIC_GATEWAY_API_URL || "";

export function setGatewayApiUrl(url: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("SWOBGATEWAYUI", url);
  }
}

export function getGatewayApiUrl(): string {
  let cache;
  if (typeof window !== "undefined") {
    cache = localStorage.getItem("SWOBGATEWAYUI");
  }
  return cache ?? defaultApiUrl;
}
