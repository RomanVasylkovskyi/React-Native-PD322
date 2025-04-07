import 'reflect-metadata';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Entity, PrimaryGeneratedColumn, Column, DataSource } from 'typeorm';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Сутність Task
@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column()
  date;

  @Column()
  deadline;

  @Column()
  priority;

  @Column()
  status;
}

const db = SQLite.openDatabase('todo.db');

const AppDataSource = new DataSource({
  type: 'expo',
  database: 'todo.db',
  driver: db,
  entities: [Task],
  synchronize: true,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      date: '',
      priority: 'low',
    },
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await AppDataSource.initialize();
        const repo = AppDataSource.getRepository(Task);
        const allTasks = await repo.find();
        setTasks(allTasks);
        setInitialized(true);
      } catch (err) {
        console.error('DB init error', err);
      }
    };

    const setupNotifications = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          Alert.alert('Немає дозволу на нотифікації');
          return;
        }

        await Notifications.setNotificationCategoryAsync('task-actions', [
          {
            identifier: 'SHOW',
            buttonTitle: 'Show',
            options: { opensAppToForeground: true },
          },
          {
            identifier: 'DELETE',
            buttonTitle: 'Delete',
            options: { isDestructive: true },
          },
        ]);
      } else {
        Alert.alert('Нотифікації працюють лише на фізичному пристрої');
      }
    };

    initializeDatabase();
    setupNotifications();
  }, []);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(async response => {
      const actionId = response.actionIdentifier;
      const taskId = response.notification.request.content.data.taskId;

      if (actionId === 'DELETE') {
        await deleteTask(taskId);
      }
    });

    return () => sub.remove();
  }, []);

  const addTask = async (data) => {
    const repo = AppDataSource.getRepository(Task);
    const newTask = repo.create({
      name: data.name,
      date: data.date,
      deadline: data.date,
      priority: data.priority,
      status: 'to-do',
    });

    await repo.save(newTask);

    const deadlineTime = new Date(data.date);
    if (!isNaN(deadlineTime)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🕒 Deadline!',
          body: `Завдання "${data.name}" має бути виконано!`,
          categoryIdentifier: 'task-actions',
          data: { taskId: newTask.id },
        },
        trigger: deadlineTime,
      });
    }

    const allTasks = await repo.find();
    setTasks(allTasks);
    reset();
  };

  const toggleStatus = async (id) => {
    const repo = AppDataSource.getRepository(Task);
    const task = await repo.findOneBy({ id });
    task.status = task.status === 'to-do' ? 'done' : 'to-do';
    await repo.save(task);
    const allTasks = await repo.find();
    setTasks(allTasks);
  };

  const deleteTask = async (id) => {
    const repo = AppDataSource.getRepository(Task);
    await repo.delete(id);
    const allTasks = await repo.find();
    setTasks(allTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 To-Do List з Нотифікаціями</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Назва обов’язкова' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Назва завдання"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        rules={{ required: 'Дата дедлайну обов’язкова' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Дата дедлайну (YYYY-MM-DD HH:MM:SS)"
            value={value}
            onChangeText={onChange}
          />
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

      <Button title="Додати завдання" onPress={handleSubmit(addTask)} disabled={!initialized} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.task, item.status === 'done' && styles.taskDone]}>
            <Text style={styles.taskText}>
              {item.name} ({item.priority}) - {item.status.toUpperCase()}
            </Text>
            <Text>📅 {item.deadline}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.toggleButton} onPress={() => toggleStatus(item.id)}>
                <Text style={styles.buttonText}>
                  {item.status === 'to-do' ? '✅ Виконати' : '🔄 Відмінити'}
                </Text>
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
