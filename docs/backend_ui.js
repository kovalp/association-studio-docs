import {BboxHelper} from "./bbox_helper.js";
import {BboxPlot} from "./bbox_plot.js";
import {Screen} from "./screen.js";

class BackendUi {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.screen = new Screen(this.canvas, this.ctx);
        this.box_plt = new BboxPlot();
        this.box_hlp = new BboxHelper([5.0, 6.0, 0.5, 3.0, 1.5]);
        this.box_plt.draw(this.ctx, this.box_hlp);
        this.is_dragging = false;
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
        if (this.box_hlp.is_in(event.offsetX, event.offsetY)) {
            this.is_dragging = true;
            this.start_event = event;
        }
    }

    mouse_move_callback(event){
        event.target.style.cursor = this.box_hlp.is_in(event.offsetX, event.offsetY) ? 'pointer': '';
        if (this.is_dragging){
            let box_cpy = new BboxHelper(this.box_hlp.xy_yaw_wh);
            this.translate_and_draw(box_cpy, event);
        }
    }
}

export {BackendUi}
