import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProfessorsChart from './components/ProfessorsChart';
import ProfessorsBySpecialite from './components/ProfessorsBySpecialite';
import MostDemandedCities from './components/MostDemandedCities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Propos from './components/Propos';
import Search from './components/Search';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profil';
import Inscription from './components/Inscription';

const Drawer = createDrawerNavigator();

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchProfessorsData();
  }, [token]);

  const fetchProfessorsData = () => {
    fetch('https://plain-teal-bull.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };


  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="ProfessorsChart" options={{ title: 'Professors by Grade' }}>
          {() => <ProfessorsChart data={data} />}
        </Drawer.Screen>
        <Drawer.Screen name="ProfessorsBySpecialite" options={{ title: 'Professors by Specialité' }}>
          {() => <ProfessorsBySpecialite data={data} />}
        </Drawer.Screen>
        <Drawer.Screen name="MostDemandedCities" options={{ title: 'Demanded Cities' }}>
          {() => <MostDemandedCities data={data} />}
        </Drawer.Screen>
        {token ? (
          <Drawer.Screen name="Search" options={{ title: 'Search' }}>
            {() => <Search data={data} />}
          </Drawer.Screen>
        ) : null}
        {token ? (
          <Drawer.Screen name="Profile" options={{ title: 'Profile' }}>
            {() => <Profile token={token} data={data} setToken={setToken}/>}
          </Drawer.Screen>
        ) : null}
        {!token ? (
          <Drawer.Screen name="Inscription" options={{ title: 'Inscription' }}>
            {({navigation}) => <Inscription  data={data} navigation={navigation} />}
          </Drawer.Screen>
        ) : null}
        <Drawer.Screen name="Propos" component={Propos} options={{ title: 'A propos' }} />
        {!token ? (
          <Drawer.Screen name="Login" options={{ title: 'Login' }}>
            {({navigation}) => <Login setToken={setToken} navigation={navigation} />}
          </Drawer.Screen>
        ) : (
          <Drawer.Screen
            name="Logout"
            options={{ title: 'Logout' }}
            component={Logout}
            initialParams={{ handleLogout }}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};



export default App;



