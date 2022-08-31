import React, { useState, useRef } from "react";
import {
    FlatList, Text, View, Animated, Modal, TouchableOpacity, Image, ScrollView, Alert, SafeAreaView,
    Platform,
    StyleSheet,
    StatusBar,
    Dimensions
} from "react-native";
import Theme from "../../../theme";
import styles from "./styles";
import { toCashBR, convertDate, getLegibleDate, cpfMask, cnpjMask } from '../../../functools';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImgRotta from '../../assets/img/logo-hotline.png';

import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { SpringScrollView } from "react-native-spring-scrollview";
import { useNavigation } from '@react-navigation/native';
import usePayment from "../../contexts/payments";
const Comprovante = () => {
    const { comprovante} = usePayment()
    const { goBack } = useNavigation()
    const viewRef = useRef();




    const shareImage = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });
            console.log('uri', uri);
            const shareResponse = await Share.open({ url: uri });
            console.log('shareResponse', shareResponse);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={styles.btnHeader}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon 
                        name='close' 
                        color={Theme.SECONDARY} 
                        size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={shareImage}>
                        <Icon
                         name='share' 
                         color={Theme.SECONDARY} 
                         size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ overflow: 'hidden' }}>
                <SpringScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{ 
                        backgroundColor: '#fff',
                        }}
                    showsVerticalScrollIndicator={false}    
                    >
                    <View style={styles.body}>
                        <View 
                        style={{ backgroundColor: '#fff', }} 
                        ref={viewRef}>
                            <ScrollView 
                            contentInsetAdjustmentBehavior="automatic" >
                                <View 
                                style={{ padding: 20 }}>
                                    <Image 
                                    source={ImgRotta} 
                                    style={{ width: 100, height: 55, opacity: .5 }} 
                                    resizeMode='stretch' 
                                    />
                                </View>
                                <View style={{ 
                                    width: '100%',  
                                    padding: 20
                                     }}>
                                    <View>
                                        <Text 
                                        style={{ 
                                            color: '#000', 
                                            fontWeight: '500', 
                                            fontSize: 30 
                                        }} 
                                        onPress={shareImage}
                                        >Comprovante de transferência</Text>
                                        <Text 
                                        style={{ 
                                            color: Theme.SECONDARY, 
                                            fontWeight: '500', 
                                            fontSize: 18 
                                            }}>{comprovante && getLegibleDate( new Date(comprovante.pago_em),'date')}</Text>
                                    </View>
                                    <View style={styles.compravanteInfoGrid}>
                                        <Text style={styles.compravanteInfoGridText}>Valor</Text>
                                        <Text style={[styles.compravanteInfoGridText, 
                                            { color: Theme.SECONDARY }
                                            ]}
                                            >{comprovante && toCashBR(comprovante.valor ? comprovante.valor : 0)}</Text>
                                    </View>
                                    <View style={styles.compravanteInfoGrid}>
                                        <Text style={styles.compravanteInfoGridText}>Tipo de transferência</Text>
                                        <Text style={[styles.compravanteInfoGridText, { color: Theme.SECONDARY }]}>{comprovante && comprovante.metodo_pagamento}</Text>
                                    </View>
                                    <View style={[styles.compravanteInfoGrid, { borderTopWidth: 1, borderBottomWidth: 1, borderColor: Theme.SECONDARY }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name='logout' color={'#000'} size={20} />
                                            <Text style={[styles.compravanteInfoGridText, { marginLeft: 10 }]}>Origem</Text>
                                        </View>
                                    </View>
                                    <View style={styles.compravanteInfoGrid}>
                                        <Text style={styles.compravanteInfoGridText}>Nome</Text>
                                        <Text style={[styles.compravanteInfoGridText, { color: Theme.SECONDARY }]}>{comprovante && comprovante.revenda_fantasia}</Text>
                                    </View>
                                    <View style={styles.compravanteInfoGrid}>
                                        <Text style={styles.compravanteInfoGridText}>CPF/CNPJ</Text>
                                        <Text style={[styles.compravanteInfoGridText, { color: Theme.SECONDARY }]}>{comprovante && comprovante.revenda_cpf_cnpj.length > 13 ? 
                                        cnpjMask(comprovante.revenda_cpf_cnpj) : cpfMask(comprovante.revenda_cpf_cnpj)}</Text>
                                    </View>   
                                    <View style={[
                                        styles.compravanteInfoGrid, 
                                        { borderTopWidth: 1, borderBottomWidth: 1, borderColor: Theme.SECONDARY }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name='login' color={'#000'} size={20} />
                                            <Text style={[styles.compravanteInfoGridText, { marginLeft: 10 }]}>Destino</Text>

                                        </View>
                                    </View>
                                    <View style={styles.compravanteInfoGrid}>
                                        <Text style={styles.compravanteInfoGridText}>Nome</Text>
                                        <Text style={[styles.compravanteInfoGridText, 
                                            { color: Theme.SECONDARY }]}>Hotline tecnologia</Text>
                                    </View>
                                    <View style={styles.compravanteInfoGrid}>
                                        <Text style={styles.compravanteInfoGridText}>CPF/CNPJ</Text>
                                        <Text style={[styles.compravanteInfoGridText, { color: Theme.SECONDARY }]}>00.428.414/0001-16</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: Theme.SECONDARY + 30, marginTop: 50, height: 200, padding: 20 }}>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#000' }}>HOTLINE TECNOLOGIA EM SISTEMAS LTDA</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#000' }}>CNPJ 00.428.414/0001-16</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ height: 100   }} />
                </SpringScrollView>
                </View>
            </View>
        </>
    );
};


export default Comprovante;