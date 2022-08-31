import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
} from "react-native";
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { SpringScrollView } from "react-native-spring-scrollview";

import Icon from 'react-native-vector-icons/MaterialIcons';

import { AuthManager } from '../../contexts/auth';
import { NotifyManager } from '../../contexts/notify';
import usePayment from '../../contexts/payments';

import { styles } from './styles';
import Theme from '../../../theme';

import NotifyComponent from "../../components/NotifyComponent";
import { toCashBR } from "../../../functools";
import { NormalHeader } from '../../components/LoadingHeader';
import { cobrancas } from "src/services/SelfServices/finance/cobrancas";

const Landing = (props) => {
  const { navigate } = useNavigation();
  const { setCobrancas } = usePayment()
  const { notify, setReload, reload, LoadingMore, setLoadingMore } = useContext(NotifyManager);
  const { setUser, perfil, setWaiting } = useContext(AuthManager);
  const [scrollNumber] = useState(8);

  let _scrollRef = [];
  for (let i = 0; i < scrollNumber; ++i) {
    _scrollRef.push(React.createRef());
  }


  useEffect(() => {
    notify.dispo &&
      setmakePay(notify.dispo.data[0])
  }, [notify])

  useEffect(() => {
    if (!LoadingMore)
      _scrollRef && _scrollRef.endRefresh()
  }, [LoadingMore])

  useEffect(() => {
    try {
      console.log(notify.data)
      const id = notify.data.filter((e) =>  e.pagamento_id === parseInt(props.navigation.getState().routes[0].params.cobrancas))
      if (id) {
        if(notify.data.length > 0 && id.length > 0){
          navigate('PaymentComplete')
          setCobrancas(id)
        }
      }
    } catch (err) {
      return
    }
  }, [notify])

  return (
    <View style={{ flex: 1, backgroundColor: Theme.PRIMARY }}>
      <View style={styles.conteiner}>
        <View style={styles.header}>
          <Text style={styles.mainText}>Olá{perfil && ', ' + perfil}</Text>
          <RectButton
            onPress={() => navigate('Settings')}>
            <Icon
              name='account-box'
              color='#F0F0F0'
              size={40}
            />
          </RectButton>
        </View>
        <SpringScrollView style={{}}
          showsVerticalScrollIndicator={false}
          ref={ref => (_scrollRef = ref)}
          refreshHeader={NormalHeader}
          onRefresh={() => {
            setLoadingMore(true);
            setReload(!reload);

          }}
        >
          <View style={styles.gridAreaButton}>
            <RectButton
              style={styles.btnGrid}
              onPress={() => navigate('Invoices')}
            >
              <View style={styles.gridIcons}>
                <Icon
                  name='request-quote'
                  color={Theme.PRIMARY}
                  size={50}
                />
              </View>
              <Text style={styles.btnText}>Faturas Abertas</Text>
            </RectButton>
            <RectButton style={styles.btnGrid} onPress={() => navigate('PaymentHistory')}>
              <View style={styles.gridIcons}>
                <Icon
                  name='history'
                  color={Theme.PRIMARY}
                  size={50}
                />
              </View>
              <Text style={styles.btnText}>Hístorico pagamentos</Text>
            </RectButton>
            <RectButton style={styles.btnGrid}
              onPress={() => navigate('Clints')}
            >
              <View style={styles.gridIcons}>
                <Icon
                  name='groups'
                  color={Theme.PRIMARY}
                  size={50} />
              </View>
              <Text style={styles.btnText}>Clientes</Text>
            </RectButton>
          </View>
          <View style={styles.areaNotify}>
            <Text style={styles.notifyText}>Área de notificações</Text>
            <SpringScrollView
              showsVerticalScrollIndicator={false}
              ref={ref => (_scrollRef = ref)}
              refreshHeader={NormalHeader}
              onRefresh={() => {
                setLoadingMore(true);
                setReload(!reload);
              }}
              style={styles.notifyGrid}
              nestedScrollEnabled={true}>
              {
                notify.data.length === 0 ?
                  <View style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <LottieView
                      style={{ width: 150 }}
                      loop={true}
                      autoPlay
                      source={require('../../assets/animations/empty.json')}
                    />
                    <Text style={{
                      color: Theme.PRIMARY,
                      fontSize: 12,
                      fontWeight: '600'
                    }}>Não há notificações no momento</Text>
                  </View>

                  :
                  notify.data.map((e) => {
                    return (
                      <NotifyComponent
                        key={e.pagamento_id}
                        noti={''}
                        id={e.pagamento_id}
                        name={`${e.status === 'PAGO' ? 'Recebemos seu pagamento no valor de'
                          : 'Pagamento no valor de'} ${toCashBR(e.valor ? e.valor : 0)} ${e.status === 'CANCELADO' ? 'cancelado'
                            : (e.status === 'PAGO' ? '' : 'pendente')}`}
                        color={e.status === 'CANCELADO' ? Theme.ERROR : (e.status === 'PAGO' ? Theme.SUCCESS : Theme.WARNING)}
                        onHandle={() => {
                          navigate('PaymentComplete')
                          setCobrancas([e])
                        }}
                      />
                    )
                  })
              }
              <View style={{
                height: 100
              }} />
            </SpringScrollView>
          </View>
          <View style={styles.closeAppArea}>
            <View style={styles.closeGrid}>
              <RectButton style={{ padding: 15 }} onPress={() => {
                setUser(null)
                AsyncStorage.clear()
                setWaiting(false)
              }}>
                <Text style={styles.closeText}>Sair do app</Text>
              </RectButton>
            </View>
          </View>
        </SpringScrollView>
      </View>
    </View>
  )

}

export default Landing;