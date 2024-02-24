import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';


const Tareas = ({ item, onPress }) => {
  const { descripcion, titulo } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {titulo}
      </Text>
      <Text numberOfLines={3}>{descripcion}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#336666',
    width: width / 1.8 - 10,
    padding: 25,
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});

export default Tareas;