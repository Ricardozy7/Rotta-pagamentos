import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    Modal,
    TouchableOpacity,
    StyleSheet,
    NativeModules,
    LogBox,
    PermissionsAndroid
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Snackbar from "react-native-snackbar";
import LottieView from 'lottie-react-native';
import { SpringScrollView } from "react-native-spring-scrollview";
import Clipboard from "@react-native-community/clipboard";
import RNFetchBlob from 'rn-fetch-blob';

import Theme from '../../../theme';
import usePayment from '../../contexts/payments';
import {
    toCashBR,
    getLegibleDate,
    cnpjMask,
    cpfMask
} from "../../../functools";
import ModalBottom from "../../components/modalBottom";
import InfosCharge from "./infosCharge";
LogBox.ignoreAllLogs()


const PaymentSuccessfull = (props) => {
    const { goBack, navigate, reset } = useNavigation();

    const { cobrancas, setCobrancas } = usePayment();
    const [moreInfos, setMoreInfos] = useState();

    const [makePay, setmakePay] = useState(false);
    const [makeOptions, setMakeOptions] = useState({
        qrCode: false, copy: false
    })

    const [date] = useState(new Date());
    const [pay, setPay] = useState(false);

    const [downloadPdf, setDownloadPdf] = useState(false);
    const [progress, setProgress] = useState(0)
    const [canNavigate, setCanNavigate] = useState(true);
    const [infosCobran, setInfosCobran] = useState({
        app: 0,
        id: 0,
        nome_fantasia: '',
        razao_social: '',
        valor: 0,
        criado_em: '',
        vence_em: '',
        metodo_pagamento: '',
        pagamento_id: 0,
        pago_em: '',
        payload: '',
        revenda_cpf_cnpj: '',
        revenda_fantasia: '',
        revenda_razao_social: '',
        revenda_id: '',
        status: '',
        uri: '',
        cobrancas: []

    });

    const animate = infosCobran && infosCobran.status === 'PAGO' ?
        require(`../../assets/animations/loading-success.json`) :
        infosCobran.status === 'CANCELADO' ?
            require(`../../assets/animations/mobile-warning.json`)
            :
            require(`../../assets/animations/about-app.json`);
    const AnimateBillet = downloadPdf ?
        require('../../assets/animations/download.json')
        :
        require('../../assets/animations/billet.json')

    const download = async ({ file }) => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        console.log(granted)

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Snackbar.show({
                text: 'Baixando arquivo pdf',
                duration: Snackbar.LENGTH_LONG,
                textColor: "#fff",
                backgroundColor: Theme.PRIMARY,
            });
            setDownloadPdf(true)
            const { config, fs } = RNFetchBlob
            let PdfDir = fs.dirs.DownloadDir
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    fileCache: false,
                    mime: 'application/pdf',
                    mediaScannable: true,
                    notification: true,
                    path: PdfDir + "/" + "BOLETO_ROTTA" + Math.floor(date.getTime() + date.getSeconds() / 2) + ".pdf",
                    description: 'Downloading BOLETO.'
                }
            }

            config(options)
                .fetch('GET', `${file}`, {
                    'Cache-Control': 'no-store'
                })
                .progress({ interval: 250 }, (received, total) => {
                    console.log('progress', received / total);
                })
                .then((res) => {
                    console.log(res)
                })
                .then(() => {
                    setDownloadPdf(false)
                    Snackbar.show({
                        text: 'Download concluido!',
                        duration: Snackbar.LENGTH_LONG,
                        textColor: "#fff",
                        backgroundColor: Theme.SUCCESS,
                    });
                }).catch(() => {
                    setDownloadPdf(false)
                    Snackbar.show({
                        text: 'Erro ao baixar pdf, tente novamente',
                        duration: Snackbar.LENGTH_LONG,
                        textColor: "#fff",
                        backgroundColor: Theme.ERROR,
                    });
                })
        } else {
            Snackbar.show({
                text: 'Forneça permissão ao aplicativo para prosseguir com o download',
                duration: Snackbar.LENGTH_LONG,
                textColor: "#fff",
                backgroundColor: Theme.ERROR,
            });
        }

    }
    useEffect(() => {
        cobrancas.length > 0 &&
            setInfosCobran(cobrancas[0])
        try {
            console.log(props.navigation.getState().routes[1].params)

        } catch (err) {
            return
        }
    }, [])

    useEffect(() => {
        console.log(progress)
    }, [progress])

    return (
        <View style={{
            backgroundColor: infosCobran && infosCobran.status === 'PAGO' ? Theme.PRIMARY :
                infosCobran.status === 'CANCELADO' ? Theme.ERROR : '#DF9317',
            flex: 1
        }}>

            <SpringScrollView
                contentStyle={styles.conteiner}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ position: 'absolute', zIndex: 10, }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("LandingPage")
                        }}
                        style={{
                            padding: 15,
                            marginTop: StatusBar.currentHeight
                        }}>
                        <Icon
                            name={'close'}
                            color={Theme.WHITE}
                            size={25} />
                    </TouchableOpacity>
                </View>

                <View style={{}}>

                    <View style={[
                        styles.header,
                        {
                            backgroundColor: infosCobran && infosCobran.status === 'PAGO' ? Theme.PRIMARY :
                                infosCobran.status === 'CANCELADO' ? Theme.ERROR : '#DF9317'
                        }]}>
                        <LottieView
                            style={{ width: 150 }}
                            autoPlay={true}
                            loop={infosCobran && infosCobran.status === 'AGUARDANDO' ? true : false}
                            source={animate}
                        />
                        <Text style={styles.MainText,
                        {
                            color: Theme.WHITE + 99
                        }}>{infosCobran && infosCobran.pago_em
                            && getLegibleDate(new Date(infosCobran.pago_em))}</Text>
                        <Text style={styles.MainText, {
                            marginTop: 10,
                            color: Theme.WHITE,
                            fontWeight: '600'
                        }}>{infosCobran && infosCobran.status === 'PAGO' ? 'Recebemos o seu pagamento, Obrigado!' :
                            infosCobran.status === 'CANCELADO' ? 'Pagamento cancelado'
                                : 'Pagamento Pendente'}</Text>
                    </View>


                    <View style={{ backgroundColor: Theme.WHITE }}>
                        <View style={{ padding: 20 }}>
                            <View style={styles.textGrid}>
                            </View>
                            {/* <View style={styles.textGrid}>
                                <Text style={styles.detailsText}>ID: </Text>
                                <Text style={styles.detailsText}>{infosCobran.pagamento_id} </Text>
                            </View> */}
                            <View style={styles.textGrid}>
                                <Text style={styles.detailsText}>CPF/CNPJ: </Text>
                                <Text style={styles.detailsText}>
                                    {infosCobran.revenda_cpf_cnpj && infosCobran.revenda_cpf_cnpj.length > 13 ?
                                        cnpjMask(infosCobran.revenda_cpf_cnpj) :
                                        cpfMask(infosCobran.revenda_cpf_cnpj ?
                                            infosCobran.revenda_cpf_cnpj :
                                            '00000000000'
                                        )} </Text>

                            </View>
                            <View style={styles.textGrid}>
                                <Text style={styles.detailsText}>VALOR: </Text>
                                <Text style={styles.detailsText}>
                                    {toCashBR(infosCobran.valor ? infosCobran.valor : 0)}
                                </Text>

                            </View>
                            <View style={styles.textGrid}>
                                <Text style={styles.detailsText}>
                                    Razão social:
                                </Text>
                                <Text style={styles.detailsText}>
                                    {infosCobran.revenda_razao_social}
                                </Text>

                            </View>
                            <View style={styles.textGrid}>
                                <Text style={styles.detailsText}>Vencimento: </Text>
                                <Text style={styles.detailsText}>
                                    {infosCobran.vence_em && getLegibleDate(new Date(infosCobran.vence_em))}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    padding: 20,
                    backgroundColor: '#fff'
                }}>
                    {
                        infosCobran &&
                        infosCobran.status !== 'PAGO' && infosCobran.status !== 'CANCELADO' &&
                        <RectButton style={[styles.btnMain,
                        {
                            backgroundColor: infosCobran && infosCobran.status === 'PAGO' ? Theme.PRIMARY : '#DF9317',
                            marginBottom: 10
                        }]} onPress={() => {
                            setPay(true)
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: '500',

                            }}>Pagar</Text>
                        </RectButton>
                    }

                    <RectButton style={[styles.btnMain, {
                        backgroundColor: infosCobran.status && infosCobran.status === 'PAGO' ? Theme.PRIMARY :
                            infosCobran.status === 'CANCELADO' ? Theme.ERROR : 'transparent'
                    }]} onPress={() => {
                        // setReload(!reload)
                        // setNetworkErro(!networkErro)
                        // navigate('Loading')
                        if (infosCobran && infosCobran.status === 'CANCELADO') {
                            navigate('Invoices')
                            setCanNavigate(false)
                            setCobrancas([])
                        } else {
                            setmakePay(infosCobran)
                            setMoreInfos(true)
                        }
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: infosCobran.status && infosCobran.status === 'PAGO' ?
                                Theme.WHITE : infosCobran.status === 'CANCELADO' ? Theme.WHITE : '#DF9317',
                            fontWeight: '500'
                        }}>{
                                infosCobran.status && infosCobran.status === 'CANCELADO' ?
                                    'Nova Fatura' : 'Detalhes'
                            }</Text>
                    </RectButton>
                </View>
            </SpringScrollView>
            <ModalBottom
                visible={moreInfos}
                onHandle={(e) => {
                    setMoreInfos(e)
                }}>
                <InfosCharge
                    infosDetails={makePay}
                    visible={moreInfos}
                />
            </ModalBottom>
            <View style={styles.overFlowBottom} />


            <Modal transparent visible={pay} animationType="fade">
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#00000050'
                }}>
                    <View style={{
                        padding: 20,
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        borderRadius: 10
                    }}>
                        {infosCobran.metodo_pagamento === 'pix' ?
                            <>
                                <LottieView
                                    style={{ width: 150, alignSelf: 'center' }}
                                    autoPlay={true}
                                    loop={true}
                                    source={require('../../assets/animations/pix.json')}
                                />

                                <Image
                                    source={{
                                        uri: infosCobran.uri
                                    }}
                                    style={{ width: 300, height: 300, alignSelf: 'center' }}
                                    resizeMode="stretch"
                                />
                            </>
                            :
                            <>
                                <LottieView
                                    style={{ width: 250, marginRight: 15 }}
                                    autoPlay={true}
                                    loop={downloadPdf ? true : false}
                                    source={AnimateBillet}
                                />
                                <View></View>
                            </>
                        }

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>

                            <TouchableOpacity

                                style={[styles.copy, {
                                    backgroundColor: (makeOptions.copy ? Theme.SUCCESS : Theme.PRIMARY) + '10'
                                }]}
                                onPress={() => {
                                    setMakeOptions({ ...makeOptions, copy: true })
                                    Snackbar.show({
                                        text: `${infosCobran && infosCobran.metodo_pagamento === 'pix' ?
                                            'Pix Copia e Cola' : 'código de barras'} copiado`,
                                        backgroundColor: Theme.SUCCESS,
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: '#fff'
                                    })
                                    Clipboard.setString(`${infosCobran.metodo_pagamento === 'boleto' ?
                                        infosCobran.payload.replace(/[^0-9]/g, '') : infosCobran.payload}`);
                                }}>
                                <Text style={{
                                    color: makeOptions.copy ? Theme.SUCCESS : Theme.PRIMARY,
                                    textAlign: 'center'
                                }}>{
                                        infosCobran && infosCobran.metodo_pagamento === 'pix' ?
                                            'Pix Copia e Cola' :
                                            'código de barras'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    infosCobran.metodo_pagamento === 'pix' ?
                                        setPay(false)
                                        :
                                        download({ file: infosCobran.uri })
                                }}
                                style={[styles.copy, {
                                    backgroundColor: infosCobran.metodo_pagamento === 'pix' ? Theme.ERROR + '10' : Theme.PRIMARY + '10',
                                    paddingHorizontal: infosCobran.metodo_pagamento === 'pix' ? 30 : 12,

                                }]}>
                                <Text style={{
                                    color: Theme.SECONDARY,
                                    textAlign: 'center',
                                    color: infosCobran.metodo_pagamento === 'pix' ? Theme.ERROR : Theme.PRIMARY
                                }}>{infosCobran.metodo_pagamento === 'pix' ? 'Fechar' : 'baixar boleto'}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            infosCobran.metodo_pagamento === 'boleto' &&
                            <TouchableOpacity
                                onPress={() => setPay(false)}
                                style={[styles.copy, {
                                    backgroundColor: Theme.ERROR + '10'
                                }]}>
                                <Text style={{
                                    color: Theme.ERROR
                                }}>Fechar</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>

            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: Theme.WHITE,
        justifyContent: 'space-between'
    },
    header: {
        alignItems: 'center',
        padding: 35,
        backgroundColor: Theme.PRIMARY
    },
    MainText: {
        textAlign: 'center',
        color: Theme.WHITE,
        fontWeight: '600'
    },
    details: {
        color: Theme.PRIMARY,
        textAlign: 'center',
        fontWeight: '700'
    },
    detailsText: {
        color: Theme.TEXT + 90,
        marginTop: 10
    },
    textGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    },
    btnMain: {
        backgroundColor: Theme.PRIMARY,
        borderRadius: 30,
        paddingVertical: 10,
        width: '100%',
        alignSelf: 'center'
    },
    overFlowBottom: {
        height: '50%',
        backgroundColor: Theme.WHITE,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: -1
    },
    copy: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 5
    },
})

export default PaymentSuccessfull;