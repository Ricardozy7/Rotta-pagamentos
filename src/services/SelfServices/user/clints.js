const { default: gateway } = require("../gateway")

export const Clints = async ({page, limit, perfil, fragment, app, revenda}) => {
    try {
        const response = await gateway.get(`auth/list/${perfil ? perfil : 'revenda'}`,{
            params:{
                page,
                limit: limit && limit,
                fragment: fragment && fragment,
                app: app && app,
                revenda:revenda && revenda
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