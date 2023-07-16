import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MapPin, CaretDown, BellRinging } from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Sun02d from '../../assets/02d.svg'
import { days, forecastTest, teste } from '../../api';
import { GetCurrentTime, currentForecast } from '../../utils/currentForecast';

import * as Location from 'expo-location';
import { Key, useEffect, useState } from 'react';
import { ForecastType } from '../../@types/ForecastType';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
export interface WeatherData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: {
      main: string;
    }[];
  }[];
}

export function Home() {
  
  function formatarHora(data: Date) {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  } const thisDate = new Date();


  function GetCurrentForecast(date: Date) {
    const currentDay = date.toLocaleString("Pt-Br", { weekday: "short" }).split(',')[0];
    const currentDayFormatted = currentDay[0].toUpperCase() + currentDay.substring(1);
    // const currentTemperatureIndex = days.filter(day => day.day == currentDayFormatted)[0]
    // const currentTemperature = forecast.filter(forecast => forecast?.index == currentTemperatureIndex?.index)[0]
    return currentDayFormatted
  };

  const currentTime = GetCurrentTime();

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<any>();

  const [forecastState, setForecast] = useState<WeatherData | undefined>(undefined);

  const [errorMsg, setErrorMsg] = useState<string>();


  useEffect(() => {
    // (async () => {

    const fetchWeatherData = async () => {
      try {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const weatherForecast = await teste(location.coords.latitude, location.coords.longitude);

        setForecast(weatherForecast);
        setLocation(location);
        setLoading(false);
      } catch (error) {
        console.log("Erro to find data", error)
      }
    }

    if (!forecastState && loading) {
      fetchWeatherData();
    }
    // })();

  }, [forecastState, loading]);

  const splitArray = (arr: any, parts: number) => {
    const result = [];
    const len = Math.ceil(arr?.length / parts);

    for (let i = 0; i < arr?.length; i += len) {
      result.push(arr.slice(i, i + len));
    }

    return result;
  };

  const splitData = splitArray(forecastState?.list, 7);


  const ConverterToCelsius = (temp: any) => {
    const tempToCelsius = (temp - 273.15)
    return tempToCelsius.toFixed(1);
  }


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <LinearGradient colors={currentTime.gradientColor} style={styles.container}>
      <View style={styles.content}>
        {!loading && forecastState?.list.length && forecastState.list.length > 1 &&
          <>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <MapPin color="#fff" size={24} />
                <Text style={styles.headerLeftText}>Rio de Janeiro</Text>
                <CaretDown color="#fff" size={24} />
              </View>
              <BellRinging color="#fff" size={24} />
            </View>
            {/* {console.log("dias", forecastState.list)} */}
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherInfoTitle}>{`${currentTime.message}, Maria Rita`}</Text>
              {currentTime.icon}
              <Text style={styles.weatherTemperature}>{
                ConverterToCelsius(
                  forecastState.list.filter(obj => {
                    const olha = new Date(obj.dt_txt).getHours();
                    return currentTime.moment?.includes(olha.toString());
                  })[0]?.main?.temp)
              }
              </Text>
              <Text style={styles.weatherTemperatureVariation}>Max.: {
                ConverterToCelsius(
                  forecastState.list.filter(obj => {
                    const olha = new Date(obj.dt_txt).getHours();
                    return currentTime.moment?.includes(olha.toString());
                  })[0]?.main?.temp_max)
              } - Min.: {
                  ConverterToCelsius(
                    forecastState.list.filter(obj => {
                      const olha = new Date(obj.dt_txt).getHours();
                      return currentTime.moment?.includes(olha.toString());
                    })[0]?.main?.temp_min)
                }</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Previsão completa de hoje</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <>
                  {forecastState.list.length && splitData[0]?.map((item: { dt_txt: string | number | Date; main: { temp: any; }; weather: [{}] }, index: Key | null | undefined) => {
                    const dayByForecast = new Date(item.dt_txt);
                    const dayOfWeek = days.filter((day) => day?.day == GetCurrentForecast(dayByForecast))[0];
                    console.log("UE", item.weather[0]?.icon)

                    return (
                      <>
                        <View key={index} style={styles.footerCard}>
                          <Text style={styles.footerCardDay}>{formatarHora(dayByForecast)}</Text>
                          <Sun02d width={40} height={40} />
                          <Text style={styles.footerCardTemperature}>{ConverterToCelsius(item?.main?.temp)}</Text>
                        </View>
                      </>
                    );
                  })}
                </>
              </ScrollView>
            </View>
          </>
        }
      </View>
    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 35,
    paddingTop: 40,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  headerLeftText: {
    color: '#f3f3f3',
    fontSize: 16,
    fontWeight: '400'
  },
  weatherInfo: {
    paddingVertical: 70,
    alignItems: 'center',
    gap: 10
  },
  weatherInfoTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#fff'
  },
  weatherTemperature: {
    fontSize: 100,
    fontWeight: '300',
    color: '#fff'
  },
  weatherTemperatureVariation: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  },
  footer: {
    width: '100%',
    paddingLeft: 20,
  },
  footerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    alignSelf: 'center',
    paddingBottom: 16
  },
  footerCard: {
    width: 100,
    height: 130,
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginRight: 8
  },
  footerCardDay: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerCardTemperature: {
    fontSize: 24,
    fontWeight: '300',
  },

});
