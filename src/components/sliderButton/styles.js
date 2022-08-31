import { StyleSheet } from "react-native";
import Theme from "../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
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
        width: '150%',
        padding: 0,
        marginTop: 10,
        flexDirection: 'row',
    },
    card:{
        width: '100%', 
        borderWidth: 1, 
        borderColor: Theme.PRIMARY, 
        borderRadius: 5, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    rigthDetail:{
        paddingBottom: 10,
        paddingTop: 10,
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
        alignItems: 'center',
        width: '90%',
        padding: 10
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
        justifyContent: 'space-between' 
    },
    infoText:{
        color: '#000', 
        fontWeight: '700',
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
        fontSize: 11
    }
})

export default styles;
