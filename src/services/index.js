import { login } from './SelfServices/login/login';
import { Fingerprint } from './SelfServices/login/Fingerprint';

import { cobrancas } from './SelfServices/finance/cobrancas';
import { CreatePayment } from './SelfServices/finance/createPayment';
import { Payments } from './SelfServices/finance/payments';

import { retrive } from './SelfServices/user/retrieve';
import { Clints } from './SelfServices/user/clints';
import { getCnpj } from './SelfServices/user/getCnpj';
import { updateUser } from './SelfServices/user/updateUser';
import { updateMe } from './SelfServices/user/updateMe';
import { registerClient } from './SelfServices/user/registerClient';
export const RemoteServices = {
    login:{
        login,
        Fingerprint
    },
    Cobrancas:{
        cobrancas,
        CreatePayment, 
        Payments
    },
    users:{
        retrive,
        Clints,
        registerClient,
        getCnpj,
        updateUser,
        updateMe
    }
}