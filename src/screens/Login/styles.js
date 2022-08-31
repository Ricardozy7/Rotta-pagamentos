import { StyleSheet } from "react-native";
import Theme from '../../../theme';

const styles = StyleSheet.create({
    dotts: {
        width: 300,
        height: 300,
        marginLeft: 500,
        marginTop: 50,
        justifyContent: 'center',
    },
    conteiner: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
 
    circle: {
        width: 300,
        height: 300,
        marginLeft: -70,
        marginTop: -120,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title: {
        color: Theme.PRIMARY,
        fontSize: 30,
        fontWeight: '700',
        marginLeft: 100
    },
    areaForm: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        position: 'relative'
    },
    areAnimate: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    Areainput: {
        width: '70%',
        height: 60,
        backgroundColor: '#fff',
        shadowColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#A8A8A8'
    },
    input: {
        color: Theme.PRIMARY,
        paddingHorizontal: 10,
        paddingVertical: 0,
        paddingBottom: 3,
        fontSize: 16,
        flex: 1,
    },
    areaButton: {
        width: '70%',
        height: 50,
        marginTop: 10,
        borderRadius: 5
    },
    btn: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        alignItems: 'center'
    },
    textFotter: {
        fontWeight: '300',
        fontSize: 10,
        alignItems: 'center',
        color: '#000',
        opacity: 0.5,
    },
    ImgFooter: {
        width: 100,
        height: 50,
        opacity: 0.5,
        marginBottom: 10
    }
})
export default styles;