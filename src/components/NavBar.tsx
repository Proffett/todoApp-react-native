import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { THEME } from '../theme';

import { AppTextBold } from './ui/AppTextBold';

type NavbarProps = {
  title: string;
};
export const Navbar = ({ title }: NavbarProps) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: THEME.MAIN_COLOR,
    padding: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  navbarIos: {
    backgroundColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
    fontWeight: '800',
  },
});
