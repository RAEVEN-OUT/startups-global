import 'server-only';
import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { token } from '../env';

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token, // server-only token for drafts
  browserToken: process.env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN, // read-only browser token
});
