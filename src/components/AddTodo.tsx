import React, { ElementType, useState } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';

const ADD_NAME = 'Добавить';

type AddTodoProps = {
  placeholder: string;
  onSubmit: (value: string) => string;
};
export const AddTodo: ElementType = ({ placeholder, onSubmit }: AddTodoProps) => {
  const [value, setValue] = useState('');

  const pressAddHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
      return Keyboard.dismiss();
    }
    return Alert.alert('Задача не может быть пустая');
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        autoCorrect={false}
        autoCapitalize="words"
      />
      <AntDesign.Button onPress={pressAddHandler} name="pluscircleo">
        {ADD_NAME}
      </AntDesign.Button>
      {/* <View> */}
      {/*  <Button title="Добавить" onPress={pressAddHandler} color={THEME.MAIN_COLOR} /> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: '60%',
    padding: 8,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
