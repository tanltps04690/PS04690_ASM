import React from 'react';
import{ View, Image,StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Alert } from 'react-native';
import {Actions} from 'react-native-router-flux';
import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';
class Login extends React.Component {
    state = {
        uname:'',
        pword:'',
        pwordConfirmation:'',
        fname:'',

    };
    register(){
        if(this.state.pword==this.state.pwordConfirmation){
            firebase.auth().createUserWithEmailAndPassword(this.state.uname, this.state.pword)
                .then((user) => {
                Actions.profile();
                })
                .catch((error) => {

                Alert.alert(
                        'Alert Title',
                        'Register Fail'+error.message,
                        [
                            {text:'Cancel',onPress:()=> console.log('Canceled'), style:'cancel'},
                            {text:'Ok',onPress:()=>console.log('Ok')},
                        ],
                             {cancelable:false}
                    )
                });
        }
        else{
            Alert.alert(
                        'Alert Title',
                        'Register Fail',
                        [
                            {text:'Cancel',onPress:()=> console.log('Canceled'), style:'cancel'},
                            {text:'Ok',onPress:()=>console.log('Ok')},
                        ],
                             {cancelable:false}
                    )
        }



    }
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
                        placeholder='email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        ref={(input)=>this.unameInput=input}
                        onSubmitEditing={()=>this.passwordInput.focus()}
                        onChangeText={(text) => this.setState({uname:text})}
                        value={this.state.uname}
                        />
                    <TextInput
                        returnKeyType="next"
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        secureTextEntry
                        style={styles.input}
                        placeholder='password'
                        ref={(input)=>this.passwordInput=input}
                        onSubmitEditing={()=>this.repasswordInput.focus()}
                        onChangeText={(text) => this.setState({pword:text})}
                        value={this.state.pword}
                    />
                    <TextInput
                        returnKeyType="go"
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        secureTextEntry
                        style={styles.input}
                        placeholder='password confirm'
                        ref={(input)=>this.repasswordInput=input}
                        onChangeText={(text) => this.setState({pwordConfirmation:text})}
                        value={this.state.pwordConfirmation}
                    />
                    <TouchableOpacity style={styles.buttoncontainer}
                                        onPress={()=>{
                                            this.register();
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
    },
    buton:{
        textAlign:'center',
        color:'#fff',
        fontSize:22,
        fontWeight: 'bold',
    }
})
export default Login;
