class Weather
{
    constructor(options){
        console.info("We are in the constructor") 
        
        //set default values
        this.weather = "";
        this.latitude = "";
        this.longitude= "";
        this.apiKey = options.apiKey;
        this.temperatuur = "";
        this.init();
    }
    
    init(){
        console.info("The init function, kicks things off")
        this.getMyLocation();
    }
    
    getMyLocation(){
        var that = this;
        console.info("Getting my location")
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            that.latitude = position.coords.latitude;//this gaat hier verwijzen naar de navigator. .. functie ipv de hele app daarom var that = this; en that.latitude
            that.longitude = position.coords.longitude;
            that.getWeatherFromCacheOrStorage();
        });
    }
    
    getWeatherFromCacheOrStorage(){
        if (localStorage.getItem('WeatherTemp') != null){
            this.updateUI();
        }else{
            var that = this;
            console.info("Getting current weather data");
            // GET request https://api.darksky.net/forecast/[key]/[latitude],[longitude]
            const call = `https://api.darksky.net/forecast/${this.apiKey}/${this.latitude},${this.longitude}?units=ca`;
            console.log(call);
            $.ajax({
                method: "GET",
                url: call,
                dataType: "jsonp"
            }).done(function(response){
                console.log(response);
                that.weather = response.currently;
                that.storeInCache();
                that.updateUI();
            });
            
        }
        
    }
    
    updateUI(){
        this.getFromCache();
        console.log("updating UI");
        var color;
        console.log(this.temperatuur);
        if(this.temperatuur < 15){
            color = "#2980B9"; 
        } else {
            color = "#e67e22";
        }
        $("#app").css("background-color", color);
        $("#app").append(`<h1>${Math.round(this.temperatuur)}&deg;</h1>`);
        
}
    
    storeInCache(){
        console.log(this.weather.temperature);
        localStorage.setItem('WeatherTemp', this.weather.temperature);
        console.log("storing in cache");
    }
    
    getFromCache(){
        this.temperatuur = localStorage.getItem('WeatherTemp');
        console.log(this.temperatuur);
    }

}
const options = {
    apiKey: "1c2c7d32ad116ef766dc462fd4893954"
};
const App = new Weather(options);


//apiKey: "1c2c7d32ad116ef766dc462fd4893954"