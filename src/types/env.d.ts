// types/env.ts

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET || !process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error('Environment variables GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET are required');
}

const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;
const GOOGLE_ID = process.env.GOOGLE_ID as string;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET as string;
