import {StyleSheet} from 'react-native'

export const detailnoteStyle = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems:'center'
      },
      card: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginTop:8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,  // Para Android, proporciona una sombra elegante
      },
      title:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:24,
        fontStyle:'italic'
      },
      titulo:{
        fontWeight:'400',
        fontSize:18,
        marginTop:30
      },
      fecha:{
        fontWeight:'300',
        fontSize:17,
        marginTop:5,
        marginBottom:5,
        fontStyle:'italic'
      },
      descripcion:{
        fontSize:16,
        letterSpacing:1
      }
})