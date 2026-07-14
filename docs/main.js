import {BackendUi} from "./backend_ui.js";

const canvas_bg = document.getElementById('stage-bg')
const ctx_bg = canvas_bg.getContext("2d");

ctx_bg.fillStyle = '#00fa';
ctx_bg.transform(15, 0, 0, 15, 100, 100);
ctx_bg.fillRect(0, 0, 4, 2);

let back_ui = new BackendUi('stage-ui');
