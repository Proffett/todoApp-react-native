import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, TextInput, View } from 'react-native';

import { THEME } from '../theme';

import { AppButton } from './ui/AppButton';

type PropsEditModal = {
  visible: boolean;
  onCancel: () => void;
  onSave: (title: string) => void;
  value: string;
};

export const EditModal = ({ visible, onCancel, value, onSave }: PropsEditModal) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        'Ошибка',
        `Мин. длина названия 3 символа. Сейчас ${title.trim().length} символов`,
      );
    } else {
      onSave(title);
    }
  };
  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Введите название"
          maxLength={64}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
            Отменить
          </AppButton>
          <AppButton onPress={saveHandler} color={THEME.MAIN_COLOR}>
            Сохранить
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
