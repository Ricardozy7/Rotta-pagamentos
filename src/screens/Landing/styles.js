import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Theme from '../../../theme';

const windowHeigth = Dimensions.get('window').height

export const styles = StyleSheet.create({
  conteiner: {
    height: '100%',
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
  },
  perfilText: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  btnNavigates: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  notifyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700'
  },
  header: {
    width: '100%',
    backgroundColor: Theme.PRIMARY,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    minHeight: '7%'
  },
  mainText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 15
  },
  gridIcons: {
    padding: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnGrid: {
    paddingVertical: 15,
    width: '25%',
    alignItems: 'center',
    borderRadius: 50
  },
  btnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10
  },

  gridAreaButton: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  areaNotify: {
    padding: 20,
  },
  notifyGrid: {
    height: windowHeigth * .50,
    width: '100%',
    backgroundColor: '#F0F0F0',
    marginTop: '10%',
    borderRadius: 10,
    padding: 20,
    zIndex: 10
  },
  notifyCard: {
    width: '100%',
    height: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3
  },
  animateArea: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '25%'
  },
  closeAppArea: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  closeGrid: {
    borderWidth: 1,
    borderColor: Theme.PRIMARY,
    width: 150,
    borderRadius: 10,
    padding: 5
  },
  closeText:{
    color: Theme.PRIMARY, 
    fontSize: 10, 
    textAlign: 'center' 
  },
  makePayConteiner:{
    flex: 1, 
    backgroundColor: '#00000050', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  makePayArea:{
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
    width: '100%'
  },
  chargeCancelArea:{
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 10
  },
  textCancelCharge:{
    backgroundColor: Theme.ERROR, 
    padding: 10, 
    color: '#fff', 
    borderRadius: 5, 
    width: '100%',
    textAlign: 'center'
  },
  copy:{
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    width: '50%', 
    marginTop: 10, 
    justifyContent: 'center', 
    borderRadius: 5
  },
  btn:{
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, width: '48%', 
    marginTop: 10, 
    justifyContent: 'center', 
    backgroundColor: Theme.PRIMARY + '10', borderRadius: 5
  },
  btnNewCharge:{
    backgroundColor: Theme.PRIMARY + '10', 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 5, 
    alignItems: 'center'
  },
  btnModalClose:{
    paddingVertical: 15, 
    marginTop: 10, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})
