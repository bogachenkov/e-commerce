import React, { useEffect } from 'react';
import Head from 'next/head'
import ReactModal from 'react-modal';
import { useRecoilState } from 'recoil';
import { imgObserver } from 'src/recoil';

import { initializeApollo } from 'src/apollo';

import AppHeader from 'src/components/AppHeader/AppHeader';
import ContentGrid from 'src/components/ContentGrid/ContentGrid';
import { PRODUCTS_QUERY } from 'src/components/Products/Products';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#__next');

const HomePage:React.FC = () => {
  const [imageObserver, setImgObserver] = useRecoilState(imgObserver);

  useEffect(() => {
    if (!imageObserver) {
      const io = new IntersectionObserver((entries, imageObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src;
            imageObserver.unobserve(lazyImage);
          }
        })
      });
      setImgObserver(io);
    }
  }, [])

  return (
    <div className="Home">
      <Head>
        <title>Home Decor Store - Home Page</title>
      </Head>
      <AppHeader />
      <ContentGrid />
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: PRODUCTS_QUERY,
    variables: {
      filters: {
        category: null,
        priceFrom: null,
        priceTo: null,
        colors: [],
        sortBy: 'name',
        order: 'asc'
      }
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
};

export default HomePage;