import type { CollectionConfig } from '../../../packages/payload/src/collections/config/types'
import TestEditView from '../components/views/TestEditView'

export const Test2Collection: CollectionConfig = {
  slug: "test2",
  admin: {
    components: {
      views: {
        Edit: TestEditView,
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
