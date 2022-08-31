import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Animated,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import { SpringScrollView } from "react-native-spring-scrollview";

import Theme from "../../../theme";
import styles from "./styles";

import Header from "../../components/Header";
import { RemoteServices } from '../../services';
import { toCashBR, convertDate } from '../../../functools';
import usePayment from '../../contexts/payments';
import Accordian from "../../components/Accordion";
import ModalBottom from "../../components/modalBottom";
import { NormalFooter } from '../../components/LoadingFooter';

const PaymentHistory = () => {
    const { navigate } = useNavigation()
    const { setPayment, setComprovante } = usePayment()
    const { } = usePayment()

    const [data, setData] = useState([])
    const [prevData, setPrevData] = useState([])
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(true)
    const [erro, setEror] = useState(false)
    const [filter, setFilter] = useState(false);
    const translateY = new Animated.Value(0);
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState({ total: 0, actual: 0 });
    const [scrollNumber] = useState(8)

    const [filters, setFilters] = useState({
        status: "AGUARDANDO,PAGO,NAO PAGO,CANCELADO",
        year: "2021"
    })
    let _scrollRef = [];
    for (let i = 0; i < scrollNumber; ++i) {
        _scrollRef.push(React.createRef());
    }


    function addData(value) {
        const newData = [...data, ...value];
        setData(newData);
    }

    const getCobrancas = async (page = 0, limit, status, yaer) => {
        if (page === 1) {
            setLoading(true)
        }
        RemoteServices.Cobrancas.Payments({ status: filters.status, page: page, limit: limit, ano: filters.year }).then((response) => {
            if (response.error) {
                setEror(true)
            }
            if (response.pagamentos) {
                setPrevData(response.pagamentos);
                if (page === 1) {
                    setData(response.pagamentos);
                } else {
                    addData(response.pagamentos);
                }
                if (response.pagamentos) {
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
        }).catch((err) => {
            setEror(true)
            setLoading(false)
        }).finally(() => {
            setLoading(false)
            setLoadingMore(false);
        })
    }
    useEffect(() => {
        getCobrancas(page.actual + 1, page.actual + 1 * 15)
        if (!loadingMore) {
            try {
                _scrollRef.endLoading();
            } catch (err) {

            }
        }
    }, [loadingMore])
    const onHandlerStateChange = (event) => {
        active ?
            Animated.timing(translateY, {
                toValue: 500,
                duration: 350,
                useNativeDriver: true,
            }).start()
            :
            Animated.timing(translateY, {
                toValue: 0,
                duration: 350,
                useNativeDriver: true,
            }).start()
        setTimeout(() => {

        }, 500)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Theme.PRIMARY }}>
            <Header name='Histórico de pagamentos' children={
                <View style={{ 
                    borderWidth: 1, 
                    borderColor:  Theme.WHITE, 
                    borderRadius: 5, 
                    zIndex: 10 
                    }}>
                    <RectButton style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 5,

                    }} onPress={() => {
                        setFilter(true);
                        console.log('asd')
                    }}>
                        <Icon name='filter-list' size={17} color={Theme.WHITE} />
                        <Text style={{ 
                            color: Theme.WHITE, 
                            fontSize: 13 
                            }}>Filtrar</Text>
                    </RectButton>
                </View>
            } />
            <View style={{ 
                padding: 20, 
                overflow: 'hidden',
                 backgroundColor: Theme.WHITE 
                 }}>
                {
                    erro ?
                        <View style={styles.animationsView}>
                            <LottieView
                                style={{ width: 100 }}
                                autoPlay
                                loop={false}
                                source={require('../../assets/animations/error.json')}
                            />
                            <Text style={{ color: Theme.PRIMARY, fontWeight: '700' }}>Não foi possivel se conectar ao serviço</Text>
                        </View> :
                        loading && !loadingMore ?
                            <View style={styles.animationsView}>
                                <LottieView
                                    style={{ width: 80 }}
                                    autoPlay
                                    loop={true}
                                    source={require('../../assets/animations/loading-money.json')}
                                />
                            </View>
                            :
                            data.length === 0 ?
                                <View style={styles.animationsView}>
                                    <LottieView
                                        style={{ width: 80 }}
                                        autoPlay
                                        loop={false}
                                        source={require('../../assets/animations/empty-item.json')}
                                    />
                                    <Text style={{ color: Theme.SECONDARY }}>Nenhum registro encontrado.</Text>

                                </View> :
                                <SpringScrollView
                                    style={{
                                        backgroundColor: '#fff',
                                        height: '95%'
                                    }}
                                    ref={ref => (_scrollRef = ref)}
                                    loadingFooter={NormalFooter}
                                    onLoading={() => {

                                        if (page.total > page.actual && data.length > 14 && prevData.length > 0) {
                                            setLoadingMore(true);
                                        }
                                        if (prevData.length === 0) {
                                            _scrollRef.endLoading();
                                        }
                                    }}
                                    showsVerticalScrollIndicator={false}>

                                    {
                                        data.map((cobrancas) => {
                                            return (
                                                <View style={styles.card} key={cobrancas.pagamento_id}>
                                                    <View style={styles.gridContainer}>
                                                        <View style={{ width: '100%', justifyContent: 'space-around' }}>
                                                            <Accordian children={
                                                                <View style={styles.infonMain} onPress={() => onHandlerStateChange()}>
                                                                    <View>
                                                                        <Text style={styles.infoText}>Pagamento #{cobrancas.pagamento_id}</Text>
                                                                    </View>
                                                                    <View style={styles.infoGrid}>
                                                                        <Text style={[styles.infoText, { color: Theme.PRIMARY, marginRight: 15 }]}>{toCashBR(cobrancas.valor ? cobrancas.valor : 0)}</Text>

                                                                    </View>
                                                                </View>

                                                            }

                                                                data={
                                                                    <View style={[styles.infoGrid2, {

                                                                    }]}>
                                                                        <View>
                                                                            <Text style={styles.infoText}>Gerada</Text>
                                                                            <Text style={styles.subInf}>{convertDate(new Date(cobrancas.criado_em), 'date')}</Text>
                                                                            <Text style={[styles.infoText, { marginTop: 10 }]}>Data de pagamento</Text>
                                                                            <Text style={styles.subInf}>{cobrancas.pago_em ? convertDate(new Date(cobrancas.pago_em), 'date') : '-'}</Text>
                                                                            <Text style={[styles.infoText, { marginTop: 10 }]}>Método de pagamento</Text>
                                                                            <Text style={styles.subInf}>{cobrancas.metodo_pagamento}</Text>
                                                                        </View>
                                                                        <View >
                                                                            <View>
                                                                                <Text style={styles.infoText}>Vencimento</Text>
                                                                                <Text style={styles.subInf}>{cobrancas.vence_em ? convertDate(new Date(cobrancas.vence_em), 'date') : '-'}</Text>
                                                                            </View>
                                                                            <View>
                                                                                <Text style={[styles.infoText, { marginTop: 10 }]}>Situação</Text>
                                                                                <Text style={styles.subInf}>{cobrancas.status}</Text>
                                                                            </View>
                                                                            {
                                                                                cobrancas.status === 'PAGO' &&
                                                                                <RectButton style={{ padding: 10, backgroundColor: '#F0F0F0', borderRadius: 30, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
                                                                                    onPress={() => {
                                                                                        setComprovante(cobrancas)
                                                                                        navigate('Comprovante')
                                                                                    }}
                                                                                >
                                                                                    <Icon name='description' color='#000' size={20} />
                                                                                    <Text style={styles.infoText}>Ver comprovante</Text>
                                                                                </RectButton>
                                                                            }

                                                                        </View>

                                                                    </View>
                                                                }
                                                            />


                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }

                                </SpringScrollView>
                }

            </View>
            <ModalBottom visible={filter} onHandle={setFilter}>
                <ScrollView>
                    <View style={{ width: '100%', marginTop: 20, borderBottomWidth: 1 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 20, marginBottom: 10 }}>Filtrar por...</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 20, }}>
                        <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '100%' }}>
                                <Text style={{ color: '#000', fontWeight: '600' }}>Ano:</Text>
                                <View style={{ borderRadius: 5, backgroundColor: Theme.SECONDARY + '20', width: '90%' }}>
                                    <Picker
                                        dropdownIconColor='#000'
                                        mode='dropdown'
                                        style={{ width: '100%', color: '#000', }}
                                        selectedValue={filters.year}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setFilters({ ...filters, year: itemValue })
                                        }>
                                        <Picker.Item label="2021" value="2021" />
                                        <Picker.Item label="2022" value="2022" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={{ color: '#000', fontWeight: '600' }}>Situação:</Text>
                                    <View style={{ borderRadius: 5, backgroundColor: Theme.SECONDARY + '20', width: '90%' }}>
                                        <Picker
                                            dropdownIconColor='#000'
                                            mode='dropdown'
                                            style={{ width: '100%', color: '#000', }}
                                            selectedValue={filters.status}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setFilters({ ...filters, status: itemValue })
                                            }>
                                            <Picker.Item label="TODAS" value={null} />
                                            <Picker.Item label="Pagas" value="PAGO" />
                                            <Picker.Item label="Canceladas" value="CANCELADO" />
                                            <Picker.Item label="Não pagas" value="NAO PAGA" />
                                            <Picker.Item label="Aguardando" value="AGUARDANDO" />

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
                                    setFilter(false)
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
        </View >
    )
}

export default PaymentHistory;
