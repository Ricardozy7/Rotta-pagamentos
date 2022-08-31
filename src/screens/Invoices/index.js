import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    SafeAreaView,
} from "react-native";
import Snackbar from "react-native-snackbar";
import { RectButton, TextInput, FlatList } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import styles from './styles';
import Theme from "../../../theme";

import Header from "../../components/Header";
import { RemoteServices } from '../../services/index';
import usePayment from '../../contexts/payments';
import SliderButton from "../../components/sliderButton/sliderButton";
import Confirmation from "../../components/confirmationAnimate";
import DrawerList from "./dreaweList";
import Card from '../../components/card';
import ModalPayment from "../../components/modalPayment";
import useNotify from '../../contexts/notify';
import ModalBottom from '../../components/modalBottom';

const dimens = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };

const Invoices = () => {

    const { navigate } = useNavigation();
    const { reload, setReload } = useNotify();

    const { setPayment, payment, cobrancas, setCobrancas } = usePayment();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [erro, setEror] = useState(false);

    const [paymentLoading, setPaymentLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [modalPay, setModalPay] = useState(false);
    const [checkboxes, setCheckboxes] = useState([
        { id: 1, title: 'pix', checked: true },
        { id: 2, title: 'boleto', checked: false },
    ]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState({ total: 0, actual: 0 });
    const [canSend, setCanSend] = useState(true);
    const [onlyCharge, setOnlyCharge] = useState([]);
    const [filters, setFilters] = useState({
        status: "ABERTA,NAO PAGO",
        year: "2021"
    });
    const [filter, setFilter] = useState({
        value: false,
        time: true
    });


    function addData(value) {
        const newData = [...data, ...value];
        setData(newData);
    };

    const getCobrancas = async (page = 0, limit) => {
        if (canSend) {
            setCanSend(false);
            if (page === 1) {
                setLoading(true);
            }
            RemoteServices.Cobrancas.cobrancas({
                data: {
                    app: 1,
                    limit: limit,
                    status: filters.status,
                    ano: filters.year
                }
            }).then((response) => {
                if (response.error) {
                    setEror(true)
                }
                if (response.cobrancas) {
                    if (page === 1) {
                        setData(response.cobrancas);
                    } else {
                        addData(response.cobrancas);
                    }
                    if (response.cobrancas) {
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
            }).catch((e) => {
                Snackbar.show({
                    text: 'Error',
                    duration: Snackbar.LENGTH_LONG,
                    textColor: Theme.WHITE,
                    backgroundColor: Theme.ERROR,
                });
                setEror(true);
                setLoading(false);
            }).finally(() => {
                setLoading(false);
                setLoadingMore(false);
                setCanSend(true);
            })
        }

    }
    useEffect(() => {
        getCobrancas(page.actual + 1, page.actual + 1 * 15);
    }, [loadingMore])

    useEffect(() => {
        setCobrancas([]);
    }, [])

    useEffect(() => {
        console.log()
    }, [search])

    const makePaid = () => {
        const method = checkboxes.filter((e) => { return e.checked })
        const pay = payment.cobranca_id ? [{ id: payment.cobranca_id }] : (cobrancas.length > 0 ? cobrancas.map(e => { return { id: e.cobranca_id } })
            :
            onlyCharge.map(e => { return { id: e.cobranca_id } }))
        const data = {
            metodo_pagamento: method[0].title,
            cobrancas: pay
        }
        setPaymentLoading(true);
        RemoteServices.Cobrancas.CreatePayment(data).then((e) => {
            if (e.error) {
                Snackbar.show({
                    text: e.error,
                    duration: Snackbar.LENGTH_LONG,
                    textColor: Theme.WHITE,
                    backgroundColor: Theme.ERROR,
                });
            } else {       
                setModal(true)
                setReload(!reload)
                setOnlyCharge([])
                setPayment({})
                setModalPay(false)
                setTimeout(() => {
                    RemoteServices.Cobrancas.Payments({ status: 'AGUARDANDO' }).then((e) => {
                        console.log(e.pagamentos[0])
                        if (!e.error) {
                            setCobrancas([e.pagamentos[0]])
                            navigate('PaymentComplete')
                            setPayment({})
                            setModalPay(false)
                        } else {
                            navigate('LandingPage')

                        }
                    }).catch(() => {
                        navigate('LandingPage')
                    })
                }, 2300)
            }
            console.log(e)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setPayment({})
            setPaymentLoading(false)
        })

    }
    const renderFooter = () => {
        if (!loadingMore) return (
            <View style={{ height: 300 }}/>
        )
        return (
            <View style={{ height: 300, width: '100%', alignItems: 'center' }}>
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
        <SafeAreaView style={styles.mainContainer}>
            <Header name='faturas abertas' />
            <View style={{ backgroundColor: Theme.WHITE }}>
                <View style={styles.header}>
                    <View style={styles.serch}>
                        <Icon name='search' color={Theme.PRIMARY} size={30} />
                        <TextInput
                            value={search}
                            onChangeText={(e) => setSearch(e)}
                            style={{
                                backgroundColor: '#F0F0F0',
                                color: Theme.PRIMARY,
                                width: '80%'
                            }}
                        />
                    </View>
                    <RectButton style={{
                        padding: 10,
                        backgroundColor: '#f0f0f0',
                        borderRadius: 5
                    }} onPress={() => setFilter({ value: true, time: false })}>
                        <Icon name='filter-list' color={Theme.PRIMARY} size={30} />
                    </RectButton>
                    <RectButton style={{
                        padding: 10,
                        backgroundColor: '#f0f0f0',
                        borderRadius: 5
                    }} onPress={async () => {
                        let teste = selectAll;
                        setSelectAll(!teste);
                        setCobrancas(!teste ? data : []);
                    }}>
                        <Icon
                            name={data.length > 0 && data.length === cobrancas.length ?
                                'remove-done' : selectAll && cobrancas.length > 0 ? 'remove-done'
                                    : 'select-all'}
                            color={Theme.PRIMARY} size={30} />
                    </RectButton>
                </View>
                <View style={styles.conteiner}>
                    {
                        search.length > 0 && (data.map((e) => {
                            return e.loja_fantasia.toUpperCase().includes(search.toUpperCase())
                        })).filter((item) => item).length === 0 ?
                            <View style={styles.animationsView}>
                                <LottieView
                                    style={{ width: 80 }}
                                    autoPlay
                                    loop={true}
                                    source={require('../../assets/animations/not-found.json')}
                                />
                                <Text style={{
                                    color: Theme.SECONDARY,
                                    fontWeight: '700'
                                }}>A pesquisa não retornou resultados.</Text>
                            </View>
                            :
                            erro ?
                                <View style={styles.animationsView}>
                                    <LottieView
                                        style={{ width: 100, }}
                                        autoPlay
                                        loop={false}
                                        source={require('../../assets/animations/error.json')}
                                    />
                                    <Text style={{
                                        color: Theme.PRIMARY,
                                        fontWeight: '700'
                                    }}>Não foi possivel se conectar ao serviço</Text>
                                </View> :
                                loading ?
                                    <View style={{
                                        width: '100%',
                                        height: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <LottieView
                                            style={{ width: 80 }}
                                            autoPlay
                                            loop={true}
                                            source={require('../../assets/animations/loading-money.json')}
                                        />
                                    </View> :
                                    <FlatList
                                        ListFooterComponent={<View style={{ height: dimens.height * .35 }}></View>}
                                        showsVerticalScrollIndicator={false}
                                        style={{
                                            height: '80%'
                                        }}
                                        data={data}
                                        onEndReachedThreshold={0.1}
                                        onEndReached={() => {
                                            if (canSend && page.total > page.actual && data.length > 14) {
                                                setLoadingMore(true);
                                            }
                                        }}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={styles.loading}>
                                                    <LottieView
                                                        style={{ width: 80 }}
                                                        autoPlay
                                                        loop={false}
                                                        source={require('../../assets/animations/empty-item.json')}
                                                    />
                                                    <Text style={{ color: Theme.SECONDARY }}>Nenhum registro encontrado.</Text>
                                                </View>
                                            )
                                        }
                                        }
                                        ListFooterComponent={renderFooter}
                                        keyExtractor={(item, index) => `${index}`}
                                        renderItem={(cobrancas) => {
                                            if (search.length > 0 && !(cobrancas.item.loja_fantasia.toUpperCase().includes(search.toUpperCase()))) {

                                                return undefined;
                                            }
                                            return (
                                                <SliderButton data={cobrancas.item} onlyCharge={e => setOnlyCharge(e)} />
                                            )
                                        }

                                        }
                                    />
                    }
                </View>
            </View>
            <View>
                {
                    !loading && !erro &&
                    <DrawerList onHendle={() => setModalPay(true)} onlyCharge={onlyCharge} hidden={filter.value} />

                }
            </View>
            <Modal transparent visible={(payment.loja_fantasia || modalPay ? true : false)} animationType='fade'>
                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#00000050',
                    padding: 20,
                    position: 'absolute'
                }}>
                    <View style={{
                        backgroundColor: Theme.WHITE,
                        padding: 20,
                        borderRadius: 10
                    }}>
                        {
                            payment.loja_fantasia &&
                            <Card payment={payment} />
                        }
                        <ModalPayment
                            onClose={() => {
                                setPayment({})
                                setModalPay(false)
                            }}
                            onHandle={() => makePaid()}
                            paymentLoading={paymentLoading}
                            setCheckboxes={(e) => setCheckboxes(e)}
                            checkboxes={checkboxes}
                        />
                    </View>
                </View>
            </Modal>
            <Confirmation modal={modal} setModal={setModal} />
            <ModalBottom visible={filter.value} onHandle={(e) => {
                setFilter({ value: false })
            }}>
                <ScrollView style={{
                    width: '100%',
                    padding: 10
                }}>
                    <View style={{
                        width: '100%',
                        marginTop: 20,
                        borderBottomWidth: 1
                    }
                    }>
                        <Text style={styles.filterText}>Filtrar por...</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        marginTop: 20
                    }}>
                        <View style={styles.filterAreaBtns}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.filtersName}>Ano:</Text>
                                <View style={styles.filterPicker}>
                                    <Picker
                                        dropdownIconColor={Theme.BLACK}
                                        mode='dropdown'
                                        style={{ width: '100%', color: Theme.BLACK, }}
                                        selectedValue={filters.year}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setFilters({ ...filters, year: itemValue })
                                        }>
                                        <Picker.Item label="2021" value="2021" />
                                        <Picker.Item label="2022" value="2022" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={[styles.filterAreaBtns, { width: '100%' }]}>
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.filtersName}>Situação:</Text>
                                    <View style={styles.filterPicker}>
                                        <Picker
                                            dropdownIconColor={Theme.BLACK}
                                            mode='dropdown'
                                            style={{ width: '100%', color: Theme.BLACK }}
                                            selectedValue={filters.status}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setFilters({ ...filters, status: itemValue })
                                            }>
                                            <Picker.Item label="TODAS" value={"NAO PAGA,ABERTA"} />
                                            <Picker.Item label="Não pagas" value="NAO PAGA" />
                                            <Picker.Item label="Abertas" value="ABERTA" />
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        marginTop: 20,
                    }}>

                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            padding: 20
                        }}>
                            <View style={{
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: Theme.PRIMARY
                            }}>
                                <TouchableOpacity onPress={() => {
                                    setFilter({ value: false })
                                    getCobrancas(1, 15)
                                }} style={{
                                    paddingHorizontal: 50,
                                    paddingVertical: 10
                                }}>
                                    <Text style={{ color: Theme.PRIMARY }}>Filtrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ModalBottom>
        </SafeAreaView>
    )
}

export default Invoices;
