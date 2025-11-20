import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';

import TotalFocussingPage from './statistics/TotalFocussing.js';
import AllTimeFocussingPage from './statistics/AllTimeFocussing.js';
import TotalDistractionPage from './statistics/TotalDistraction.js';

import { DataTable } from 'react-native-paper'
import { useEffect, useState } from 'react';

import * as SQLite from "expo-sqlite";

export default function DashboardScreen(){

  const [page, setPage] = useState(0)
  const [AllTimeFocussing, SetAllTimeFocussing] = useState(0)
  const [TotalDistraction, SetTotalDistraction] = useState(0)
  const [TotalFocussing, SetTotalFocussing] = useState(0)
  const [Rows, SetRows] = useState(0)

  useEffect(() => {
    const db = SQLite.openDatabaseSync("test.db");

    // const dneeme = db.getAllSync("SELECT * FROM 'FocussingTracking'")
    // console.log(dneeme)

    SetRows(db.getAllSync("SELECT* FROM FocussingTracking;"))
    SetTotalDistraction(db.getFirstSync("SELECT SUM(TotalDistractions) AS totalDistraction FROM FocussingTracking where Date=?", [new Date().toLocaleDateString()]))
    SetTotalFocussing(db.getFirstSync("SELECT SUM(Time) AS sumTime FROM FocussingTracking where Date=?", [new Date().toLocaleDateString()]))
    SetAllTimeFocussing(db.getFirstSync("SELECT MAX(Time) AS maxTime FROM FocussingTracking"))

    // console.log("-----------------")
    // console.log("TotalDistraction: " + TotalDistraction.totalDistraction)
    // console.log("TotalFocussing: " + TotalFocussing.sumTime)
    // console.log("AllTimeFocussing: " + AllTimeFocussing.maxTime)
    // console.log("-----------------")
  }, [])

  const up = "<--"
  const down = "-->"

  const width = Dimensions.get("window").width

  return (
    <View style={styles.tab}>
      <ScrollView style={{flex: 1, width: width}}>
        <View style={styles.tables}>
          {
            page === 0 ? <TotalFocussingPage data={TotalFocussing} /> :
            (page === 1 ? <AllTimeFocussingPage data={AllTimeFocussing} /> : <TotalDistractionPage data={TotalDistraction}/>)
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
        
        <View style={styles.FocussingTracking}>

          <DataTable>
            <DataTable.Header>
                <DataTable.Title style={styles.title}>#</DataTable.Title>
                <DataTable.Title style={styles.title}>Kategori</DataTable.Title>
                <DataTable.Title style={styles.title}>Süre</DataTable.Title>
                <DataTable.Title style={styles.title}>Tarih</DataTable.Title>
                <DataTable.Title style={styles.title}>TotalDistraction</DataTable.Title>
            </DataTable.Header>
            {
              Rows.map(item => (
                <DataTable.Row>
                    <DataTable.Cell>{item.Category}</DataTable.Cell>
                    <DataTable.Cell>{item.Time}</DataTable.Cell>
                    <DataTable.Cell>{item.Date}</DataTable.Cell>
                    <DataTable.Cell>{item.TotalDistractions}</DataTable.Cell>
                </DataTable.Row>
              ))
            }
          </DataTable>
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