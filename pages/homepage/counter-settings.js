import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, AppState } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Picker } from '@react-native-picker/picker';

import * as SQLite from "expo-sqlite";

export default function TimerCounter() {
  const [selectedTime, setSelectedTime] = useState(1500); // Başlangıç 60 sn
  const [time, setTime] = useState(selectedTime);
  const [category, setCategory] = useState("")
  const [isRunning, setIsRunning] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState)

  const [counter, setCounter] = useState(0);

  async function AddItem() {

    let category_null = ""

    if(category.length === 0){
      category_null = "coding"
      setCategory(category_null)
    }
    else  category_null = category

    console.log("category:"+category_null)
    console.log("counter:" + counter)
    console.log("selectedTime:" + selectedTime)
    console.log("new Date().toLocaleDateString():" + new Date().toLocaleDateString())
    
    const db = SQLite.openDatabaseSync("test.db")

    try {
      db.runSync(
        "INSERT INTO FocussingTracking (Time, Date, Category, TotalDistractions) VALUES (?, ?, ?, ?);",
        [selectedTime, new Date().toLocaleDateString(), category_null, counter]
      )
      console.log("oke")
    } catch (error) {
      console.log(error)
    }

    db.closeSync()
  }

  // Timer çalışması
  useEffect(() => {

    // const zamanlayici = setInterval(() => {
    //   setTime((eskiSaniye) => {
    //     if (eskiSaniye <= 1) {
    //       clearInterval(zamanlayici); // 0 olunca durdur
    //       return 0;
    //     }
    //     return eskiSaniye - 1;
    //   });
    // }, 1000);

    // return () => {
    //   clearInterval(zamanlayici);
    //   console.log("Sayaç temizlendi, çökme engellendi.");
    // };

    let timer;

    if (isRunning && time > 0) {
      console.log("Timer şu anda çalışıyor. Zaman: " + time)
      try{
        timer = setTimeout(() => setTime(time - 1), 1000);
      }
      catch(error){
        console.log("Error:::" + error)
      }     
    } else if (time === 0) {
      if(isRunning){
        AddItem()
      }
      setIsRunning(false);
    }
    return () => {
      try {
        clearInterval(timer)
        clearTimeout(timer) 
      } catch (error) {
        console.log("Error::" + error)
      }
    };
  }, [isRunning, time]);

  // Süre değiştirildiğinde zaman sıfırlansın
  useEffect(() => {
    setTime(selectedTime);
    setIsRunning(false);

    return () => {
      
    }
  }, [selectedTime]);

  useEffect(() => {

    if(!isRunning) return;

    const subscription = AppState.addEventListener("change", nextAppState => {
      console.log("App state değişti:", nextAppState);
      setAppState(nextAppState);

      if(nextAppState === "background"){
        setCounter((prev) => (prev+1))
      }
        setIsRunning(false)
    });

    return () => subscription.remove();
  }, [isRunning]);

  return (
    <View style={styles.container}>

      <AnimatedCircularProgress
        size={220}
        width={14}
        fill={(time / selectedTime) * 100}
        tintColor="#00bcd4"
        backgroundColor="#e0e0e0"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <Text style={styles.timerText}>
            {/* {isRunning.toString()} */}
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </Text>
        )}
      </AnimatedCircularProgress>

        {/* Süre seçme butonları */}
        <View style={isRunning || time !== selectedTime ? {display: 'none'} : styles.timeSelectRow}>        
            <TouchableOpacity
                key='increase'
                style={[
                    styles.timeButton,
                ]}
                onPress={() => setSelectedTime((prev) => prev + 300)}
                >
                <Text
                    style={[
                    styles.timeButtonText
                    ]}
                >
                    +
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                key='decrease'
                style={[
                styles.timeButton,
                ]}
                onPress={() => setSelectedTime((prev) => prev - 300)}
            >
                <Text
                    style={[
                    styles.timeButtonText
                    ]}
                >
                    -
                </Text>
            </TouchableOpacity>

        </View>

        {/* Kontrol tuşları */}
        <View style={styles.controls}>
            <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: "#4CAF50" }]}
            onPress={() => setIsRunning(true)}
            >
            <Ionicons name="play" size={26} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: "#f44336" }]}
            onPress={() => setIsRunning(false)}
            >
            <Ionicons name="pause" size={26} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: "#9C27B0" }]}
            onPress={() => {
                setIsRunning(false);
                setTime(selectedTime);
                setCounter(0)
            }}
            >
            <Ionicons name="refresh" size={26} color="#fff" />
            </TouchableOpacity>
        </View>

        <View style={isRunning || time !== selectedTime ? {display: 'none'} : styles.category}>
            <Text style={styles.label}>Kategori Seç:</Text>
            <View style={styles.pickerContainer}>
            <Picker
            selectedValue={category}
            onValueChange={(prev) => setCategory(prev)}
            style={styles.picker}
            >
                {/* <Picker.Item label="Seçiniz..." value="" /> */}
                <Picker.Item label="👩‍💻 Kodlama" value="coding" />
                <Picker.Item label="📝 Ders Çalışma" value="studying" />
                <Picker.Item label="🛠️ Proje" value="project" />
                <Picker.Item label="📖 Kitap Okuma" value="reading" />
            </Picker>
            </View>
        </View>

        <View style={isRunning || time === selectedTime ? {display: 'none'} : styles.statistics}>
            <View style={styles.cell}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Süre</Text>
            </View>
            <View style={styles.cell}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Kategori</Text>
            </View>
            <View style={styles.cell}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Dikkat Dağılma Sayısı</Text>
            </View>
        </View>

        <View style={isRunning || time === selectedTime ? {display: 'none'} : styles.statistics}>
            <View style={styles.cell}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{selectedTime - time < 60 ? (selectedTime - time) + " sn" : (Math.floor((selectedTime - time) / 60)) + " dk " + ((selectedTime - time) % 60) + " sn" }</Text>
            </View>
            <View style={styles.cell}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{category === "" ? "coding" : category}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{counter}</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  timerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  timeSelectRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 15,
  },
  timeButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 3,
  },
  timeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  controls: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    gap: 25,
  },
  controlButton: {
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },
  category: {    
    marginTop: 20,
    width: 300
  },
  category_running: {
    display: 'none'
  },
  picker: {
    height: 50,
  },
label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    overflow: 'hidden',
  },
  statistics: {
    flexDirection: "row",
    borderWidth: 1,
    textAlign: 'center'
  },
  cell: {
    flex: 1, // her hücre eşit genişlikte
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
});
