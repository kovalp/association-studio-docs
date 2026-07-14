import {BboxHelper} from "./bbox_helper.js";
import {BboxPlot} from "./bbox_plot.js";
import {Screen} from "./screen.js";


const rotate_cursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67'/></svg>") 12 12, auto`;

function get_cursor(is_in_box, is_in_moon){
    if (is_in_box) {
        return "pointer";
    } else if (is_in_moon) {
        return rotate_cursor;
    }
    return "";
}


class BackendUi {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.screen = new Screen(this.canvas, this.ctx);
        this.box_plt = new BboxPlot();
        this.box_hlp = new BboxHelper([5.0, 6.0, 0.5, 3.0, 1.5]);
        this.box_plt.draw(this.ctx, this.box_hlp);
        this.is_dragging = false;
        this.is_in_box = false;
        this.is_in_moon = false;
        this.start_event = new MouseEvent("", undefined);
        this.canvas.addEventListener('mousedown', this.mouse_down_callback.bind(this));
        this.canvas.addEventListener('mousemove', this.mouse_move_callback.bind(this));
        this.canvas.addEventListener('mouseup', this.mouse_up_callback.bind(this));
    }

    translate_and_draw(box_helper, event){
        let dx = this.box_hlp.scale(event.offsetX - this.start_event.offsetX);
        let dy = this.box_hlp.scale(event.offsetY - this.start_event.offsetY);
        box_helper.translate(dx, dy);
        this.screen.clear();
        this.box_plt.draw(this.ctx, box_helper);
    }

    mouse_up_callback(event){
        if (this.is_dragging){
            this.is_dragging = false;
            this.translate_and_draw(this.box_hlp, event);
        }
    }

    mouse_down_callback(event){
        this._upd_in_flags(event);
        if (this.is_in_box || this.is_in_moon) {
            this.is_dragging = true;
            this.start_event = event;
        }
    }

    mouse_move_callback(event){
        if (this.is_dragging) {
            let box_cpy = new BboxHelper(this.box_hlp.xy_yaw_wh);
            this.translate_and_draw(box_cpy, event);
        } else {
            this._upd_in_flags(event);
            event.target.style.cursor = get_cursor(this.is_in_box, this.is_in_moon);
        }
    }

    _upd_in_flags(event){
        this.box_hlp.set_screen_offset(event.offsetX, event.offsetY);
        this.is_in_box = this.box_hlp.is_in_box();
        this.is_in_moon = this.box_hlp.is_in_moon();
    }
}

export {BackendUi}
