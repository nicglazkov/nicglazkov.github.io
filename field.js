// Moving color field behind the home hero (Paper Shaders 0.0.81). Without WebGL the panel keeps its flat color.
import { ShaderMount, meshGradientFragmentShader, getShaderColorFromString, ShaderFitOptions, defaultObjectSizing as s }
  from 'https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.81/+esm';
const el = document.querySelector('.field');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (el) {
  const colors = ['#1438c9', '#0b2391', '#1f6fe5', '#0a8a94', '#f0552b'];
  try {
    new ShaderMount(el, meshGradientFragmentShader, {
      u_colors: colors.map(getShaderColorFromString), u_colorsCount: colors.length,
      u_distortion: 0.7, u_swirl: 0.25, u_grainMixer: 0.15, u_grainOverlay: 0.08,
      u_fit: ShaderFitOptions[s.fit], u_rotation: 0, u_scale: 1.1, u_offsetX: 0, u_offsetY: 0,
      u_originX: 0.5, u_originY: 0.5, u_worldWidth: 0, u_worldHeight: 0,
    }, undefined, still ? 0 : 0.25);
  } catch (e) {}
}
