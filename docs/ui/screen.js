class Screen{
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
    }

    clear(){
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export {Screen};
