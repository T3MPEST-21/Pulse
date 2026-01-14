import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

const PulseLogo = ({ size = 48, color = '#00ff99' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 100 40" fill="none">
        <Path
            d="M5 20h15l5-15L35 35l5-15h15l5 10L70 10l5 10h20"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default PulseLogo;
