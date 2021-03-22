import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

import { Alert } from 'react-native';

import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext()

export default function AudioProvider(props) {
    
    const [audioFiles, setAudioFiles] = useState([])

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
                audioTotalCount: audioFiles.length
            }}
        >
            {props.children}
        </AudioContext.Provider>
    )
    
}