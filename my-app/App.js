import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const [berita, setBerita] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://192.168.88.114:3001/api/berita')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched:', data);
        setBerita(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.judul_berita}</Text>
      <Text style={styles.category}>Kategori: {item.nama_kategori}</Text>
      <Text style={styles.summary}>Ringkasan: {item.ringkasan}</Text>
      <Text style={styles.keywords}>Keywords: {item.keywords.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Berita</Text>
      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <FlatList
          data={berita}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
  },
  summary: {
    fontSize: 14,
    marginTop: 10,
  },
  keywords: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});
