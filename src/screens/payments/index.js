import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from "react-native-snackbar";

import styles from './styles';
import Theme from "../../../theme";

import Header from "../../components/Header";
import { RemoteServices } from '../../services/index';
import {toCashBR, convertDate} from '../../../functools';
import LoadingModal from "../../components/loading";

const CountsToReceive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const getCobrancas = async () => {
        setLoading(true)
        RemoteServices.Cobrancas.Payments({ status: 'AGUARDANDO'}).then((response) => {
            if(response.error){
                Snackbar.show({
                    text: e.error,
                    duration: Snackbar.LENGTH_LONG,
                    textColor: "#fff",
                    backgroundColor: Theme.ERROR,
                });
            }
            if(response.pagamentos){
               setData(response.pagamentos) 
            }
            setLoading(false)
        }).catch((e) => {
            Snackbar.show({
                text: 'Error',
                duration: Snackbar.LENGTH_LONG,
                textColor: "#fff",
                backgroundColor: Theme.ERROR,
            });
            setLoading(false)
        }).then(() => setLoading(false))
    }
    useEffect(() =>{
        getCobrancas()
    },[])
    return (
        <View style={styles.mainContainer}>
            <Header name='faturas'/>
            <View style={{ 
                height:1, 
                width: '100%', 
                backgroundColor: '#fff',
                elevation: 20, 
                shadowColor: '#000'
            }}/>
            {
                !loading ?
                <FlatList
                style={{
                    backgroundColor: '#f9f9f9'
                }}
                data={data}
                keyExtractor={(item, index) => `${index}`}
                renderItem={(pagamentos) => (
                    <View style={styles.cardsBorder}>
                        <RectButton style={{
                            flexDirection: 'row',
                            width: '100%'
                        }} onPress={() =>{ 
                        }}>
                        <View style={styles.square}>
                            <FontAwesome name={'barcode'} size={30} color='#000'/>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={styles.row}>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>VENCIMENTO</Text>
                                    <Text
                                        style={styles.info}>{convertDate(new Date(pagamentos.item.vence_em),'date')}</Text>
                                </View>
                                <View style={styles.vr} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>VALOR</Text>
                                    <Text style={styles.info}>{pagamentos.item.valor && toCashBR(pagamentos.item.valor)}</Text>
                                </View>
                            </View>
                            <View style={styles.hr} />
                            <View style={styles.row}>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>{pagamentos.item.loja_fantasia}</Text>
                                </View>
                                <View style={styles.vr} />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    width: 100
                                }}>
                                    <View style={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: 3,
                                        backgroundColor: pagamentos.item.status === 'ABERTA' ? 
                                        Theme.FACEBOOK :(pagamentos.item.status === 'PAGA' ? Theme.SUCCESS :
                                        ( pagamentos.item.status === 'AGUARDANDO' ? Theme.WARNING :Theme.ERROR)),
                                        marginRight: 3,
                                    }} />
                                        <Text style={[styles.status, {
                                            color:  pagamentos.item.status === 'ABERTA' ? Theme.FACEBOOK :
                                            (pagamentos.item.status === 'PAGA' ? Theme.SUCCESS :
                                            ( pagamentos.item.status === 'AGUARDANDO' ? Theme.WARNING :Theme.ERROR)),
                                        }]}>{pagamentos.item.status}</Text>
                                    
                                </View>
                            </View>
                        </View>
                        </RectButton>
                    </View>
                )}
            />
            :
            <LoadingModal />
            }
             
        </View>
    )
}
const now = new Date();

export default CountsToReceive;
