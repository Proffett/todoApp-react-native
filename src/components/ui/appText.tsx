import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const AppText = (props: any) => (
  <Text ellipsizeMode="tail" numberOfLines={1} style={{ ...styles.default, ...props.style }}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'RobotoRegular',
  },
});
