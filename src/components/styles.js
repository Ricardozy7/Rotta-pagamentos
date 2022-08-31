/* eslint-disable prettier/prettier */
import { StatusBar, StyleSheet } from 'react-native';
import Theme from "../../theme";

const styles = StyleSheet.create({
    header: {
        minHeight: '7%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 12,
        width: '100%',
        marginTop: StatusBar.currentHeight
    },
    textHeader: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 15,
        width: '70%'
    },
});

export default styles;
