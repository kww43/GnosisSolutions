import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
     backgroundColor: '#ffffff',
     flex: 2,
     alignItems: 'center'
   },
   fbIcon: {
     width: 24,
     height: 24
   },
   spacer: {
     width: 60
   },
   button: {
     width: 304,
     height: 40,
     backgroundColor: '#3b5998',
     borderRadius: 2,
     marginVertical: 10,
     paddingVertical: 8,
     paddingHorizontal: 4,
     alignItems: 'center',
     shadowColor: '#000000',
     shadowOffset: {
       width: 0,
       height: 3
     },
     shadowRadius: 5,
     shadowOpacity: 1.0,
     flexDirection: 'row'
   },
   WelcomeText: {
    height: 80,
    alignItems: 'center',
    marginTop: 160,
    marginBottom: 100,
    color: '#000000',
    fontSize: 20,
    fontFamily: 'FontAwesome'
   },
   buttonTxt: {
     fontSize: 14,
     color: "#ffffff",
     paddingHorizontal: 16,
     fontWeight: 'bold',
     alignItems: 'center'
   }
   // start listSelector styles
   // TODO: eliminate name conflicts and add more descriptive names
     container: {
      backgroundColor: '#1de9b6',
      flex: 1,

    },
    button: {
      width: 300,
      backgroundColor: '#3B5998',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 16,
      alignItems: 'center'
    },
    scrollContainer: {
     flex: 2,
   },

    buttonTxt: {
      fontSize: 20,
      color: "#ffffff",
    },

    addListButton: {
     width: 60,
     height: 60,
     borderRadius: 30,
     backgroundColor: '#00b8d4',
     position: 'absolute',
     bottom: 10,
     right: 10,
    },
    addButtons: {
     backgroundColor: '#00b8d4',
     width: 30,
     height: 30,
     alignItems: 'center',
     justifyContent: 'center',
     elevation: 0,
     borderRadius: 2,
     shadowColor: '#000000',
     shadowOffset: {
       width: 0,
       height: 3
     },
     shadowRadius: 5,
     shadowOpacity: 1.0
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
