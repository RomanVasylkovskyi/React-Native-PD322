// app/TodosScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // або інша ікон бібліотека

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Для прикладу: призначимо фіктивний час кожному завданню (якщо потрібно відобразити в UI).
  // У реальному проєкті це поле може приходити з API або задаватися окремо.
  const fakeTimes = ['12 pm', '1 pm', '3 pm', '4 pm', '5 pm'];

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((error) => {
        console.error('Помилка при завантаженні списку завдань:', error);
      });
  }, []);

  const renderItem = ({ item, index }: { item: Todo; index: number }) => {
    // Отримуємо фіктивний час, наприклад, по колу
    const time = fakeTimes[index % fakeTimes.length];

    return (
      <View style={styles.todoItem}>
        {/* Іконка, що показує виконання завдання */}
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.completed ? 'green' : '#aaa'}
          style={{ marginRight: 10 }}
        />

        {/* Текст завдання */}
        <View style={{ flex: 1 }}>
          <Text style={styles.todoText}>{item.todo}</Text>
        </View>

        {/* Час (умовний) */}
        <Text style={styles.timeText}>{time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Верхній блок з назвою та датою */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ODOT List</Text>
        <Text style={styles.headerDate}>4th March 2018</Text>
      </View>

      {/* Список завдань */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Кнопка Додати (Floating Action Button) */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Нижня панель навігації (макетно) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="list-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  headerDate: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
    // Тінь (iOS/Android)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // Тінь (iOS/Android)
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 56,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
