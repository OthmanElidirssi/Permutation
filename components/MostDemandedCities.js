import React from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import PieChart from 'react-native-pie-chart';


const MostDemandedCities = ({ data }) => {
  const widthAndHeight = 250;
  let colors = [];

  const generateColors = (count) => {
    const colors = [];
    const saturation = 70;
    const lightness = 50;
  
    for (let i = 0; i < count; i++) {
      const hue = (i * (360 / count)) % 360;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      colors.push(color);
    }
  
    return colors;
  };
    
  const cityCounts = {};

  data.forEach((professor) => {
    const { villeDesiree } = professor;
    const cities = villeDesiree.split(';');

    cities.forEach((city) => {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
  });

  colors = generateColors(Object.keys(cityCounts).length);

  const chartData = Object.values(cityCounts);
  const chartColors = colors.slice(0, chartData.length);

  const cityCountsArray = Object.entries(cityCounts).map(([city, count], index) => ({
    city,
    count,
    color: colors[index % colors.length],
  }));

  return (

    <ScrollView>
    <View style={styles.container}>
      <View style={styles.citiesContainer}>
        {Object.keys(cityCounts).map((city, index) => (
          <View key={index} style={styles.cityItem}>
            <Text style={[styles.cityText, { backgroundColor: chartColors[index] }]}>
              {city}
            </Text>
          </View>
        ))}
      </View>
      <PieChart widthAndHeight={widthAndHeight} series={chartData} sliceColor={chartColors} />
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeaderCell, styles.boldText]}>City</Text>
          <Text style={[styles.tableHeaderCell, styles.boldText]}>Count</Text>
        </View>
        {cityCountsArray.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, {textAlign: 'center'}]}>{item.city}</Text>
            <Text style={[styles.tableCell, {textAlign: 'center'},{ backgroundColor: item.color, borderRadius: 5 }]}>
              {item.count}
            </Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  citiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cityItem: {
    marginRight: 10,
    marginBottom: 10,
  },
  cityText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#FFF',
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  tableHeaderCell: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    marginHorizontal: 25,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#333',
    textAlign: 'center',
  },
});

export default MostDemandedCities;