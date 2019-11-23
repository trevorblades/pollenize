import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import React from 'react';
import {Divider, Typography} from '@material-ui/core';
import {SectionWrapper} from '../components/common';

export default function NotFound() {
  return (
    <Layout>
      <Header />
      <SectionWrapper>
        <Typography gutterBottom variant="h2">
          Page not found
        </Typography>
        <Typography gutterBottom variant="h6">
          We couldn&apos;t find the page you were looking for 🧐
        </Typography>
      </SectionWrapper>
      <Divider />
      <Footer />
    </Layout>
  );
}
