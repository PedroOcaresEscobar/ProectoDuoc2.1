// app.js

document.addEventListener('DOMContentLoaded', function () {

  graficoDeBarras()

  graficoCircular1();

  graficoCircular2();

  graficoCircular3();

  graficoDeLineas();


  });

  function graficoDeBarras (){

    var data = {
      labels: ["Barra 1", "Barra 2", "Barra 3", "Barra 4", "Barra 5"],
      datasets: [{
        label: 'Ejemplo de Datos',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Rojo pastel
          'rgba(54, 162, 235, 0.5)', // Azul pastel
          'rgba(255, 206, 86, 0.5)', // Amarillo pastel
          'rgba(75, 192, 192, 0.5)', // Verde pastel
          'rgba(153, 102, 255, 0.5)' // Morado pastel
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    };
  
    // Opciones para personalizar el gráfico
    var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  
    // Inicializar el gráfico
    var ctx = document.getElementById('myBarChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
  
  function graficoCircular1(){
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        },
        options: {
            responsive: true
        }
    });
    }

  function graficoCircular2(){
      var porcentaje = 80; // Este valor debe ser dinámico según tus datos
    
      var data = {
        labels: ["Porcentaje"],
        datasets: [{
          data: [porcentaje, 100 - porcentaje], // Valor del porcentaje y complemento
          backgroundColor: ['#007bff', '#f0f0f0'], // Colores del gráfico
          hoverOffset: 4 // Desplazamiento al pasar el mouse
        }]
      };
    
      // Opciones del gráfico circular
      var options = {
        responsive: true,
        cutout: '70%', // Porcentaje de vaciado central
        plugins: {
          tooltip: {
            enabled: false // Desactivar tooltip por defecto
          },
          legend: {
            display: false // Ocultar leyenda
          }
        }
      };
    
      // Obtener el contexto del canvas
      var ctx = document.getElementById('myDoughnutChart1').getContext('2d');
    
      // Crear el gráfico circular tipo 'doughnut'
      var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
      });
    
    
      document.querySelector('.porcentaje-1').textContent = `${porcentaje}%`;
    }

  function graficoCircular3(){
      var porcentaje = 40; // Este valor debe ser dinámico según tus datos
    
      var data = {
        labels: ["Porcentaje"],
        datasets: [{
          data: [porcentaje, 100 - porcentaje], // Valor del porcentaje y complemento
          backgroundColor: ['#20c997', '#f0f0f0'], // Colores del gráfico
          hoverOffset: 4 // Desplazamiento al pasar el mouse
        }]
      };
    
      // Opciones del gráfico circular
      var options = {
        responsive: true,
        cutout: '70%', // Porcentaje de vaciado central
        plugins: {
          tooltip: {
            enabled: false // Desactivar tooltip por defecto
          },
          legend: {
            display: false // Ocultar leyenda
          }
        }
      };
    
      // Obtener el contexto del canvas
      var ctx = document.getElementById('myDoughnutChart2').getContext('2d');
    
      // Crear el gráfico circular tipo 'doughnut'
      var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
      });
    
      document.querySelector('.porcentaje-2').textContent = `${porcentaje}%`;
    }

  function graficoDeLineas(){
      const ctx = document.getElementById('myLineChart').getContext('2d');
  
      // Datos del gráfico de líneas
      const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'My First dataset',
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              data: [65, 59, 80, 81, 56, 55, 40]
          }, {
              label: 'My Second dataset',
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              data: [28, 48, 40, 19, 86, 27, 90]
          }]
      };
  
      // Opciones del gráfico de líneas
      const options = {
          responsive: true,
          scales: {
              x: {
                  beginAtZero: true
              },
              y: {
                  beginAtZero: true
              }
          },
          animation: {
              tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: false
              }
          }
      };
  
      // Crear el gráfico de líneas
      const myLineChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
      });
  }