// Dithered band (Paper Shaders 0.0.81). If WebGL or the CDN is unavailable, the CSS hairline pattern stays.
import { ShaderMount, ditheringFragmentShader, getShaderColorFromString, ShaderFitOptions, defaultObjectSizing as s }
  from 'https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.81/+esm';

const band = document.querySelector('.band');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let mount = null;

function start() {
  if (!band) return;
  const holder = band.querySelector('.mount');
  if (mount) { mount.dispose(); mount = null; holder.replaceChildren(); }
  const front = getComputedStyle(document.documentElement).getPropertyValue('--dither').trim();
  try {
    mount = new ShaderMount(holder, ditheringFragmentShader, {
      u_colorBack: getShaderColorFromString('rgba(0,0,0,0)'),
      u_colorFront: getShaderColorFromString(front),
      u_shape: 2, u_type: 4, u_pxSize: 3,
      u_fit: ShaderFitOptions[s.fit], u_scale: 1.4, u_rotation: 0, u_offsetX: 0, u_offsetY: 0,
      u_originX: 0.5, u_originY: 0.5, u_worldWidth: 0, u_worldHeight: 0,
    }, undefined, still ? 0 : 0.18);
    band.classList.add('on');
  } catch (e) { band.classList.remove('on'); }
}
start();
window.addEventListener('themechange', start);
