import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Theme from '../../theme';
import CheckBox from '@react-native-community/checkbox';
import LottieView from 'lottie-react-native'
const ModalPayment = ({ onClose, onHandle, setCheckboxes, checkboxes, paymentLoading }) => {

    const toggleCheckbox = (id, index) => {
        const checkboxData = [...checkboxes];
        checkboxData[index].checked = !checkboxData[index].checked
        const checkboxData2 = [...checkboxes];
        checkboxData2[index === 0 ? 1 : 0].checked = !checkboxData2[index].checked
        setCheckboxes(checkboxData);
        setCheckboxes(checkboxData2);
    }

    return (
        <View>
            <Text style={{
                fontWeight: '700',
                color: Theme.PRIMARY,
                marginTop: 25
            }}>ESCOLHA A FORMA DE PAGAMENTO</Text>
            {
                checkboxes.map((cb, index) => {
                    return (
                        <View key={cb.id} >
                            <TouchableOpacity style={{
                                flexDirection: "row",
                                alignItems: 'center',
                                backgroundColor: cb.checked ? Theme.PRIMARY + 10 : 'transparent',
                                padding: 15,
                                marginTop: 10
                            }} onPress={() => toggleCheckbox(cb.id, index)}>
                                <CheckBox
                                    style={{ marginLeft: -15 }}
                                    tintColors={{ true: Theme.PRIMARY }}
                                    key={cb.id}
                                    value={cb.checked}
                                    onValueChange={() => toggleCheckbox(cb.id, index)}
                                    boxType='circle'
                                />
                                <Text style={{ color: Theme.TEXT }}>{cb.title.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
            <View style={{ width: '100%', marginTop: 20 }}>

                <TouchableOpacity style={{
                    width: '100%',
                    backgroundColor: paymentLoading ? '#E5E5E5' : Theme.PRIMARY,
                    padding: paymentLoading ? 0 : 15,
                    borderRadius: 5
                }}
                    onPress={onHandle}>
                    {paymentLoading ?
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <LottieView
                                style={{ width: 60 }}
                                autoPlay
                                loop={true}
                                source={require('../assets/animations/loading.json')}
                            />
                        </View>
                        :
                        <Text style={{
                            color: '#FFF',
                            textAlign: 'center'
                        }}>Concluir pagamento</Text>

                    }
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%',
                    backgroundColor: Theme.ERROR + 10,
                    padding: 15,
                    marginTop: 25,
                    borderRadius: 5
                }}
                    onPress={onClose}>
                    <Text style={{ color: Theme.ERROR, textAlign: 'center' }}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalPayment;