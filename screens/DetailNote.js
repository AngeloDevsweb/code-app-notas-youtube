import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {detailnoteStyle} from '../styles/DetailNoteStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute, useNavigation} from '@react-navigation/native'
import { Icon } from '@rneui/themed';

export function DetailNote(){
  const route = useRoute()
  const navigation = useNavigation()
  const {note} = route.params;

  // Función para eliminar la nota
  const deleteNote = async () => {
    Alert.alert(
      'IMPORTANTE',
      '¿Estás seguro de que deseas eliminar esta nota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Obtiene las notas guardadas
              const storedNotes = await AsyncStorage.getItem('notas');
              const notes = storedNotes ? JSON.parse(storedNotes) : [];

              // Filtra para eliminar la nota con el ID coincidente
              const updatedNotes = notes.filter(n => n.id !== note.id);

              // Guarda la lista actualizada en AsyncStorage
              await AsyncStorage.setItem('notas', JSON.stringify(updatedNotes));

              Alert.alert('Nota eliminada', 'La nota ha sido eliminada con éxito.');
              navigation.navigate('Home'); // Regresa a la pantalla de inicio o lista de notas
            } catch (error) {
              console.error('Error al eliminar la nota:', error);
              Alert.alert('Error', 'No se pudo eliminar la nota.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
    return (
      <ScrollView contentContainerStyle={detailnoteStyle.scrollContainer}>
        <View style={detailnoteStyle.card}>
          <Text style={detailnoteStyle.title}>NOTA</Text>
          <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}} >
            <Text style={detailnoteStyle.titulo}>{note.titulo}</Text>
            <TouchableOpacity style={{marginTop:25}} onPress={deleteNote}>
              <Icon name='trash' type='ionicon' color='#FB4E4E' />
            </TouchableOpacity>
          </View>
          <Text style={detailnoteStyle.fecha}>{note.fecha}</Text>
          <Text style={detailnoteStyle.descripcion}>{note.descripcion}</Text>
        </View>
      </ScrollView>
    )
}

export default DetailNote
