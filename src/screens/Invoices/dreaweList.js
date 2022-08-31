import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Text,
    View
} from 'react-native';
import { FlatList, PanGestureHandler, State } from 'react-native-gesture-handler';

import Theme from '../../../theme';
import { RectButton } from 'react-native-gesture-handler';
import usePayment from '../../contexts/payments';
import styles from './styles';
import {
    toCashBR,
    getLegibleDate,
    cnpjMask,
    cpfMask,
    Apps
} from '../../../functools';

const dim = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };


const DrawerList = ({ products, workOrder, children, onHendle, onlyCharge, hidden }) => {
    const { cobrancas } = usePayment()
    const [animationHeigth] = useState(new Animated.Value(dim.height * .17));
    const [total, setTotal] = useState(0);

    function onHandlerStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            console.log(event.nativeEvent.oldState)
            const { translationY } = event.nativeEvent;
            if (translationY < -1) {

                Animated.timing(animationHeigth, { toValue: dim.height * 0.5, duration: 500, useNativeDriver: false }).start();

            }
            if (translationY > 1) {

                Animated.timing(animationHeigth, { toValue: dim.height * 0.17, duration: 500, useNativeDriver: false }).start();

            }
        }
    }
    useEffect(() => {
        const teste = []
        cobrancas.forEach(element => {
            teste.push(element.valor)
        });

        setTotal(parseFloat(teste.reduce((currentTotal, currentElement) => currentTotal + currentElement, 0)))
    }, [cobrancas])
    useEffect(() => {
        if (hidden)
            Animated.timing(animationHeigth, { toValue: dim.height * 0, duration: 500, useNativeDriver: false }).start();
        setTimeout(() => {
            if (!hidden)
                Animated.timing(animationHeigth, { toValue: dim.height * .17, duration: 500, useNativeDriver: false }).start();
        }, 500)

    }, [hidden])
    useEffect(() => {
        console.log(onlyCharge)
        if (onlyCharge.length === 1) {
            setTotal(onlyCharge[0].valor)
            Animated.timing(animationHeigth, { toValue: dim.height * 0.5, duration: 500, useNativeDriver: false }).start();
        }
    }, [onlyCharge])

    return (
        <PanGestureHandler
            onHandlerStateChange={onHandlerStateChange}
        >
            <Animated.View style={{
                backgroundColor: '#00000010',
                borderRadius: 15,
                width: '100%',
                height: animationHeigth,
                position: 'absolute',
                left: 0,
                bottom: 0,
                elevation: 10,
                overflow: 'hidden',
                justifyContent: 'flex-end'
            }}>
                <View style={{ height: '100%' }}>
                    <View style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20,
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        height: dim.height * .17

                    }}>
                        <View style={{
                            width: '25%',
                            height: 5,
                            backgroundColor: Theme.SECONDARY,
                            borderRadius: 10
                        }} />
                        <View style={[
                            styles.infonMain,
                            { width: '100%', backgroundColor: '#fff' }
                        ]}>
                            <Text style={{
                                color: '#000',
                                fontSize: 21,
                                fontWeight: '700'
                            }}>Total:</Text>
                            <Text
                                style={{
                                    color: Theme.PRIMARY,
                                    fontSize: 21,
                                    fontWeight: '700'
                                }}>{toCashBR(total ? total : 0)}</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#DFDFDF',
                            borderRadius: 10
                        }} />
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                top: 3
                            }}>
                            <RectButton style={{
                                padding: 10,
                                backgroundColor: Theme.SECONDARY + '25',
                                borderRadius: 5,
                                width: '30%'
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: Theme.PRIMARY,
                                    fontWeight: '700'
                                }} onPress={onHendle}>PAGAR</Text>
                            </RectButton>
                        </View>
                    </View>
                    {
                        <FlatList
                            style={{
                                backgroundColor: '#fff',
                                height: '70%'
                            }}
                            data={onlyCharge.length === 1 ? onlyCharge : cobrancas}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={(cobrancas) => {
                                return (
                                    <>
                                        <View>
                                            <View style={[{
                                                width: '100%', 
                                                padding: 10 
                                                }]}>
                                                <View style={{ 
                                                    flexDirection: 'row', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between' 
                                                    }}>
                                                    <View style={{ 
                                                        flexDirection: 'row', 
                                                        alignItems: 'center', 
                                                        }}>
                                                        <Text style={{ 
                                                            color: '#000', 
                                                            fontSize: 14, 
                                                            fontWeight: '700' 
                                                            }}>{cobrancas.item.loja_fantasia && cobrancas.item.loja_fantasia}</Text>
                                                        <Text 
                                                        style={{ 
                                                            color: Theme.SECONDARY, 
                                                            fontSize: 10
                                                            }}> (detalhes da fatura)</Text>
                                                    </View>

                                                </View>
                                            </View>
                                            <View style={{ 
                                                flexDirection: 'row', 
                                                width: '100%', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center', 
                                                padding: 10 
                                                }}>
                                                <View>
                                                    <Text style={styles.text}>ID</Text>
                                                    <Text style={{ 
                                                        color: '#000', 
                                                        fontSize: 12 
                                                        }}>{cobrancas.item.cobranca_id && cobrancas.item.cobranca_id}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.text}>CNPJ/CPF</Text>
                                                    <Text style={{ 
                                                        color: '#000', 
                                                        fontSize: 12 
                                                    }}>{cobrancas.item.loja_cpf_cnpj &&
                                                        cobrancas.item.loja_cpf_cnpj.length > 13 ? cnpjMask(cobrancas.item.loja_cpf_cnpj) :
                                                        cpfMask(cobrancas.item.loja_cpf_cnpj ? cobrancas.item.loja_cpf_cnpj : '00000000000')
                                                    }</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.text}>VALOR</Text>
                                                    <Text style={{ 
                                                        color: '#000', 
                                                        fontSize: 12 
                                                        }}>{toCashBR(cobrancas.item.valor ? cobrancas.item.valor : 0)}</Text>
                                                </View>
                                                <Text
                                                    style={{
                                                        color: '#fff', 
                                                        fontSize: 11, 
                                                        padding: 7,
                                                         backgroundColor: Apps.filter(r => {
                                                            return r.app === cobrancas.item.app ?
                                                                cobrancas.item.app : 'null'
                                                        })[0].color, borderRadius: 5
                                                    }}>
                                                    {Apps.map(r => { return r.app === cobrancas.item.app && r.name })}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ 
                                            flexDirection: 'row', 
                                            width: '100%', 
                                            justifyContent: 'space-between', 
                                            paddingHorizontal: 10, 
                                            borderBottomWidth: 1, 
                                            borderColor: Theme.SECONDARY 
                                            }}>
                                            <View style={{ width: '68%' }}>
                                                <Text style={styles.text}>Razão social:</Text>
                                                <Text style={{ 
                                                    color: '#000', 
                                                    fontSize: 12 
                                                    }}>{cobrancas.item.loja_razao_social && cobrancas.item.loja_razao_social}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.text}>Vencimento:</Text>
                                                <Text style={{ 
                                                    color: '#000', 
                                                    fontSize: 12 
                                                    }}>{cobrancas.item.vence_em && getLegibleDate(new Date(cobrancas.item.vence_em))}</Text>
                                            </View>
                                        </View>

                                    </>
                                )
                            }

                            }
                        />
                    }
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
}

export default DrawerList;