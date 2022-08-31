import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import roundTo from 'round-to';
import Theme from './theme';
export function toCashBR(value, likeArray) {
    const tratedValue = roundTo(value, 2);
    const values = tratedValue.toString().split('.');
    const currency = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const cents = values.length === 2 ? (values[1].length === 1 ? values[1] + '0' : values[1]) : '00';
    if (!likeArray) {
        return `R$ ${currency},${cents}`;
    }
    return [currency, cents];
}

export function toCapitalize(name, firstNameOnly0 = true) {
    const firstName = firstNameOnly0 ? name.split(' ')[0] : name;
    return firstName[0].toUpperCase() + firstName.toLowerCase().slice(1);
}

export function convertDate(date, type, seconds, normated) {
    if (type === 'date') {
        const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
        const year = date.getFullYear().toString();
        if (normated) {
            return `${year}-${month}-${day}`;
        }
        return `${day}/${month}/${year}`;
    } else {
        const hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
        if (seconds) {
            const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
            return `${hour}:${minutes}:${seconds}`;
        }   
        return `${hour}:${minutes}`;
    }
}
export function getLegibleDate(date, minutes) {
    const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
    return `${day} ${Month[date.getMonth()].toUpperCase()} ${date.getFullYear()}${minutes ? ` - ${convertDate(date, 'hour', true)}` : ''}`;
}
export const Month = [
    'Janeiro','Fevereiro','março', 'Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
] 
export async function resetUser() {
    await AsyncStorage.removeItem('@intevhtl-llogin');
    RNRestart.Restart();
}
export const cpfMask = value => {
    return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1x.$2')
    .replace(/(\d{4})(\d)/, 'xxx.$2')
    .replace(/(\d{3})(\d{1,2})/, 'xxx-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
  }
export const cnpjMask = (value) => {
    return value 
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

export const Apps = [
    {
        app: 1, name: 'Força de Vendas', price: 30, color: Theme.PRIMARY
    },
    {
        app: 2, name: 'Restaurante', price: 50, color: Theme.ERROR
    }
]

export const validarCNPJ = (cnpj) => {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}