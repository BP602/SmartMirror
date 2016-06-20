const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ForecastIo = require('forecastio');
const Firebase = require('firebase');
const feed = require("feed-read");
const moment = require('moment');

let mainWindow;

function createWindow () {
    // create the browser window
    mainWindow = new BrowserWindow({width: 800, height: 600});
    // render index.html which will contain our root Vue component
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    //FullScreen window
    mainWindow.setFullScreen(true);

    // dereference the mainWindow object when the window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

// call the createWindow() method when Electron has finished initializing
app.on('ready', createWindow);

// when all windows are closed, quit the application on Windows/Linux
app.on('window-all-closed', function () {
    // only quit the application on OS X if the user hits cmd + q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // re-create the mainWindow if the dock icon is clicked in OS X and no other
    // windows were open
    if (mainWindow === null) {
        createWindow();
    }
});

//Update weather every hour
let forecastIo = new ForecastIo('');
let options={
  units: 'si',
  exclude: 'currently,minutely,hourly,flags'
};
let firebaseWeatherDublinRef = new Firebase("https://smart-mirror.firebaseio.com/weather/dublin");
let firebaseWeatherParisRef = new Firebase("https://smart-mirror.firebaseio.com/weather/paris");
let firebaseNotesRef = new Firebase("https://smart-mirror.firebaseio.com/notes");
// Every hour
setInterval(function(){
    //Update weather
    forecastIo.forecast('53.3498', '6.2603', options).then(function(data) {
        firebaseWeatherDublinRef.set({
            Name:'Dublin',
            TemperatureMin: data.daily.data[1].temperatureMin,
            TemperatureMax: data.daily.data[1].temperatureMax,
            Icon: data.daily.data[1].icon,
            Summary: data.daily.data[1].summary,

            NextDay:moment.unix(data.daily.data[2].time).format('ddd'),
            NextDayTemperatureMin: data.daily.data[2].temperatureMin,
            NextDayTemperatureMax: data.daily.data[2].temperatureMax,
            NextDayIcon: data.daily.data[2].icon,
            NextDaySummary: data.daily.data[2].summary,

            NextDay1:moment.unix(data.daily.data[3].time).format('ddd'),
            NextDay1TemperatureMin: data.daily.data[3].temperatureMin,
            NextDay1TemperatureMax: data.daily.data[3].temperatureMax,
            NextDay1Icon: data.daily.data[3].icon,
            NextDay1Summary: data.daily.data[3].summary,

            NextDay2:moment.unix(data.daily.data[4].time).format('ddd'),
            NextDay2TemperatureMin: data.daily.data[4].temperatureMin,
            NextDay2TemperatureMax: data.daily.data[4].temperatureMax,
            NextDay2Icon: data.daily.data[4].icon,
            NextDay2Summary: data.daily.data[4].summary,

            NextDay3:moment.unix(data.daily.data[5].time).format('ddd'),
            NextDay3TemperatureMin: data.daily.data[5].temperatureMin,
            NextDay3TemperatureMax: data.daily.data[5].temperatureMax,
            NextDay3Icon: data.daily.data[5].icon,
            NextDay3Summary: data.daily.data[5].summary,

            WeekSummary: data.daily.summary
        });
        /* skycons.set(document.getElementById("icon1"), Skycons.data.daily.data[1].icon);
        skycons.set(document.getElementById("icon2"), Skycons.data.daily.data[2].icon); */

    });
    forecastIo.forecast('48.8566', '2.3522', options).then(function(data) {
        firebaseWeatherParisRef.set({
            Name:'Paris',
            TemperatureMin: data.daily.data[1].temperatureMin,
            TemperatureMax: data.daily.data[1].temperatureMax,
            Icon: data.daily.data[1].icon,
            Summary: data.daily.data[1].summary,

            NextDay:moment.unix(data.daily.data[2].time).format('ddd'),
            NextDayTemperatureMin: data.daily.data[2].temperatureMin,
            NextDayTemperatureMax: data.daily.data[2].temperatureMax,
            NextDayIcon: data.daily.data[2].icon,
            NextDaySummary: data.daily.data[2].summary,

            NextDay1:moment.unix(data.daily.data[3].time).format('ddd'),
            NextDay1TemperatureMin: data.daily.data[3].temperatureMin,
            NextDay1TemperatureMax: data.daily.data[3].temperatureMax,
            NextDay1Icon: data.daily.data[3].icon,
            NextDay1Summary: data.daily.data[3].summary,

            NextDay2:moment.unix(data.daily.data[4].time).format('ddd'),
            NextDay2TemperatureMin: data.daily.data[4].temperatureMin,
            NextDay2TemperatureMax: data.daily.data[4].temperatureMax,
            NextDay2Icon: data.daily.data[4].icon,
            NextDay2Summary: data.daily.data[4].summary,

            NextDay3:moment.unix(data.daily.data[5].time).format('ddd'),
            NextDay3TemperatureMin: data.daily.data[5].temperatureMin,
            NextDay3TemperatureMax: data.daily.data[5].temperatureMax,
            NextDay3Icon: data.daily.data[5].icon,
            NextDay3Summary: data.daily.data[5].summary,

            WeekSummary: data.daily.summary
        });
    });

    //And news
    feed("http://feeds.bbci.co.uk/news/rss.xml", function(err, articles) {
    if (err) throw err;
    firebaseNotesRef.set(null);
    for (var i = 5 - 1; i >= 0; i--) {
        firebaseNotesRef.push({
            Title:articles[i].title,
            Content:articles[i].content
        });
    }
});
}, 30 * 60 * 1000);

let firebaseUsersRef = new Firebase("https://smart-mirror.firebaseio.com/users");
setInterval(function(){
    exec('streamer -f jpg -o /tmp/webcam.jpeg');
    firebaseUsersRef.on("value", function(snapshot) {
        let found=false;
        for (userId in snapshot.val()) {
            while(found===false)
            firebaseUsersRef.child(userId).update({"Recognized": "False"});
            firebaseUsersRef.child(userId).child('Face').on("value", function(snapshot) {
                let base64Image = snapshot.val();
                node-base64-image.decode(base64Image, {filename: 'tmp/user'}, function(err) {
                    if (err) throw err;
                });

                let openBrResults = exec('br -algorithm FaceRecognition -compare /tmp/user.jpg /tmp/webcam.jpg', {silent:true}).stdout;
                let openBrResults2 = openBrResults.substring(stringToRegex.lastIndexOf('COUNT=1')+7);
                if(openBrResults2 > 1){
                   firebaseUsersRef.child(userId).update({"Recognized": "True"});
                   found = true;
                }
            });
        }
    });
}, 5 * 60 * 1000);
