const express = require("express");
 const https = require("https");
 const bodyParser = require("body-parser");
 const ejs = require("ejs");
 const app = express();
 app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html"); 	
	
});

app.post("/", function(req, res){
const query = req.body.cityName;
	const apiKey ="e06b364622ae9e570ba2b9d269ac3bdf";
	const unit ="metric"
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
	
	https.get(url, function(response){
	console.log(response.statusCode);
    if(response.statusCode === 200){
	response.on("data", function(data){
	const weatherData =	JSON.parse(data)
	const temp = weatherData.main.temp

	
	const weatherDescription = weatherData.weather[0].description
	const icon = weatherData.weather[0].icon
	const imageURL ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
	
	res.render("list", {temperature: temp, cityname: query, image:imageURL, weather:weatherDescription });
	
	
	});

	}
	else{

	res.sendFile(__dirname + "/index.html"); 
}
	});



});

app.post("/list", function(req, res){
	res.redirect("/");
})






 app.listen(process.env.PORT ||3000, function(){
 	console.log("Server is running on port 3000");
 })