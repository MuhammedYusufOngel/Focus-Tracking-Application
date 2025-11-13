import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen(){
  return (
    <View style={styles.tab}>
      <Text>Dashboard</Text>
    </View>  
  )
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});