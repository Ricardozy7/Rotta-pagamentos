import { StyleSheet } from "react-native";
import Theme from "../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header:{
        flexDirection: 'row', 
        width: '100%', 
        padding: 20, 
        alignItems: 'center', 
        justifyContent: 'space-around' 
    },
    serch:{
        width: '75%', 
        backgroundColor: '#F0F0F0', 
        borderRadius: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 2
    },
    conteiner:{
        width: '100%', 
        padding: 20,
    },
    card:{
        width: '100%', 
        borderWidth: 1, 
        borderColor: Theme.PRIMARY, 
        borderRadius: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 10,
    },
    animationsView:{
        width: '100%', 
        height: '90%', 
        justifyContent: 'center', 
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
        width: '100%',
        padding: 10,
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
        width: '95%'
    },
    infoText:{
        color: '#000', 
        fontWeight: '700',
        fontSize: 13
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
        justifyContent: 'space-between' ,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: Theme.SECONDARY,
        marginTop: 10,
        paddingTop: 10
    },
    subInf:{
        color: '#838383', 
        fontWeight: '700',
        fontSize: 10
    },
    compravanteInfoGrid:{
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 10, 
        padding: 20
    },
    compravanteInfoGridText:{
        color: '#000',
        fontWeight: '700' 
    },
    btnHeader:{
        width:'100%', 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        marginTop: '10%', 
        justifyContent: 'space-between', 
        padding: 20,
        borderTopRightRadius: 10, 
        borderTopLeftRadius: 10
    }
})

export default styles;
