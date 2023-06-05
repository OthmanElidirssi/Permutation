import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Propos = () => {


  return (
    <View style={styles.card}>
      <Text style={styles.title}>Plateforme de Permutation pour Enseignants Universitaires</Text>
      <Text style={styles.description}>
        Cette plateforme est simplement un espace permettant aux professeurs
        universitaires de rechercher un partenaire pour une permutation. 
        Elle se limite à cette fonctionnalité. Les enseignants peuvent 
        rechercher des partenaires intéressés par un échange dans d'autres
        établissements d'enseignement supérieur. Le système facilite la
        recherche et la correspondance entre les enseignants ayant une 
        volonté mutuelle d'échanger.
      </Text>
      <Text style={styles.description}>
        La plateforme offre une interface conviviale et sécurisée aux 
        enseignants pour communiquer et échanger les informations nécessaires.
        Les membres peuvent créer des profils personnels et renseigner des 
        informations concernant leurs spécialités, les établissements et les 
        informations de contact. Les enseignants peuvent consulter les profils
        des partenaires potentiels et entrer en contact avec eux pour discuter
        des détails de l'accord d'échange.
      </Text>
      <Text style={styles.description}>
        En utilisant cette plateforme, les enseignants peuvent faciliter
        leur recherche de partenaires d'échange, économiser du temps et
        des efforts en évitant les communications individuelles et les 
        recherches continues d'opportunités d'échange. Ce système est 
        efficace et utile pour les enseignants souhaitant changer
        d'institution ou travailler dans un nouvel établissement
        pour élargir leur expérience académique.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
});

export default Propos;
