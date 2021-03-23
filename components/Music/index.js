import React, { useState, useContext, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    RefreshControl
} from 'react-native'


import { color } from '../Colors';
import OptionModal from '../OptionModal';

import { Entypo } from '@expo/vector-icons';

import { AudioContext } from '../../context/AudioProvider';

const getThumbText = (filename) => filename[0].toUpperCase();


export default function Music() {
    
    const { audioTotalCount, getNextPage, handleAudioPress } = useContext(AudioContext)
    const [ refreshing, setRefreshing ] = useState(false);
    const [ audioFiles, setAudioFiles ] = useState([])
    const [ totalItems, setTotalItems ] = useState(audioTotalCount)
    const [ scrollingDown, setScrollingDown ] = useState(false)

    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({})


    const nextPageItems = () => {
        if(totalItems >= 50){
            const nextPageItems = getNextPage(audioFiles.length, audioFiles.length+50)
            setTotalItems(totalItems - 50)
            // console.log("Audio Length: ", audioFiles.length)
            setAudioFiles([...audioFiles, ...nextPageItems])
        }
        
        if(totalItems < 50){
            const nextPageItems = getNextPage(audioFiles.length, audioTotalCount)
            // console.log("Audio Length: ", audioFiles.length)
            setTotalItems(totalItems - totalItems)
            setAudioFiles([...audioFiles, ...nextPageItems])
        }
    }


    const onRefresh = (time=0) => {
        setRefreshing(true);
        nextPageItems();
    
        setTimeout(() => {
            setRefreshing(false)
            setScrollingDown(false)
        }, time)
      }


    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };
    
    useEffect(() => {
        onRefresh(1000)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />  
            <ScrollView
                style={styles.musicContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={()=> onRefresh(1000) }
                    />
                }
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        onRefresh()
                        console.log("Total remaining: ", totalItems)
                        // console.log("Finished Scrolling")
                    }
                }}
            >
                {audioFiles && audioFiles.map(audio => 
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={audio.id}
                        onPress={() => handleAudioPress(audio)}
                    >
                        <View style={styles.musicItems}>
                            <Text style={styles.musicItemThumb}>{getThumbText(audio.filename)}</Text>
                            <View style={styles.musicInfoMiddle}>
                                <Text numberOfLines={1} style={styles.musicInfoTitle}>{audio.filename}</Text>
                                <Text style={styles.musicInfoLength}>{convertTime(audio.duration)}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.dots}
                                onPress={()=> {
                                    setModalData(audio)
                                    setModal(true)
                                }}
                            >
                                <Entypo name="dots-three-vertical" size={32} style={{color: 'rgba(255, 255, 255, .6)'}} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                {scrollingDown &&  
                    <RefreshControl
                        style={{position: 'absolute'}}
                        refreshing={refreshing}
                        onRefresh={()=> onRefresh(200) }
                    />
                }
            </ScrollView>

            {modal && <OptionModal visible={true} onClose={setModal} currentItem={modalData}/>}
        </View>
    )
}


const convertTime = minutes => {
    if(minutes) {
        const hrs = minutes / 60;
        const minute = String(hrs).split('.')[0];

        const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
        const sec = Math.ceil((60 * percent) / 100);
        
        if(parseInt(minute) < 10 && sec < 10) return `0${minute}:0${sec}`;
        if(parseInt(minute) < 10 ) return `0${minute}:${sec}`;
        if(parseInt(sec) < 10 ) return `${minute}:0${sec}`;
        
        return `${minute}:${sec}`;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.SCREEN_BG
    },
    musicContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    musicItems: {
        backgroundColor: 'rgba(255, 255, 255, .1)',
        width: '95%',
        height: 80,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    musicItemThumb: {
        width: 50,
        height: 50,
        fontSize: 30,
        color: "rgba(255, 255, 255, .4)",
        backgroundColor: 'rgba(255, 255, 255, .3)',
        flexBasis: 50,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 10,
        flex: .01
    },
    musicInfoMiddle: {
        flexBasis: 50,
        flex: 1,
        marginLeft: 5
    },
    musicInfoTitle: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, .7)',
    },
    musicInfoLength: {
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

})