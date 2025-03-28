import { View, Text, FlatList, Image,ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

const images = [
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
  require('../../assets/images/1.jpg'),
];

export default function GalleryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} />
        ))}
      </View>
    </ScrollView>
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
    margin:1,
    width: '49%', 
    height: 150,
    marginBottom: 5,
    borderRadius: 2,
    borderWidth: 1, 
    borderColor: '#000', 
  },
});