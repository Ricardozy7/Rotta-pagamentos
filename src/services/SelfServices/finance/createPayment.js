const { default: gateway } = require("../gateway")

export const CreatePayment = async (data) => {
    try {
        const response = await gateway.post(`/finance/pagamento/`, data);
        response.data.statusCode = response.status;
        return response.data;
    } catch (reason) {
        if (reason.response) {
            const { data } = reason.response;
            data.statusCode = reason.status;
            data.severity = 'error';

            return data;
        }
        return {
            error: "Problemas ao se conectar com o serviço",
            severity: 'error'
        }
    }
}
