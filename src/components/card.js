import React, { useEffect, useState } from "react";
import {
    Text,
    View
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './cardStyles';
import Theme from "../../theme";
import { toCashBR, convertDate, Apps } from '../../functools';
const Card = ({ payment }) => {

    return (
        <View style={styles.card}>
            <View style={styles.rigthDetail} />
            <View style={styles.gridContainer}>   
                <FontAwesome name={'barcode'} color={Theme.BLACK} size={45} />
                <View style={{ width: '5%' }}>
                </View>
                <View style={{ width: '80%' }}>
                    <View style={styles.infonMain}>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.infoText}>
                                {payment && payment.app ? Apps.map(r => { return r.app === payment.app && r.name }) 
                                : 'Força de vendas'}
                                </Text>
                        </View>
                        <View style={styles.infoGrid}>
                            <Text style={[styles.infoText, { color: Theme.PRIMARY }]}>
                                {payment && toCashBR(payment.valor ? payment.valor : 0)}
                                </Text>
                            <Icon name='chevron-right' color={'#DFDFDF'} size={25} />
                        </View>
                    </View>
                    <View style={styles.separetor}></View>
                    <View style={styles.infoGrid2}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.infoText}>{payment && payment.loja_fantasia ? 
                            'Nome fantasia' : "Metodo de pagamento"
                            }</Text>
                            <Text style={styles.subInf}>{payment ? payment.loja_fantasia ? 
                            payment.loja_fantasia : payment.metodo_pagamento : ''
                            }</Text>
                        </View>
                        <View style={{ width: '48%', alignItems: 'flex-end' }}>
                            <Text style={styles.infoText}>Vencimento</Text>
                            <Text style={styles.subInf}>{
                            payment && convertDate(new Date(payment.vence_em), 'date')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.leftDetail} />
        </View>

    )
}

export default Card;
