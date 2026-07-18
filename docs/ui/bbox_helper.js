import {TWO_PI} from "../math_const.js";


class BboxHelper {
    constructor(xy_yaw_lw) {
        this.half_screen_x = 240
        this.half_screen_y = 160
        this.xy_yaw_lw = new Float32Array(xy_yaw_lw);
        this.transform_scale = 20;
        this.moon_radius = 0.5;
        this.edge_width = 0.35;
        this.min_size = 0.4
        this.transform = new DOMMatrix();
        this.half_sxy = new Float32Array([xy_yaw_lw[3] / 2, xy_yaw_lw[4] / 2]);
        this.offset_xy = new DOMPoint(0, 0);
        this.data_xy = new DOMPoint(0, 0);
        this.change_state_callback = (xy_yaw_lw) => {};
        this._upd_transform();
    }

    _upd_transform() {
        this.transform.setMatrixValue('');
        this.transform.translateSelf(this.half_screen_x, this.half_screen_y);
        this.transform.scaleSelf(this.transform_scale, this.transform_scale);
        this.transform.translateSelf(this.xy_yaw_lw[0], this.xy_yaw_lw[1]);
        this.transform.rotateSelf(180 * this.xy_yaw_lw[2] / Math.PI);
        this.inv_transform = this.transform.inverse();
        this.change_state_callback(this.xy_yaw_lw);
    }

    scale(num){
        return num / this.transform_scale;
    }

    translate(dx, dy) {
        this.xy_yaw_lw[0] += dx;
        this.xy_yaw_lw[1] += dy;
        this._upd_transform();
    }

    wrap_yaw(){
        this.xy_yaw_lw[2] = ((this.xy_yaw_lw[2] % TWO_PI) + TWO_PI) % TWO_PI;
    }

    rotate(angle_rad) {
        this.xy_yaw_lw[2] += angle_rad;
        this.wrap_yaw();
        this._upd_transform();
    }

    scale_width(dy) {
        this.xy_yaw_lw[4] += dy;
        this.xy_yaw_lw[4] = Math.max(this.min_size, this.xy_yaw_lw[4])
        this.half_sxy[1] = this.xy_yaw_lw[4] / 2;
        this.change_state_callback(this.xy_yaw_lw);
    }

    scale_len(dx) {
        this.xy_yaw_lw[3] += dx;
        this.xy_yaw_lw[3] = Math.max(this.min_size, this.xy_yaw_lw[3])
        this.half_sxy[0] = this.xy_yaw_lw[3] / 2;
        this.change_state_callback(this.xy_yaw_lw);
    }

    set_screen_offset(offset_x, offset_y) {
        Object.assign(this.offset_xy, { x: offset_x, y: offset_y });
        this.data_xy = this.inv_transform.transformPoint(this.offset_xy);
    }

    is_in_h(){
        return Math.abs(this.data_xy.x) < this.half_sxy[0]
    }

    is_in_v(){
        return Math.abs(this.data_xy.y) < this.half_sxy[1]
    }

    is_in_box() {
        return this.is_in_h() && this.is_in_v();
    }

    is_in_moon() {
        const dx = this.data_xy.x - this.half_sxy[0];
        const r = Math.sqrt(dx ** 2 + this.data_xy.y ** 2);
        return r < this.moon_radius && dx > 0.;
    }

    is_in_edge_x() {
        return this.is_in_h() && Math.abs(this.data_xy.y + this.half_sxy[1]) < this.edge_width;
    }

    is_in_edge_y() {
        return Math.abs(this.data_xy.x + this.half_sxy[0]) < this.edge_width && this.is_in_v();
    }

    set_state(xy_yaw_wh) {
        this.xy_yaw_lw.set(xy_yaw_wh);
        this._upd_transform();
        this.half_sxy[0] = this.xy_yaw_lw[3] / 2;
        this.half_sxy[1] = this.xy_yaw_lw[4] / 2;
    }

    set_x(x){
        this.xy_yaw_lw[0] = x;
        this._upd_transform();
    }

    set_y(y){
        this.xy_yaw_lw[1] = y;
        this._upd_transform();
    }

    set_yaw(yaw){
        this.xy_yaw_lw[2] = yaw;
        this.wrap_yaw();
        this._upd_transform()
    }

    set_len(len){
        this.xy_yaw_lw[3] = Math.max(this.min_size, len);
        this.half_sxy[0] = this.xy_yaw_lw[3] / 2;
    }

    set_wdt(wdt){
        this.xy_yaw_lw[4] = Math.max(this.min_size, wdt);
        this.half_sxy[1] = this.xy_yaw_lw[4] / 2;
    }

}

export { BboxHelper };
