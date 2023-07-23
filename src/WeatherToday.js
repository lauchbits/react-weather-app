import Chart from './Chart.js'
import './WeatherToday.css'

function WeatherToday(props) {

    const hourly_time = props.data.hourly.time
    const hourly_temperature = props.data.hourly.temperature_2m

    const day = hourly_time[0].substring(0, 10)

    const day_data = hourly_time.reduce((acc, time, index) => {
        if (time.includes(day)) {
            let obj = {"time": time.substring(11, 16) + " Uhr",
                    "temperature": hourly_temperature[index]}
            acc.push(obj)
        }
        return acc
    }, []);
    
    return(
        <div className='Today'>
            <Chart data={day_data} grid={true}/>
        </div>
    )
}

export default WeatherToday;