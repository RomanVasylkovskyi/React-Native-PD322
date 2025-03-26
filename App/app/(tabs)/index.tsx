import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Європротокол</Text>
    <Button title="Оформити протокол" onPress={() => navigation.navigate('ParticipantA')} />
  </View>
);

const ParticipantAScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [carModel, setCarModel] = React.useState('');
  const [carNumber, setCarNumber] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Дані про учасника А</Text>
      <TextInput style={styles.input} placeholder="Ім'я" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Прізвище" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Дата народження" value={dob} onChangeText={setDob} />
      <TextInput style={styles.input} placeholder="Телефон" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Модель авто" value={carModel} onChangeText={setCarModel} />
      <TextInput style={styles.input} placeholder="Номер авто" value={carNumber} onChangeText={setCarNumber} />
      <Button title="Далі" onPress={() => navigation.navigate('ParticipantB')} />
    </ScrollView>
  );
};

const ParticipantBScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [carModel, setCarModel] = React.useState('');
  const [carNumber, setCarNumber] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Дані про учасника Б</Text>
      <TextInput style={styles.input} placeholder="Ім'я" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Прізвище" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Дата народження" value={dob} onChangeText={setDob} />
      <TextInput style={styles.input} placeholder="Телефон" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Модель авто" value={carModel} onChangeText={setCarModel} />
      <TextInput style={styles.input} placeholder="Номер авто" value={carNumber} onChangeText={setCarNumber} />
      <Button title="Далі" onPress={() => navigation.navigate('Damage')} />
    </ScrollView>
  );
};

const DamageScreen = ({ navigation }) => {
  const [side, setSide] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [SketchCanvas, setSketchCanvas] = React.useState(null);

  // Завантаження модуля SketchCanvas після монтування компонента
  React.useEffect(() => {
    try {
      const module = require('@terrylinla/react-native-sketch-canvas').default;
      setSketchCanvas(() => module);
    } catch (error) {
      console.error('Error loading SketchCanvas:', error);
    }
  }, []);

  if (!SketchCanvas) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Завантаження компонента...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Вид пошкодження</Text>
      <TextInput
        style={styles.input}
        placeholder="Сторона пошкодження"
        value={side}
        onChangeText={setSide}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Короткий опис"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <Text style={styles.subtitle}>Ескіз ДТП</Text>
      <View style={styles.canvasContainer}>
        <SketchCanvas style={styles.canvas} strokeColor="black" strokeWidth={3} />
      </View>
      <Button title="Завершити" onPress={() => Alert.alert('Протокол оформлено')} />
    </ScrollView>
  );
};

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Головний екран' }} />
      <Stack.Screen name="ParticipantA" component={ParticipantAScreen} options={{ title: 'Дані учасника А' }} />
      <Stack.Screen name="ParticipantB" component={ParticipantBScreen} options={{ title: 'Дані учасника Б' }} />
      <Stack.Screen name="Damage" component={DamageScreen} options={{ title: 'Вид пошкодження' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  canvasContainer: {
    width: '100%',
    height: 300,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
  },
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
