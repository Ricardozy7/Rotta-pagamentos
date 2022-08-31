import { StyleSheet } from "react-native";
import Theme from "../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    cardsBorder: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 6,
        borderColor: '#ddd',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        shadowColor: '#aaa',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5,
            height: 30,
        },
        shadowRadius: 1,
        elevation: 1,
        flexDirection: 'row'
    },
    square: {
        width: 85,
        height: 87,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        flex: 1,
    },
    infoContainer: {
        alignItems: 'center',
        width: 100,
    },
    label: {
        fontSize: 8,
        color: '#000'
    },
    info: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000'

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingRight: 10,
    },
    status: {
        fontSize: 11,
    },
    labelL: {
        fontSize: 9,
    },
    infoL: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600'
    },
    hr: {
        height: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#bbb',
        marginVertical: 3,
    },
    vr: {
        width: 1,
        height: '50%',
        alignSelf: 'center',
        backgroundColor: '#aaa',
    },
    endRow: {
        backgroundColor: Theme.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
    },
    endSubInfo: {
        color: '#fff',
        opacity: 0.7,
        fontSize: 14,
        fontWeight: '400'
    },
    endTotalInfo: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    }
})

export default styles;
