import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default function OptionModal({ visible, onClose, currentItem }) {    
    return (
        <Modal animationType='slide' transparent visible={visible}>
            <View style={styles.modal}>
                <Text numberOfLines={1} style={styles.modalTitle}>
                    {currentItem.filename}
                </Text>

                <View style={styles.optionContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons  
                            name="play-arrow"
                            size={24}
                            style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                marginLeft: -7,
                                height: 45
                            }}
                        />
                        <Text style={{...styles.option, marginLeft: 16}}>Reproduzir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons
                            name="playlist-add"
                            size={24}
                            style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                height:45
                            }}
                        />
                        <Text style={styles.option}>Adicionar à Playlist</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={()=> onClose?.(false)}>
                <View style={styles.modalBg}/>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(20, 0, 29, 1)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 999,
    },
        modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: 'rgba(255, 255, 255, 0.6)',
    },
        optionContainer: {
        padding: 20,
        marginTop: 3
    },
        option: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        letterSpacing: 1,
        marginLeft: 10,
        height: 55
    },
        modalBg: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: '100%'
    },
})