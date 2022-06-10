import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TitleContainer: {
    marginTop: 10,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 15,
    margin: 10,
    backgroundColor: 'black',
    width: '90%',
  },
  TitleText: {
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: '700',
    padding: 10,
    textAlign: 'center',
    fontSize: 32,
  },
  ButtonContainer: {
    borderWidth: 5,
    borderColor: 'black',
    marginBottom: 250,
    width: '90%',
    borderRadius: 15,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  ButtonText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});
