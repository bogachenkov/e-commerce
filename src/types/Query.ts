import { arg, idArg, queryType } from '@nexus/schema';
import { Product, Category, ProductType } from './index';
import { categories, products, productTypes } from './data';
import { IProduct } from 'src/interfaces';

export const Query = queryType({
  definition(t) {
    t.list.field("products", {
      type: Product,
      args: {
        filters: arg({ type: 'ProductsInputType' })
      },
      resolve: (root, { filters }) => {
        const { category, colors, priceFrom, priceTo, order, sortBy } = filters;


        let filteredProducts = [...products];
        if (category) filteredProducts = filteredProducts.filter(p => p.category === category);
        if (colors.length > 0) filteredProducts = filteredProducts.filter(p => colors.includes(p.color));
        if (priceFrom !== null && priceTo !== null) filteredProducts = filteredProducts.filter(
          p => (p.price >= priceFrom) && (p.price <= priceTo)
        );

        switch (sortBy) {
          case 'name':
            if (order === 'asc') return filteredProducts.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            });
            return filteredProducts.sort((a, b) => {
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
              return 0;
            });
          case 'price':
            if (order === 'asc') return filteredProducts.sort((a, b) => a.price - b.price);
            return filteredProducts.sort((a, b) => b.price - a.price);
          default:
            return filteredProducts;
        }
      }
    })

    t.field("product", {
      type: Product,
      args: {
        slug: idArg()
      },
      resolve: (root, { slug }, ctx): IProduct => {
        return products.find(product => product.slug === slug);
      }
    });

    t.list.field("categories", {
      type: Category,
      resolve: () => categories
    });

    t.list.field("productTypes", {
      type: ProductType,
      resolve: () => productTypes
    })
  }
});