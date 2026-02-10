import { sendGAEvent } from '@next/third-parties/google';

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

/**
 * Track a custom event with Google Analytics
 */
export function trackEvent({ name, properties }: AnalyticsEvent) {
  sendGAEvent('event', name, properties || {});
}
