import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const clock = () => {
    const getCurrentTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    const [time, setTime] = useState(getCurrentTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <Text style={styles.clockText}>{time}       </Text>
        </View>
    )
}

export default clock

const styles = StyleSheet.create({
    clockText: {
        color: '#00ff99',
        fontSize: 48,
        fontWeight: '600'
    }
})