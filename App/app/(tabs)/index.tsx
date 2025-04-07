import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const db = SQLite.openDatabase('todo.db');

export default function App() {
  const [tasks, setTasks] = useState([]);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      date: '',
      priority: 'low',
    },
  });

  useEffect(() => {
    db.transaction((tx: { executeSql: (arg0: string) => void; }) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          date TEXT,
          priority TEXT,
          status TEXT
        );`
      );
    }, null, fetchTasks);
  }, []);

  const fetchTasks = () => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, { rows }: { rows: any; }) => void) => void; }) => {
      tx.executeSql('SELECT * FROM tasks', [], (_, { rows }) => {
        setTasks(rows._array);
      });
    });
  };

  const addTask = (data) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO tasks (name, date, priority, status) VALUES (?, ?, ?, ?)`,
        [data.name, data.date, data.priority, 'to-do'],
        (_, result) => {
          fetchTasks();
          reset();
        }
      );
    });
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'to-do' ? 'done' : 'to-do';
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tasks SET status = ? WHERE id = ?`,
        [newStatus, id],
        () => fetchTasks()
      );
    });
  };

  const deleteTask = (id) => {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM tasks WHERE id = ?`, [id], () => fetchTasks());
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 To-Do List</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Назва обов’язкова' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Назва завдання"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Дата"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <View style={styles.input}>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
          </View>
        )}
      />

      <Button title="Додати завдання" onPress={handleSubmit(addTask)} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.task, item.status === 'done' && styles.taskDone]}>
            <Text style={styles.taskText}>
              {item.name} ({item.priority}) - {item.status.toUpperCase()}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => toggleStatus(item.id, item.status)}
              >
                <Text style={styles.buttonText}>
                  {item.status === 'to-do' ? '✅ Виконати' : '🔄 Відмінити'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
