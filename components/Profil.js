
import { View, Text, StyleSheet, TextInput, ScrollView ,Button,Alert,Image} from "react-native";
import { useState, useMemo } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from "react-native-dropdown-select-list";



const Label=({image,text})=>{


    return (
        <View style={styles.labelContainer}>

            <Image
                source={image}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={styles.labelText}>{text}</Text>
        </View>
    )
}

const Profile = ({ token, data, setToken}) => {

    let user = jwtDecode(token).userId;
    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [tel, setTel] = useState(user.tel);
    const [email, setEmail] = useState(user.email);
    const [grade, setGrade] = useState(user.grade);
    const [etablissement, setEtablissement] = useState(user.faculteActuelle);
    const [spécialité, setSpécialité] = useState(user.specialite);
    const [villeActuelle, setVilleActuelle] = useState(user.villeFaculteActuelle);
    const [villeDésirée,setVilleDésirée]=useState(user.villeDesiree.split(";"));




    const villeActuelleArray = useMemo(() => {
        const set = new Set();
        const array = [];
        data.forEach(element => {
            if (!set.has(element.villeFaculteActuelle)) {
                const obj = {
                    key: element._id,
                    value: element.villeFaculteActuelle
                };
                array.push(obj);
                set.add(element.villeFaculteActuelle);
            }
        });
        return array;
    }, []);


    function handleUpdate() {
        const updatedUser = {
          __v: 0,
          _id: user._id,
          password: user.password,
          nom: nom,
          prenom: prenom,
          tel: tel,
          email: email,
          grade: grade,
          faculteActuelle: etablissement,
          specialite: spécialité,
          villeFaculteActuelle: villeActuelle,
          villeDesiree: villeDésirée.join(';'),
        };
      
        // Make the API request to update the user
        fetch('https://plain-teal-bull.cyclic.app/professeurs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => response.json())
          .then((data) => {
            const { token } = data; 
            AsyncStorage.setItem('token',token);
            setToken(token);
            Alert.alert(
                'Update Successful',
                'You have successfully Updated Your Profile.',
                [
                  { text: 'OK'}
                ]
              );
            
          })
          .catch((error) => {

            console.error(error);
          });
      }
      

    

    return (
        <ScrollView>
            <View style={styles.container}>


                <Label image={require('../assets/user.png')} text={"Nom"}/>
                <TextInput
                    value={nom}
                    style={styles.input}
                    onChangeText={(val)=>setNom(val)}
                />
                <Label image={require('../assets/user.png')} text={"Prenom"}/>
                <TextInput
                    value={prenom}
                    style={styles.input}
                    onChangeText={(val)=>setPrenom(val)}
                />
                <Label image={require('../assets/phone-call.png')} text={"Téléphone"}/>

                <TextInput
                    value={tel}
                    style={styles.input}
                    keyboardType="phone-pad"
                    onChangeText={(val)=>setTel(val)}
                />
                <Label image={require('../assets/email.png')} text={"Email"}/>
                <TextInput
                    value={email}
                    style={styles.input}
                    editable={false}
                />
                <Label image={require('../assets/graduate.png')} text={"Grade"}/>
                <TextInput
                    value={grade}
                    style={styles.input}
                    onChangeText={(val)=>setGrade(val)}
                />
                <Label image={require('../assets/university-building.png')} text={"Etablissement (abréviation: FST, FS, EST, ENSA ...)"}/>

                <TextInput
                    value={etablissement}
                    style={styles.input}
                    onChangeText={(val)=>setEtablissement(val)}
                />
                <Label image={require('../assets/book-of-black-cover-closed.png')} text={"Spécialité"}/>

                <TextInput
                    value={spécialité}
                    style={styles.input}
                    onChangeText={(val)=>setSpécialité(val)}
                />
                <Label image={require('../assets/maps-and-flags.png')} text={"Ville Actuelle"}/>

                <SelectList
                    data={villeActuelleArray}
                    setSelected={setVilleActuelle}
                    defaultOption={{ key:villeActuelle, value: villeActuelle }}
                    boxStyles={{ width: 350, height: 45, borderColor: 'black', borderWidth: 2}}
                    save="value"
                />
                <Label image={require('../assets/maps-and-flags.png')} text={"Villes Désirées"}/>
                <MultipleSelectList
                    data={villeActuelleArray}
                    setSelected={(val)=>setVilleDésirée(val)
                    }
                    boxStyles={{ width: 350,borderColor: 'black',borderWidth: 2}}
                    label="Villes Désirées"
                    save="value"
                />
                <Button title="update" onPress={handleUpdate}/>
            </View>
        </ScrollView>
    )
}

export default Profile;

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: 350,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 15
    },
    labelContainer:{
        flexDirection:'row',
        alignSelf:'flex-start',
        marginLeft:25,
        marginTop:10,
        marginBottom:5
    },
    image:{
        width:20,
        height:20,
        marginRight:5,
        alignSelf:'flex-end'
    },
    labelText:{
        alignSelf:'flex-end',
        marginTop:4
    }
})