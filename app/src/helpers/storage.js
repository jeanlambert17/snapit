import { AsyncStorage } from "react-native"

export const setItem = async (key,value) => {
    try {
        await AsyncStorage.setItem(key,value);
        return
    } catch(err) {
        console.log('AsyncStorage set item error: ' + error.message);
        return
    }
}

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value
    } catch(err) {
        console.log('AsyncStorage get item error: ' + error.message);
        throw err;
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return
    } catch(err) {
        console.log('AsyncStorage remove item error: ' + error.message);
        return
    }
}