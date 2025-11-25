import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';

import TotalFocussingPage from './statistics/TotalFocussing.js';
import AllTimeFocussingPage from './statistics/AllTimeFocussing.js';
import TotalDistractionPage from './statistics/TotalDistraction.js';
import LastSevenDaysPage from './statistics/LastSevenDays.js';
import AccordingToCategoryPage from './statistics/AccordingToCategory.js';

import { DataTable } from 'react-native-paper'
import { useEffect, useState } from 'react';

import * as SQLite from "expo-sqlite";
import AccordingToCategory from './statistics/AccordingToCategory.js';

export default function DashboardScreen(){

  const [page, setPage] = useState(0)
  const [AllTimeFocussing, SetAllTimeFocussing] = useState(0)
  const [TotalDistraction, SetTotalDistraction] = useState(0)
  const [TotalFocussing, SetTotalFocussing] = useState(0)
  const [LastSevenDaysFocussing, SetLastSevenDaysFocussing] = useState([])
  const [Categories, SetCategories] = useState([])
  const [Rows, SetRows] = useState([])

  async function LastSevenDaysDatas(){
    let LastSevenDaysArray = []

    const db = await SQLite.openDatabaseAsync("test.db");
    const dates = await db.getAllAsync("SELECT id, Time, Date FROM FocussingTracking;")

    dates.forEach(element => {
      const [m, d, y] = element.Date.split("/");
      let isAdded = false;

      if(element.Date !== m){
          const inputDate = new Date(y, m - 1, d);
          const now = new Date();

          console.log(element.Date + ":::" + m)

          const diffMs = now - inputDate;
          const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

          if (diffMs > oneWeekMs) {
              console.log("Bu tarih 1 haftadan eski, işlem yapılıyor!");
          } 
          else {
              LastSevenDaysArray.forEach(taylor => {
                  if(taylor[1] === element.Date){
                      taylor[0] += element.Time
                      isAdded = true;
                  }
              });

              if(!isAdded)
                LastSevenDaysArray.push([element.Time, element.Date])
          }
      }
    });

    SetLastSevenDaysFocussing(LastSevenDaysArray)
  }

  async function AccordingToCategory() {
    let Categories = []

    const db = await SQLite.openDatabaseAsync("test.db");
    const datas = await db.getAllAsync("SELECT Time, Category FROM FocussingTracking;")

    datas.forEach(element => {
      let isAdded = false;
      Categories.forEach(taylor => {
          if(taylor[1] === element.Category){
              taylor[0] += element.Time
              isAdded = true;
          }
      });

      if(!isAdded)
        Categories.push([element.Time, element.Category])
    })

    SetCategories(Categories)
  }

  useEffect(() => {
    const db = SQLite.openDatabaseSync("test.db");

    // const dneeme = db.getAllSync("SELECT * FROM 'FocussingTracking'")
    // console.log(dneeme)

    SetRows(db.getAllSync("SELECT* FROM FocussingTracking;"))
    SetTotalDistraction(db.getFirstSync("SELECT SUM(TotalDistractions) AS totalDistraction FROM FocussingTracking where Date=?", [new Date().toLocaleDateString()]))
    SetTotalFocussing(db.getFirstSync("SELECT SUM(Time) AS sumTime FROM FocussingTracking where Date=?", [new Date().toLocaleDateString()]))
    SetAllTimeFocussing(db.getFirstSync("SELECT MAX(Time) AS maxTime FROM FocussingTracking"))

    db.closeSync()

    LastSevenDaysDatas()
    AccordingToCategory()

    // console.log("-----------------")
    // console.log("TotalDistraction: " + TotalDistraction.totalDistraction)
    // console.log("TotalFocussing: " + TotalFocussing.sumTime)
    // console.log("AllTimeFocussing: " + AllTimeFocussing.maxTime)
    // console.log("LastSevenDaysFocussing: " + LastSevenDaysFocussing)
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

          <LastSevenDaysPage data={LastSevenDaysFocussing} />
          
          <AccordingToCategoryPage Categories={Categories} />
          {/* <DataTable>
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
                    <DataTable.Cell>{item.id}</DataTable.Cell>
                    <DataTable.Cell>{item.Category}</DataTable.Cell>
                    <DataTable.Cell>{item.Time}</DataTable.Cell>
                    <DataTable.Cell>{item.Date}</DataTable.Cell>
                    <DataTable.Cell>{item.TotalDistractions}</DataTable.Cell>
                </DataTable.Row>
              ))
            }
          </DataTable> */}


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