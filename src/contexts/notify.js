import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { RemoteServices } from '../services/index';
export const NotifyManager = createContext({});
const useNotify = () => useContext(NotifyManager);

export const NotifyProvider = ({ children }) => {
    const [notify, setNotify] = useState({
        data: [], count: 0
    })
    const [reload, setReload] = useState(false)
    const [LoadingMore, setLoadingMore] = useState(false)

    useEffect(() => {

        RemoteServices.Cobrancas.Payments({ status: 'AGUARDANDO,NAO PAGA,CANCELADO,PAGO', limit: 50 }).then((e) => {
            let notifys = []
            let notifyCounts = 0
            e.pagamentos &&
                e.pagamentos.map((p) => {
                    if (new Date().getUTCDate() - new Date(p.criado_em).getUTCDate() < 3 && 
                    new Date(p.criado_em).getFullYear() === new Date().getFullYear() &&
                    new Date(p.criado_em).getMonth() === new Date().getMonth() && p.status === 'CANCELADO'){
                        notifys.push(p)
                        notifyCounts += 1
                    }
                    if (new Date().getUTCDate() - new Date(p.criado_em).getUTCDate() < 7 &&
                    new Date(p.criado_em).getFullYear() === new Date().getFullYear() &&
                    new Date(p.criado_em).getMonth() === new Date().getMonth() && p.status === 'PAGO') {
                        notifys.push(p)
                        notifyCounts += 1

                    }
                    if (p.status === 'AGUARDANDO') {
                        notifys.push(p)
                        notifyCounts += 1

                    }
                })
            setNotify({ data: notifys, count: notifyCounts })
        }).finally(() => setLoadingMore(false))
    }, [reload])

    return (
        <NotifyManager.Provider value={{
            notify,
            reload,
            setReload,
            LoadingMore,
            setLoadingMore
        }}>
            <>
                {children}

            </>
        </NotifyManager.Provider>
    )
}

export default useNotify;
