import React, { useRef } from "react";
import { View, Text, TextInput as TextInputReact } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./styles";
import { cnpjMask } from '../../../functools';
const Form = ({ setMe, me }) => {
    const input = useRef(null)

    const setState = (key, value) => {
        setMe(p => ({ ...p, [key]: value }));
    }
    return (
        <View style={{ marginVertical: 10 }}>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput,
                {
                    fontWeight: '400', marginTop: 15
                }]}>CNPJ/CPF</Text>
                <TextInputReact
                    ref={input}
                    style={[styles.input, { fontWeight: '400' }]}
                    value={me.cpf_cnpj && me.cpf_cnpj.length > 13 ?
                        cnpjMask(me.cpf_cnpj) : ''}
                    placeholder={'xx.xxx.xxx/0001-xx'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('cpf_cnpj', e)
                    }}
                    editable={false} selectTextOnFocus={false}
                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput,
                {
                    fontWeight: '400'
                }]}>Razão social</Text>
                <TextInput
                    ref={input}
                    style={styles.input}
                    value={me.razao_social}
                    placeholder={'Ex: Revenda Ricardo dias'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('razao_social', e)
                    }}
                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400'
                }]}>Nome fantasia</Text>
                <TextInput
                    ref={input}
                    style={styles.input}
                    value={me.nome_fantasia}
                    placeholder={'Ex: Ricardo dias'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('nome_fantasia', e)
                    }}
                />
            </View>

            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput,
                {
                    fontWeight: '400',
                    marginTop: 15
                }]}>Telefone</Text>
                <TextInput
                    ref={input}
                    value={me.telefone}
                    style={styles.input}
                    placeholder={'(xx) x xxxx-xxxx'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('telefone', e)
                    }}
                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput,
                {
                    fontWeight: '400',
                    marginTop: 15
                }]}>E-mail</Text>
                <TextInput
                    ref={input}
                    value={me.email && me.email}
                    style={[styles.input, { fontWeight: '400' }]}
                    placeholder={'email@email.com.br'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('email', e)
                    }}
                    editable={false} selectTextOnFocus={false}

                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400',
                    marginTop: 15
                }]}>Cep</Text>
                <TextInput
                    ref={input}
                    value={me.cep && me.cep}
                    style={styles.input}
                    placeholder={'48970-000'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('cep', e)
                    }}

                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400',
                    marginTop: 15
                }]}>cidade</Text>
                <TextInput
                    ref={input}
                    value={me.cidade && me.cidade}
                    style={styles.input}
                    placeholder={'senhor do bonfim'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('cidade', e)
                    }}

                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400',
                    marginTop: 15
                }]}>UF</Text>
                <TextInput
                    ref={input}
                    value={me.uf && me.uf}
                    style={styles.input}
                    placeholder={'BA'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('uf', e)
                    }}

                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400',
                    marginTop: 15
                }]}>Logradouro</Text>
                <TextInput
                    ref={input}
                    value={me.logradouro && me.logradouro}
                    style={styles.input}
                    placeholder={'BA'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('logradouro', e)
                    }}

                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400',
                    marginTop: 15
                }]}>Numero</Text>
                <TextInput
                    ref={input}
                    value={me.numero && me.numero}
                    style={styles.input}
                    placeholder={'77'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('numero', e)
                    }}

                />
            </View>
            <View style={[styles.areaInput]}>
                <Text style={[styles.textIntput, {
                    fontWeight: '400',
                    marginTop: 15
                }]}>Bairro</Text>
                <TextInput
                    ref={input}
                    value={me.bairro && me.bairro}
                    style={styles.input}
                    placeholder={'BA'}
                    placeholderTextColor={'#A8A8A8'}
                    onChangeText={(e) => {
                        setState('bairro', e)
                    }}
                />
            </View>
        </View>
    )
}

export default Form;