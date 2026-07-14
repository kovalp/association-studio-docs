class BboxHelper {
    constructor(xy_yaw_wh) {
        this.xy_yaw_wh = new Float32Array(xy_yaw_wh);
        this.transform_scale = 20;
        this.transform = new DOMMatrix();
        this.transform.scaleSelf(this.transform_scale, this.transform_scale);
        this.transform.translateSelf(xy_yaw_wh[0], xy_yaw_wh[1]);
        this.transform.rotateSelf(180 * xy_yaw_wh[2] / Math.PI);
        this.inv_transform = this.transform.inverse();
        this.half_sxy = new Float32Array([xy_yaw_wh[3] / 2, xy_yaw_wh[4] / 2]);
        this.offset_xy = new DOMPoint(0, 0);
    }

    scale(num){
        return num / this.transform_scale;
    }

    translate(dx, dy) {
        this.xy_yaw_wh[0] += dx;
        this.xy_yaw_wh[1] += dy;
        this.transform.setMatrixValue('');
        this.transform.scaleSelf(this.transform_scale, this.transform_scale);
        this.transform.translateSelf(this.xy_yaw_wh[0], this.xy_yaw_wh[1]);
        this.transform.rotateSelf(180 * this.xy_yaw_wh[2] / Math.PI);
        this.inv_transform = this.transform.inverse();
    }

    is_in(offset_x, offset_y) {
        this.offset_xy.x = offset_x;
        this.offset_xy.y = offset_y;
        let xy = this.inv_transform.transformPoint(this.offset_xy);
        return (Math.abs(xy.x) < this.half_sxy[0]) && (Math.abs(xy.y) < this.half_sxy[1]);
    }
}

export { BboxHelper };
