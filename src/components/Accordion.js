import React, { Component, useEffect, useState } from 'react';
import { View, 
    TouchableOpacity,  
    StyleSheet, 
    LayoutAnimation, 
    UIManager
    } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Colors from '../../theme';
import Theme from '../../theme';

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
const Accordian = ({ open, data ,children }) => {


    const [accord, setAccord] = useState({ data: data, expanded: false })

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAccord({ expanded: !accord.expanded })
    } 
    useEffect(() => {
        if (open) {
            toggleExpand()
        }
    }, [])
    return (
        <View style={{ width: '100%' }}>
            <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
                {children}
                <Icon name={accord.expanded ? 'expand-less' : 'expand-more'} color={Theme.SECONDARY} size={30} />
            </TouchableOpacity>
            <View style={styles.parentHr} />
            {
                accord.expanded &&
                <View style={styles.child}>
                    {data}
                </View>
            }

        </View>
    )
}



const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    parentHr: {
        height: 1,
        color: Colors.WHITE,
        width: '100%'
    },
    child: {
        width: '100%'
    }

});
export default Accordian;