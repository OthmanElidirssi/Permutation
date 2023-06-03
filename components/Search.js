import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Button ,FlatList} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';




const FilteredData = ({ filteredData }) => {
    return (

        <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
                return (
                    <View style={styles.cardContainer}>
                        <View key={ item._id} style={styles.card}>
                            <View style={styles.container}>
                                <Text style={styles.label}>Nom:</Text>
                                <Text>{ item.nom}</Text>
                            </View>

                            <View style={styles.container}>
                                <Text style={styles.label}>Prenom:</Text>
                                <Text>{ item.prenom}</Text>
                            </View>

                            <View style={styles.container}>
                                <Text style={styles.label}>Email:</Text>
                                <Text>{ item.email}</Text>
                            </View>

                            <View style={styles.container}>
                                <Text style={styles.label}>Téléphone:</Text>
                                <Text>{ item.tel}</Text>
                            </View>

                            <View style={styles.container}>
                                <Text style={styles.label}>Spécialité:</Text>
                                <Text>{ item.specialite}</Text>
                            </View>

                            <View style={styles.container}>
                                <Text style={styles.label}>Ville Actuelle:</Text>
                                <Text>{ item.villeFaculteActuelle}</Text>
                            </View>

                            <View style={styles.container}>
                                <Text style={styles.label}>Ville Désirée:</Text>
                                <Text>{ item.villeDesiree.split(';').join(',')}</Text>
                            </View>
                        </View>
                    </View>
                )
            }}

        />
    )


};

const Search = ({ data }) => {
    const [specialite, setSpecialite] = useState('');
    const [villeActuelle, setVilleActuelle] = useState('');
    const [villeDésirée, setVilleDésirée] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const specialiteArray = useMemo(() => {
        const set = new Set();
        const array = [];
        data.forEach(element => {
            if (!set.has(element.specialite)) {
                const obj = {
                    key: element.specialite,
                    value: element.specialite
                };
                array.push(obj);
                set.add(element.specialite);
            }
        });
        return array;
    }, []);

    const villeActuelleArray = useMemo(() => {
        const set = new Set();
        const array = [];
        data.forEach(element => {
            if (!set.has(element.villeFaculteActuelle)) {
                const obj = {
                    key: element.villeFaculteActuelle,
                    value: element.villeFaculteActuelle
                };
                array.push(obj);
                set.add(element.villeFaculteActuelle);
            }
        });
        return array;
    }, []);

    const handleSearch = () => {
        const filteredData = data.filter(element => {
            const desiredCities = element.villeDesiree.split(';');
            return (
                (specialite === '' || element.specialite === specialite) &&
                (villeActuelle === '' || element.villeFaculteActuelle === villeActuelle) &&
                (villeDésirée === '' || desiredCities.includes(villeDésirée))
            );
        });
        setFilteredData(filteredData);
    }

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <>
            <SelectList
                data={specialiteArray}
                setSelected={setSpecialite}
                boxStyles={{ marginVertical: 25, width: '95%', alignSelf: 'center' }}
                placeholder="Sélectionnez une Spécialité"
            />
            <SelectList
                data={villeActuelleArray}
                setSelected={setVilleActuelle}
                boxStyles={{ marginVertical: 25, width: '95%', alignSelf: 'center' }}
                placeholder="Sélectionnez la ville actuelle"
            />
            <SelectList
                data={villeActuelleArray}
                setSelected={setVilleDésirée}
                boxStyles={{ marginVertical: 25, width: '95%', alignSelf: 'center' }}
                placeholder="Sélectionnez la ville désirée"
            />

            <View style={styles.buttonContainer}>
                <Button title="Search" onPress={handleSearch} />
                <Button title="Reset" onPress={() => { setSpecialite(''); setVilleActuelle(''); setVilleDésirée(''); handleSearch() }} />
            </View>

                {filteredData.length > 0 && <FilteredData filteredData={filteredData} />}
        </>
    );
};

export default Search;



const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'space-around',
        width: '95%',
        flexDirection: 'row'
    },
    cardContainer: {
        marginVertical: 25,
        width: '95%',
        alignSelf: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 8
    },
    container: {
        flexDirection: 'row',
        marginVertical: 3,
        width: '95%',
        flexWrap: 'wrap'
    },
    label: {
        fontWeight: 'bold'
    }
});
