import { useTodoStore } from '../stores/useTodoStorage';

beforeEach(() => {
  // Reset Zustand store before each test
  useTodoStore.setState({
    todos: {},
    inputText: '',
    editId: null,
  });
});

describe('TodoInput Should behave correctly', () => {
    test('sets input text correctly', () => {
        useTodoStore.getState().setInputText('Paidy todo');
        expect(useTodoStore.getState().inputText).toBe('Paidy todo');
    });

    test('submitTodo adds a new todo', () => {
        useTodoStore.getState().setInputText('Paidy best company');
        useTodoStore.getState().submitTodo();
      
        const todos = useTodoStore.getState().todos;
        const values = Object.values(todos);
        expect(values).toHaveLength(1);
        expect(values[0].text).toBe('Paidy best company');
    });
      
    test('submitTodo does nothing on empty input', () => {
        useTodoStore.getState().setInputText('   ');
        useTodoStore.getState().submitTodo();
      
        const todos = useTodoStore.getState().todos;
        expect(Object.values(todos)).toHaveLength(0);
    });

    test('resetInput clears input text and editId', () => {
        useTodoStore.setState({ inputText: 'test', editId: '123' });
        useTodoStore.getState().resetInput();
        
        expect(useTodoStore.getState().inputText).toBe('');
        expect(useTodoStore.getState().editId).toBeNull();
    });
});

describe('TodoList Should behave correctly', () => {
    test('should render a list of todos', () => {
        useTodoStore.getState().setInputText('Paidy best company');
        useTodoStore.getState().submitTodo();
        const todos = useTodoStore.getState().todos;
        const values = Object.values(todos);
        expect(values).toHaveLength(1);
    });

    test('should remove a todo correctly', () => {
        // Add a todo first
        useTodoStore.getState().setInputText('Todo to remove');
        useTodoStore.getState().submitTodo();
        
        const todos = useTodoStore.getState().todos;
        const todoId = Object.keys(todos)[0];
        
        // Remove the todo
        useTodoStore.getState().removeTodo(todoId);
        
        expect(Object.keys(useTodoStore.getState().todos)).toHaveLength(0);
    });

    test('removing a todo being edited should reset input', () => {
        // Add and start editing a todo
        useTodoStore.getState().setInputText('Todo to edit and remove');
        useTodoStore.getState().submitTodo();
        
        const todos = useTodoStore.getState().todos;
        const todoId = Object.keys(todos)[0];
        
        useTodoStore.getState().handleEdit(todoId);
        expect(useTodoStore.getState().editId).toBe(todoId);
        
        // Remove the todo being edited
        useTodoStore.getState().removeTodo(todoId);
        
        expect(useTodoStore.getState().editId).toBeNull();
        expect(useTodoStore.getState().inputText).toBe('');
    });
});

describe('Edit Todo Should behave correctly', () => {
    test('handleEdit should set up todo for editing', () => {
        // Add a todo first
        useTodoStore.getState().setInputText('Original todo');
        useTodoStore.getState().submitTodo();
        
        const todos = useTodoStore.getState().todos;
        const todoId = Object.keys(todos)[0];
        
        // Start editing
        useTodoStore.getState().handleEdit(todoId);
        
        expect(useTodoStore.getState().editId).toBe(todoId);
        expect(useTodoStore.getState().inputText).toBe('Original todo');
    });

    test('submitting with editId should update existing todo', () => {
        // Add a todo first
        useTodoStore.getState().setInputText('Original todo');
        useTodoStore.getState().submitTodo();
        
        const todos = useTodoStore.getState().todos;
        const todoId = Object.keys(todos)[0];
        
        // Start editing and submit changes
        useTodoStore.getState().handleEdit(todoId);
        useTodoStore.getState().setInputText('Updated todo');
        useTodoStore.getState().submitTodo();
        
        const updatedTodos = useTodoStore.getState().todos;
        expect(updatedTodos[todoId].text).toBe('Updated todo');
        expect(useTodoStore.getState().editId).toBeNull();
        expect(useTodoStore.getState().inputText).toBe('');
    });

    test('handleEdit should do nothing for non-existent todo', () => {
        useTodoStore.getState().handleEdit('non-existent-id');
        
        expect(useTodoStore.getState().editId).toBeNull();
        expect(useTodoStore.getState().inputText).toBe('');
    });
});
  