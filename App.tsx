import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { ScreenState } from './src/context/screen/ScreenState';
import { TodoState } from './src/context/todo/todoState';
import { MainLayout } from './src/MainLayout';

export const App: React.FC = () => {
  const [isReady] = useFonts({
    // eslint-disable-next-line global-require
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    // eslint-disable-next-line global-require
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
  });

  // waiting app loading
  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
};

export default App;
