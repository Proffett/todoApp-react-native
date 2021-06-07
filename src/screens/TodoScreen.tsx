import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { EditModal } from '../components/EditModal';
import { AppButton } from '../components/ui/AppButton';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppCard } from '../components/ui/card';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext, TodoContextProps } from '../context/todo/todoContext';
import { THEME } from '../theme';

export type TodoType = {
  title: string;
  id: string;
};

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo }: Partial<TodoContextProps> = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const todo: TodoType = todos?.find((t: { id: string }): boolean => t.id === todoId);

  const saveHandler = async (title: string) => {
    if (updateTodo) {
      await updateTodo(todo.id, title);
    }
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={15} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            /* eslint-disable-next-line no-confusing-arrow */
            onPress={() => (removeTodo ? removeTodo(todo.id) : null)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: Dimensions.get('window').width / 3,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
