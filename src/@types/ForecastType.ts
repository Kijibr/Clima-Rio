import { Float } from "react-native/Libraries/Types/CodegenTypes"

export type ForecastType = {
  mainForecast: mainForecast,
  weather: weather,
  dt_txt: string,
}

type mainForecast = {
  temp: Float,
  feels_like: Float,
  temp_min: Float,
  temp_max: Float,
  pressure: Number,
  sea_level: Number,
  grnd_level: Number,
  humidity: Number,
  temp_kf: Float
}

type weather = {
  id: Number,
  main: String,
  description: String,
}