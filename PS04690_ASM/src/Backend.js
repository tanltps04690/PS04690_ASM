import firebase from 'firebase';
import firebaseApp from '../firebaseConfig'

class Backend {
  messageRef = firebase.database().ref('messages');
  loadmes(calback){
    this.messageRef.off();
    const onReceive =(data)=>{
      this.messageRef.off();
            const message = data.val();
            calback({
              _id:data.key,
              text:message.text,
              createdAt: new Date(message.createdAt),
              user:{
                _id:'123',
                name:'me'
                },
            });
          };
        this.messageRef.on('child_added',onReceive);
        
  }
  sendmes(message){
    for(let i = 0;i<message.length;i++){
      this.messageRef.push({
            text:message[i].text,
            user:message[i].user,
            createdAt:firebase.database.ServerValue.TIMESTAMP
          });
        }
  }
  componentDidMount(){
    // this.loadmes((message)=>{
    //   this.setState(previousState => (
    //     {
        
    //     messages: GiftedChat.append(previousState.messages, message),
    //   }));
    // });
  }
}
 
export default Backend;