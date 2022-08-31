import React, {
    createContext,
    useContext, 
    useState
} from "react";


export const PaymentManager = createContext({});
const usePayment = () => useContext(PaymentManager);

export const PaymentProvider = ({ children }) => {
    const [payment, setPayment] = useState({})
    const [cobrancas, setCobrancas] = useState([])
    const [comprovante, setComprovante] = useState({})
    return (
        <PaymentManager.Provider value={{
            payment, 
            setPayment,
            setCobrancas,
            cobrancas,
            setCobrancas,
            setComprovante,
            comprovante
        }}>
            {children}
        </PaymentManager.Provider>
    )
}

export default usePayment;
