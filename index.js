class Scene {
    constructor(width = 400, height = 400) {
        this.canvas = document.getElementById('canvas');
        this.width = width;
        this.height = height;
        this.canvasContext = this.canvas.getContext("2d");
    }

    set width(width) {
        this.canvas.width = width;
    }
    get width() {
        return this.canvas.width;
    }

    set height(height) {
        this.canvas.height = height;
    }
    get height() {
        return this.canvas.height;
    }

    clereScene() {
        this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
}


class RainDrop {
    constructor(canvasContext, x = 200, y = 0, length = 20, thickness = 2, speed = 1) {
        this._canvasContext = canvasContext;
        this.color = "#ffffff";
        this.x = x;
        this.y = y;
        this.length = length;
        this.thickness = thickness;
        this.speed = speed;
    }

    show() {
        this._canvasContext.beginPath();
        this._canvasContext.moveTo(this.x, this.y);
        this._canvasContext.lineTo(this.x, this.y + this.length);
        this._canvasContext.lineWidth = this.thickness;
        this._canvasContext.strokeStyle = this.color;
        this._canvasContext.stroke();
    }

    fall() {
        this.y += this.speed;
    }
}

class Rain {
    constructor(scene, dropsNumber = 1000) {
        this.pause = true;
        this.scene = scene;
        this.dropsNumber = dropsNumber;
        this.drops = [];
        this._setupRainDrops();
    }

    start() {
        this.pause = false;
        window.requestAnimationFrame(this._animationCallback.bind(this));
    }

    stop() {
        this.pause = true;
    }

    _setupRainDrops() {
        for (let i = 0; i <= this.dropsNumber; i++) {
            const length = randomInt(10, 20);
            const x = randomInt(0, this.scene.width);
            const y = randomInt(-this.scene.height, -length);
            const thickness = randomInt(1, 3);
            const speed = randomInt(10, 20) / 2;
            this.drops.push(new RainDrop(this.scene.canvasContext, x, y, length, thickness, speed));
        }
    }

    _animationCallback() {
        this.scene.clereScene();
        this.drops.forEach((drop) => {
            drop.fall();
            drop.show();
            if (drop.y >= this.scene.height) {
                drop.x = randomInt(0, this.scene.width);
                drop.y = randomInt(-this.scene.height, -drop.length);
            }
        });
        if (!this.pause) {
            requestAnimationFrame(this._animationCallback.bind(this));
        }
    }
}

function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

(function main() {
    let scene = new Scene(document.documentElement.clientWidth, document.documentElement.clientHeight);
    let rain = new Rain(scene, 1000);
    rain.start();

    window.addEventListener('resize', function (event) {
        rain.stop();
        scene = new Scene(document.documentElement.clientWidth, document.documentElement.clientHeight);
        rain = new Rain(scene, 1000);
        rain.start();
    });
})();



