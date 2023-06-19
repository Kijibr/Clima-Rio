import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MapPin, CaretDown, BellRinging } from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Sun02d from '../../assets/02d.svg'
import { days, forecast } from '../../api';
import { GetCurrentTime } from '../../utils/currentForecast';

export function Home() {
  const thisDate = new Date();

  function GetCurrentForecast() {
    const currentDay = thisDate.toLocaleString('pt-br', { weekday: 'short' }).split(',')[0];
    const currentDayFormatted = currentDay[0].toUpperCase() + currentDay.substring(1);
    const currentTemperatureIndex = days.filter(day => day.day == currentDayFormatted)[0].index
    const currentTemperature = forecast.filter(forecast => forecast.index == currentTemperatureIndex)[0].temp

    return currentTemperature
  };
  
  const currentTemperature = GetCurrentForecast();
  const currentTime = GetCurrentTime();
  
  return (
    <LinearGradient colors={currentTime.gradientColor} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MapPin color="#fff" size={24} />
            <Text style={styles.headerLeftText}>Rio de Janeiro</Text>
            <CaretDown color="#fff" size={24} />
          </View>
          <BellRinging color="#fff" size={24} />
        </View>

        <View style={styles.weatherInfo}>
          <Text style={styles.weatherInfoTitle}>{`${currentTime.message}, Maria Rita`}</Text>
          {currentTime.icon}
          <Text style={styles.weatherTemperature}>{currentTemperature}</Text>
          <Text style={styles.weatherTemperatureVariation}>Max.: 34° - Min.: 23°</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Previsão para esta semana</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <>
              {forecast.map((item: any, index) => {
                const dayOfWeek = days.filter((day) => day.index == item.index)[0];
                return (
                  <>
                    <View key={index} style={styles.footerCard}>
                      <Text style={styles.footerCardDay}>{dayOfWeek.day}</Text>
                      <Sun02d width={40} height={40} />
                      <Text style={styles.footerCardTemperature}>{item.temp}</Text>
                    </View>
                  </>
                )
              })}
            </>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
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
    paddingLeft: 24,
  },
  footerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    alignSelf: 'center',
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
