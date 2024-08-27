import type {
  PrecacheEntry,
  RuntimeCaching,
  SerwistGlobalConfig,
} from "serwist";
import { Serwist } from "serwist";

import { f1 } from "my-lib";

const caching: RuntimeCaching = {
  matcher: ({ url }): boolean => {
    return url.origin === "example.com";
  },
  handler: async (): Promise<Response> => {
    const response = new Response("hello" + f1());
    return Promise.resolve(response);
  },
};

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: any;

const serwist = new Serwist({
  // A list of URLs that should be cached. Usually, you don't generate
  // this list yourself; rather, you'd rely on a Serwist build tool/your framework
  // to do it for you.
  precacheEntries: self.__SW_MANIFEST,
  // Options to customize how Serwist precaches the URLs.
  precacheOptions: {
    // Whether outdated caches should be removed.
    cleanupOutdatedCaches: true,
    concurrency: 10,
    ignoreURLParametersMatching: [],
  },
  // Whether the service worker should skip waiting and become the active one.
  skipWaiting: true,
  // Whether the service worker should claim any currently available clients.
  clientsClaim: true,
  // Whether navigation preloading should be used.
  navigationPreload: false,
  // Whether Serwist should log in development mode.
  disableDevLogs: true,
  // A list of runtime caching entries. When a request is made and its URL match
  // any of the entries, the response to it will be cached according to the matching
  // entry's `handler`. This does not apply to precached URLs.
  runtimeCaching: [caching],
});

serwist.addEventListeners();
