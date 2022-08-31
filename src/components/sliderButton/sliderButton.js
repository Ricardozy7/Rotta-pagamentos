import React, { useEffect, useState } from "react";
import { Text, View, Animated, TouchableOpacity,  } from "react-native";
import styles from './styles';
import Theme from "../../../theme";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Confirmation from "../confirmationAnimate";
import usePayment from '../../contexts/payments';
import AnimatedProgressWheel from "../progressBar";
import Card from "../card";
// import ProgressBar from "../progressBar";
const SliderButton = ({ data, onlyCharge }) => {
    let offset = 0;
    let fas = 0
    const { addListener } = useNavigation();
    const { setPayment, cobrancas, setCobrancas } = usePayment();
    const { navigate } = useNavigation();
    const LoadingProgress = new Animated.Value(0)
    const [modal, setModal] = useState(false);
    const translateX = new Animated.Value(0)
    const ValueTeste = new Animated.Value(0)
    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                },
            },
        ],
        { useNativeDriver: true }
    );

    function onHandlerStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const { translationX } = event.nativeEvent;
            offset += translationX;
            translateX.setOffset(offset);
            fas += 1
            LoadingProgress.setOffset(fas)
            LoadingProgress.setValue(0)
            translateX.setValue(0);
            if (offset < -50) {
                Animated.timing(translateX, {
                    toValue: 250,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
                // Animated.spring(LoadingProgress, {
                //     toValue: 100,
                //     duration: 200,
                //     useNativeDriver: true,
                // }).start();
                goToNewOrderPage();
            }
        }
    }

    function goToNewOrderPage() {
        // navigate('Novo pedido');
        // setModal(true)
        setPayment(data)
    }

    useEffect(() => {
        addListener('blur', () => {
            offset = 0;
            translateX.setValue(0);
            translateX.setOffset(0);
        });
    }, []);
    return (
        <PanGestureHandler
            onGestureEvent={animatedEvent}
            minDeltaX={20}
            key={data.cobrancas_id}
            onHandlerStateChange={onHandlerStateChange}>
            <Animated.View style={{
                transform: [
                    {
                        translateX: translateX.interpolate({
                            inputRange: [-250, 0, 0],
                            outputRange: [-250, 0, 0],
                            extrapolate: 'clamp',
                        }),
                    },
                ],
            }}>
                <TouchableOpacity

                    onPress={async () => {
                        if (cobrancas.length > 0) {
                            onlyCharge([])
                            if (cobrancas.includes(data)) {
                                const newList = cobrancas.filter((item) => item.cobranca_id !== data.cobranca_id)
                                setCobrancas(newList)
                            } else {
                                setCobrancas([...cobrancas, data])
                            }
                        } else {
                            onlyCharge([data])
                        }
                    }}
                    onLongPress={() => {
                        onlyCharge([])
                        if (cobrancas.includes(data)) {
                            const newList = cobrancas.filter((item) => item.cobranca_id !== data.cobranca_id)
                            setCobrancas(newList)
                        } else {
                            setCobrancas([...cobrancas, data])
                        }
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10
                    }}>
                        {
                         cobrancas && cobrancas.map((r, i) => {
                                return (
                                    r.cobranca_id === data.cobranca_id &&
                                    <View style={{ 
                                        position: 'absolute', 
                                        marginTop: -1, 
                                        backgroundColor: '#E9E9E9', 
                                        width: '100%', 
                                        height: '100%' 
                                        }}
                                         key={`${r.cobranca_id}-${i}`}>
                                        <FontAwesome name='check-square' 
                                        style={{ position: 'absolute', marginTop: -1 }} 
                                        color={Theme.PRIMARY} 
                                        size={25} />
                                    </View>
                                )
                            })
                        }
                        <Card payment={data} />
                        <View style={{ 
                            width: '20%', 
                            marginLeft: '5%', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            position: 'relative', 
                            overflow: 'hidden' 
                            }}>
                            <Text style={{ 
                                color: Theme.PRIMARY, 
                                fontSize: 10, 
                                fontWeight: '700', 
                                zIndex: 2
                                }}>
                                Arraste para pagar agora
                            </Text>
                            <View style={{ 
                                width: 50, 
                                height: 50, 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                marginTop: 5 
                                }}>
                                {/* <AnimatedProgressWheel
                                    progress={translateX.interpolate({
                                        inputRange: [-250,  0],
                                        outputRange: [0,  100],
                                        extrapolate: 'clamp',
                                    })}
                                    animateFromValue={0}
                                    width={10}
                                    size={50}
                                    color={Theme.PRIMARY}
                                /> */}
                                <View style={{  
                                    width: 45, 
                                    height: 45, 
                                    backgroundColor: '#fff', 
                                    position: 'absolute' , 
                                    zIndex: 1, 
                                    borderRadius: 30
                                    }} />
                                <Animated.View style={{
                                    transform: [
                                        {
                                            rotateZ: translateX.interpolate({
                                                inputRange: [-50, 0],
                                                outputRange: ['0deg', '360deg'],
                                                extrapolate: 'clamp'
                                            }),


                                        },
                                    ],
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    backgroundColor: Theme.PRIMARY,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Animated.View style={{ 
                                        width: 100, 
                                        height: 100, 
                                        borderRadius: 30, 
                                        backgroundColor: '#fff',
                                        position: 'absolute',
                                        transform: [
                                            {
                                                translateY: translateX.interpolate({
                                                    inputRange: [-200, 0],
                                                    outputRange: [-70, 0],
                                                })
                                            },
                                            
                                        ]
                                        }}/>
                                </Animated.View>
                                <Icon name='attach-money' 
                                color={Theme.SECONDARY} 
                                size={30} 
                                style={{ position: 'absolute', zIndex: 10 }}/>
                            </View>

                        </View>
                    </View>

                </TouchableOpacity>
                <Confirmation modal={modal} setModal={setModal} />
            </Animated.View>

        </PanGestureHandler >
    )
}
export default SliderButton;
