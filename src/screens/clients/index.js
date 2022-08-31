import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput
} from "react-native";
import Snackbar from "react-native-snackbar";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { SpringScrollView } from "react-native-spring-scrollview";
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Theme from "../../../theme";

import Header from "../../components/Header";
import { RemoteServices } from '../../services/index';
import { cpfMask, cnpjMask, validarCNPJ } from '../../../functools';
import usePayment from '../../contexts/payments';
import ModalBottom from "../../components/modalBottom";
import { NormalFooter } from '../../components/LoadingFooter';

const Clients = () => {
    const [data, setData] = useState([]);
    const [prevData, setPrevData] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalvisibility, setModalvVisibility] = useState(false);
    const [modalvisibilityAdd, setModalvisibilityAdd] = useState(false);
    const [client, setClient] = useState()
    const [error, setError] = useState(false)
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [successgRegister, setSuccessgRegister] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState({ total: 0, actual: 0 });
    const [canSend, setCanSend] = useState(true);
    const [app, setApp] = useState(1)
    const [newClient, setNewCliet] = useState({
        cnpj: '',
        nome: '',
        fantasia: '',
        email: ''
    })
    const [scrollNumber] = useState(8)

    let _scrollRef = [];
    for (let i = 0; i < scrollNumber; ++i) {
      _scrollRef.push(React.createRef());
    }
    function addData(value) {
        const newData = [...data, ...value];
        setData(newData);
    }

    const getCobrancas = async (page, limit) => {
        if (page === 1) {
            setLoading(true);
        }
        RemoteServices.users.Clints({ perfil: 'loja', limit: limit, app: app, page: page, fragment: search }).then((response) => {
            if (response.error) {
                setError(true)
            }
            if (response.usuarios) {
                setPrevData(response.usuarios);
                if (response.usuarios.length === 0) {
                    setCanSend(false)
                }
                if (page === 1) {
                    setData(response.usuarios);
                } else {
                    addData(response.usuarios);
                }
                if (response.usuarios) {
                    setPage({
                        actual: 1,
                        total: response.contagem
                    })
                }
                if (page !== 1) {
                    setPage(p => { return { ...p, actual: page } })
                }
            }
            setLoading(false)
            setLoadingMore(false)
        }).catch((err) => {
            Snackbar.show({
                text: 'Error',
                duration: Snackbar.LENGTH_LONG,
                textColor: "#fff",
                backgroundColor: Theme.ERROR,
            });
            setError(true)
            setLoading(false)
            setLoadingMore(false)
        }).finally(() => {
            setLoading(false)
            setLoadingMore(false)
        })
    }
    useEffect(() => {
        if (loadingMore) {
            getCobrancas(page.actual + 1, page.actual + 1 * 15)
        }
        if(!loadingMore){
            try{
                _scrollRef.endLoading();
            }catch(err){

            }
        }
    }, [loadingMore])
    useEffect(() => {
        getCobrancas(1, 15)
    }, [search])
    const NewClient = () => {

        if (validarCNPJ(newClient.cnpj)) {
            const data = {
                cpf_cnpj: newClient.cnpj,
                loja: {
                    email: newClient.email,
                    razao_social: newClient.nome,
                    senha: "123456",
                    nome_fantasia: newClient.fantasia
                }
            }
            if (data.cpf_cnpj.length < 13 && data.loja.email.length < 5 && data.loja.razao_social.length < 2) {
                Snackbar.show({
                    text: 'Verifique todas as informações e tente novamente',
                    duration: Snackbar.LENGTH_LONG,
                    textColor: "#fff",
                    backgroundColor: Theme.ERROR,
                });
            }
            setLoadingRegister(true)

            RemoteServices.users.registerClient(data, 1).then((e) => {
                if (!e.error) {
                    setLoadingRegister(false)
                    setSuccessgRegister(true)
                    setTimeout(() => {
                        setSuccessgRegister(false)
                        setModalvisibilityAdd(false)
                        getCobrancas()
                    }, 2000)
                }
                if (e.error) {
                    Snackbar.show({
                        text: e.error,
                        duration: Snackbar.LENGTH_LONG,
                        textColor: "#fff",
                        backgroundColor: Theme.ERROR,
                    });
                }
            }).catch((err) => {
            }).then(() => {
                setLoadingRegister(false)
                setNewCliet({
                    cnpj: '',
                    nome: '',
                    fantasia: '',
                    email: ''
                })
            })
        } else {
            Snackbar.show({
                text: 'Cnpj inválido',
                duration: Snackbar.LENGTH_LONG,
                textColor: "#fff",
                backgroundColor: Theme.ERROR,
            });
        }

    }

    const updateUser = async (store) => {
        setLoadingRegister(true)
        await RemoteServices.users.updateUser({
            user_id: store.id, data: {
                email: store.email,
                pessoa: {
                    razao_social: store.razao_social,
                    nome_fantasia: store.nome_fantasia,
                    // status: store.ativo
                }
            }
        })
            .then((e) => {
                if (e.success) {
                    Snackbar.show({
                        text: 'Informações atualizadas com sucesso',
                        duration: Snackbar.LENGTH_LONG,
                        textColor: "#fff",
                        backgroundColor: Theme.SUCCESS,
                    })
                    getCobrancas()
                    setModalvVisibility(false)
                }
            }).catch(() => {
            }).finally(() => {
                setLoadingRegister(false)
            })
    }
    useEffect(() => {
        if (newClient.cnpj.length > 13) {
            RemoteServices.users.getCnpj({ cnpj: newClient.cnpj.toString() }).then((response) => {
                if (response.status !== 'ERROR') {
                    setNewCliet({
                        ...newClient,
                        email: response.email,
                        fantasia: response.fantasia,
                        nome: response.nome
                    })
                } else {
                }

            })
        }
    }, [newClient.cnpj])


    const renderFooter = () => {
        if (!loadingMore) return null
        return (
            <View style={{ height: 100, width: '100%', alignItems: 'center' }}>
                <LottieView
                    style={{ width: 50 }}
                    autoPlay
                    loop={true}
                    source={require('../../assets/animations/loading-money.json')}
                />
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Header name='seus clientes'>
                <RectButton style={styles.personAdd} onPress={() => setModalvisibilityAdd(true)}>
                    <Icon name='person-add' size={30} color='#fff' />
                </RectButton>
            </Header>
            <View style={styles.header}>
                <View style={styles.serch}>
                    <Icon name='search' color={Theme.PRIMARY} size={30} />
                    <TextInput
                        value={search}
                        onChangeText={(e) => setSearch(e)}
                        style={styles.textIntput}
                    />
                </View>
                {/* <RectButton style={styles.filter} onPress={() => setFilter(true)}>
                    <Icon name='filter-list' color={Theme.PRIMARY} size={30} />
                </RectButton> */}
            </View>
            <View style={{ overflow: 'hidden', backgroundColor: Theme.WHITE }}>
            {
                error ?
                    <View style={styles.error}>
                        <LottieView
                            style={{ width: 100 }}
                            autoPlay
                            loop={false}
                            source={require('../../assets/animations/error.json')}
                        />
                        <Text style={{ color: Theme.PRIMARY, fontWeight: '700' }}>Não foi possivel se conectar ao serviço</Text>

                    </View>
                    :
                    search.length > 0 && data.length === 0 ?
                        <View style={styles.loading}>
                            <LottieView
                                style={{ width: 80 }}
                                autoPlay
                                loop={true}
                                source={require('../../assets/animations/not-found.json')}
                            />
                            <Text style={{ color: Theme.SECONDARY, fontWeight: '700' }}>A pesquisa não retornou resultados.</Text>
                        </View>
                        :
                        loading ?
                            <View style={styles.loading}>
                                <LottieView
                                    style={{ width: 80 }}
                                    autoPlay
                                    loop={true}
                                    source={require('../../assets/animations/loading-money.json')}
                                />
                            </View>
                            :
                            data.length === 0 ?
                                <View style={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                    <LottieView
                                        style={{ width: 80 }}
                                        autoPlay
                                        loop={false}
                                        source={require('../../assets/animations/empty-item.json')}
                                    />
                                    <Text style={{ color: Theme.SECONDARY }}>Nenhum registro encontrado.</Text>
                                </View>
                                :
                                <>
                                <SpringScrollView
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        backgroundColor: '#ffff',
                                        marginTop: 20,
                                        height: '80%'
                                    }}
                                    ref={ref => (_scrollRef = ref)}
                                    loadingFooter={NormalFooter}
                                    onLoading={() => {
                                        if (page.total > page.actual && data.length > 14 && prevData.length > 0) {
                                            setLoadingMore(true);
                                        }
                                        if(prevData.length === 0){
                                            _scrollRef.endLoading();
                                        }
                                    }}
                                >
                                    {
                                        data.map((client) => {
                                            return (
                                                <View style={styles.cardsBorder} key={client.id}>
                                                    <RectButton style={styles.btnCard} onPress={() => {
                                                        setModalvVisibility(true)
                                                        setClient(client)
                                                    }}>
                                                        <View style={[styles.dataContainer, { padding: 15 }]}>
                                                            <Text style={{ color: '#000', fontWeight: '700' }}>{client.razao_social}</Text>
                                                        </View>
                                                    </RectButton>
                                                </View>
                                            )
                                        })
                                    }
                                </SpringScrollView>
                                    </>
            }
            </View>

            <ModalBottom visible={modalvisibility} onHandle={setModalvVisibility}
                close={modalvisibility}
            >
                <ScrollView>

                    <View style={styles.modalBottom}>
                        <TextInput
                            value={client && client.razao_social}
                            onChangeText={(e) => setClient({ ...client, razao_social: e })}
                            style={{ width: '70%', fontWeight: '700', color: Theme.TEXT }}
                        />
                        {<Text style={{
                            padding: 10,
                            backgroundColor: client && client.status === 'ATIVO' ? Theme.SUCCESS :
                                (client && client.status === 'BLOQUEADO' ? Theme.ERROR : Theme.WARNING),
                            borderRadius: 5,
                            color: '#fff'
                        }}>
                            {client && client.status}
                        </Text>}
                    </View>
                    <View style={{ marginTop: '5%', borderTopWidth: 1, padding: 10 }}>
                        <View style={styles.infoGrid}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.infoText}>CNPJ/CPF:</Text>
                                <TextInput
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={client && client.cpf_cnpj ? client.cpf_cnpj.length > 13 ?
                                        cnpjMask(client.cpf_cnpj)
                                        :
                                        cpfMask(client.cpf_cnpj)

                                        : null}

                                    onChangeText={(e) => setClient({ ...client, cpf_cnpj: e })}
                                    style={{ color: Theme.SECONDARY }}
                                />
                            </View>
                            <View style={{ marginLeft: 25, width: '50%' }}>
                                <Text style={styles.infoText}>Fantasia:</Text>
                                <TextInput
                                    value={client && client.nome_fantasia}
                                    onChangeText={(e) => setClient({ ...client, nome_fantasia: e })}

                                    style={{ color: Theme.TEXT }}
                                />
                            </View>
                        </View>
                        <View style={styles.infoGrid}>
                            <View>
                                <Text style={styles.infoText}>E-mail do cliente:</Text>
                                <TextInput
                                    value={client && client.email}
                                    onChangeText={(e) => setClient({ ...client, email: e })}
                                    style={{ width: 250, color: Theme.TEXT }}
                                />
                            </View>
                        </View>
                        <View style={styles.infoGrid}>
                            <View>
                                <Text style={styles.infoText}>Loja ativa</Text>
                            </View>

                        </View>
                        <View style={styles.btnContainer}>
                            <View style={styles.btnSave}>

                                <RectButton style={{
                                    width: '100%',
                                    paddingVertical: 10,
                                    alignItems: 'center',
                                    backgroundColor: loadingRegister ? Theme.SECONDARY + '50' : Theme.PRIMARY,
                                    borderRadius: 5

                                }}
                                    onPress={() => loadingRegister ? {} : updateUser(client)}
                                >
                                    {
                                        loadingRegister ?
                                            <LottieView
                                                autoPlay
                                                style={{ width: 40 }}
                                                loop={true}
                                                source={require('../../assets/animations/loading.json')}
                                            />
                                            :
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#fff'
                                            }}>SALVAR</Text>
                                    }

                                </RectButton>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ModalBottom>
            <ModalBottom visible={modalvisibilityAdd} onHandle={setModalvisibilityAdd} close={modalvisibilityAdd}>
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                    style={{
                        padding: 10,
                        backgroundColor: '#fff',
                        maxHeight: 500
                    }}
                >

                    <View style={[styles.addNewClint, { borderBottomWidth: 1 }]}>
                        <Text style={styles.addNewText}>Adicionar novo cliente</Text>
                    </View>
                    {
                        successgRegister ?
                            <View style={styles.loading}>
                                <LottieView
                                    style={{ width: 200 }}
                                    autoPlay
                                    loop={false}
                                    source={require('../../assets/animations/success.json')}
                                />
                            </View>
                            :
                            <>

                                <View style={[styles.areaInput]}>
                                    <Text style={styles.addNewIfon}>CNPJ:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'CNPJ'}
                                        value={newClient.cnpj}
                                        placeholderTextColor={'#A8A8A8'}
                                        onChangeText={(e) => {
                                            setNewCliet({ ...newClient, cnpj: e })
                                        }}
                                    />
                                </View>
                                <View style={[styles.areaInput]}>
                                    <Text style={styles.addNewIfon}>Nome ou Razão social:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={newClient.nome}
                                        placeholder={'Nome ou Razão social'}
                                        placeholderTextColor={'#A8A8A8'}
                                        onChangeText={(e) => {
                                            setNewCliet({ ...newClient, nome: e })

                                        }}
                                    />
                                </View>
                                <View style={[styles.areaInput]}>
                                    <Text style={styles.addNewIfon}>Nome fantasia:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={newClient.fantasia}
                                        placeholder={'Nome fantasia'}
                                        placeholderTextColor={'#A8A8A8'}
                                        onChangeText={(e) => {
                                            setNewCliet({ ...newClient, fantasia: e })
                                        }}
                                    />
                                </View>
                                <View style={[styles.areaInput, { marginBottom: 25 }]}>
                                    <Text style={styles.addNewIfon}>E-mail do cliente:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={newClient.email}
                                        placeholder={'E-mail'}
                                        placeholderTextColor={'#A8A8A8'}
                                        onChangeText={(e) => {
                                            setNewCliet({ ...newClient, email: e })
                                        }}
                                    />
                                </View>
                            </>
                    }
                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                        <RectButton style={{
                            paddingHorizontal: 30,
                            paddingVertical: loadingRegister ? 0 : 10,
                            backgroundColor: loadingRegister ? Theme.SECONDARY + '50' : Theme.PRIMARY,
                            borderRadius: 5,
                            marginBottom: 10
                        }}
                            onPress={() => loadingRegister ? {} : NewClient()}
                        >
                            {
                                loadingRegister ?
                                    <LottieView
                                        autoPlay
                                        style={{ width: 40 }}
                                        loop={true}
                                        source={require('../../assets/animations/loading.json')}
                                    />
                                    :
                                    <Text style={{ color: '#fff' }}>Adicionar</Text>
                            }
                        </RectButton>

                    </View>
                </ScrollView>

            </ModalBottom>
        </View>
    )
}

export default Clients;
