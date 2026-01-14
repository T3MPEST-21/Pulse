import * as battery from 'expo-battery';
import * as Device from 'expo-device';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BatteryRing from "./components/batteryRing";
import Clock from "./components/clock";
import PulseLogo from "./components/icons/PulseLogo";
import TempIcon from "./components/icons/TempIcon";
import TimeIcon from "./components/icons/TimeIcon";
import VoltageIcon from "./components/icons/VoltageIcon";
import InfoCard from "./components/infoCard";

export default function App() {
  const [actualBatteryLevel, setActualBatteryLevel] = useState(0);
  const [displayBatteryLevel, setDisplayBatteryLevel] = useState(0);
  const [charging, setCharging] = useState(false);
  const [voltage, setVoltage] = useState(3.85);
  const [temp, setTemp] = useState(32.0);

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const level = await battery.getBatteryLevelAsync();
        const chargeState = await battery.getBatteryStateAsync();
        const levelPercentage = level * 100;
        setActualBatteryLevel(levelPercentage);
        // On first load, set display level to avoid starting at 0
        setDisplayBatteryLevel(prev => prev === 0 ? levelPercentage : prev);
        setCharging(chargeState === battery.BatteryState.CHARGING);
      } catch (e) {
        console.error("Error fetching battery data:", e);
      }
    };

    fetchBatteryData();

    // Listen for battery level changes
    const subscription = battery.addBatteryLevelListener(({ batteryLevel }) => {
      const newLevel = batteryLevel * 100;
      setActualBatteryLevel(newLevel);
      setDisplayBatteryLevel(prev => {
        // If display is way off (e.g. system jumped 1%), sync it
        if (Math.abs(prev - newLevel) > 1.5) return newLevel;
        return prev;
      });
    });

    // Listen for charging state changes
    const chargingSubscription = battery.addBatteryStateListener(({ batteryState }) => {
      const isCharging = batteryState === battery.BatteryState.CHARGING;
      setCharging(isCharging);
      if (isCharging) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    });

    // Polling fallback every 10 seconds in case listeners are unreliable
    const pollInterval = setInterval(fetchBatteryData, 10000);

    return () => {
      subscription && subscription.remove();
      chargingSubscription && chargingSubscription.remove();
      clearInterval(pollInterval);
    };
  }, []);

  // Effect to simulate smooth decimal increments while charging
  useEffect(() => {
    let interval: any;
    if (charging) {
      interval = setInterval(() => {
        setDisplayBatteryLevel(prev => {
          // Increase by 0.0008 every 50ms (approx 1% every 60 seconds)
          const next = prev + 0.0008;

          // Stay within a reasonable range of the actual OS-reported level
          // If we are more than 1% ahead of the actual level, slow down or stop
          if (next > actualBatteryLevel + 1.2) return prev;
          return next;
        });
      }, 50);
    }
    return () => interval && clearInterval(interval);
  }, [charging, actualBatteryLevel]);

  // Effect for live hardware stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVoltage(v => {
        const fluctuation = (Math.random() - 0.5) * 0.05;
        return Math.max(3.7, Math.min(4.35, v + fluctuation));
      });
      setTemp(t => {
        const fluctuation = (Math.random() - 0.5) * 0.2;
        return Math.max(28, Math.min(45, t + fluctuation));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Brand Logo */}
      <View style={styles.logoContainer}>
        <PulseLogo size={80} color="#00ff99" />
      </View>

      {/* Clock */}
      <View style={styles.clock}>
        <Clock />
      </View>

      {/* Date + Name */}
      <Text style={styles.dateText}>Dec 24 • {Device.modelName || 'Pulse'}</Text>

      {/* Circular Battery Placeholder */}
      <View style={styles.batteryCircle}>
        <BatteryRing percentage={displayBatteryLevel} />
      </View>

      {/* Info Cards Row */}
      <View style={styles.infoRow}>
        <InfoCard Icon={VoltageIcon} label="Voltage" value={`${voltage.toFixed(2)}V`} />
        <InfoCard Icon={TempIcon} label="Temp" value={`${temp.toFixed(1)}°C`} />
        <InfoCard Icon={TimeIcon} label="Time Left" value="~4h" />
      </View>

      {/* Charging Status */}
      <Text style={styles.chargingText}>{charging ? '⚡ Charging...' : 'Not Charging'}</Text>
    </SafeAreaView>
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
    justifyContent: "center",
    width: "90%",
    marginBottom: 30
  },

  logoContainer: {
    marginBottom: 20,
    marginTop: -20,
    opacity: 0.8,
  },

  chargingText: {
    color: "#00ff99",
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 2,
  },
});