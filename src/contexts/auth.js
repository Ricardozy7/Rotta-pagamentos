import React, { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import { RemoteServices } from "../services";


export const AuthManager = createContext({});

const useAuth = () => useContext(AuthManager);

export const AuthProvider = ({ children }) => {
    const [perfil, setPerfil] = useState('');
    const [user, setUser] = useState(null);
    const [waiting, setWaiting] = useState(true);
    const [fingerError, setFingerError] = useState(false);
    const [networkErro, setNetworkErro] = useState(false);
    const [reload, setReload] = useState(false);
    async function makeLogin() {
        const _lastLogin = await AsyncStorage.getItem('@intevhtl-login');
        if (_lastLogin) {
            const lastLogin = JSON.parse(_lastLogin);
            if (lastLogin !== '') {
                RemoteServices.users.retrive(1).then(async (e) => {
                    if (e.error === 'Problemas ao se conectar com o serviço') {
                        setNetworkErro(true);
                    }
                    setPerfil(e.apelido && e.apelido.length > 0 ? e.apelido : e.razao_social)
                    if (!e.error) {
                        setNetworkErro(false);
                    }
                    const refresh = await AsyncStorage.getItem("@intevhtl-refresh");
                    if (e.error === "Token expirado") {
                        setFingerError(true);
                        setUser(null);
                        FingerprintScanner
                            .isSensorAvailable().then(() => {
                                FingerprintScanner.authenticate({ title: 'Rotta pagamentos', cancelButton: 'Cancelar' })
                                    .then(() => {  
                                        RemoteServices.login.Fingerprint({
                                            token: JSON.parse(refresh)
                                        }).then(async (e) => {
                                            const storeData = e.token;
                                            console.log(e)
                                            await AsyncStorage.setItem("@intevhtl-login", JSON.stringify(storeData));
                                            const refreshTokken = e.refresh_token;
                                            await AsyncStorage.setItem("@intevhtl-refresh", JSON.stringify(refreshTokken));
                                            setUser(storeData)
                                            RemoteServices.users.retrive(1).then((e) => setPerfil(e.apelido.length > 0 ? e.apelido :e .razao_social))
                                        }).catch((err) => {
                                            setUser(null)
                                            // setFingerError(true)
                                            console.log('s')
                                        })
                                    }).catch((err) => {
                                        setUser(null);
                                        setFingerError(true);
                                    }).finally(() => {});
                            }).catch(async (err) => {
                                setUser(null)
                                await AsyncStorage.clear();
                            }
                            )
                    } if (e.razao_social) {
                        setUser(lastLogin);

                    }
                }).catch((err) => { console.log(err) })
            } else {
                setWaiting(false);
            }
        } else {
            setWaiting(false);

        }
    };

    useEffect(() => {
        FingerprintScanner.release();
        !fingerError &&
            (async () => {
                await makeLogin();
            })()
    }, [networkErro, fingerError, reload]);

    return (
        <AuthManager.Provider value={{
            user,
            isAuthenticated: !!user,
            setUser,
            perfil,
            waiting,
            setWaiting,
            setPerfil,
            networkErro,
            setReload,
            setNetworkErro,
            fingerError,
            setFingerError
        }}>
            {children}
        </AuthManager.Provider>
    )
}

export default useAuth;
