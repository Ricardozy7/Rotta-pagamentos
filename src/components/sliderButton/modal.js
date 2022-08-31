import React, { useEffect, useState } from "react";
import { View, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

const Modal = ({ modal, setModal }) => {

    const [animationSuccess] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(animationSuccess, { toValue: 1, duration: 2000, easing: Easing.linear })

        modal && setTimeout(() => {
            setModal(false)

        }, 2000)
    }, [modal])
    return (
        <Modal visible={modal} animationType='slide' >
            <View style={{ 
                width: '100%', 
                height: '100%', 
                justifyContent: 'center', 
                alignItems: 'center' 
                }}>
            <View style={{
                width: '100%', 
                height: '100%', 
                position: 'absolute', 
                transform: [{ scale: 2 }], 
                opacity: 1 }}>
            <LottieView
                    autoPlay
                    loop={false}
                    progress={animationSuccess}
                    source={require('../../../assets/animations/explosion.json')}
                />
            </View>
            <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10 }}>
                <LottieView
                    autoPlay
                    loop={false}
                    progress={10}
                    source={require('../../../assets/animations/loading-success.json')}
                />
            </View>
            </View>
           
            
        </Modal>
    )
}

export default Modal;
