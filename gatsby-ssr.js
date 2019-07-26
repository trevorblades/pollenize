import React from 'react';
import TopLayout from './src/components/top-layout';

// eslint-disable-next-line react/prop-types
export function wrapRootElement({element}) {
  return <TopLayout>{element}</TopLayout>;
}
