import {BoxBackendUi} from "./box_backend_ui.js";

const back_bg = new BoxBackendUi('stage-bg', '#00fa', [-0.2, 0.2, 0.0, 3.0, 1.5]);
const back_ui = new BoxBackendUi('stage-ui', '#f0fa', [0.0, 0.0, 0.0, 3.0, 1.5]);

const reset_btn = document.getElementById("reset-btn");
const inp_len = document.getElementById("inp-len");

function reset_probe_box() {
    back_ui.set_state([0.0, 0.0, 0.0, 3.0, 1.5]);
}

reset_btn.addEventListener("click", reset_probe_box)