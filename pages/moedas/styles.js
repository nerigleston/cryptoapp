import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  reloadButton: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyItem: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});

export default styles;
