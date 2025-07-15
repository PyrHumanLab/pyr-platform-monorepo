// /web/lib/sanity-client.ts

import { createClient } from '@sanity/client'

// You can find these details in your Sanity project settings
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2023-05-03'; // Use a recent date

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // `false` if you want to ensure fresh data
});

// A helper function to always get the client
export const getClient = () => client;