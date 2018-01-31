import React from 'react';
import{ View, Image,StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Alert } from 'react-native';
import {Actions} from 'react-native-router-flux';
import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';
class Login extends React.Component {
    
    state = {
        uname:'',
        pword:''
    };
    
    render() { 
        return (  
            
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.logocontainer}>
                    <Image 
                        style={styles.logo}
                        source = {require('../../images/logo.png')}
                    />
                </View>
                <View style={styles.inputcontainer}
                        
                >
                    <TextInput
                        returnKeyType="next"
                        style={styles.input}
                        placeholder='username'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        onSubmitEditing={()=>this.passwordInput.focus()}
                        onChangeText={(text) => this.setState({uname:text})}
                        value={this.state.uname}
                        />
                    <TextInput
                        returnKeyType="go"
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        secureTextEntry
                        style={styles.input}
                        placeholder='password'
                        ref={(input)=>this.passwordInput=input}
                        onChangeText={(text) => this.setState({pword:text})}
                        value={this.state.pword}
                    />
                    <TouchableOpacity style={styles.buttoncontainer}
                                        onPress={()=>{
                                            
                                            firebase.auth().signInWithEmailAndPassword(this.state.uname, this.state.pword)
                                            .then((user)=>{
                                                
                                                Actions.chat({_uid:user.uid})
                                            })
                                            .catch(function(error) {
                                               Alert.alert(
                                                   'Alert Title',
                                                   'Login Fail',
                                                   [
                                                       {text:'Cancel',onPress:()=> console.log('Canceled'), style:'cancel'},
                                                       {text:'Ok',onPress:()=>console.log('Ok')},
                                                   ],
                                                   {cancelable:false}
                                               )
                                                
                                              });
                                        }}
                    >
                    
                        <Text style={styles.buton}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttoncontainer}
                                        onPress={()=>{
                                            Actions.register()
                                           
                                        }}
                    >
                    
                        <Text style={styles.buton}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3498db'
    },
    logo:{
        width:200,
        height:110
    },
    logocontainer:{
        alignItems:'center',
        flexGrow:1,
        justifyContent:'center',
    },
    inputcontainer:{
        padding:20
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
export default Login;