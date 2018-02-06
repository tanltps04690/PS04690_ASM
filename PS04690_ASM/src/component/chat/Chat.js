import React from 'react';
import {Text,View,} from 'react-native';
import {GiftedChat,Avatar, GiftedAvatar,Message} from 'react-native-gifted-chat';

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

    renderAvatar() {
      if (this.props.user._id === this.props.currentMessage.user._id && !this.props.showUserAvatar) {
        return null;
      }
      const avatarProps = this.getInnerComponentProps();
      const { currentMessage } = avatarProps;
      if (currentMessage.user.avatar === null) {
        return null;
      }
      return <Avatar {...avatarProps} />;
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
                  name:'tanle',
                  avatar: 'http://angular.github.io/react-native-renderer/assets/react.png',
                  }
              });
            };
          this.messageRef.on('child_added',onReceive);


    }
    componentDidMount() {
     /**
      * GET KEY ID
      */



      /**
       * LOAD MESSAGE
       */
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
          console.log(this.keyID);
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
          }}

        />
      )
    }
}

export default Chat;
