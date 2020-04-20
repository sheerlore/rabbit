var step = 0;
var jumpstep = 0;
var word = axios.get('./data.json')
.then(res => {
    console.log(res)
})
.catch(err => {
    console.error(err); 
})
console.log(word);


var app = new Vue({
    el: '#main',
    data: {
        word:[],
    },
    methods: {
        leftClick: function () {
            step += 12
        },
        rightClick: function () {
            step -= 12
        },
        jumpClick: function () {
            jumpstep -= 48
        }
    },
})


var stand = [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


var result = [];
const outputElement = document.getElementById('output_csv');

function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get","./rabbitngsl.csv",true);
    req.send();
    req.onload = function () {
    convertCSVtoArray(req.responseText);
    }
}

function convertCSVtoArray(str) {
    var tmp = str.split("\n");
    for (var i = 0; i < tmp.length; ++i){
        result[i] = tmp[i].split(',');
    }
    console.log(result[2][1]);
}

getCSV();

console.log(result);

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var rabbit = new function () {
    this.dt = 3;
    this.x = canvas.width / 2 - this.dt * 10;
    this.y = canvas.height - this.dt * 20;

    this.draw = function () {
        for (var h = 0; h < 20; h++) {
            for (var w = 0; w < 20; w++) {
                if (stand[h][w] === 1) {
                    ctx.fillStyle = '#000';
                } else {
                    ctx.fillStyle = 'transparent';
                }

                if (step + this.x + 10 * this.dt < 0) {
                    step = 120 + 10 * this.dt;
                    // console.log('you');
                } else if (step + this.x + 10 * this.dt > canvas.width) {
                    step = -120 - 10 * this.dt;
                    // console.log('ewr');
                }
                if (jumpstep + this.y + 20 * this.dt < 0) {
                    jumpstep = 0;
                }


                if (jumpstep < 0) {
                    jumpstep += 0.005;
                }

                ctx.fillRect(
                    step + this.x + w * this.dt,
                    this.y + jumpstep + h * this.dt,
                    this.dt,
                    this.dt
                );
            }
        }
    }
}
function loop() {
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rabbit.draw();
    requestAnimationFrame(loop);
}
loop();