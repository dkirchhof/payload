import type { CollectionConfig } from '../../../packages/payload/src/collections/config/types'

export const TestCollection: CollectionConfig = {
  slug: "test",
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: "test",
      type: "relationship",
      relationTo: "test",
    },
    {
      name: "test2",
      type: "relationship",
      relationTo: "test2",
    }
  ],
}
