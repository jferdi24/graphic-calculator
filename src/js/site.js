document.addEventListener('DOMContentLoaded', function () {
  let chartSerieDom = document.querySelector('#chart-serie');
  window.serieChart = echarts.init(chartSerieDom);

  window.formSerie = document.querySelector('#form-serie');

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