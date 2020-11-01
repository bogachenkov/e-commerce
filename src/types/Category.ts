import { objectType } from '@nexus/schema';
import { products } from './data';
import { Product } from './Product';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("slug");
    t.string("description");
    t.list.field("products", {
      type: Product,
      resolve(root, args, ctx) {
        return products.filter(prod => prod.category === root.id)
      }
    })
  }
})