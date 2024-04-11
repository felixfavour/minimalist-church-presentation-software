import { clientsClaim } from "workbox-core"
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching"
import { registerRoute, NavigationRoute } from "workbox-routing"

self.skipWaiting()
clientsClaim()
precacheAndRoute([
  ...self.__WB_MANIFEST,
  "/live",
  "https://revaise.s3.us-east-2.amazonaws.com/video-bg-1.mp4",
  "https://revaise.s3.us-east-2.amazonaws.com/video-bg-2.mp4",
  "https://revaise.s3.us-east-2.amazonaws.com/video-bg-3.mp4",
  "https://revaise.s3.us-east-2.amazonaws.com/video-bg-4.mp4",
  "https://revaise.s3.us-east-2.amazonaws.com/video-bg-5.mp4",
  "https://revaise.s3.us-east-2.amazonaws.com/video-bg-6.mp4",
  "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1740",
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1740",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1740",
  "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1740",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1740",
  "https://images.unsplash.com/photo-1491396023581-4344e51fec5c?q=80&w=1740",
  "https://images.unsplash.com/photo-1518289646039-3e6c87a5aaf6?q=80&w=1740",
  "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1740",
  "https://images.unsplash.com/photo-1579267205095-6b30ba87edba?q=80&w=1740",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1740",
  "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=1740",
  "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=1740",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1740",
  "https://presentation-software.s3.eu-west-3.amazonaws.com/kjv.json?x-id=GetObject",
  "https://presentation-software.s3.eu-west-3.amazonaws.com/nkjv.json?x-id=GetObject",
  "https://presentation-software.s3.eu-west-3.amazonaws.com/niv.json?x-id=GetObject",
  "https://presentation-software.s3.eu-west-3.amazonaws.com/amp.json?x-id=GetObject",
  "https://presentation-software.s3.eu-west-3.amazonaws.com/hymns.json?x-id=GetObject",
])
cleanupOutdatedCaches()

//You can remove this code if you aren't precaching anything, or leave it in and live with the warning message
try {
  const handler = createHandlerBoundToURL("/")
  const route = new NavigationRoute(handler)
  registerRoute(route)
} catch (error) {
  console.warn("Error while registering cache route", { error })
}

//Your service-worker code here.

console.log("SERVICE WORKER HAS BEEN ADDED", self)

self.addEventListener("fetch", (event) => {
  console.log("event", event)
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.headers.has("range")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open("media")
        const fullResponse = await cache.match(request)
        if (fullResponse) {
          return createPartialResponse(request, fullResponse)
        }
        // If there's a cache miss, fall back to the network.
        return fetch(request)
      })()
    )
  }
})
