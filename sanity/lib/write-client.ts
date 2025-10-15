import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // writes always go directly to Sanity
  token,         // server-only token
});

if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}
