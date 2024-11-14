import { Text, View, TouchableOpacity, Alert, FlatList } from 'react-native'
import {homeStyles} from '../styles/homeStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState, useEffect} from 'react'

export default function Home({navigation}){
    const [notes, setNotes] = useState([])

    //recuperar las notas de async 
    const loadNotes = async()=>{
        try {
            const storedNotes = await AsyncStorage.getItem('notas')
            const parsedNotes = storedNotes ? JSON.parse(storedNotes) : []
            setNotes(parsedNotes)
        } catch (error) {
            console.log('error al cargar notas', error);          
        }
    }

    //cargar las notas en cuanto se cargue el componente
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', loadNotes)
        return unsubscribe;
    },[navigation])

    //cuerpo del flatlist
    const renderNote = ({item}) =>(
        <TouchableOpacity style={homeStyles.noteCard} 
        onPress={()=>navigation.navigate('DetailNote', {note:item})}>
            <View>
                <Text style={homeStyles.noteTitle}>{item.titulo}</Text>
                <Text style={homeStyles.noteDate}>{item.fecha}</Text>
                <Text style={homeStyles.noteShortDesc}>{item.descorta}</Text>
            </View>
        </TouchableOpacity>
           
    )
    return (
      <View style={homeStyles.main}>
        <Text style={homeStyles.title}>MIS NOTAS</Text>
        <TouchableOpacity 
         onPress={()=>navigation.navigate('CreateNote')} 
         style={homeStyles.buttonAdd}>
            <Text style={homeStyles.textButtonAdd}>Agregar Nota</Text>
        </TouchableOpacity>
        <FlatList
            data={notes}
            keyExtractor={(item)=> item.id}
            renderItem={renderNote}
            contentContainerStyle={homeStyles.listContainer}
            ListEmptyComponent={() => <Text style={{textAlign:'center'}}>No hay Notas registradas</Text>}
        />
      </View>
    )
}