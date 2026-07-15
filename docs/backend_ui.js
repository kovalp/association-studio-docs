import {BboxHelper} from "./bbox_helper.js";
import {BboxPlot} from "./bbox_plot.js";
import {Screen} from "./screen.js";
import { get_cursor } from "./mouse_cursor.js";
import { get_angle } from "./rotations.js";


class BackendUi {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.screen = new Screen(this.canvas, this.ctx);
        this.box_plt = new BboxPlot();
        this.box = new BboxHelper([5.0, 6.0, 0.5, 3.0, 1.5]);
        this.box_plt.draw(this.ctx, this.box);
        this.is_dragging = false;
        this.is_in_box = false;
        this.is_in_moon = false;
        this.start_event = new MouseEvent("", undefined);
        this.start_data_xy = new DOMPoint(0, 0);
        this.canvas.addEventListener('mousedown', this.mouse_down_callback.bind(this));
        this.canvas.addEventListener('mousemove', this.mouse_move_callback.bind(this));
        this.canvas.addEventListener('mouseup', this.mouse_up_callback.bind(this));
    }

    draw_box(box_helper){
        this.screen.clear();
        this.box_plt.draw(this.ctx, box_helper);
    }

    rotate(box_helper, event){
        box_helper.set_screen_offset(event.offsetX, event.offsetY);
        box_helper.rotate(get_angle(this.start_data_xy, box_helper.data_xy));
    }

    translate(box_helper, event){
        let dx = this.box.scale(event.offsetX - this.start_event.offsetX);
        let dy = this.box.scale(event.offsetY - this.start_event.offsetY);
        box_helper.translate(dx, dy);
    }

    change_and_draw(box_helper, event){
        if (this.is_in_box) {
            this.translate(box_helper, event);
        } else if (this.is_in_moon) {
            this.rotate(box_helper, event);
        }
        this.draw_box(box_helper);
    }

    mouse_down_callback(event){
        this._upd_in_flags(event);
        if (this.is_in_box || this.is_in_moon) {
            this.is_dragging = true;
            this.start_event = event;
            this.start_data_xy = new DOMPoint(this.box.data_xy.x, this.box.data_xy.y);
        }
    }

    mouse_move_callback(event){
        if (this.is_dragging) {
            this.change_and_draw(new BboxHelper(this.box.xy_yaw_wh), event);
        } else {
            this._upd_in_flags(event);
            event.target.style.cursor = get_cursor(this.is_in_box, this.is_in_moon);
        }
    }

    mouse_up_callback(event){
        if (this.is_dragging){
            this.is_dragging = false;
            this.change_and_draw(this.box, event);
        }
    }

    _upd_in_flags(event){
        this.box.set_screen_offset(event.offsetX, event.offsetY);
        this.is_in_box = this.box.is_in_box();
        this.is_in_moon = this.box.is_in_moon();
    }
}

export {BackendUi}
