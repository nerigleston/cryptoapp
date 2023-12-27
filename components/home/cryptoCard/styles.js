import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cryptoCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cryptoImage: {
    width: 45,
    height: 45,
  },
  cryptoText: {
    textAlign: 'center',
  },
  addToWalletText: {
    color: 'white',
    fontWeight: 'bold',
  },
  greenButton: {
    backgroundColor: 'green',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  grayButton: {
    backgroundColor: 'gray',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  grayButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  alreadyAddedContainer: {
    alignItems: 'center',
  },
  alreadyAddedText: {
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default styles;
