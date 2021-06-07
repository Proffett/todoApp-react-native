import React, { CSSProperties, ReactChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

export type AppTextBoldType = {
  style: any;
  children: Element;
};
export const AppTextBold = (props: AppTextBoldType) => (
  <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'RobotoBold',
  },
});
