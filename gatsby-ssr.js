import React from 'react';
import TopLayout from './src/components/top-layout';
import {LanguageProvider} from './src/utils/language';
import {StarsProvider} from './src/utils/stars';
import {UserProvider} from './src/utils/user';

// eslint-disable-next-line react/prop-types
export function wrapRootElement({element}) {
  return (
    <TopLayout>
      {/* welcome to provider hell 😈 */}
      <LanguageProvider>
        <StarsProvider>
          <UserProvider>{element}</UserProvider>
        </StarsProvider>
      </LanguageProvider>
    </TopLayout>
  );
}
