import React, { useContext, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    ImageBackground,
    Dimensions,
    Keyboard,
    ScrollView,
    TextInput
} from "react-native";
import {
    RectButton,

} from 'react-native-gesture-handler';
import Theme from '../../../theme';
import { AuthManager } from '../../contexts/auth';
import { RemoteServices } from '../../services/index';

import Icon from "react-native-vector-icons/MaterialIcons";
import LottieView from 'lottie-react-native';

import Snackbar from "react-native-snackbar";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dotts from '../../assets/img/dots.png';
import Circulo from '../../assets/img/CIRCULO.png';
import ImgFooter from '../../assets/img/logo-hotline.png';

import styles from "./styles";

const Landing = () => {
    const { setUser, setPerfil } = useContext(AuthManager);
    const input = useRef(null);
    const [dados, setDados] = useState({
        email: '',
        senha: '',
    });
    const [error, setError] = useState(false);
    const [loading, setloading] = useState(false);
    const [passVisi, setPassVisi] = useState(true);
    const _scrollRef = useRef(null)
    const setState = (key, value) => {
        setDados(p => ({ ...p, [key]: value }));
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const Login = async () => {

        if (dados.email.length > 2 && dados.senha.length > 2 && validateEmail(dados.email)) {
            setloading(true)

            await RemoteServices.login.login(
                dados.email,
                dados.senha,
                'admin'
            ).then(async (e) => {
                if (e.error) {
                    Snackbar.show({
                        text: e.error,
                        duration: Snackbar.LENGTH_LONG,
                        textColor: "#fff",
                        backgroundColor: Theme.ERROR,
                    });
                }
                if (!e.error) {
                    const storeData = e.token;
                    await AsyncStorage.setItem("@intevhtl-login", JSON.stringify(storeData));
                    const refreshTokken = e.refresh_token;
                    await AsyncStorage.setItem("@intevhtl-refresh", JSON.stringify(refreshTokken));
                    RemoteServices.users.retrive(1).then((e) => {
                        setPerfil(e.razao_social)
                        if (e.perfil === 'revenda') {
                            setUser(storeData)
                        } else {
                            AsyncStorage.clear()
                            Snackbar.show({
                                text: 'perfil não autorizado',
                                duration: Snackbar.LENGTH_LONG,
                                textColor: '#fff',
                                backgroundColor: Theme.ERROR
                            })
                        }
                    });
                    // 
                }
            }).catch((err) => {

            }).finally(() => setloading(false))
        } else {
            const errMail = `${dados.email.length > 0 ? 'E-mail inválido' : 'preencha o campo e-mail'}`
            const errPass = 'Senha deve ter no mínimo 6 Caracteres'
            Snackbar.show({
                text: !validateEmail(dados.email) ? errMail : (dados.senha.length < 5 ? errPass : `Erro, tente novamente!`),
                duration: Snackbar.LENGTH_LONG,
                textColor: "#fff",
                backgroundColor: Theme.ERROR,
            });
            setError(true)
        }

    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {
            if (_scrollRef.current) {
                _scrollRef.current.scrollToEnd()
            }
        })
    }, [Keyboard]);
    return (
        <>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
                translucent={true} />
            <ScrollView contentContainerStyle={{
                height: Dimensions.get('window').height + StatusBar.currentHeight ,
                backgroundColor: '#fff',
                justifyContent: 'space-between'
            }}
                ref={_scrollRef}
            >
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={Circulo}
                        resizeMode='stretch'
                        style={styles.circle}> 
                        <ImageBackground source={Dotts}
                            resizeMode='stretch'
                            style={styles.dotts}>
                            <Text style={styles.title}>Rotta </Text>
                            <Text style={styles.title}>Pagamentos</Text>
                        </ImageBackground>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <LottieView
                        style={{ width: 200 }}
                        autoPlay
                        loop={true}
                        source={require('../../assets/animations/moneys.json')}
                    />
                </View>
                <View style={styles.areaForm}>
                    <View style={styles.Areainput}>
                        <Icon
                            name='person'
                            color={'#A8A8A8'}
                            size={20}
                            style={{ marginLeft: 10 }} />
                        <TextInput
                            autoFocus

                            style={[styles.input]}
                            placeholder={'Email...'}
                            placeholderTextColor={'#A8A8A8'}
                            value={dados.email}
                            onChangeText={(e) => {
                                setState('email', e)
                            }}
                        />
                    </View>
                    <View style={[styles.Areainput, { marginTop: 10 }]}>
                        <Icon
                            name='lock'
                            color={'#A8A8A8'}
                            size={20}
                            style={{ marginLeft: 10 }} />
                        <TextInput
                            ref={input}
                            secureTextEntry={passVisi}
                            style={[styles.input]}
                            placeholder={'Senha...'}
                            placeholderTextColor={'#A8A8A8'}
                            value={dados.senha}
                            onChangeText={(e) => {
                                setState('senha', e)
                            }}

                        />
                        <RectButton onPress={() => setPassVisi(!passVisi)}>
                            <Icon name={passVisi ? 'visibility' : 'visibility-off'}
                                color={'#A8A8A8'}
                                size={20}
                                style={{ margin: 10 }} />
                        </RectButton>

                    </View>
                    <View style={[styles.areaButton, {
                        backgroundColor: loading ? '#C6C6C6' : Theme.PRIMARY,
                    }]}>
                        <RectButton style={styles.btn} onPress={() => Login()} >
                            {loading ?
                                <LottieView
                                    style={{ width: 70 }}
                                    autoPlay
                                    loop={true}
                                    source={require('../../assets/animations/loading.json')}
                                /> :
                                <Text style={{ color: '#fff' }}>Entrar</Text>
                            }
                        </RectButton>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.textFotter}>powered by</Text>
                        <Image
                            source={ImgFooter}
                            style={styles.ImgFooter} />
                    </View>
                </View>
            </ScrollView >
        </>
    )
}
export default Landing;