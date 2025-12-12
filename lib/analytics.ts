type AnalyticsEvent = {
  name: string
  properties?: Record<string, string | number | boolean>
}

/**
 * Track a custom event with Vercel Analytics
 */
export function trackEvent({ name, properties }: AnalyticsEvent) {
  // Check if window and window.va exist
  if (typeof window !== "undefined" && "va" in window && typeof window.va === "function") {
    window.va("event", {
      name,
      ...(properties && { props: properties }),
    })
  }
}
