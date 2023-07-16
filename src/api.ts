import axios from "axios";
import { WeatherData } from "./screens/Home";

export const api = axios.create({
  baseURL: "api.openweathermap.org/data/2.5"
})

export const teste = async(lat: number, lon: number) => {
  try {
    const lati = lat.toString()
    const long = lon.toString()

    const vai = await api.get<WeatherData>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=fad6817924cb65152944de5bcd315f4b`);
    // if (vai.status == 200)
      return vai.data
  } catch (error) {
    console.error("deu pau", error)
  }
}

export const days = [
  {
    index: 0,
    day: 'Seg.'
  },
  {
    index: 1,
    day: 'Ter.'
  },
  {
    index: 2,
    day: 'Quar.'
  },
  {
    index: 3,
    day: 'Qui.'
  },
  {
    index: 4,
    day: 'Sex.'
  },
  {
    index: 5,
    day: 'Sáb.'
  },
  {
    index: 6,
    day: 'Dom.'
  },
  {
    index: 7,
    day: 'Seg.'
  },
]

export const cities = [
  'Nova Iguaçu',
  'Caxias',
  'Rio de Janeiro', 
  'Campo Grande', 
  'Copacabana',
  'Queimados',
  'Jacarépaguá'
]

export const forecastTest = [
  {
    index: 0,
    temp: '22°C'
  },
  {
    index: 1,
    temp: '14°C'
  },
  {
    index: 2,
    temp: '27°C'
  },
  {
    index: 3,
    temp: '36°C'
  },
  {
    index: 4,
    temp: '25°C'
  },
  {
    index: 5,
    temp: '18°C'
  },
  {
    index: 6,
    temp: '19°C'
  },
  {
    index: 7,
    temp: '12°C'
  },
]