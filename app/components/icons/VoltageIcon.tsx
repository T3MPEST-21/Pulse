import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IconProps {
    size?: number;
    color?: string;
}

const VoltageIcon = ({ size = 24, color = '#00ff99' }: IconProps) => {
    const opacityAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.delay(1000)
            ])
        ).start();
    }, []);

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <AnimatedPath
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={color}
                fillOpacity={opacityAnim as any}
                strokeOpacity={opacityAnim as any}
            />
        </Svg>
    );
};

export default VoltageIcon;
