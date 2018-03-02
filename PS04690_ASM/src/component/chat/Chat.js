import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {GiftedChat,Avatar, GiftedAvatar,Message,utils} from 'react-native-gifted-chat';

import{firebaseApp}from '../../../firebaseConfig';
import * as firebase from 'firebase';
import Login from '../login/Login';
class Chat extends React.Component {
  keyID = '';
  user = firebase.auth().currentUser;
    messageRef = firebase.database().ref('messages');

  constructor() {
    super();
     console.ignoredYellowBox = [
         'Setting a timer'
     ];
     this.getKeyID = firebase.database().ref('users/'+this.user.uid).on('value',(data)=>{
      let root = data.val();
      this.keyID = root.keyID;
      console.log(this.keyID);
    });
    }
    state = {
      messages: [],
    }


    loadmes(calback){

      const onReceive =(data)=>{

              const message = data.val();
              calback({
                _id:data.key,
                text:message.text,
                createdAt: new Date(message.createdAt),
                user:{
                  _id:message.user._id,
                  name:message.user.name,
                  avatar: message.user.avatar
                  }
              });
            };
          this.messageRef.on('child_added',onReceive);


    }
    componentDidMount() {
      this.loadmes((message)=>{
      this.setState(previousState => (
        {
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
    }

    onSend(messages = []) {
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
        showAvatarForEveryMessage={true}
          showUserAvatar={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id:this.keyID,
            name:this.user.displayName,
            avatar:this.user.photoURL
          }}
          showUserAvatar={true}
        />
        
      )
    }
}

export default Chat;
