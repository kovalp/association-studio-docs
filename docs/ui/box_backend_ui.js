import {BboxHelper} from "./bbox_helper.js";
import {BboxPlot} from "./bbox_plot.js";
import {Screen} from "./screen.js";
import { get_cursor } from "./mouse_cursor.js";
import { get_angle } from "../rotations.js";


class BoxBackendUi {
    constructor(canvas_id, box_style, xy_yaw_lw) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.screen = new Screen(this.canvas, this.ctx);
        this.box_plt = new BboxPlot(box_style);
        this.box = new BboxHelper(xy_yaw_lw);
        this.box_plt.draw(this.ctx, this.box);
        this.is_dragging = false;
        this.is_in_box = false;
        this.is_in_moon = false;
        this.is_in_edge_x = false;
        this.is_in_edge_y = false;
        this.start_event = new MouseEvent("", undefined);
        this.start_data_xy = new DOMPoint(0, 0);
        this.canvas.addEventListener('mousedown', this.mouse_down_callback.bind(this));
        this.canvas.addEventListener('mousemove', this.mouse_move_callback.bind(this));
        this.canvas.addEventListener('mouseup', this.mouse_up_callback.bind(this));
    }

    change(box_helper, event){
        if (this.is_in_box) {
            const dx = this.box.scale(event.offsetX - this.start_event.offsetX);
            const dy = this.box.scale(event.offsetY - this.start_event.offsetY);
            box_helper.translate(dx, dy);
            return
        }

        box_helper.set_screen_offset(event.offsetX, event.offsetY);
        if (this.is_in_moon) {
            box_helper.rotate(get_angle(this.start_data_xy, box_helper.data_xy));
        } else if (this.is_in_edge_x) {
            box_helper.scale_width(2 * (this.start_data_xy.y - box_helper.data_xy.y));
        } else if (this.is_in_edge_y) {
            box_helper.scale_len(2 * (this.start_data_xy.x - box_helper.data_xy.x));
        }
    }

    change_and_draw(box_helper, event){
        this.change(box_helper, event);
        this.draw(box_helper);
    }

    draw(box_helper){
        this.screen.clear();
        this.box_plt.draw(this.ctx, box_helper || this.box);
    }

    mouse_down_callback(event){
        this._upd_in_flags(event);
        if (this.is_in_box || this.is_in_moon || this.is_in_edge_x || this.is_in_edge_y) {
            this.is_dragging = true;
            this.start_event = event;
            this.start_data_xy = new DOMPoint(this.box.data_xy.x, this.box.data_xy.y);
        }
    }

    mouse_move_callback(event){
        if (this.is_dragging) {
            this.change_and_draw(new BboxHelper(this.box.xy_yaw_lw), event);
        } else {
            this._upd_in_flags(event);
            const in_edge = this.is_in_edge_x || this.is_in_edge_y;
            event.target.style.cursor = get_cursor(this.is_in_box, this.is_in_moon, in_edge);
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
        this.is_in_edge_x = this.box.is_in_edge_x();
        this.is_in_edge_y = this.box.is_in_edge_y();
    }

    set_state(xy_yaw_lw){
        this.box.set_state(xy_yaw_lw);
        this.draw();
    }

    set_change_state_callback(callback){
        this.box.change_state_callback = callback;
    }

    change_yaw(event){
        this.box.set_yaw(Math.PI * Number(event.target.value) / 180);
        this.draw();
    }

    change_x(event){ this.update(() => this.box.set_x(Number(event.target.value)));}
    change_y(event){ this.update(() => this.box.set_y(Number(event.target.value)));}
    change_len(event){ this.update(() => this.box.set_len(Number(event.target.value)));}
    change_wdt(event){ this.update(() => this.box.set_wdt(Number(event.target.value)));}

    update(update_fn) {
        update_fn();
        this.draw();
    }
}

export {BoxBackendUi}
