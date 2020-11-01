import { idArg, intArg, objectType } from '@nexus/schema';
import { products } from './data';
import { Product } from './Product';

export const ProductType = objectType({
  name: 'ProductType',
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("slug");
    t.list.field('products', {
      type: Product,
      args: {
        limit: intArg(),
        excludeBySlug: idArg()
      },
      resolve(root, { limit, excludeBySlug }, ctx) {
        let items = products.filter(prod => prod.productType === root.id);
        if (excludeBySlug) items = items.filter(p => p.slug !== excludeBySlug);
        if (limit && items.length > limit) items = items.slice(0, limit);
        return items;
      }
    })
  }
});