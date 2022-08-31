const { default: gateway } = require("../gateway")

export const cobrancas = async ({ data }) => {
    try {
        const response = await gateway.get(`/finance/cobrancas`,{
            params:{
                app: data.app,
                status: data.status
            }
        });
        return response.data;
    } catch (reason) {
        if (reason.response) {
            const { data } = reason.response;
            data.severity = 'error';

            return data;
        }
        return {
            error: "Problemas ao se conectar com o serviço",
            severity: 'error'
        }
    }
}
