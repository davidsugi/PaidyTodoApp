import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  text: string;
}

export type TodoMap = Record<string, Todo>;

interface TodoState {
  inputText: string;
  editId: string | null;
  todos: TodoMap;
  setInputText: (text: string) => void;
  resetInput: () => void;
  submitTodo: () => void;
  removeTodo: (id: string) => void;
  handleEdit: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      inputText: '',
      editId: null,
      todos: {},
      setInputText: (text) => set({ inputText: text }),
      resetInput: () => set({ inputText: '', editId: null }),
      submitTodo: () => {
        const { inputText, editId, todos, resetInput } = get();
        const trimmed = inputText.trim();
        if (!trimmed) return;

        if (editId && todos[editId]) {
          set({
            todos: {
              ...todos,
              [editId]: { ...todos[editId], text: trimmed },
            },
          });
        } else {
          const id = Date.now().toString();
          set({
            todos: {
              ...todos,
              [id]: { id, text: trimmed },
            },
          });
        }
        resetInput();
      },
      removeTodo: (id) => {
        const { todos, editId, resetInput } = get();
        const { [id]: _, ...rest } = todos;
        set({ todos: rest });
        if (editId === id) resetInput();
      },
      handleEdit: (id) => {
        const { todos } = get();
        if (!todos[id]) return;
        set({ editId: id, inputText: todos[id].text });
      },
    }),
    {
      name: 'todo-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
