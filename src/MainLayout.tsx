import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Navbar } from './components/NavBar';
import { ScreenContext } from './context/screen/screenContext';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { THEME } from './theme';

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.wrapper}>
      <Navbar title="TodoApp" />
      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});
