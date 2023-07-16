import Sun from '../assets/01d.svg'
import SunCloud from '../assets/02d.svg'
import HalfMoon from '../assets/01n.svg'
import MoonCloud from '../assets/02n.svg'
import Clouds from '../assets/03d.svg'
import SunCloudRain from '../assets/10d.svg'
import MoonCloudRain from '../assets/10n.svg'
import SunCloudStorm from '../assets/11d.svg'
import MoonCloudStorm from '../assets/11n.svg'
import { gradientColors } from '../styles/pallete'

const thisDate = new Date();

export const currentForecast = () => {


}

export const firstDawn = ['01', '02', '03'];
export const firstDay = ['04', '05', '06'];
export const secondDay = ['07', '08', '09'];
export const firstNoon = ['10', '11', '12'];
export const secondNoon = ['13', '14', '15'];
export const thirdNoon = ['16', '17', '18'];
export const firstNight = ['19', '20', '21'];
export const secondNight = ['22', '23', '0'];

export function GetCurrentTime() {
  const time = thisDate.toLocaleTimeString('pt-br', { hour: '2-digit' })
  // const goodMornin = ['05', '06', '07', '08', '09', '10', '11']
  const goodMornin = [""].concat(firstDay, secondDay);
  // const goodNoon = ['12', '13', '14', '15', '16', '17']
  const goodNoon = [""].concat(firstNoon, secondNoon, thirdNoon)
  // const goodEvening = ['18', '19', '20', '21']
  const goodEvening = [""].concat(firstNight)
  const goodNight = [""].concat(secondNight, firstDawn);

  switch (true) {
    case goodMornin.includes(time):
      return {
        icon: <SunCloud width={200} height={200} />,
        message: 'Bom dia',
        gradientColor: gradientColors.day,
        moment: goodMornin,
      }
    case goodNoon.includes(time):
      return {
        icon: <Sun width={200} height={200} />,
        message: 'Boa tarde',
        gradientColor: gradientColors.noon,
        moment: goodNoon,
      }
    case goodEvening.includes(time):
      return {
        icon: <HalfMoon width={200} height={200} />,
        message: 'Boa noite',
        gradientColor: gradientColors.night,
        moment: goodEvening,
      }
    case goodNight.includes(time):
      return {
        icon: <HalfMoon width={200} height={200} />,
        message: 'Boa noite',
        gradientColor: gradientColors.dawn,
        moment: goodNight,
      }
    default:
      return {
        icon: <Clouds />,
        message: 'Olá',
        gradientColor: gradientColors.day
      }
  }
}

export const CurrentIcon = (date: Date) => {
  const time = thisDate.toLocaleTimeString('pt-br', { hour: '2-digit' })
  // const goodMornin = ['05', '06', '07', '08', '09', '10', '11']
  const goodMornin = [""].concat(firstDay, secondDay);
  // const goodNoon = ['12', '13', '14', '15', '16', '17']
  const goodNoon = [""].concat(firstNoon, secondNoon, thirdNoon)
  // const goodEvening = ['18', '19', '20', '21']
  const goodEvening = [""].concat(firstNight)
  const goodNight = [""].concat(secondNight, firstDawn);

  switch (true) {
    case goodMornin.includes(time):
      return {
        icon: <SunCloud width={200} height={200} />,
        message: 'Bom dia',
        gradientColor: gradientColors.day,
        moment: goodMornin,
      }
    case goodNoon.includes(time):
      return {
        icon: <Sun width={200} height={200} />,
        message: 'Boa tarde',
        gradientColor: gradientColors.noon,
        moment: goodNoon,
      }
    case goodEvening.includes(time):
      return {
        icon: <HalfMoon width={200} height={200} />,
        message: 'Boa noite',
        gradientColor: gradientColors.night,
        moment: goodEvening,
      }
    case goodNight.includes(time):
      return {
        icon: <HalfMoon width={200} height={200} />,
        message: 'Boa noite',
        gradientColor: gradientColors.dawn,
        moment: goodNight,
      }
    default:
      return {
        icon: <Clouds />,
        message: 'Olá',
        gradientColor: gradientColors.day
      }
  }
}