import React, { useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import LottieView from 'lottie-react-native';
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import Theme from '../../../theme';
import ImgRotta from '../../assets/img/rotta.png'
import { AuthManager } from '../../contexts/auth';

const Loading = () => {
    const { navigate, reset } = useNavigation()
    const {  
        waiting, 
        networkErro, 
        setFingerError, 
        fingerError, 
        setReload, 
        reload 
    } = useContext(AuthManager);

    useEffect(() => {
        setTimeout(() => {
            if (!waiting) {
                // navigate("Login")
                reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            }
        }, 3000)
        if (networkErro) {
            navigate('ConnectionError')
        }
    }, [waiting, networkErro])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ 
                height: '100%',
                 width: '100%', 
                 backgroundColor: Theme.PRIMARY, 
                 justifyContent: 'center', 
                 alignItems: 'center' 
                 }}>
                <View style={{ 
                    height: '50%', 
                    justifyContent: 'center' 
                    }}>
                    <Image 
                    source={ImgRotta} 
                    style={{
                         width: 155, 
                         height: 40, 
                         }} 
                    resizeMode='stretch' />

                </View>
                {
                    waiting && !fingerError &&
                        <LottieView
                            style={{ width: 80 }}
                            autoPlay
                            loop={true}
                            source={require('../../assets/animations/loading-white.json')}
                        />
                        
                        
                }
                {
                    fingerError &&
                    <View style={{ position: 'absolute', height: '100%', justifyContent: 'flex-end', width: '70%' }}>
                    <RectButton style={{ 
                        backgroundColor: '#fff', 
                        paddingVertical: 15, 
                        marginBottom: '30%', 
                        alignItems: 'center', 
                        borderRadius: 5 
                    }} 
                    onPress={() => {
                        setFingerError(false)
                        setReload(!reload)
                    }}
                    >
                        <Text style={{ color: Theme.PRIMARY }}>Entrar</Text>
                    </RectButton>
                </View>
                }

            </View>
        </View>
    )
}



export default Loading;