
class TopPanel{
    constructor(){
        this.reset_btn = document.getElementById("reset-btn");
        this.inp_x = document.getElementById("inp-x");
        this.inp_y = document.getElementById("inp-y");
        this.inp_yaw = document.getElementById("inp-yaw");
        this.inp_len = document.getElementById("inp-len");
        this.inp_wdt = document.getElementById("inp-wdt");
    }

    set_state(xy_yaw_lw){
        this.inp_x.value = xy_yaw_lw[0].toFixed(2);
        this.inp_y.value = xy_yaw_lw[1].toFixed(2);
        this.inp_yaw.value = (xy_yaw_lw[2] * 180 / Math.PI).toFixed(0);
        this.inp_len.value = xy_yaw_lw[3].toFixed(2);
        this.inp_wdt.value = xy_yaw_lw[4].toFixed(2);
    }

}

export {TopPanel};
