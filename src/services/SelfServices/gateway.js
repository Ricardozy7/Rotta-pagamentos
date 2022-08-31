import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const gateway = axios.create({
    baseURL: 'https://api.rottamobile.com.br/v1',
});
async function intercepter(config) {
    const user = await AsyncStorage.getItem('@intevhtl-login');
        if(user){
            const inJSON = JSON.parse(user);
            config.headers.Authorization = `Bearer ${inJSON}`;
        }
    return config;
}

gateway.interceptors.request.use(intercepter);
export default gateway;
