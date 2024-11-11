varying vec2 vUv;
varying float vElevation;
uniform float uColor;

void main() {
    vec4 c1 = vec4(0.9608, 0.6627, 1.0, 1.0);
    vec4 c2 = vec4(0.9882, 0.7843, 1.0, 1.0);

    vec4 c3 = vec4(0.9569, 0.902, 0.8471, 1.0);
    vec4 c4 = vec4(1.0, 0.9333, 0.8667, 1.0);
    
    float v = smoothstep(-.14, .14, vElevation);
    vec4 colorRed = mix(c1, c2, v); 
    vec4 colorYellow = mix(c3, c4, v);

    vec4 finalColor = mix(colorRed, colorYellow, uColor);
    
    gl_FragColor = finalColor;
}
