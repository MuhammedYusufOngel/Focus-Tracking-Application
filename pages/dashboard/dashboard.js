import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-web';

import TotalFocussing from './statistics/TotalFocussing.js';
import AllTimeFocussing from './statistics/AllTimeFocussing.js';
import TotalDistraction from './statistics/TotalDistraction.js';
import { useState } from 'react';

export default function DashboardScreen(){

  const [page, setPage] = useState(0)
  const up = "<--"
  const down = "-->"

  return (
    <View style={styles.tab}>
      <ScrollView style={styles.scroll}>
        <View style={styles.tables}>
          {
            page === 0 ? <TotalFocussing /> :
            (page === 1 ? <AllTimeFocussing /> : <TotalDistraction />)
          }
        </View>

        <View style={styles.ChangePage}>        
          <TouchableOpacity
              key='increase'
              style={[
                  styles.pageButton,
              ]}
              onPress={() => setPage((prev) => prev <= 0 ? prev + 1 : prev)}
              >
              <Text
                  style={[
                  styles.pageButtonText
                  ]}
              >
                  {up}
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              key='decrease'
              style={[
              styles.pageButton,
              ]}
              onPress={() => setPage((prev) => prev >= 0 ? prev - 1 : prev)}
          >
              <Text
                  style={[
                  styles.pageButtonText
                  ]}
              >
                  {down}
              </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>  
  )
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  scroll: {
    flex: 1,
    width: window.screen.width
  },
  tables: {
    flexDirection: 'row',
    padding: 15
  },
  ChangePage: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 20,
    gap: 15,
  },
  pageButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 3,
  },
  pageButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});