import React from "react";
import { LoadingFooter } from "react-native-spring-scrollview";

import {
    View,
    StyleSheet,
} from "react-native";
import LottieView from 'lottie-react-native';

export class NormalFooter extends LoadingFooter {
    static height = 80;

    static style = "stickyContent";

    render() {
        if (this.state.status === "allLoaded")
            return (
                <View style={styles.container}>
                   
                </View>
            );
        return (
            <View style={styles.container}>
                {this._renderIcon()}
            </View>
        );
    }

    _renderIcon() {
        const s = this.state.status;
        if (s === "loading" || s === "cancelLoading" || s === "rebound") {
            return <LottieView
                style={{ width: 50 }}
                loop={true}
                autoPlay
                source={require('../assets/animations/loading.json')}
            />;
        }
        const { maxHeight, offset, bottomOffset } = this.props;
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
