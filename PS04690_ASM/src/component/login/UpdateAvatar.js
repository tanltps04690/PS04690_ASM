import React from 'react';
import{View, TextInput,StyleSheet, TouchableOpacity, Text,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';
import Variable from '../../Backend';


import ImagePicker from 'react-native-image-picker';
const user = firebase.auth().currentUser;
class updateAvatar extends React.Component {
    state = {avatar:require('../../images/avatar.png'),
    nextKeyID:0
    }
    

    chooseAvatar(){
        var options = {
            title: 'Select Avatar',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
              
              this.setState({
                avatar: source
              });
            }
          });
          
    }
    setKeyID(){
        this.getKeyID = firebase.database().ref('users/'+user.uid).set({
            keyID:Number(this.state.nextKeyID)+1
        });
        this.getKeyID = firebase.database().ref('keyID').set({
            keyID:Number(this.state.nextKeyID)+1
        })

        
    }
    
    render() { 
        let img = this.state.avatar==null?null:
        <TouchableOpacity onPress={()=>{
            this.chooseAvatar()
        }}>
        <Image
            source={this.state.avatar}
            style={styles.avatar}
           
        />
        </TouchableOpacity>
        return ( 
            <View style={styles.container}>
            <View style = {styles.avatarContainer}
            
            >
                {img}
                <Text style={styles.text}>Choose Avatar</Text>
            </View>
                <TouchableOpacity 
                style={styles.buttoncontainer}
                onPress={()=>{
                    
                    // alert(this.props.dpName)
                    this.getKeyID = firebase.database().ref('keyID').on('value',(data)=>{
                        //Variable.Variable.nextKeyID = data.val().keyID;
                        this.setState({nextKeyID:data.val().keyID})
                    });
                    // Set keyID To User Profile
                     console.log(Number(this.state.nextKeyID)+1)
                     this.setKeyID();
                    
                    //Actions.chat()
                }}
                >
                <Text style={styles.buton}
                >
                    Start Chat
                </Text>
                </TouchableOpacity>
                
            </View>
         )
    }
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3498db'
    },
    avatar:{
        width:150,
        height:150,
        borderRadius:75,
        justifyContent:'center',
    },
    avatarContainer:{
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    text:{
        color:'rgba(255,255,255,0.6)',
        fontSize:18,
        fontWeight:'500',

        
    },
    buttoncontainer:{
        backgroundColor:'#2980b9',
        paddingVertical: 10,
        marginBottom: 10,
    },
    buton:{
        textAlign:'center',
        color:'#fff',
        fontSize:22,
        fontWeight: 'bold',
    }
})

export default updateAvatar;