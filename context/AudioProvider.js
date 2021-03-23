import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

import { Alert } from 'react-native';


import { Audio } from 'expo-av';

import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext();

export default function AudioProvider(props) {
    
    const [audioFiles, setAudioFiles] = useState([])

    const [ audioObj, setAudioObj ] = useState(null)
    const [ soundObj, setSoundObj ] = useState(null)
    const [ currentAudioPlaying, setCurrentAudioPlaying ] = useState(0)

     const handleAudioPress = async (audio) => {
        // Playing audio for the first time
        console.log("CurrentAudio:", currentAudioPlaying.filename);
        console.log("Audio", audio.filename);
        // if(currentAudioPlaying !== 0 && audio.id !== currentAudioPlaying.id ){
        //     setAudioObj(null)
        //     setSoundObj(null)
        //     handleAudioPress(audio)
        // }

        if(soundObj === null){
            const playbackObj = new Audio.Sound()
            const status = await playbackObj.loadAsync(
                { uri: audio.uri }, 
                { shouldPlay: true }
            )
                
            setAudioObj(playbackObj)
            setSoundObj(status)
            setCurrentAudioPlaying(audio)
            return
        }

        
        // Pause the audio
        if(soundObj.isLoaded && soundObj.isPlaying){
            const status = await audioObj.setStatusAsync({ shouldPlay: false })
            setSoundObj( status )
            return
        }

        if(soundObj.isLoaded && !soundObj.isPlaying && currentAudioPlaying.id === audio.id){
            const status = await audioObj.playAsync()
            setSoundObj( status )
            return
        }
        
    }

    const permissionAlert = () => {
        Alert.alert(
            "Permissião requerida!",
            "Este aplicativo precisa de permissão para acessar arquivos de áudio!",
            [{
                text: "OK",
                onPress: ()=> getPermission()
            },
            {
                text: "Cancelar",
                onPress: ()=> permissionAlert()
            }]
        )
    }

    const getNextPage = (start, end) => {
        return audioFiles.slice(start, end)
    }
     
    const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        })

        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount
        })
        
        setAudioFiles(media.assets)
    }

    const getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if(permission.granted) {
            // Get all the audio files
            getAudioFiles()
        }
        
        if(!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

            if(status === 'denied' && canAskAgain) {
                // Display alert to the user that must to allow permission
                permissionAlert()
            }

            if(status === 'granted') {
                // get all the audio files
                getAudioFiles()
            }
            
            if(status === 'denied' && !canAskAgain) {
                // Display error to the user that cannot get audio 
                //file due to permission denied
                Alert.alert(
                    "Permissão requerida!",
                    "Por favor limpe os dados desse app ou reinstale",
                )
            }
        }
    }

    useEffect(()=>{
        getPermission();
    }, [])

    return (
        <AudioContext.Provider
            value={{
                audioFiles: audioFiles,
                getNextPage: getNextPage,
                audioTotalCount: audioFiles.length,
                handleAudioPress: handleAudioPress
            }}
        >
            {props.children}
        </AudioContext.Provider>
    )
    
}