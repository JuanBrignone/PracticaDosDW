import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { updatePlanet } from '../Components/api';

export default function EditPlanet({ planet, updatePlanetInList, onCancel }) {
  const [name, setName] = useState(planet.name);
  const [description, setDescription] = useState(planet.description);
  const [moons, setMoons] = useState(planet.moons.toString());
  const [moonNames, setMoonNames] = useState(planet.moon_names.join(', '));
  const [image, setImage] = useState(planet.image);

  const handleUpdatePlanet = async () => {
    const updatedPlanet = {
      name,
      description,
      moons: parseInt(moons),
      moon_names: moonNames.split(',').map(name => name.trim()),
      image,
    };

    try {
      const data = await updatePlanet(planet.id, updatedPlanet);
      updatePlanetInList(data);
      onCancel(); 
    } catch (error) {
      console.error('Error updating planet:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de lunas"
        value={moons}
        onChangeText={setMoons}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de las lunas (separados por comas)"
        value={moonNames}
        onChangeText={setMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePlanet}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
