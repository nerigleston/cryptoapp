import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cryptoCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
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
