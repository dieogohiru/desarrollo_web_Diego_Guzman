document.addEventListener('DOMContentLoaded', function () {

    fetch('/estadisticas/miembros_dia')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('grafico-lineas', {
                chart: { type: 'line' },
                title: { text: 'Miembros Registrados por Día' },
                xAxis: { categories: data.fechas, title: { text: 'Días' } },
                yAxis: { title: { text: 'Cantidad de Miembros' }, allowDecimals: false },
                legend: { enabled: false },
                series: [{ name: 'Miembros', data: data.totales }]
            });
        });

    fetch('/estadisticas/actividades_tipo')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('grafico-torta', {
                chart: { type: 'pie' },
                title: { text: 'Total de Actividades por Tipo' },
                series: [{ name: 'Actividades', colorByPoint: true, data: data }]
            });
        });

    fetch('/estadisticas/actividades_comuna')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('grafico-barras', {
                chart: { type: 'column' },
                title: { text: 'Total de Actividades registradas por Comuna' },
                xAxis: { categories: data.comunas, title: { text: 'Comunas' } },
                yAxis: { title: { text: 'Total de Actividades' }, allowDecimals: false,softMax: 10 },
                plotOptions: { column: {maxPointWidth: 50} },
                legend: { enabled: false },
                series: [{ name: 'Actividades', colorByPoint: true, data: data.totales }]
            });
        });
});