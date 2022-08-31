import { StyleSheet } from "react-native";
import Theme from "../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Theme.PRIMARY
    },
    header:{
        flexDirection: 'row', 
        width: '100%', 
        padding: 20, 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: Theme.WHITE
    },
    serch:{
        width: '100%', 
        backgroundColor: '#F0F0F0', 
        borderRadius: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 2
    },
    btnCard:{
        padding: 5, 
        width: '100%'
      },
      loading:{
        width: '100%', 
        height: '80%', 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      modalBottom:{
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      },
      infoText:{
        color: '#000', 
        fontWeight: '600', 
      },
      infoGrid:{
        flexDirection: 'row', 
        marginTop: 10,
        width: '100%'
      },
      btnContainer:{
        marginTop: 15, 
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between' 
      },
      btnEdit:{
        borderWidth: 1, 
        borderColor: Theme.PRIMARY, 
        width: '45%', 
        borderRadius: 5,
        justifyContent :'center'
      },
      btnSave:{
        width: '100%', 
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
      },
      addNewClint:{
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      },
      addNewText:{
        color: '#000', 
        fontWeight: '700', 
        width: '70%', 
        fontSize: 18
      },
      addNewIfon:{
        fontWeight: '400', 
        marginTop: 15, 
        fontWeight: '700',
        color: '#404040'
      },
    areaInput:{
        width: '100%' 
      },
      textIntput:{
          color: '#000', 
          fontWeight: '700'
      },
      input:{
          color: Theme.PRIMARY, 
          width: '100%', 
          backgroundColor: Theme.SECONDARY + '30', 
          borderRadius: 5,
          marginTop: 10,
          padding: 10
      },
    cardsBorder: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 6,
        borderColor: '#ddd',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5,
            height: 30,
        },
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Theme.PRIMARY
    },
    square: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        flex: 1,
    },
    infoContainer: {
        alignItems: 'center',
        width: 100,
    },
    label: {
        fontSize: 8,
        color: '#000'
    },
    info: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000'

    },
    filter:{
        padding: 10, 
        backgroundColor: '#f0f0f0', 
        borderRadius: 5
    },
    textIntput:{
        width: '90%', 
        backgroundColor: '#F0F0F0', 
        color: Theme.PRIMARY
    },
    status: {
        fontSize: 11,
    },
    labelL: {
        fontSize: 9,
    },
    infoL: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600'
    },
    hr: {
        height: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#bbb',
        marginVertical: 3,
    },
    personAdd:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10, 
        paddingVertical: 5
    },
    endRow: {
        backgroundColor: Theme.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
    },
    endSubInfo: {
        color: '#fff',
        opacity: 0.7,
        fontSize: 14,
        fontWeight: '400'
    },
    endTotalInfo: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    error:{
        width: '100%', 
        height: '80%', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})

export default styles;
