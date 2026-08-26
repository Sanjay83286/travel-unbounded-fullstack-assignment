import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Next.js API routes run as serverless functions. Each invocation can execute in a
 * fresh module scope, and in development the dev server re-evaluates modules on every
 * hot reload. Without caching, both cases open a brand new connection per request and
 * quickly exhaust the MongoDB Atlas connection limit.
 *
 * Caching the connection promise on `globalThis` survives module re-evaluation, so a
 * warm function reuses the existing socket and a cold one connects exactly once.
 */
let cached = globalThis._mongooseCache;

if (!cached) {
  cached = globalThis._mongooseCache = { connection: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to .env.local (see .env.example)."
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    // Clear the cached promise so the next request retries instead of
    // permanently reusing a rejected connection attempt.
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}
