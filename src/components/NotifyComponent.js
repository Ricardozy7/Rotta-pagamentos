import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Theme from '../../theme';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotifyComponent = ({ id, noti, name, color, onHandle }) => {

    return (
        <RectButton style={[
            styles.notifyCard,
            { backgroundColor: color }
            ]} key={id} onPress={onHandle}>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                 width: '95%'
                 }}>
                <Icon 
                name='notifications-active'
                color={'#fffd'} 
                size={20} />
                <Text style={{ 
                    color: Theme.WHITE, 
                    fontWeight: '700', 
                    marginLeft: 5, 
                    fontSize: 13 
                    }}>{' '}{name}</Text>
            </View>
            
        </RectButton>

    )
}


export default NotifyComponent;

export const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: Theme.PRIMARY,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 25
    },
    mainText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15
    },
    gridIcons: {
        height: 100,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnGrid: {
        width: '25%',
        padding: 10,
    },
    btnText: {
        color: '#000',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10
    },
    gridAreaButton: {
        padding: 10
    },
    areaNotify: {
        padding: 20,
        height: '55%',
    },
    notifyGrid: {
        height: '100%',
        backgroundColor: '#F0F0F0',
        marginTop: '5%',
        borderRadius: 10,
        padding: 20
    },
    notifyCard: {
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3
    }
})
