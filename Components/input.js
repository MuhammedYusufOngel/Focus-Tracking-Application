import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kategori Seç:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={styles.picker}
        >
          {/* <Picker.Item label="Seçiniz..." value="" /> */}
          <Picker.Item label="👩‍💻 Kodlama" value="coding" />
          <Picker.Item label="📝 Ders Çalışma" value="studying" />
          <Picker.Item label="🛠️ Proje" value="project" />
          <Picker.Item label="📖 Kitap Okuma" value="reading" />
        </Picker>
      </View>

      {selectedValue ? <Text>Seçilen: {selectedValue}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
});
