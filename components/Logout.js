import React from 'react';
import { View, Text, StyleSheet,Button,Image,TouchableOpacity} from 'react-native';


const Logout = ({route}) => {
    const { handleLogout } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center' ,marginVertical:50}}>
            <Image

            source={require('../assets/logout.png')}
            resizeMode="contain"
            style={styles.image}
            
            />
            <Text style={styles.text}>Oh no! You are Leaving...</Text>
            <Text style={styles.text}>Are you Sure?</Text>
            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.logout}>
                    <Text style={styles.buttonText}>Yes Log Me out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default Logout;

const styles=StyleSheet.create({

    image:{
        width:200,
        height:200,
        marginBottom:40
    },
    text:{
        fontSize:20,
        marginVertical:5,
    },
    logout:{
        alignItems:'center',
        justifyContent:'center',
        width:300,
        height:70,
        borderRadius:50,
        borderWidth:2,
        borderColor:'#2196F3',
        marginVertical:35
    },
    buttonText:{
        color:'#2196F3',
        fontSize:20,
        fontWeight:'300'
    }
})