import React from 'react';
import TopLayout from './src/components/top-layout';
import {LanguageProvider} from './src/utils/language';
import {StarsProvider} from './src/utils/stars';

// eslint-disable-next-line react/prop-types
export function wrapRootElement({element}) {
  return (
    <TopLayout>
      <LanguageProvider>
        <StarsProvider>{element}</StarsProvider>
      </LanguageProvider>
    </TopLayout>
  );
}
