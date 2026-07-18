import {TWO_PI, HALF_PI} from "../math_const.js";


class BboxPlot {
    constructor(box_style) {
        this.box_style = box_style;
        this.moon_style = '#0f0a';
        this.moon_radius = 0.25;
        this.moon_line_width = 0.5;
        this.edge_style = 'gray';
        this.edge_width = 0.1;
    }

    draw(ctx, bh) {
        ctx.setTransform(bh.transform);

        const { xy_yaw_lw: [,,, w, h], half_sxy: [hx, hy] } = bh;
        const e = this.edge_width;

        ctx.fillStyle = this.box_style;
        ctx.fillRect(-hx, -hy, w, h);

        ctx.fillStyle = this.edge_style;
        ctx.fillRect(-hx + e, -hy - e, w - 2 * e, e);
        ctx.fillRect(-hx - e, -hy + e, e, h - 2 * e);

        ctx.beginPath();
        ctx.strokeStyle = this.moon_style;
        ctx.lineWidth = this.moon_line_width;
        let r = this.moon_radius;
        ctx.ellipse(hx, 0.0, r, r, 0, HALF_PI, TWO_PI - HALF_PI, true);
        ctx.stroke();
    }
}

export { BboxPlot };
