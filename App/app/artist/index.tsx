import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ArtistScreen() {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      <Image
        source={require('../../assets/images/1.jpg')}
        style={styles.image}
      />
      <Text style={styles.sectionTitle}>Вінсент Ван Гог</Text>
      <Text style={styles.sectionTitle}>Біографія</Text>

      <Text style={styles.text}>
        Голландський художник-постімпресіоніст. Народився 30 березня 1853 року в Голландії.
        Створив понад 2100 творів, включаючи 860 картин олією. Ван Гог боровся з психічними
        проблемами та помер у 37 років від вогнепального поранення.
      </Text>

      <Text style={styles.sectionTitle}>Ключові факти</Text>
      <View style={styles.factItem}>
        <Text style={styles.factIcon}>🎨</Text>
        <Text style={styles.factText}>Написав "Зоряну ніч" у психіатричній лікарні</Text>
      </View>
      <View style={styles.factItem}>
        <Text style={styles.factIcon}>✉️</Text>
        <Text style={styles.factText}>Листування з братом Тео - важливе джерело інформації про його життя</Text>
      </View>
      <View style={styles.grid}>
        <Image source={require('../../assets/images/1.jpg')} style={styles.imagelist} />
        <Image source={require('../../assets/images/1.jpg')} style={styles.imagelist} />
      </View>
      <Link href="/artist/gallery" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Перейти до галереї</Text>
        </TouchableOpacity>
      </Link>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imagelist: {
    margin: 1,
    width: '49%',
    height: 150,
    marginBottom: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
  },
  text: {
    margin: 16,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#666',
  },
  factItem: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  factIcon: {
    margin: 12,
    fontSize: 20,
    marginRight: 10,
  },
  factText: {
    fontSize: 15,
    flex: 1,
    color: '#555',
  },
  btn: {
    margin:15,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  btntext: { color: 'white' },
});