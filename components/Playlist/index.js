import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { color } from '../Colors';

import { Entypo, AntDesign } from '@expo/vector-icons';

export default function Playlist() {
    const [ playlist, setPlaylist ] = useState([{title: "Minha PLaylist"}]);

    return (
        <View style={styles.container}> 
            <StatusBar barStyle="light-content" />

            <ScrollView style={styles.playlistContainer}>
                {playlist && <TouchableOpacity activeOpacity={0.7}>

                    <View style={styles.playlistCard}>
                        <View style={styles.playlistTitleContainer}>
                            <Text numberOfLines={1} style={styles.playlistTitle}>{playlist[0].title}</Text>
                        </View>

                        <TouchableOpacity style={styles.dots}>
                            <Entypo name="dots-three-vertical" size={32} color="white" />
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>}
            </ScrollView>

            <View style={styles.createNewPlaylistContainer}>
                <TouchableOpacity style={styles.createNewPlaylist}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {!playlist && <Text style={styles.noPlaylistMsg}>Nenhuma Playlist Encontrada</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.SCREEN_BG
    },
    playlistContainer: {
        display: 'flex',
        width: '100%',
        maxHeight: '80%',
    },
    playlistCard: {
        backgroundColor: 'rgba(255, 255, 255, .1)',
        width: '95%',
        height: 70,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    playlistTitleContainer: {
        flexBasis: 50,
        flex: 1,
        marginLeft: 5
    },
    playlistTitle: {
        marginLeft: 10,
        fontSize: 30,
        color: 'rgba(255, 255, 255, .7)',
    },
    playlistInfoLength: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, .7)',
    },
    dots: {
        flexBasis: 50,
        textAlign: 'center',
        height: '100%',
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createNewPlaylistContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
        height: 90,
        margin: 20,
    },
    createNewPlaylist: {
        backgroundColor: 'rgba(255, 255, 255, .2)',
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        color: '#FFF'
    },
    noPlaylistMsg: {
        color: 'rgba(255, 255, 255, .6)',
        fontSize: 20,
        position: 'absolute'
    }
})