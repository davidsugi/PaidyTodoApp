import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useTodoStore, Todo } from '../../../stores/useTodoStorage';
import styles from './styles';

export default function TodoList() {
    const todos= useTodoStore(s=>s.todos);
    const removeTodo= useTodoStore(s=>s.removeTodo);
    const handleEdit= useTodoStore(s=>s.handleEdit);

    const renderTodo = ({ item }: { item: Todo }) => (
          <TouchableOpacity style={styles.todoItem} onPress={() => handleEdit(item.id)}>
            <View style={styles.blueDot} />
            <Text style={styles.todoText}>{item.text}</Text>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeTodo(item.id)}
          >
            <Text style={styles.removeButtonText}>REMOVE</Text>
          </TouchableOpacity>
          </TouchableOpacity>
      );
      
    return (
        <FlatList
          data={Object.values(todos)}
          renderItem={renderTodo}
          keyExtractor={item => item.id}
          style={styles.todoList}
          showsVerticalScrollIndicator={false}
        />
  )
}
