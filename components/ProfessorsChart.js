import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const ProfessorsChart = ({ data }) => {
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
    
  const gradeCounts = {};

  data.forEach((professor) => {
    const { grade } = professor;
    gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
  });

  colors=generateColors(Object.keys(gradeCounts).length);

  const chartData = Object.values(gradeCounts);
  const chartColors = colors.slice(0, chartData.length);

  const gradeCountsArray = Object.entries(gradeCounts).map(([grade, count], index) => ({
    grade,
    count,
    color: colors[index % colors.length],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.professorsContainer}>
        {Object.keys(gradeCounts).map((grade, index) => (
          <View key={index} style={styles.professorItem}>
            <Text style={[styles.professorText, { backgroundColor: chartColors[index] }]}>
              {grade}
            </Text>
          </View>
        ))}
      </View>
      <PieChart widthAndHeight={widthAndHeight} series={chartData} sliceColor={chartColors} />
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeaderCell, styles.boldText]}>Grade</Text>
          <Text style={[styles.tableHeaderCell, styles.boldText]}>Count</Text>
        </View>
        {gradeCountsArray.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, {textAlign: 'center'}]}>{item.grade}</Text>
            <Text style={[styles.tableCell, {textAlign: 'center'},{ backgroundColor: item.color, borderRadius: 5 }]}>
              {item.count}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  professorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  professorItem: {
    marginRight: 10,
    marginBottom: 10,
  },
  professorText: {
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
  },  tableHeaderCell: {
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

export default ProfessorsChart;







