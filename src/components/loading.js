import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import Theme from "../../theme"


const LoadingModal = ({loading}) => (
    <Modal
        visible={loading}
        onRequestClose={() => {}}
        transparent={true}
    >
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
                <ActivityIndicator size={35} color={Theme.PRIMARY} />
        </View>
    </Modal>
)

export default LoadingModal;
