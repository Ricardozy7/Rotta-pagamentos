import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Theme from '../../../theme';


export const styles = StyleSheet.create({
    conteiner: {
        height: '100%',
        width: '100%',
        backgroundColor: Theme.WHITE,
        justifyContent: 'space-between'
    },
    avatarArea: {
        width: '100%',
        alignItems: 'center',
    },
    avatarAreaIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarName: {
        color: '#000',
        marginLeft: 5,
        fontSize: 13
    },
    areaInput: {
        width: '100%'
    },
    textIntput: {
        color: '#000',
        fontWeight: '700'
    },
    input: {
        color: Theme.PRIMARY,
        width: '100%',
        backgroundColor: Theme.SECONDARY + '30',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        fontWeight: '700'
    },
    divider: {
        marginVertical: 10,
        height: 1,
        width: '100%',
        backgroundColor: Theme.SECONDARY
    },
    modalPayment:{
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: '#00000030', 
        padding: 20 
    },
    acordianHeader: {
        width: '90%',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    acordianHeaderText: {
        color: '#000',
        fontWeight: '700'
    },
    erroText: {
        color: Theme.ERROR,
        fontSize: 11
    },
    suportBtnArea: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    btn:{  
        borderBottomWidth: 1,
        borderColor: Theme.SECONDARY + 50,
        padding: 15,
        justifyContent: 'space-between'
    },
    suportConteiner: {
        backgroundColor: Theme.WHITE,
        alignItems: 'center',
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height - StatusBar.currentHeight        
    },
    ball:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:"tomato",
        position:"absolute",
        left:160,
        //top:150,
      },
      
})
