const { default: gateway } = require("../gateway")

export const registerClient = async (data, app) => {
    try {
        const response = await gateway.post(`auth/lojas/${app}`, data);
        return response.data;
    } catch(reason) {
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