import React from 'react';
import {Text,View,} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';
import Login from '../login/Login';

class Chat extends React.Component {
  constructor() {
    super();
    
     console.ignoredYellowBox = [
         'Setting a timer'
     ];
    }
    keyId=null;
   user = firebase.auth().currentUser;
  messageRef = firebase.database().ref('messages');
  
    state = {
      messages: [],
    }
   
    loadmes(calback){
      
      const onReceive =(data)=>{
        
              const message = data.val();
              this.keyId =data.key;
              calback({
                _id:data.key,
                text:message.text,
                createdAt: new Date(message.createdAt),
                user:{
                  avatar: 'https://facebook.github.io/react/img/logo_og.png',
                  _id:1,
                  name:'Tanle'
                  },
              });
            };
          this.messageRef.on('child_added',onReceive);
          
    }
    componentDidMount() {
      
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },
        ],
      })

      this.loadmes((message)=>{
      this.setState(previousState => (
        {
        
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
    }
  
    onSend(messages = []) {
      this.messageRef = firebase.database().ref('messages');
      
      for(let i = 0;i<messages.length;i++){
        this.messageRef.push({
              text:messages[i].text,
              user:messages[i].user,
              createdAt:firebase.database.ServerValue.TIMESTAMP
            });
          }
    }
  
    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id:this.user._id,
          }}
        />
      )
    }
}
 
export default Chat;
