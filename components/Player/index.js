import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import Slider from '@react-native-community/slider';

import { color } from '../Colors';

import { Ionicons } from '@expo/vector-icons';

export default function Player() {
    const [ isPlaying, setIsPlaying ] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.playerContainer}>

                <View style={styles.audioThumb}>
                    <View style={styles.audioThumbNote}>
                        <Ionicons name="md-musical-note" size={80} color="white" />
                    </View>
                </View>

                <View style={styles.playerControls}>
                    <View style={styles.playerControlInfo}>
                        <Text numberOfLines={1} style={styles.audioTitle}>Audio title</Text>

                        <View style={styles.audioTimeInfo}>
                            <Text style={styles.audioTime}>01:34</Text>
                            <Text style={styles.audioTime}>07:54</Text>
                        </View>

                        <Slider
                            style={styles.sliderStyle}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={color.AUDIO_PROGRESS_BG_MIN}
                            maximumTrackTintColor={color.AUDIO_PROGRESS_BG_MAX}
                            thumbTintColor={color.AUDIO_PROGRESS_BALL_BG}
                            onSlidingComplete={ value => console.log(value) }
                        />
                    </View>

                    <View style={styles.playerControlButtons}>
                        <TouchableOpacity style={styles.skipForwardButton}>
                            <Ionicons name="ios-play-skip-back" size={35} color="white" />
                        </TouchableOpacity>
                        
                        {!isPlaying && 
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={()=> setIsPlaying(true)}
                            >
                                <Ionicons name="ios-play" size={50} color="white" />
                            </TouchableOpacity>
                        }

                        {isPlaying &&  
                            <TouchableOpacity
                                style={styles.pauseButton}
                                onPress={()=> setIsPlaying(false)}
                            >
                                <Ionicons name="ios-pause-circle" size={50} color="white" />
                            </TouchableOpacity>
                        }
                        
                        <TouchableOpacity style={styles.skipForwardButton}>
                            <Ionicons name="ios-play-skip-forward" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.SCREEN_BG,
        margin: 0
    },
    playerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: '95%',
    },
    audioThumb: {
        backgroundColor: '#777',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginTop: 15,
        marginBottom: 15,
        elevation: 10
    },
    audioThumbNote: {
        backgroundColor: '#444',
        borderRadius: 20,
        padding: 5,
        width: 130,
        height: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerControls: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: 230,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    audioTitle: {
        width: '88%',
        fontSize: 25,
        padding: 5,
        color: '#FFF',
        marginBottom: 10,
    },
    audioTimeInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '86%',
        marginBottom: 10
    },
    audioTime: {
        fontSize: 12,
        color: '#FFF'
    },
    audioBar: {
        backgroundColor: '#FFF',
        width: '90%',
        height: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    sliderStyle: {
        width: '95%',
        height: 40,
    },
  
    playerControlInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 120,
    },
    playerControlButtons: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    skipForwardButton: {   
        backgroundColor: color.SKIP_FORWARD_BTN,
        borderRadius: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 11,
        paddingRight: 12,
        elevation: 5
    },
    playButton: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.PLAY_PAUSE_BTN,
        borderRadius: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 10,
        marginLeft: 15,
        marginRight: 15,
        elevation: 5
    },
    pauseButton: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.PLAY_PAUSE_BTN,
        borderRadius: 50,
        paddingLeft: 14,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        elevation: 5,
        width: 75
    },
})