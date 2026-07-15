import {two_pi} from "./math_const.js";


class BboxHelper {
    constructor(xy_yaw_wh) {
        this.xy_yaw_wh = new Float32Array(xy_yaw_wh);
        this.transform_scale = 20;
        this.moon_radius = 0.5;
        this.transform = new DOMMatrix();
        this._upd_transform();
        this.half_sxy = new Float32Array([xy_yaw_wh[3] / 2, xy_yaw_wh[4] / 2]);
        this.offset_xy = new DOMPoint(0, 0);
        this.data_xy = new DOMPoint(0, 0);
    }

    _upd_transform() {
        this.transform.setMatrixValue('');
        this.transform.scaleSelf(this.transform_scale, this.transform_scale);
        this.transform.translateSelf(this.xy_yaw_wh[0], this.xy_yaw_wh[1]);
        this.transform.rotateSelf(180 * this.xy_yaw_wh[2] / Math.PI);
        this.inv_transform = this.transform.inverse();
    }

    scale(num){
        return num / this.transform_scale;
    }

    translate(dx, dy) {
        this.xy_yaw_wh[0] += dx;
        this.xy_yaw_wh[1] += dy;
        this._upd_transform();
    }

    rotate(angle_rad) {
        this.xy_yaw_wh[2] += angle_rad;
        this.xy_yaw_wh[2] = ((this.xy_yaw_wh[2] % two_pi) + two_pi) % two_pi;
        this._upd_transform();
    }

    set_screen_offset(offset_x, offset_y) {
        Object.assign(this.offset_xy, { x: offset_x, y: offset_y });
        this.data_xy = this.inv_transform.transformPoint(this.offset_xy);
    }

    is_in_box() {
        let xy = this.data_xy;
        return (Math.abs(xy.x) < this.half_sxy[0]) && (Math.abs(xy.y) < this.half_sxy[1]);
    }

    is_in_moon() {
        let dx = this.data_xy.x - this.half_sxy[0];
        let r = Math.sqrt(dx ** 2 + this.data_xy.y ** 2);
        return r < this.moon_radius && dx > 0.;
    }
}

export { BboxHelper };
