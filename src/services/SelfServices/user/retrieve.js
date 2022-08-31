const { default: gateway } = require("../gateway")

export const retrive = async (app) => {
    try {
        const response = await gateway.get('/auth/me',{
            params:{
                app: app && app
            }
        });
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