import { ref } from 'vue'

export default function useChart(isMobile){
    console.log(`ismobile: ${isMobile.value}`);
    const backgroundColor = [
        '#41B883',
        '#DD1B16',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
    ]

    const chart = ref({
        id: 'doughnut',
        type: 'bar',
        data: {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#E46651',
                '#00D8FF',
                '#DD1B16'
              ],
              data: [40, 20, 80, 10]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: isMobile.value? 'y' : 'x',
          plugins: {
            title: {
              display: true,
              text: 'GDP CHART'
            },
            legend: {
              labels: {
                font: {
                    size: 10
                }
              },
              ticks: {
                autoSkip: false
              }
            }
          },
          
        }
    })

    const updateChart = ( label , key , content ) => {
      let i = 0
      chart.value.data.labels = key
      var serie = content.map( element=> { 
          const eachSerie = {}
          eachSerie.label = label[i]
          eachSerie.data = element
          eachSerie.backgroundColor = backgroundColor[i]
          i++
          return eachSerie
      })
      chart.value.data.datasets = serie
      console.log(chart.value.options)
    }

    const isMobileChart = (isMobile)=>{
      if (isMobile)
        chart.value.options.indexAxis = 'y'
      else 
        chart.value.options.indexAxis = 'x'
        
    } 

    return { chartData: chart , updateChart , isMobileChart } 

}

