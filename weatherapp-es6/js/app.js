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

        switch (true) {
            case (this.temperatuur < 10):
                this.beer = "Duvel";
                this.beerImg = "http://www.trollekelder.be/cafe/wp-content/uploads/2013/06/duvel.jpg";
                break;
            case (this.temperatuur > 10 && this.temperatuur < 12):
                this.beer = "Maes";
                this.beerImg = "http://www.bierpassie.com/beericon/575/medium/1375194292.jpg";
                break;
            case (this.temperatuur > 12 && this.temperatuur < 16):
                this.beer = "Heineken";
                this.beerImg = "http://www.thebeerstore.ca/sites/default/files/styles/brand_hero/public/brand/hero/heineken.jpg?itok=bORtwyPr";
                break;
            case (this.temperatuur > 16 && this.temperatuur < 20):
                this.beer = "Leffe Blond";
                this.beerImg = "https://pilsje.files.wordpress.com/2012/06/leffe_blonde.jpg";
                break;
            case (this.temperatuur > 20 && this.temperatuur < 24):
                this.beer = "Jupiler";
                this.beerImg = "http://www.madeinvlaamsbrabant.be/wp-content/uploads/2016/10/jupiler0.jpg";
                break;
            case (this.temperatuur > 24 && this.temperatuur < 28):
                this.beer = "Grimbergen Blond Zomer";
                this.beerImg = "http://www.grimbergenbier.be/img/localized/nl-be/grim_blond.png";
                break;
            case (this.temperatuur > 28 && this.temperatuur < 35):
                this.beer = "Kriek";
                this.beerImg = "https://www.horecasupport.be/admin_assets/content/content_files/public/downloads/bv_downloads/packshots/kriek_met_fles.jpg";
        }

        $("#beer").append(`<h2>Perfect weer voor een frisse <span>${(this.beer)}</span>!</h2>`);
        $("#beer").append(`<img src="${(this.beerImg)}"></img>`);

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