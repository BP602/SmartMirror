<template>
  <div v-for="(id, city) in weather">
      <!-- <figure class="icons">
        <canvas id="clear-day" width="64" height="64"></canvas>
        <canvas id="clear-night" width="64" height="64"></canvas>
      </figure> -->
    <div class="content weather">
      <div class="row weather-main">
        <h1>{{city.Name}}</h1>
        <i class="wi wi-forecast-io-{{city.Icon}} "></i>
      </div>
      <div class="row weather-details">
        <h3>{{city.Summary}}</h3>
        <p><i class="wi wi-thermometer"></i> From {{city.TemperatureMin}}<i class="wi wi-celsius"></i> to {{city.TemperatureMax}}<i class="wi wi-celsius"></i></p>
      </div>
      <div class="row weather-week">
        <div class="col weather-week-day">
          <div class="row">
            <h2>{{city.NextDay}}</h2>
          </div>
          <div class="row">
            <i class="wi wi-forecast-io-{{city.NextDayIcon}}"></i>
          </div>
        </div>
        <div class="col weather-week-day">
          <div class="row">
            <h2>{{city.NextDay1}}</h2>
          </div>
          <div class="row">
            <i class="wi wi-forecast-io-{{city.NextDay1Icon}}"></i>
          </div>
        </div>
        <div class="col weather-week-day">
          <div class="row">
            <h2>{{city.NextDay2}}</h2>
          </div>
          <div class="row">
            <i class="wi wi-forecast-io-{{city.NextDay2Icon}}"></i>
          </div>
        </div>
        <div class="col weather-week-day">
          <div class="row">
            <h2>{{city.NextDay3}}</h2>
          </div>
          <div class="row">
            <i class="wi wi-forecast-io-{{city.NextDay3Icon}}"></i>
          </div>
        </div>
        <h3>{{city.WeekSummary}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    props: ['weather']/*,
    ready: function(){
      var icons = new Skycons({"color": "white"});

      icons.set("clear-day", Skycons.CLEAR_DAY);
      icons.set("clear-night", Skycons.CLEAR_NIGHT);
      icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
      icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
      icons.set("cloudy", Skycons.CLOUDY);
      icons.set("rain", Skycons.RAIN);
      icons.set("sleet", Skycons.SLEET);
      icons.set("snow", Skycons.SNOW);
      icons.set("wind", Skycons.WIND);
      icons.set("fog", Skycons.FOG);

      icons.play();
    }*/
  }
</script>