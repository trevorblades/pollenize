import About from '../components/about';
import Footer from '../components/footer';
import Future from '../components/future';
import Header from '../components/header';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Quotes from '../components/quotes';
import React from 'react';
import {Divider} from '@material-ui/core';
import {Helmet} from 'react-helmet';

export default function Index() {
  return (
    <Layout>
      <Helmet>
        <title>Informing voters</title>
      </Helmet>
      <Header />
      <Hero />
      <About />
      <Quotes />
      <Future />
      <Divider />
      <Footer />
    </Layout>
  );
}
