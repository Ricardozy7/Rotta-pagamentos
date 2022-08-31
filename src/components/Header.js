import React from 'react';
import { Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Theme from "../../theme";

import styles from './styles';

const Header = ({ name, btn, icon, children, background, color, onHandle }) => {
    const { goBack, navigate } = useNavigation();

    return (
        <View style={[styles.header,
        {
            backgroundColor: background ? background : Theme.PRIMARY
        }]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <RectButton onPress={() => {
                    try { navigate('LandingPage') } catch (err) { console.log(err) }
                }}>
                    <MaterialIcon style={{
                        opacity: 0.9,
                        transform: [{ rotate: '180deg' }]
                    }}
                        name={'arrow-right-alt'}
                        color={color ? color : '#eee'}
                        size={30} />
                </RectButton>
                <Text style={[styles.textHeader, 
                    { color: color ? color : '#eee' }
                    ]}>{name.toUpperCase()}</Text>
            </View>
            {children ?
                children
                :
                <View style={{ width: 60 }}></View>
            }
        </View>
    );
}

export default Header;
