const { default: gateway } = require("../gateway")

export const updateUser = async ({user_id, data}) => {
    try {
        const response = await gateway.put(`/auth/update/${user_id}`, data);
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