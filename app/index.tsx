import { StyleSheet, Text, View } from "react-native";
import BatteryRing from "./components/batteryRing";
import Clock from "./components/clock";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Clock */}
      <View style={styles.clock}>
        <Clock />
      </View>

      {/* Date + Name */}
      <Text style={styles.dateText}>Dec 24 • Pulse</Text>

      {/* Circular Battery Placeholder */}
      <View style={styles.batteryCircle}>
        <BatteryRing percentage={27} />
      </View>

      {/* Info Cards Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}><Text>Voltage</Text></View>
        <View style={styles.infoCard}><Text>Temp</Text></View>
        <View style={styles.infoCard}><Text>Time Left</Text></View>
      </View>

      {/* Charging Status */}
      <Text style={styles.chargingText}>Charging...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 60
  },

  clock: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 60,
  },

  dateText: {
    color: "#00ff99",
    fontSize: 16,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  batteryCircle: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  batteryPercent: {
    color: "#00ff99",
    fontSize: 32,
    fontWeight: "600"
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30
  },

  infoCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#00ff99",
    marginHorizontal: 5,
    padding: 10,
    alignItems: "center",
  },

  chargingText: {
    color: "#00ff99",
    fontSize: 18
  },
});