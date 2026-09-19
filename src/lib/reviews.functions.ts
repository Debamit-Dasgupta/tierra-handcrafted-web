import { createServerFn } from "@tanstack/react-start";

const PLACE_ID = "ChIJb3n7XTvHwoARjes6mcscldQ";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const CACHE_MS = 6 * 60 * 60 * 1000;

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type PlaceReviews = {
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
};

let cache: { at: number; data: PlaceReviews } | null = null;

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(async (): Promise<PlaceReviews> => {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;

  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  const empty: PlaceReviews = { rating: null, total: null, reviews: [] };
  if (!lovableKey || !mapsKey) return empty;

  const response = await fetch(`${GATEWAY_URL}/places/v1/places/${PLACE_ID}`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  });

  if (!response.ok) {
    console.error(`Google Places request failed [${response.status}]: ${await response.text()}`);
    return cache?.data ?? empty;
  }

  const body = (await response.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      relativePublishTimeDescription?: string;
      text?: { text?: string };
      originalText?: { text?: string };
      authorAttribution?: { displayName?: string };
    }>;
  };

  const data: PlaceReviews = {
    rating: body.rating ?? null,
    total: body.userRatingCount ?? null,
    reviews: (body.reviews ?? [])
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "Google reviewer",
        rating: review.rating ?? 0,
        text: (review.text?.text ?? review.originalText?.text ?? "").trim(),
        relativeTime: review.relativePublishTimeDescription ?? "",
      }))
      .filter((review) => review.text.length > 0)
      .slice(0, 5),
  };

  cache = { at: Date.now(), data };
  return data;
});
