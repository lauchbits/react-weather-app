import Chart from './Chart.js'
import './ThreeDays.css'

function ThreeDays(props) {

    const clicked = props.clicked
    const hourly_temperature = props.data.hourly.temperature_2m

    const weekday = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]
    const d = new Date()
    const days = [weekday[d.getDay()], weekday[d.getDay() + 1], weekday[d.getDay() + 2], weekday[d.getDay() + 3], weekday[d.getDay() + 4]]
    const previewAmount = [0, 0, 0]

    //find max and avg
    let avg = [0, 0, 0, 0, 0]
    let max = [{"time" : 0, "temp" : 0},
                {"time" : 0, "temp" : 0},
                {"time" : 0, "temp" : 0},
                {"time" : 0, "temp" : 0},
                {"time" : 0, "temp" : 0}]


    for(let j = 0; j < 5; j++){
        for(let i = 0 + (j * 24); i < 24  + (j * 24); i++){
            avg[j] += hourly_temperature[i]
            if (hourly_temperature[i] > max[j].temp){
                max[j].time = i
                max[j].temp = hourly_temperature[i]
            }
        }
        avg[j] = (avg[j] / 24).toFixed(1)
    }
    

    if(!clicked){
        return(
            <div>
                <table>
                        <tr>
                        <th></th>
                        <th>Avg</th>
                        <th>Max</th>
                        </tr>
                    {previewAmount.map((idk, index) => (
                        <tr>
                        <td className='firsttd'>{days[index]}</td>
                        <td className='secondtd'>{avg[index]}°</td>
                        <td>{max[index].temp}°</td>
                        </tr>
                    ))}
              </table>
            </div>
        )
    }
    else{
        let data = []
        for(let i = 0; i < 5; i++){
            let nextDay = new Date()
            nextDay.setDate(d.getDate() + i)

            let day = nextDay.getDate()
            let month = nextDay.getMonth()

            let format1 = day + "." + month + "."

            let obj = {"time": format1,
                    "temperature": parseFloat(avg[i]),
                    "max_temperature": parseFloat(max[i].temp)}
            data.push(obj)
        }

        return(
            <div className='ThreeDayChart'>
                <Chart data={data} grid={false} max_temp={true} ></Chart>
            </div>
        )
    }
}

export default ThreeDays;