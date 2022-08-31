import React, { useEffect, useRef, useState } from 'react';
import { 
    Animated, 
    Dimensions, 
    View,
    TouchableOpacity,
    StatusBar
 } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Theme from '../../theme';
const dim = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };


const ModalBottom = ({ children, visible = false, onHandle, close}) => {

    const [background, setbackground] = useState(false)
    const [animationHeigth] = useState(new Animated.Value(0));
    const [opacity] = useState(new Animated.Value(0));

    const AnimateHeigth = { toValue: dim.height, duration: 700, useNativeDriver: false }
    const AnimateInitial = { toValue: 0, duration: 700, useNativeDriver: false }
    const AnimatedOpacity =  { toValue: 1, duration: 700, useNativeDriver: false }

    function onHandlerStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setbackground(true)
            const { translationY } = event.nativeEvent; 
            if (translationY < -1) {
                Animated.timing(animationHeigth, AnimateHeigth).start();
                Animated.timing(opacity, AnimatedOpacity).start();
            }
            if (translationY > 1) {
                Animated.timing(animationHeigth, AnimateInitial).start();
                Animated.timing(opacity, AnimateInitial).start();
                setTimeout(() =>  setbackground(false), 700)
                onHandle(false)
            }
        }
    }
    useEffect(() => {
        if (visible)
            setTimeout(() => {
                Animated.timing(animationHeigth, AnimateHeigth).start();
                Animated.timing(opacity, AnimatedOpacity).start();
                setbackground(true)
            }, 300)
        if (!visible){
            Animated.timing(animationHeigth, AnimateInitial).start();
            Animated.timing(opacity, AnimateInitial).start();
            setTimeout(() => setbackground(false),700   )
        }
            
    }, [visible])
    useEffect(() => {
        if (!close)
            Animated.timing(animationHeigth, AnimateInitial).start();
            Animated.timing(opacity, AnimateInitial).start();
            // setTimeout(() =>  setbackground(false), 700)
    }, [close])
    return (
        <PanGestureHandler
            onHandlerStateChange={onHandlerStateChange}
        >

            <Animated.View style={{
                width: '100%',
                height: animationHeigth,
                position: 'absolute',
                left: 0,
                bottom: 0,
                justifyContent: 'flex-end',
            }}>
                { background &&
                    <Animated.View style={{ 
                        height: dim.height + StatusBar.currentHeight, 
                        marginTop: - 50,
                        width: '100%', 
                        backgroundColor: '#00000050', 
                        flex: 1,
                        position: 'absolute', 
                        opacity:  opacity}}>
                            <TouchableOpacity style={{ 
                                height: '100%', 
                                width: '100%' 
                            }}
                            onPress={() => onHandle(false)}
                            />
                    </Animated.View>
                }

                <View style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    justifyContent: 'flex-end',
                    elevation: 10,
                }}>
                    <View style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20,
                        marginTop: 10,
                        elevation: 20,
                        backgroundColor: '#fff',
                        justifyContent: 'flex-end'

                    }}>
                        <View style={{ 
                            width: '100%', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            overflow: 'hidden'
                            }}>
                            <View style={{ 
                                width: '25%',
                                height: 5, 
                                backgroundColor: Theme.SECONDARY, 
                                borderRadius: 10,
                                 margin: 20 
                                 }}/>
                        </View>
                        {children}
                    </View>
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
}

export default ModalBottom;