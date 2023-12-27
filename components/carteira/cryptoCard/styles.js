import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cryptoCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: '#000',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cryptoImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  }
});

export default styles;
