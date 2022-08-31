import { StyleSheet } from "react-native";
import Theme from "../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Theme.PRIMARY,
        justifyContent: 'space-between'
    },
    header:{
        flexDirection: 'row', 
        width: '100%', 
        paddingHorizontal: 20, 
        alignItems: 'center', 
        justifyContent: 'space-around',
        height: '10%',
    },
    serch:{
        width: '65%', 
        backgroundColor: '#F0F0F0', 
        borderRadius: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 2
    },
    animationsView:{
        width: '100%', 
        height: '90%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    conteiner:{
        width: '100%', 
        paddingHorizontal: 20,
    },
    text: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700'
    },
    card:{
        width: '100%', 
        height: 125, 
        borderWidth: 1, 
        borderColor: Theme.PRIMARY, 
        borderRadius: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    rigthDetail:{
        width: 15, 
        height: 30, 
        backgroundColor: '#fff',
        borderTopRightRadius: 50, 
        borderBottomRightRadius: 50, 
        borderRightWidth: 1, 
        right: 1,
        borderColor: Theme.PRIMARY
    },
    gridContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '90%'
    },
    leftDetail:{
        width: 15, 
        height: 30, 
        backgroundColor: '#fff',
        borderTopLeftRadius: 50, 
        borderBottomLeftRadius: 50, 
        left: 1, 
        borderLeftWidth: 1,
        borderColor: Theme.PRIMARY
    },
    infonMain:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    infoText:{
        color: '#000', 
        fontWeight: '700'
    },
    infoGrid:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    separetor:{
        height: 1, 
        width: '100%', 
        backgroundColor: '#DFDFDF', 
        marginTop: 5, 
        marginBottom: 5
    },
    infoGrid2:{
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    subInf:{
        color: '#838383', 
        fontWeight: '700',
        fontSize: 10
    },
    filterAreaBtns:{
        width: '50%', 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    filterText:{
        color: Theme.BLACK, 
        fontWeight: '600', 
        fontSize: 20, 
        marginBottom: 10
      },
      filtersName:{
        color: '#000', 
        fontWeight: '600'
      },
      filterPicker:{
        borderRadius: 5, 
        backgroundColor: Theme.SECONDARY + '20',
        width: '90%'
      }
})

export default styles;
