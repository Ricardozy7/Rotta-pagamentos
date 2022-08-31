import React, { 
    useRef, 
    useState, 
    useEffect, 
    useContext 
} from "react";
import { 
    View, 
    Text, 
    Image, 
    StatusBar, 
    Modal, 
    TouchableOpacity, 
    Linking
} from "react-native";
import { SpringScrollView } from "react-native-spring-scrollview";
import { RectButton, TextInput } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
import Snackbar from "react-native-snackbar";

import Icon from "react-native-vector-icons/MaterialIcons";
import FontIcon from "react-native-vector-icons/FontAwesome";
import Hotline from '../../assets/img/logo-hotline-secundary.png'

import { RemoteServices } from '../../services/index';
import { AuthManager } from '../../contexts/auth';
import { styles } from "./styles";


import Theme from '../../../theme';
import Header from "../../components/Header";
import Form from './form';
import Accordian from "../../components/Accordion";

const Settings = () => {
    const {  setPerfil } = useContext(AuthManager);

    const [loading, setLoading] = useState(false);
    const [me, setMe] = useState({
        cpf_cnpj: "",
        razao_social: "",
        nome_fantasia: "",
        telefone: "",
        cidade: "",
        uf: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cep: "",
        apelido: ""
    })
    const [prevMe, setPrevMe] = useState({
        cpf_cnpj: "",
        razao_social: "",
        nome_fantasia: "",
        telefone: "",
        cidade: "",
        uf: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cep: "",
        apelido: ""
    })
    const input = useRef(null);
    const [pass, setPass] = useState({
        current: '',
        new: '',
        repeatNew: '',
    });
    const [errorPass, setErrorPass] = useState({
        current: '', new: '', repeatNew: ''
    });
    const [help, setHelp] = useState(false);
    const [error, setError] = useState(false);
    const [ifonsScan, setInfosScan] = useState(false);
    const [InfosError, setLoadInfosError] = useState(false);
    const setState = (key, value) => {
        setMe(p => ({ ...p, [key]: value }));
    }

    const getME = async () => {
        await RemoteServices.users.retrive(1).then((res) => {
            if (!res.error) {
                setMe(res)
                setPerfil(res.apelido)
            } if (res.error) {
                setLoadInfosError(true)
            }
            setPrevMe(res)
        })
    }

    useEffect(() => {
        getME()
    }, [])


    const update = () => {
        setLoading(true)
        setInfosScan(false)

        const data = {
            pessoa: {
                razao_social: me.razao_social && me.razao_social,
                nome_fantasia: me.nome_fantasia && me.nome_fantasia,
                telefone: me.telefone && me.telefone,
                cidade: me.cidade && me.cidade,
                uf: me.uf && me.uf,
                logradouro: me.logradouro && me.logradouro,
                numero: me.numero && me.numero,
                bairro: me.bairro && me.bairro,
                cep: me.cep && me.cep,
                apelido: me.apelido && me.apelido
            }
        }
        RemoteServices.users.updateMe({ data: data }).then((e) => {
            setInfosScan(true)
            setTimeout(() => {
                setLoading(false)
                setError(false)
            }, 2000)
            if (!e.error) {
                Snackbar.show({
                    text: 'Informações salvas com sucesso',
                    backgroundColor: Theme.SUCCESS,
                    duration: Snackbar.LENGTH_LONG,
                    textColor: Theme.WHITE
                })
                getME()
            }
            if (e.error) {
                Snackbar.show({
                    text: 'Não foi possivel salvar as informações, tente novamente',
                    backgroundColor: Theme.ERROR,
                    duration: Snackbar.LENGTH_LONG,
                    textColor: Theme.WHITE
                })
                console.log(e.error)
                setError(true)
                setTimeout(() => {
                    setLoading(false)
                    setError(false)
                }, 2000)
            }
        }).finally(() => {

        })
    }


    useEffect(() => {
        if (me.cep && me.cep.length > 7) {
            RemoteServices.users.getCnpj({ cep: me.cep.toString() }).then((response) => {
                console.log(response)
                if (response.cep) {
                    setMe({
                        ...me,
                        cidade: response.localidade,
                        uf: response.uf,
                        ...(me.bairro.length === 0 ? { bairro: response.bairro } : {}),
                        ...(me.logradouro.length === 0 ? { logradouro: response.logradouro } : {})
                    })
                } else {
                    console.log('erro')
                }

            })
        }
    }, [me.cep])

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={{ flex: 1, backgroundColor: Theme.WHITE }}>


                <Header name='Editar perfil' background={Theme.WHITE} color={Theme.BLACK} />
                {
                    loading ?

                        <View style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: -50
                        }}>
                            {!ifonsScan ?
                                <LottieView
                                    style={{ width: 400 }}
                                    autoPlay
                                    loop={true}
                                    source={require('../../assets/animations/infosScan.json')}
                                />
                                :
                                error ?
                                    <LottieView
                                        style={{ width: 200 }}
                                        autoPlay
                                        loop={true}
                                        source={require('../../assets/animations/erro.json')}
                                    />
                                    :

                                    <LottieView
                                        style={{ width: 200 }}
                                        autoPlay
                                        loop={false}
                                        source={require('../../assets/animations/success.json')}
                                    />
                            }

                        </View>

                        :

                        <View style={{ overflow: 'hidden' }}>
                            <SpringScrollView
                                contentInsetAdjustmentBehavior="automatic"
                                showsVerticalScrollIndicator={false}
                                onEnded={() => {

                                }}

                            >
                                <View style={{ padding: 20, height: '100%' }}>
                                    <View style={[styles.avatarArea]}>
                                        <RectButton
                                            style={{ 
                                                justifyContent: 'center', 
                                                alignItems: 'center' 
                                            }}
                                            onPress={() => { }}
                                        >
                                            <View style={[
                                                styles.avatarAreaIcon, { 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center', 
                                                    padding: 30, 
                                                    position: 'relative' 
                                                    }]}>

                                                <LottieView
                                                    style={{ width: 130, position: 'absolute', }}
                                                    autoPlay
                                                    loop={false}
                                                    source={require('../../assets/animations/loading-user.json')}
                                                />

                                                <LottieView
                                                    style={{ width: 70, position: 'absolute', }}
                                                    autoPlay
                                                    loop={false}
                                                    source={require('../../assets/animations/user.json')}
                                                />

                                            </View>
                                        </RectButton>
                                    </View>
                                    <View style={[{ marginTop: 20 }]}></View>
                                    <View style={[styles.areaInput]}>
                                        <Text style={styles.textIntput}>Apelido</Text>
                                        <TextInput
                                            ref={input}
                                            style={styles.input}
                                            placeholder={'Apelido'}
                                            value={me.apelido}
                                            placeholderTextColor={'#A8A8A8'}
                                            onChangeText={(e) => {
                                                setState('apelido', e)
                                            }}
                                        />
                                    </View>
                                    <View style={[styles.divider, { marginTop: 20 }]}></View>

                                    <Accordian
                                        open={true}
                                        children={
                                            <View style={styles.acordianHeader}>
                                                <Text style={styles.acordianHeaderText}>Informações pessoais</Text>
                                            </View>
                                        }
                                        data={
                                            <Form me={me} setMe={setMe}/>
                                        }
                                    />
                                    <View style={styles.divider}></View>
                                    <Accordian
                                        children={
                                            <View style={[styles.acordianHeader]}>
                                                <Text style={styles.acordianHeaderText}>Sobre</Text>
                                            </View>
                                        }
                                        data={
                                            <View style={{ marginTop: 10 }}>
                                                <View style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: Theme.SECONDARY + 10
                                                }}>
                                                </View>
                                                <View style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: Theme.SECONDARY + 50
                                                }}>
                                                    <RectButton
                                                        onPress={() => setHelp(true)}
                                                        style={{
                                                            paddingVertical: 10,
                                                            borderRadius: 5,
                                                            width: '100%',
                                                            paddingVertical: 20
                                                        }}
                                                    >
                                                        <Text style={{
                                                            color: Theme.BLACK + 85,
                                                            fontWeight: '500'
                                                        }}>Suporte</Text>

                                                    </RectButton>
                                                </View>
                                                <View style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: Theme.SECONDARY + 50
                                                }}>
                                                    <RectButton
                                                        onPress={() => {
                                                            Linking.openURL('https://play.google.com/store/apps/details?id=com.hotline.rotta')
                                                        }}
                                                        style={{
                                                            paddingVertical: 10,
                                                            borderRadius: 5,
                                                            width: '100%',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <View style={{}}>
                                                            <Text style={{
                                                                color: Theme.BLACK + 85,
                                                                fontWeight: '500',
                                                            }}>Versão do App</Text>
                                                            <Text style={{ color: Theme.SECONDARY }}>Atualize o App pela loja</Text>
                                                        </View>
                                                        <View style={{}}>
                                                            <Icon name='north-east' color={Theme.SECONDARY} size={20} />
                                                            <Text style={{ color: Theme.SECONDARY }}>1.0.0</Text>
                                                        </View>

                                                    </RectButton>
                                                </View>
                                                <Text style={{ 
                                                    color: Theme.SECONDARY, 
                                                    fontWeight: '400', 
                                                    marginTop: 20 
                                                    }}>
                                                    Copyright © Hotline Tecnologia 2015-{new Date().getFullYear()}, Inc. All rights reserved.
                                                </Text>
                                            </View>
                                        }
                                    />
                                    <View style={{
                                        width: '100%',
                                        alignItems: 'flex-end',
                                        padding: 20,
                                        marginBottom: 20
                                    }}>
                                        <RectButton
                                            style={{
                                                paddingHorizontal: 40,
                                                backgroundColor: Theme.PRIMARY,
                                                paddingVertical: 10,
                                                borderRadius: 5
                                            }}
                                            onPress={() => {
                                                update()
                                            }}>
                                            <Text style={{ color: Theme.WHITE }}>Salvar</Text>
                                        </RectButton>
                                    </View>
                                </View>
                                <View style={{ height: 200 }} />

                            </SpringScrollView>
                        </View>
                }
                <Modal transparent visible={help} animationType="slide">
                    <View style={{
                        backgroundColor: Theme.WHITE,
                        flex: 1
                    }}>
                        <TouchableOpacity
                            onPress={() => setHelp(false)}
                            style={{
                                padding: 15,
                                alignSelf: 'flex-start'
                            }}>
                            <Icon
                                name={'close'}
                                color={Theme.BLACK + 90}
                                size={20} />
                        </TouchableOpacity>
                        <SpringScrollView
                            contentStyle={styles.suportConteiner}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <LottieView
                                    style={{ width: 200 }}
                                    autoPlay={true}
                                    loop={false}
                                    source={require('../../assets/animations/suporte.json')}
                                />
                                <View style={{ width: '100%' }}>
                                    <View style={styles.suportBtnArea}>
                                        <TouchableOpacity style={[styles.suportBtnArea, styles.btn]}

                                            onPress={() => Linking.openURL('tel:7435411190')}
                                        ><View style={{
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                                <Icon name='phone' color={Theme.PRIMARY} size={30} />
                                                <Text style={{
                                                    color: Theme.PRIMARY,
                                                    fontWeight: '300',
                                                    top: 5,
                                                    marginLeft: 15
                                                }}>(74) 3542-1190 Fixo</Text>
                                            </View>
                                            <Icon name='north-east' 
                                            style={{ textAlign: 'right' }} 
                                            color={Theme.PRIMARY + 99} size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.suportBtnArea}>
                                        <TouchableOpacity 
                                        style={[styles.suportBtnArea, styles.btn]}
                                            onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=+5574988041831')}
                                        >
                                            <View style={{ 
                                                alignItems: 'center', 
                                                flexDirection: 'row'
                                                 }}>
                                                <FontIcon 
                                                name='whatsapp' 
                                                color={Theme.PRIMARY}
                                                size={30} />
                                                <Text style={{
                                                    color: Theme.PRIMARY,
                                                    fontWeight: '300',
                                                    marginLeft: 15,
                                                }}
                                                >(74) 98804-1831 Whatsapp</Text>
                                            </View>
                                            <Icon 
                                            name='north-east' 
                                            style={{ textAlign: 'right' }} 
                                            color={Theme.PRIMARY + 99} 
                                            size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.suportBtnArea}>
                                        <TouchableOpacity 
                                        style={[styles.suportBtnArea, styles.btn]}
                                            onPress={() => Linking.openURL('mailto:comercial@hotlinetecnologia.com.br')}>
                                            <View style={{
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <Icon 
                                                name='email' 
                                                color={Theme.PRIMARY} 
                                                size={30} />
                                                <Text
                                                    style={{
                                                        color: Theme.PRIMARY,
                                                        fontWeight: '300',
                                                        marginLeft: 15
                                                    }}

                                                >comercial@hotlinetecnologia.com.br</Text>
                                            </View>
                                            <Icon 
                                            name='north-east' 
                                            style={{ textAlign: 'right' }} 
                                            color={Theme.PRIMARY + 99} 
                                            size={20} 
                                            />

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.suportBtnArea}>
                                        <TouchableOpacity style={[styles.suportBtnArea, styles.btn]}
                                            onPress={() => Linking.openURL('https://www.hotlinetecnologia.com.br')}>
                                            <View style={{
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <Icon 
                                                name='public' 
                                                color={Theme.PRIMARY} 
                                                size={30} />
                                                <Text
                                                    style={{
                                                        color: Theme.PRIMARY,
                                                        fontWeight: '300',
                                                        marginLeft: 15
                                                    }}>
                                                    Hotline Tecnologia</Text>
                                            </View>
                                            <Icon 
                                            name='north-east' 
                                            style={{ textAlign: 'right' }} 
                                            color={Theme.PRIMARY + 99} 
                                            size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={[styles.suportBtnArea, 
                                        { padding: 15 }
                                        ]}>
                                        <Icon 
                                        name='schedule' 
                                        color={Theme.PRIMARY} 
                                        size={30} />
                                        <Text style={{
                                            color: Theme.PRIMARY,
                                            fontWeight: '300',
                                            marginLeft: 15
                                        }}>de Seg à Sex das 8:00hs as 18:00hs</Text>
                                    </View>
                                </View>
                            </View>
                            <Image
                                source={Hotline}
                                resizeMode='stretch'
                                style={{ 
                                    width: 150, 
                                    height: 70,
                                    marginBottom: 25 }}
                            />
                        </SpringScrollView>
                    </View>
                </Modal>
                <Modal visible={InfosError} transparent>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#00000050',
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <View style={{
                            padding: 20,
                            backgroundColor: Theme.WHITE,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{ width: '100%' }}>

                                <Text style={{
                                    color: Theme.PRIMARY,
                                    fontSize: 20,
                                    fontWeight: '700'
                                }}>Ocorreu um erro</Text>
                                <Text style={{
                                    color: Theme.PRIMARY,
                                    fontWeight: '600'
                                }}>Não foi possivel carregar as suas informações</Text>
                            </View>
                            <View style={{
                                width: '100%',
                                alignItems: 'center'
                            }}>
                                <LottieView
                                    style={{ width: 200 }}
                                    autoPlay
                                    loop={true}
                                    source={require('../../assets/animations/fail-infos.json')}

                                />
                            </View>
                            <TouchableOpacity style={{
                                backgroundColor: Theme.PRIMARY + 10,
                                paddingHorizontal: 60,
                                paddingVertical: 10,
                                borderRadius: 30
                            }} onPress={() => {
                                setLoadInfosError(false)
                            }}>
                                <Text style={{ 
                                    textAlign: 'center', 
                                    color: Theme.PRIMARY, 
                                    fontWeight: '500' 
                                    }}>Entendi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}



export default Settings;