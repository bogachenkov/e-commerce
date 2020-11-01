import { inputObjectType, objectType } from '@nexus/schema';
import { categories, productTypes } from './data';
import { Category } from './Category';
import { ProductType } from './ProductType';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("description");
    t.id("slug");
    t.string("image");
    t.float("price");
    t.int("in_stock");
    t.int("rating");
    t.field("category", {
      type: Category,
      resolve(root, args, ctx) {
        return categories.find(cat => cat.id === root.category);
      }
    });
    t.field("productType", {
      type: ProductType,
      resolve(root, args, ctx) {
        return productTypes.find(type => type.id === root.productType);
      }
    })
  }
});

export const ProductsInputType = inputObjectType({
  name: 'ProductsInputType',
  definition(t) {
    t.string("category");
    t.int("priceFrom");
    t.int("priceTo");
    t.list.string("colors");
    t.string("sortBy");
    t.string("order");
    t.id('excludeBySlug');
    t.int('limit');
  }
})