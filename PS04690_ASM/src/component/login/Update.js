import React from 'react';
import{View, TextInput,StyleSheet, TouchableOpacity, Text,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';

import ImagePicker from 'react-native-image-picker'
class Update extends React.Component {
    state = {displayName:'',
              
}
    user = firebase.auth().currentUser;
    Updateproperties(){

    }
    render() { 
       
        return (  
            <View style={styles.container}>
            <View style={styles.inputcontainer}>
                <TextInput
                style={styles.input}
                placeholder="display name"
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({displayName:text})}
                value={this.state.displayName}
                />
                </View>
                
                <TouchableOpacity style={styles.buttoncontainer}
                onPress={()=>{
                    
                    this.user.updateProfile({
                        displayName:this.state.displayName
                    }).then(()=>{
                        Actions.updateAvatar()
                    })

                }}
                >
                <Text style={styles.buton}>
                    Next Step
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
  
    inputcontainer:{
        padding:20,
        flexGrow:1,
        justifyContent:'center',
    },
    avatar:{
        width:150,
        height:150,
        borderRadius:75
    },
    input:{
        backgroundColor:'rgba(255,255,255,0.4)',
        height:40,
        marginBottom:20,
        fontSize:18,
        color:'#fff',
        paddingHorizontal: 10,
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
export default Update;