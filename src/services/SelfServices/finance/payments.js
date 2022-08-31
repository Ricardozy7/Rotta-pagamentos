const { default: gateway } = require("../gateway")

export const Payments = async ({page, limit, status, usuario, order_mode, ordernar_por, ano}) => {
    try {
        const response = await gateway.get('/finance/pagamentos', {
            params: {
                page: page && page,
                limit: limit && limit,
                status: status ? status : null,
                usuario: usuario ? usuario : null,
                order_mode: order_mode && order_mode,
                ordenar_por: ordernar_por && ordernar_por,
                ano: ano && ano
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