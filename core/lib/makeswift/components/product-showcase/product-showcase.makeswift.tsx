import { TextInput, Image } from '@makeswift/runtime/controls';
import { runtime } from '~/lib/makeswift/runtime';

import { ProductShowcase } from '~/components/product-showcase';

runtime.registerComponent(ProductShowcase, {
  type: 'product-showcase',
  label: 'Basic / Product Showcase',
  props: {
    image: Image({
      label: 'Image',
      format: Image.Format.URL,
    }),
    category: TextInput({
      label: 'Category',
      defaultValue: 'Shop Beds',
    }),
    title: TextInput({
      label: 'Title',
      defaultValue: 'Tiffany Queen Bed',
    }),
  },
});
