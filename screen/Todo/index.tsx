import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text
} from 'react-native';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


export default function TodoScreen() {
  return (
    <>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={'padding'}
      >
        <Text style={styles.header}>TODO:</Text>
        <TodoList />
        <TodoInput />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
  }
}); 
