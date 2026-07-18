import {BoxBackendUi} from "./ui/box_backend_ui.js";
import {TopPanel} from "./ui/top_panel.js";

const ori_state = [0.0, 0.0, 0.0, 3.0, 1.5]
const ini_state = [0.6, -0.6, 0.0, 3.0, 1.5]
const back_bg = new BoxBackendUi('stage-bg', '#00fa', ori_state);
const back_ui = new BoxBackendUi('stage-ui', '#f0fa', ini_state);
const top_panel = new TopPanel();
back_ui.set_change_state_callback(top_panel.set_state.bind(top_panel));

top_panel.inp_x.addEventListener("change", back_ui.change_x.bind(back_ui));
top_panel.inp_y.addEventListener("change", back_ui.change_y.bind(back_ui));
top_panel.inp_yaw.addEventListener("change", back_ui.change_yaw.bind(back_ui));
top_panel.inp_len.addEventListener("change", back_ui.change_len.bind(back_ui));
top_panel.inp_wdt.addEventListener("change", back_ui.change_wdt.bind(back_ui));

top_panel.reset_btn.addEventListener("click", () => {back_ui.set_state(ori_state);})
