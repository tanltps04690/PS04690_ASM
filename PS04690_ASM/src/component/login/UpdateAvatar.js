import React from 'react';
import{View, TextInput,StyleSheet, TouchableOpacity, Text,Image,Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
const storage = firebase.storage();
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
import ImagePicker from 'react-native-image-picker';



//  const user = firebase.auth().currentUser;
const uploadImage = (uri, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = storage.ref('avatar').child(`${sessionId}`)
  
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
            user.updateProfile({
                photoURL:url
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

class updateAvatar extends React.Component {
    state = {avatar:require('../../images/avatar.png'),
    nextKeyID:0
    }
    user = firebase.auth().currentUser;
    


    
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
          this.setState({uploadUri:''})
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
              uploadImage(response.uri).then(
                  url=>this.setState({uploadUri:url},
                    this.setKeyID(),
                    this.user.updateProfile({
                        displayName:this.user.displayName,
                        photoURL:url
                    }).catch(()=>{
                        alert('error')
                    }),
                    console.log('Image: '+url)
                ))
              this.setState({
                avatar: source
              });
            }
          });
          
    }
    setKeyID(){
        //  let user = firebase.auth().currentUser.uid;
        this.getKeyID = firebase.database().ref('keyID').set({
            keyID:Number(this.state.nextKeyID)+1
        }).then(
            this.setUserID = firebase.database().ref('users/'+this.user.uid).set({
                keyID:Number(this.state.nextKeyID)+1
            }).then(()=>{
                Actions.chat()
            })
        )
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
                    this.user.updateProfile({
                        photoURL:this.state.uploadUrl
                    })
                    // alert(this.props.dpName)
                    this.getKeyID = firebase.database().ref('keyID').on('value',(data)=>{
                        //Variable.Variable.nextKeyID = data.val().keyID;
                        this.setState({nextKeyID:data.val().keyID})
                       
                    });
                    // Set keyID To User Profile
                    // this.setKeyID();
                     console.log(Number(this.state.nextKeyID)+1)
                    
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