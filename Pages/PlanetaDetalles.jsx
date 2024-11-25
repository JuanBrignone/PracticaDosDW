import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import EditPlanet from './EditPlanet';

const { width } = Dimensions.get('window');

export default function PlanetaDetalles({ route, navigation }) {
  const { planet, onUpdate } = route.params; 
  const [isEditing, setIsEditing] = useState(false);

  const updatePlanetInList = (updatedPlanet) => {
    if (onUpdate) {
      onUpdate(updatedPlanet); 
    }
    setIsEditing(false); 
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <EditPlanet
          planet={planet}
          updatePlanetInList={updatePlanetInList}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Text style={styles.name}>{planet.name}</Text>
          <Image source={{ uri: planet.image }} style={styles.image} />
          <Text style={styles.description}>{planet.description}</Text>
          <Text style={styles.moons}>Lunas: {planet.moons}</Text>
          <Text style={styles.moonNames}>
            Nombres de las lunas: {planet.moon_names.join(', ')}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    width: width * 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
  moons: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  moonNames: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  editButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
