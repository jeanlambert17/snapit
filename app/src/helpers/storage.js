import { AsyncStorage } from "react-native"

export const setData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key,value);
    } catch(err) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value
    } catch(err) {
        console.log('AsyncStorage error: ' + error.message);
    }
}