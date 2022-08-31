import React from "react";
import { RefreshHeader } from "react-native-spring-scrollview";
import {
    View,
    StyleSheet,
} from "react-native";
import LottieView from 'lottie-react-native';

export class NormalHeader extends RefreshHeader {
    static height = 80;

    static style = "stickyContent";

    render() {
        return (
            <View style={styles.container}>
                {this._renderIcon()}

            </View>
        );
    }

    _renderIcon() {
        const s = this.state.status;
        if (s === "refreshing" || s === "rebound") {
            return <LottieView
                style={{ width: 70 }}
                loop={true}
                autoPlay
                source={require('../assets/animations/loading.json')}
            />;
        }
        const { maxHeight, offset } = this.props;
        return (
           <></>
        );
    }

    renderContent() {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    rContainer: {
        marginLeft: 20
    },
    text: {
        marginVertical: 5,
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        width: 140
    }
});