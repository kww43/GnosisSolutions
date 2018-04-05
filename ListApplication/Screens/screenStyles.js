import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   // login screen styles
   loginContainer: {
     backgroundColor: '#ffffff',
     flex: 2,
     alignItems: 'center'
   },
   loginLogo: {
     marginVertical: 100,
     width: 200,
     height: 200
   },
   fbButton: {
     width: 304,
     height: 40,
     backgroundColor: '#3b5998',
     borderWidth: 0,
     borderRadius: 2,
     marginVertical: 10,
     paddingVertical: 8,
     paddingHorizontal: 4,
     alignItems: 'center',
     // NOTE: RN shadow props not supported on Android,
     //       elevation is as close as it gets
     elevation: 3,
     flexDirection: 'row'
   },
   fbButtonText: {
     fontSize: 14,
     color: "#ffffff",
     paddingHorizontal: 16,
     fontWeight: 'bold',
     alignItems: 'center'
   },
   fbIcon: {
     width: 24,
     height: 24
   },
   spacer: {
     width: 60
   },
   // listSelector styles
   // TODO: eliminate name conflicts and add more descriptive names
   listSelectorContainer: {

   },
   scrollContainer: {
     flex: 2,
   },

   buttonTxt: {
     fontSize: 20,
     color: "#ffffff",
   },
   addButtonText: {
     fontSize: 24,
   },
   modalContainer: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor:'rgba(255,255,255,0.5)',
   },
   innerContainer: {
     alignItems: 'center',
   },
   floatingButton : {
     width: 60,
     height: 60,
     borderRadius: 30,
     backgroundColor: '#00b8d4',
     position: 'absolute',
     alignItems: 'center',
     bottom: 10,
     right: 10,
   },
   listItem: {
     position: 'relative',
     backgroundColor: "#ffffff",
     padding: 20,
     paddingRight: 0,
     borderBottomWidth: 2,
     borderBottomColor: '#ededed',
     flex: 1,
     flexDirection: 'row',
   },
   listText: {
     fontSize: 24,
   },
   modal :{
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 2,
     padding: 10
   },
   modalInside: {
     borderRadius: 5,
     width: 150,
     height: 150,
     backgroundColor: 'white',
     shadowOpacity: 1.0,
     shadowRadius: 2,
     borderWidth: 1,
     borderColor: '#ddd'
   }
});
