import { BboxPlot } from './bbox_plot.js';
import { BboxHelper } from "./bbox_helper.js";
import { Screen } from "./screen.js";

const canvas_ui = document.getElementById('stage-ui')
const canvas_bg = document.getElementById('stage-bg')
const ctx_ui = canvas_ui.getContext("2d");
const ctx_bg = canvas_bg.getContext("2d");

const screen = new Screen(canvas_ui, ctx_ui);

ctx_bg.fillStyle = '#00fa';
ctx_bg.transform(15, 0, 0, 15, 100, 100);
ctx_bg.fillRect(0, 0, 4, 2);

let box_plt = new BboxPlot();
let xy_yaw_wh = new Float32Array([5.0, 6.0, 30.0 * Math.PI / 180.0, 3.0, 1.5]);
let box_hlp = new BboxHelper(xy_yaw_wh);
box_plt.draw(ctx_ui, box_hlp);

let is_dragging = false;
let start_event = new MouseEvent("", undefined);


function scale_and_draw(bh, bp, scr, sx, sy){
    scr.clear();
    bh.translate(sx, sy);
    bp.draw(screen.ctx, bh);
}


function mouse_up_callback(event){
    if (is_dragging){
        is_dragging = false;
        let sx = box_hlp.scale(event.offsetX - start_event.offsetX);
        let sy = box_hlp.scale(event.offsetY - start_event.offsetY);
        scale_and_draw(box_hlp, box_plt, screen, sx, sy);
    }
}

function mouse_down_callback(event){
    if (box_hlp.is_in(event.offsetX, event.offsetY)) {
        is_dragging = true;
        start_event = event;
    }
}

function mouse_move_callback(event){
    event.target.style.cursor = box_hlp.is_in(event.offsetX, event.offsetY) ? 'pointer': '';
    if (is_dragging){
        let box_cpy = new BboxHelper(box_hlp.xy_yaw_wh);
        let sx = box_hlp.scale(event.offsetX - start_event.offsetX);
        let sy = box_hlp.scale(event.offsetY - start_event.offsetY);
        scale_and_draw(box_cpy, box_plt, screen, sx, sy);
    }
}

canvas_ui.addEventListener('mousedown', mouse_down_callback);
canvas_ui.addEventListener('mousemove', mouse_move_callback);
canvas_ui.addEventListener('mouseup', mouse_up_callback);
