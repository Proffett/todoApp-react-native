import React, { ReactElement } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import { THEME } from '../../theme';

import { AppTextBold } from './AppTextBold';

export const AppButton = ({
  children,
  onPress,
  color = THEME.MAIN_COLOR,
}: {
  children: Element;
  onPress: void;
  color: string;
}): ReactElement => {
  const Wrapper: Partial<TouchEvent> =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: THEME.WHITE_COLOR },
});
