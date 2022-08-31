const { default: gateway } = require("../gateway")

export const getCnpj = async ({cnpj, cep}) => {
    try {
        const response = await gateway.get(`/${cnpj ? 'receita/cnpj/' + cnpj : 'cep/' + cep + '/json'}`);
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