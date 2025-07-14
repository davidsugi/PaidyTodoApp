import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles, { COLORS } from './styles';
import { useTodoStore } from '../../../stores/useTodoStorage';

export default function TodoInput() {
  const inputText = useTodoStore(s=>s.inputText);
  const setInputText = useTodoStore(s=>s.setInputText);
  const submitTodo = useTodoStore(s=>s.submitTodo);
  const editId = useTodoStore(s=>s.editId);
  
  const [isFocused, setIsFocused] = useState(false);

  return (<View style={styles.todoItem}>
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      placeholder="Enter here"
      placeholderTextColor={COLORS.placeholderText}
      value={inputText}
      onChangeText={setInputText}
      onSubmitEditing={submitTodo}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
    <TouchableOpacity style={styles.addButton} onPress={submitTodo}>
      <Text style={styles.addButtonText}>{editId !== null ? 'UPDATE' : 'ADD'}</Text>
    </TouchableOpacity>
  </View>)
}
