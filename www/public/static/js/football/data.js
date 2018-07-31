var color_i = 0;
var nameList = {
    'crsodds': "全場波膽",
    'chlodds': "角球大細",
    'fcsodds': "半場波膽",
    'fhaodds': "半場主客和",
    "fhlodds": "半場入球大細",
    "ftsodds": "首隊入球",
    'hadodds': "主客和",
    "hdcodds": "亞洲讓盤",
    'hftodds': "半全場",
    'hhaodds': "讓球主客和",
    'hilodds': "全場入球大細",
    'ooeodds': "入球單雙",
    'ttgodds': "總入球",
};
$(document).ready(function () {
    let hkjc_id = location.href.match(/\/football\/data\/(.*)$/)[1];
    $.ajax({
        url: `/football/data/getChart/${hkjc_id}`,
        method: 'GET',
        dataType: 'json',
        success(res) {

            console.log(res);
            if (res.r) {
                drawCharts(res.data);
            }
        },
        error() {

        }
    })
});


const drawCharts = function (data) {
    let ts = data.ts;
    Object.keys(data).forEach(function (ele) {
        switch (ele) {
            case 'crsodds':
                Object.keys(data[ele]).sort().forEach(function (ele, i) {
                    // if (i % 2 == 0) {
                    //     $('div').addClass('row').
                    // }
                });
                break;
            case 'fcsodds':
            case 'hilodds':
                let temp = {};
                Object.keys(data[ele]).sort().forEach(function (ele, i) {
                    console.log(i)
                    if (i % 2 == 0) {
                        temp[i] = $('<div/>').addClass('row').appendTo('#hilodds');
                        temp[i].append('<div/>').attr('id',`${ele}_${i}`).addClass('col-lg-6 col-md-6 col-xs-12');
                        new Chart(
                            document.getElementById(`${ele}_${i}`).getContext('2d'),
                            makeMultiLineChartJsConfig(data[ele], ts, nameList[ele])
                        );
                    }else{
                        temp[i-1].append('<div/>').attr('id',`${ele}_${i-1}`).addClass('col-lg-6 col-md-6 col-xs-12');
                        new Chart(
                            document.getElementById(`${ele}_${i}`).getContext('2d'),
                            makeMultiLineChartJsConfig(data[ele], ts, nameList[ele])
                        );
                    }

                });
                break;
            case 'ttgodds':
            case 'hdcodds':
            case 'ooeodds':
            case 'fhaodds':
            case 'hadodds':
            case 'hhaodds':
                new Chart(
                    document.getElementById(`${ele}`).getContext('2d'),
                    makeMultiLineChartJsConfig(data[ele], ts, nameList[ele])
                );
                break;
            default:
        }
    });

}

const makeChartJsConfig = function (yLable, xLable, label, title = "") {
    let color = randomColor();
    return {
        type: 'line',
        data: {
            labels: xLable,
            datasets: [{
                label: label,
                fill: false,
                backgroundColor: color,
                borderColor: color,
                data: yLable
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: title
            },
        }
    };
}

const makeMultiLineChartJsConfig = function (yLables, xLable, title = "") {
    let max = 0, min = 999;
    let ds = [];
    Object.keys(yLables).forEach(function (label) {
        let color = randomColor();
        ds.push({
            label: label,
            fill: false,
            backgroundColor: color,
            borderColor: color,
            data: yLables[label]
        });
        if (Math.max(...yLables[label]) > max) {
            max = Math.max(...yLables[label]);
        }
        if (Math.min(...yLables[label]) < min) {
            min = Math.min(...yLables[label]);
        }
    });
    return {
        type: 'line',
        data: {
            labels: xLable,
            datasets: ds
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: title
            },
            scales: {
                xAxes: [{
                    display: false,
                    scaleLabel: {
                        display: true,
                        labelString: ''
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        min: min - 1
                    }
                }]
            }
        }
    };
}

const randomColor = function () {
    const colorList = ['#E6B0AA', '#EBDEF0', '#D4E6F1', '#D1F2EB', '#FCF3CF', '#FAE5D3'];
    if (color_i > 5) {
        color_i = 0;
    }
    return colorList[color_i++];
}

