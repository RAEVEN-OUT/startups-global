'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { markdownSchema } from 'sanity-plugin-markdown'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset:'production',
  schema, // must be { types: [author, startup, ...] }
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema()
  ],
})
