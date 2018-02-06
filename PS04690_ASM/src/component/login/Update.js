import React from 'react';
import{View, TextInput,StyleSheet, TouchableOpacity, Text,Image} from 'react-native';


import ImagePicker from 'react-native-image-picker'
class Update extends React.Component {
    state = {displayName:'',
            avatar:null    
}
    Updateproperties(){
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
    render() { 
        let img = this.state.avatar==null?null:
        <Image
            source={this.state.avatar}
            style={{height:200,width:200ß}}
        />
        return (  
            <View style={styles.container}>
            <View style={styles.inputcontainer}>
                <TextInput
                style={styles.input}
                placeholder="display name"

                />
                </View>
                <TouchableOpacity 
                style={styles.buttoncontainer}
                onPress={()=>{
                    this.Updateproperties()
                }}
                >
                <Text style={styles.buton}>
                    Choose Avatar
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttoncontainer}>
                <Text style={styles.buton}>
                    Start Chat
                </Text>
                </TouchableOpacity>
                {img}
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
export default Update;