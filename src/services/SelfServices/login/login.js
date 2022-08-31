const { default: gateway } = require("../gateway")

export const login = async (email, senha) => {
    try {
        const response = await gateway.post(`auth/login/admin`, {
                email, senha
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

