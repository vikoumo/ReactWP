import colors from './colors';
const yellow = colors[3];

export default (color = yellow, label = 'button') => {
  const button = `<button style="color:${color}">${label}</button>`;
  document.querySelector('#ES6').childNodes[1].innerHTML = button;
};
