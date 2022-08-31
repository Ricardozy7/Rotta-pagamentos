import React, { useContext } from "react";
import {
    View,
    Text,
    BackHandler,
    StatusBar,
    StyleSheet
} from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Theme from '../../../theme';
import { AuthManager } from '../../contexts/auth';


const Landing = () => {
    const { navigate } = useNavigation()

    const {
        reload,
        setReload,
        setNetworkErro,
        networkErro
    } = useContext(AuthManager);


    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={{ flex: 1 }}>
                <View style={styles.conteiner}>
                    <View>
                        <Text style={styles.text}>Ocorreu um erro</Text>
                        <Text style={styles.subText}>Não foi possivel carregar as informações. verifique sua conexão e tente novamente</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <LottieView
                            style={{ width: 200 }}
                            autoPlay
                            loop={true}
                            source={require('../../assets/animations/astronaut.json')}
                        />
                    </View>

                    <View>
                        <RectButton style={styles.btnMain} onPress={() => {
                            setReload(!reload)
                            setNetworkErro(!networkErro)
                            navigate('Loading')
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: '500'
                            }}>Atualizar</Text>
                        </RectButton>
                        <RectButton style={styles.btnExit} onPress={() => {
                            BackHandler.exitApp()
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: Theme.PRIMARY,
                                marginTop: 25,
                                fontWeight: '500'
                            }}>Sair do aplicativo</Text>
                        </RectButton>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    text: {
        color: Theme.PRIMARY,
        fontSize: 30,
        fontWeight: '500'
    },
    subText: {
        color: Theme.SECONDARY,
        fontSize: 20
    },
    btnMain: {
        backgroundColor: Theme.PRIMARY,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30
    },
    btnExit: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30
    }
})

export default Landing;