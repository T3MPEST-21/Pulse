import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface BatteryRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    strokeColor?: string;

}

const batteryRing = ({ percentage, size = 200, strokeWidth = 10, strokeColor = '#00ff99' }: BatteryRingProps) => {
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    // Helper function to convert polar to cartesian coordinates
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 0.4,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Function to create arc path
    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(x, y, radius, startAngle);
        const end = polarToCartesian(x, y, radius, endAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        return [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y
        ].join(' ');
    };

    // Arc parameters
    const startAngle = 225; // Start from bottom-left (7:30 position)
    const totalArcAngle = 270; // 270 degree arc
    const endAngle = startAngle + totalArcAngle;
    const progressAngle = startAngle + (totalArcAngle * percentage / 100);

    // Create path data
    const backgroundPath = describeArc(center, center, radius, startAngle, endAngle);
    const progressPath = describeArc(center, center, radius, startAngle, progressAngle);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* Background arc (dark gray) */}
                <Path
                    d={backgroundPath}
                    stroke="#2a2a2a"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Progress arc (green) with subtle Pulse Animation */}
                <AnimatedPath
                    d={progressPath}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeOpacity={opacityAnim as any}
                />
            </Svg>

            {/* Centered percentage text */}
            <View style={styles.textContainer}>
                <Text style={styles.percentageText}>{percentage.toFixed(2)}%</Text>
            </View>
        </View>
    )
}

export default batteryRing

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        color: '#8a8a8a',
        fontSize: 28,
        fontWeight: '600',
    },
})