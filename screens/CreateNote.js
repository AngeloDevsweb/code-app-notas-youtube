import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { createNoteStyle } from '../styles/createNoteStyle';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateNote({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descorta, setDescorta] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const saveNote = async () => {

    if(!titulo || !descorta || !fecha || !descripcion){
      Alert.alert('Error', 'Debe llenar todos los campos')
      return;
    }

    try {
      const newNote = {
        id: Date.now().toString(),
        titulo,
        descorta,
        fecha,
        descripcion,
      };

      const storedNotes = await AsyncStorage.getItem('notas');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(newNote);
      await AsyncStorage.setItem('notas', JSON.stringify(notes));

      setTitulo('');
      setDescorta('');
      setFecha('');
      setDescripcion('');

      Alert.alert('Nota guardada', 'Tu nota se ha guardado exitosamente.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      Alert.alert('Error', 'No se pudo guardar la nota.');
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Para iOS mantiene abierto hasta confirmar
    if (event.type !== 'dismissed' && date) {
      setSelectedDate(date);
      setFecha(date.toLocaleDateString('es-ES')); // Ajuste en formato
    }
  };

  return (
    <ScrollView contentContainerStyle={createNoteStyle.scrollContainer}>
      <View style={createNoteStyle.main}>
        <Text style={createNoteStyle.title}>CREAR NOTA</Text>

        <View style={createNoteStyle.card}>
          <TextInput
            style={createNoteStyle.input}
            placeholder="Titulo"
            placeholderTextColor="slategray"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={createNoteStyle.input}
            placeholder="Descripcion corta"
            placeholderTextColor="slategray"
            value={descorta}
            onChangeText={setDescorta}
          />

          {/* Campo de Fecha */}
          <TouchableOpacity style={createNoteStyle.input} onPress={showDatePickerHandler}>
            <TextInput
              style={{marginTop:10}}
              placeholder="Fecha"
              placeholderTextColor="slategray"
              value={fecha}
              editable={false} // Hace que el campo de fecha sea de solo lectura
            />
          </TouchableOpacity>

          {/* Selector de Fecha */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          <TextInput
            style={createNoteStyle.input}
            placeholder="Descripcion"
            placeholderTextColor="slategray"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <TouchableOpacity style={createNoteStyle.button} onPress={saveNote}>
            <Text style={createNoteStyle.buttonText}>Registrar Nota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}