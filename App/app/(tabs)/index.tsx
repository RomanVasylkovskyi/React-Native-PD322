import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      date: '',
      priority: 'low',
    },
  });

  const addTask = (data) => {
    const newTask = {
      id: Date.now().toString(),
      name: data.name,
      date: data.date,
      priority: data.priority,
      status: 'to-do',
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    reset(); // Очищення форми
  };

  const toggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'to-do' ? 'done' : 'to-do' } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 To-Do List</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Назва обов’язкова' }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Назва завдання" value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Дата" value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        )}
      />

      <Button title="Додати завдання" onPress={handleSubmit(addTask)} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.task, item.status === 'done' && styles.taskDone]}>
            <Text style={styles.taskText}>
              {item.name} ({item.priority}) - {item.status.toUpperCase()}
            </Text>

            {/* Кнопки для зміни статусу та видалення */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.toggleButton} onPress={() => toggleStatus(item.id)}>
                <Text style={styles.buttonText}>{item.status === 'to-do' ? '✅ Виконати' : '🔄 Відмінити'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                <Text style={styles.buttonText}>🗑️ Видалити</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginTop: 33,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  task: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskDone: {
    backgroundColor: '#d4edda',
    borderColor: '#155724',
  },
  taskText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
