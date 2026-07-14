class BboxPlot {
    constructor() {
        this.color = '#f00a';
    }

    draw(ctx, bh) {
        ctx.fillStyle = this.color;
        ctx.setTransform(bh.transform);
        ctx.fillRect(-bh.half_sxy[0], -bh.half_sxy[1], bh.xy_yaw_wh[3], bh.xy_yaw_wh[4]);
    }
}

export { BboxPlot };
