import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';

import TotalFocussing from './statistics/TotalFocussing.js';
import AllTimeFocussing from './statistics/AllTimeFocussing.js';
import TotalDistraction from './statistics/TotalDistraction.js';

import { DataTable } from 'react-native-paper'
import { useEffect, useState } from 'react';

import * as SQLite from "expo-sqlite";

export default function DashboardScreen(){

  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const db = SQLite.openDatabaseSync("test.db");

    const dneeme = db.getAllSync("SELECT * FROM 'FocussingTracking'")
    console.log(dneeme)

    setRows(db.getAllSync("SELECT * FROM 'FocussingTracking'"))
  }, [])

  const up = "<--"
  const down = "-->"

  const width = Dimensions.get("window").width

  return (
    <View style={styles.tab}>
      <ScrollView style={{flex: 1, width: width}}>
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
        
        {/* <View style={styles.FocussingTracking}>

          <DataTable>
            <DataTable.Header>
                <DataTable.Title style={styles.title}>Kategori</DataTable.Title>
                <DataTable.Title style={styles.title}>Süre</DataTable.Title>
                <DataTable.Title style={styles.title}>Tarih</DataTable.Title>
                <DataTable.Title style={styles.title}>TotalDistraction</DataTable.Title>
            </DataTable.Header>
            {
              rows.map(item => (
                <DataTable.Row>
                    <DataTable.Cell>{item.Category}</DataTable.Cell>
                    <DataTable.Cell>{item.Time}</DataTable.Cell>
                    <DataTable.Cell>{item.Date}</DataTable.Cell>
                    <DataTable.Cell>{item.TotalDistractions}</DataTable.Cell>
                </DataTable.Row>
              ))
            }
          </DataTable>
        </View> */}
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
  tables: {
    flexDirection: 'row',
    padding: 15
  },
  FocussingTracking: {
    marginTop: 50,
    flex: 5,
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