document.addEventListener('DOMContentLoaded', function () {
  let chartSerieDom = document.querySelector('#chart-serie');
  window.serieChart = echarts.init(chartSerieDom);

  window.formSerie = document.querySelector('#form-serie');


  let canvas = document.querySelector('#canvas-point');
  window.inputX = document.querySelector('#value_x');
  window.inputY = document.querySelector('#value_y');
  window.side = canvas.width;
  window.sideHalf = side / 2;

  let lienzo = canvas.getContext("2d");

  window.lienzo = lienzo;

  lienzo.lineWidth = 1;

  window.drawPlane();
});

window.graphSerie = function () {
  let option = window.getOptionSerie();
  let $inputs = new FormData(window.formSerie).entries();

  let serieCategory = [];
  let serieValue = [];

  for (let i = 0; i < 5; i++) {
    let x = $inputs.next().value[1];
    let y = parseInt($inputs.next().value[1]);

    if (x.trim() != '' && y != NaN) {
      serieCategory.push(x);
      serieValue.push(y);
    }
  }

  option.xAxis.data = serieCategory;
  option.series = {
    data: serieValue,
    type: 'bar'
  };

  window.serieChart.setOption(option);
};

window.cleanSerie = function () {
  window.serieChart.clear();
  window.formSerie.reset();
};

window.getOptionSerie = function () {
  return {
    label: {
      show: true
    },
    tooltip: {
      show: true
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
  };
};

window.drawPlane = function () {
  window.changeColor('#ccc');
  window.setLineDashed([1, 2]);
  for (let i = 0; i < window.side + 1; i = i + 25) {
    if (window.sideHalf == i) {
      continue;
    }

    window.drawLine([i, 0], [i, window.side]);
    window.drawLine([0, i], [window.side, i]);
  }

  // axis x and y

  window.changeColor('#333333');
  window.setLineDashed();

  window.drawLine([window.sideHalf, 0], [window.sideHalf, window.side]);
  window.drawLine([0, window.sideHalf], [window.side, window.sideHalf]);
};


window.drawText = function (text, x, y) {
  lienzo.beginPath() //iniciar ruta
  lienzo.fillText(text, x, y);
};

window.drawLine = function (from, to) {
  lienzo.beginPath();
  lienzo.moveTo(...from);
  lienzo.lineTo(...to);
  lienzo.stroke();
  lienzo.closePath();
};

window.drawPoint = function (x = 0, y = 0) {
  lienzo.beginPath();
  lienzo.arc(x, y, 5, 0, 2 * Math.PI);
  lienzo.fillStyle = "#047857";
  lienzo.stroke();
  lienzo.fill();
};

window.setLineDashed = function (patern = []) {
  lienzo.setLineDash(patern);
};

window.changeColor = function (color) {
  lienzo.strokeStyle = color;
};

window.clearPlane = function () {
  window.lienzo.clearRect(0, 0, window.side, window.side);
};

window.graphPoint = function () {
  window.clearPlane();
  window.drawPlane();
  let valuex = parseInt(window.inputX.value);
  let valuey = parseInt(window.inputY.value);
  if (isNaN(valuex) || isNaN(valuey)) {
    alert('Los valores deben ser números');

    return false;
  }

  let lengthx = Math.abs(valuex).toString().length;
  let lengthy = Math.abs(valuey).toString().length;

  let countDigit = (lengthx > lengthy) ? lengthx : lengthy;

  lienzo.fillStyle = "#000";

  let valueAxis = Math.pow(10, countDigit);

  drawText(valueAxis, side - 15, sideHalf - 2); // x
  drawText('-' + valueAxis, 1, sideHalf - 2); // -x

  drawText(valueAxis, sideHalf + 2, 10); // y
  drawText('-' + valueAxis, sideHalf + 2, side - 10); //-y

  let valuexCanvasPre = Math.abs(valuex);
  let valueyCanvasPre = Math.abs(valuey);
  if (countDigit > 1) {
    valuexCanvasPre = Math.abs(valuex) / (10 * (countDigit - 1));
    valueyCanvasPre = Math.abs(valuey) / (10 * (countDigit - 1));
  }

  let valuexCanvas = sideHalf - (valuexCanvasPre * 25);
  let valueyCanvas = sideHalf + (valueyCanvasPre * 25);
  if (valuex > 0) {
    valuexCanvas = sideHalf + (valuexCanvasPre * 25);
  }

  if (valuey > 0) {
    valueyCanvas = sideHalf - (valueyCanvasPre * 25);
  }

  drawPoint(valuexCanvas, valueyCanvas);
};