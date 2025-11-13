import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function TimerCounter() {
  const [selectedTime, setSelectedTime] = useState(60); // Başlangıç 60 sn
  const [time, setTime] = useState(selectedTime);
  const [isRunning, setIsRunning] = useState(false);

  // Timer çalışması
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, time]);

  // Süre değiştirildiğinde zaman sıfırlansın
  useEffect(() => {
    setTime(selectedTime);
    setIsRunning(false);
  }, [selectedTime]);

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
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </Text>
        )}
      </AnimatedCircularProgress>

      {/* Süre seçme butonları */}
      <View style={styles.timeSelectRow}>
        {[1800, 1500, 1200, 60].map((sec) => (
          <TouchableOpacity
            key={sec}
            style={[
              styles.timeButton,
              selectedTime === sec && { backgroundColor: "#00bcd4" },
            ]}
            onPress={() => setSelectedTime(sec)}
          >
            <Text
              style={[
                styles.timeButtonText,
                selectedTime === sec && { color: "white" },
              ]}
            >
              {sec / 60} dk
            </Text>
          </TouchableOpacity>
        ))}
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
          }}
        >
          <Ionicons name="refresh" size={26} color="#fff" />
        </TouchableOpacity>
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
    marginBottom: 30,
    color: "#333",
  },
  timerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  timeSelectRow: {
    flexDirection: "row",
    marginTop: 40,
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
    marginTop: 40,
    gap: 25,
  },
  controlButton: {
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },
});
