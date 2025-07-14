import { StyleSheet } from "react-native";

const COLORS = {
  placeholderText: '#999999',
  primary: '#007AFF',
  border: '#E5E5E5',
};

const styles = StyleSheet.create({
    todoList: {
      flex: 1,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      marginBottom: 10,
    },
    blueDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: COLORS.primary,
      marginRight: 15,
    },
    todoText: {
      flex:1,
      fontSize: 16,
      color: '#000000',
    },
    removeButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      marginLeft: 10,
    },
    removeButtonText: {
      color: COLORS.placeholderText,
      fontSize: 14,
      fontWeight: '400',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#ffffff',
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
      marginRight: 10,
    },
    inputFocused: {
      borderBottomColor: COLORS.primary,
    },
    addButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default styles;
  export { COLORS };
