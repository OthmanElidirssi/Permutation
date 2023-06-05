
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert, Image } from "react-native";
import { useState, useMemo } from "react";
import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from "react-native-dropdown-select-list";



const Label = ({ image, text }) => {


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

const Inscription= ({ data, navigation }) => {


    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [grade, setGrade] = useState("");
    const [etablissement, setEtablissement] = useState("");
    const [spécialité, setSpécialité] = useState("");
    const [villeActuelle, setVilleActuelle] = useState("");
    const [villeDésirée, setVilleDésirée] = useState([]);




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

    function handlePress() {
        navigation.navigate("Login");
    }


    function handleInscription() {
        const updatedUser = {
            password: password,
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
        fetch('https://troubled-red-garb.cyclic.app/professeurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                Alert.alert(
                    'User added Successfully',
                    'Your Profile has been added successfully.',
                    [
                        { text: 'OK', onPress: handlePress }
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


                <Label image={require('../assets/user.png')} text={"Nom"} />
                <TextInput
                    placeholder="Entrez votre nom"
                    style={styles.input}
                    onChangeText={(val) => setNom(val)}
                />
                <Label image={require('../assets/user.png')} text={"Prenom"} />
                <TextInput
                    placeholder="Entrez votre prenom"
                    style={styles.input}
                    onChangeText={(val) => setPrenom(val)}
                />
                <Label image={require('../assets/phone-call.png')} text={"Téléphone"} />

                <TextInput
                    placeholder="Entrez votre téléphone"
                    style={styles.input}
                    keyboardType="phone-pad"
                    onChangeText={(val) => setTel(val)}
                />
                <Label image={require('../assets/email.png')} text={"Email"} />
                <TextInput 
                    placeholder="Entrez votre email"
                    style={styles.input}
                    onChangeText={(val) => setEmail(val)}
                />

                <Label image={require('../assets/privacy.png')} text={"Password"} />
                <TextInput
                    placeholder="Entrez votre mot de passes"
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(val) => setPassword(val)}
                />

                <Label image={require('../assets/graduate.png')} text={"Grade"} />
                <TextInput
                    placeholder="Entrez votre grade"
                    style={styles.input}
                    onChangeText={(val) => setGrade(val)}
                />
                <Label image={require('../assets/university-building.png')} text={"Etablissement (abréviation: FST, FS, EST, ENSA ...)"} />

                <TextInput 
                    placeholder="Entrez votre établissement"
                    style={styles.input}
                    onChangeText={(val) => setEtablissement(val)}
                />
                <Label image={require('../assets/book-of-black-cover-closed.png')} text={"Spécialité"} />

                <TextInput
                    placeholder="Entrez votre spécialité"
                    style={styles.input}
                    onChangeText={(val) => setSpécialité(val)}
                />
                <Label image={require('../assets/maps-and-flags.png')} text={"Ville Actuelle"} />

                <SelectList
                    data={villeActuelleArray}
                    setSelected={setVilleActuelle}
                    boxStyles={{ width: 350, height: 45, borderColor: 'black', borderWidth: 2 }}
                    save="value"
                />
                <Label image={require('../assets/maps-and-flags.png')} text={"Villes Désirées"} />
                <MultipleSelectList
                    data={villeActuelleArray}
                    setSelected={(val) => setVilleDésirée(val)
                    }
                    boxStyles={{ width: 350, borderColor: 'black', borderWidth: 2 }}
                    label="Villes Désirées"
                    save="value"
                />
                
                <Button title="Inscription" onPress={handleInscription} />
            </View>
        </ScrollView>
    )
}

export default Inscription;

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
    labelContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 5
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 5,
        alignSelf: 'flex-end'
    },
    labelText: {
        alignSelf: 'flex-end',
        marginTop: 4
    }
})