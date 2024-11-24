import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPlanets, deletePlanet } from '../Components/api';
import PlanetaItem from '../Components/PlanetItem';

const { width } = Dimensions.get('window');

export default function Planetas() {
  const [planets, setPlanets] = useState([]);
  const [originalPlanets, setOriginalPlanets] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const data = await fetchPlanets();
        setPlanets(data);
        setOriginalPlanets(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPlanets();
  }, []);

  const addPlanet = (newPlanet) => {
    setPlanets([...planets, newPlanet]);
    setOriginalPlanets([...originalPlanets, newPlanet]);
  };

  const removePlanet = async (id) => {
    try {
      await deletePlanet(id);
      setPlanets(planets.filter(planet => planet.id !== id));
      setOriginalPlanets(originalPlanets.filter(planet => planet.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const sortPlanetsByMoons = () => {
    const sortedPlanets = [...planets].sort((a, b) => b.moons - a.moons);
    setPlanets(sortedPlanets);
  };

  const resetPlanetsOrder = () => {
    setPlanets(originalPlanets);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetas</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.createButton]} 
          onPress={() => navigation.navigate('AgregarPlaneta', { addPlanet })}
        >
          <Text style={styles.buttonText}>Nuevo Planeta</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.sortButton]} 
          onPress={sortPlanetsByMoons}
        >
          <Text style={styles.buttonText}>Ordenar por lunas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={resetPlanetsOrder}
        >
          <Text style={styles.buttonText}>Restablecer Orden</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PlanetaItem planet={item} onDelete={removePlanet} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: '#4caf50', // Verde
  },
  sortButton: {
    backgroundColor: '#2196f3', // Azul
  },
  resetButton: {
    backgroundColor: '#f44336', // Rojo
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});
