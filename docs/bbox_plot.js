import {two_pi, half_pi} from "./math_const.js";


class BboxPlot {
    constructor() {
        this.fill_style = '#f00a';
        this.stroke_style = '#0f0a';
    }

    draw(ctx, bh) {
        ctx.fillStyle = this.fill_style;
        ctx.setTransform(bh.transform);
        ctx.fillRect(-bh.half_sxy[0], -bh.half_sxy[1], bh.xy_yaw_wh[3], bh.xy_yaw_wh[4]);
        ctx.beginPath();
        ctx.strokeStyle = this.stroke_style;
        ctx.lineWidth = 0.5;
        let r = 0.25
        ctx.ellipse(bh.half_sxy[0], 0.0, r, r, 0, half_pi, two_pi - half_pi, true);
        ctx.stroke();
    }
}

export { BboxPlot };
