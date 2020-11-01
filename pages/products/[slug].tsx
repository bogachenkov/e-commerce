import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ArrowLeft } from 'react-feather';

import { initializeApollo } from 'src/apollo';
import { products } from 'src/types/data';

import Product, { PRODUCT_QUERY } from 'src/components/Product/Product';
import Spinner from 'src/components/Spinner/Spinner';

const ProductPage:React.FC = () => {
  const router = useRouter();

  const { slug } = router.query;

  return (
    <div className="product-page">
      <Head>
        <title>Product Page</title>
      </Head>
      <Link href="/">
        <a className="product-page__link">
          <ArrowLeft size={13} />
          Return to shop
          </a>
      </Link>
      { !slug && <Spinner /> }
      { slug && <Product slug={slug as string} /> }
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: products.map(p => ({
      params: { slug: p.slug }
    })),
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { slug } = params;

  await apolloClient.query({
    query: PRODUCT_QUERY,
    variables: {
      slug,
      limit: 3,
      excludeBySlug: slug
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
};

export default ProductPage;