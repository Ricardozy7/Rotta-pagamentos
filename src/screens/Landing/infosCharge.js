import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions 
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

import Theme from '../../../theme';
import { 
    toCashBR, 
    getLegibleDate, 
    cnpjMask, 
    cpfMask, 
    Apps 
} from "../../../functools";
  
const InfosCharge = ({ infosDetails }) => {

    return (
        <ScrollView
            style={{ height: Dimensions.get('window').height * .7 }}
        >

            <View style={styles.box}
                key={infosDetails && infosDetails.cobrancas.map(e => { return e.id })}>
                {infosDetails && infosDetails.cobrancas.map((e) => {
                    return (
                        <View
                            key={e.id}
                            style={{ borderBottomWidth: 1 }}>
                            <Text
                                tyle={styles.text}>{e.nome_fantasia}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    marginTop: 15
                                }}>
                                <View>
                                    <Text
                                        style={[styles.Infostitles, { fontWeight: '600' }]}>ID:</Text>
                                    <Text
                                        style={[styles.Infostitles]}>{e.id}</Text>
                                </View>
                                <View>
                                    <Text
                                        style={[styles.Infostitles,
                                        {
                                            fontWeight: '600'
                                        }]}>CPF/CNPJ:</Text>
                                    <Text
                                        style={[styles.Infostitles]}>{e.cpf_cnpj.length > 13 ? cnpjMask(e.cpf_cnpj) : cpfMask(e.cpf_cnpj)}</Text>
                                </View>
                                <View >
                                    <Text
                                        style={[styles.Infostitles, {
                                            fontWeight: '600'
                                        }]}>VALOR:</Text>
                                    <Text
                                        style={[styles.Infostitles]}>{toCashBR(e.valor ? e.valor : 0)}</Text>
                                </View>
                                <Text
                                    style={[styles.Infostitles,
                                    {
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        backgroundColor: Apps.filter(r => { return r.app === e.app })[0].color,
                                        borderRadius: 5,
                                        color: '#fff',
                                        fontSize: 10

                                    }]
                                    }>{Apps.map(r => { return r.app === e.app && r.name })}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    marginTop: 10
                                }}>
                                <View style={{ width: '65%' }}>
                                    <Text
                                        style={[styles.Infostitles, {
                                            fontWeight: '600'
                                        }]}>Razão social:</Text>
                                    <Text
                                        style={[styles.Infostitles]}>{e.razao_social}</Text>
                                </View>
                                <View>
                                    <Text
                                        style={[styles.Infostitles, {
                                            fontWeight: '600'
                                        }]}>Vencimento:</Text>
                                    <Text
                                        style={[styles.Infostitles]}>{getLegibleDate(new Date(e.vence_em))}</Text>
                                </View>
                            </View>
                        </View>

                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        height: '100%',
        // elevation: 10,
        padding: 10,
        borderTopStartRadius: 20,
        borderTopRightRadius: 20
    },
    text: {
        color: Theme.TEXT,
        fontWeight: '600',
        fontSize: 15
    },
    Infostitles: {
        color: Theme.TEXT,
        fontSize: 12

    },
    header: {
        alignItems: 'center',
        padding: 10,
    },
    MainText: {
        textAlign: 'center',
        color: Theme.PRIMARY,
        fontWeight: '600'
    },
})

export default InfosCharge;