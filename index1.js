/* var fs=require('fs');
var ln = require('readline').createInterface({
  input: fs.createReadStream('gdpdata.csv')
});
var data=[];
var data_1=[];
var i=0;

ln.on('line', function (a) {
  //data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  //console.log(a);
  data=a.split(',');
	data_1[i]=data;
	i++;});

ln.on('close',function(){pl
	console.log(data_1);
  
	data_json=JSON.stringify(data_1);
	fs.writeFile('gdp_json.json', data_json);
	send(data_1[]);
});
*/

var fs=require('fs');
var ln = require('readline').createInterface({
  input: fs.createReadStream('data/gdpdata.csv')
  });

var arr_1 = [];
ln.on('line', (line) => {
    arr_1.push(line);

})

.on('close', () => {
  send(arr_1);

});
console.log(arr_1);

function send(arr_1){
    var header = arr_1[0].split(',');//Retrieving header row from CSV fil
    

    // Stores each row in arr-1 as a object
    var arr_2 = [];
    for(i=1;i<arr_1.length;i++){
        var tmp_arr = arr_1[i].split(',');// Stores 'i'th row in temporary array
        var j=0;
        var temp_obj={};
        var test = tmp_arr.forEach(function(x) {
                temp_obj[header[j]] = x; // Stores each element in array as property/value pair in temp_object
                j++
        }); // End of forEach
        arr_2.push(temp_obj);
    } // End of for  loop
    arr_2.forEach(function(data){
      console.log(data)
    })
 
  //   population by country
console.log("Population by country");

    var json_pop=[];
var population = 'Population (Millions) - 2013';
arr_2.forEach(function(x){

var temp_obj={};
temp_obj['Country'] = x['Country Name']; 
temp_obj['Population'] = Number(x[population]);
json_pop.push(temp_obj); 

}); 
json_pop.splice(json_pop.length-2,2);
json_pop.sort(function(a,b)
{
  return parseFloat(b.Population) - parseFloat(a.Population);
});

fs.writeFileSync('output/population.json',JSON.stringify(json_pop));// End of forEach
console.log(json_pop);



//GDP By Country
console.log("GDP By Country")
var json_gdp=[];
var gdp='GDP Billions (US$) - 2013';
arr_2.forEach(function(y){
 var tmp_obj={};
 tmp_obj['Country']=y['Country Name'];
  tmp_obj['values']=Number(y[gdp]);
  json_gdp.push(tmp_obj);
  });
json_gdp.splice(json_gdp.length-2,2);
json_gdp.sort(function(a,b)
{
  return parseFloat(b.values) - parseFloat(a.values);
});
fs.writeFileSync('output/gdp.json',JSON.stringify(json_gdp));
console.log(json_gdp);


//Purchasing Power in Billions ( Current International Dollar) - 2013 By Country
console.log("Purchasing Power in Billions ( Current International Dollar) - 2013 By Country")
var json_pow=[];
var pow = 'Purchasing Power in Billions ( Current International Dollar) - 2013';
arr_2.forEach(function(z){
  var tmp_pow={};
  tmp_pow['Country']=z['Country Name'];
  tmp_pow['values']=Number(z[pow]);
  json_pow.push(tmp_pow);
});
json_pow.splice(json_pow.length-2,2);
json_pow.sort(function(a,b)
{
  return parseFloat(b.values) - parseFloat(a.values);
});
fs.writeFileSync('output/power.json',JSON.stringify(json_pow));
console.log(json_pow);


//Plot the growth in population from 2010 to 2013
console.log("Plot the growth in population from 2010 to 2013")
var plot=[];
var population_10 = 'Population (Millions) - 2010';
var population_11 = 'Population (Millions) - 2011';
var population_12 = 'Population (Millions) - 2012';
var population_13 = 'Population (Millions) - 2013';
var pow_10 = 'Purchasing Power in Billions ( Current International Dollar) - 2010';
var pow_11 = 'Purchasing Power in Billions ( Current International Dollar) - 2011';
var pow_12 = 'Purchasing Power in Billions ( Current International Dollar) - 2012';
var pow_13 = 'Purchasing Power in Billions ( Current International Dollar) - 2013';
arr_2.forEach(function(y)
{
 var tmp_obj={};
 tmp_obj['Country']=y['Country Name'];
  tmp_obj['power2010']=Number(y[pow_10]);
  tmp_obj['power2011']=Number(y[pow_11]); 
  tmp_obj['power2012']=Number(y[pow_12]);
  tmp_obj['power2013']=Number(y[pow_13]);
  tmp_obj['population2010']=Number(y[population_10]);
  tmp_obj['population2011']=Number(y[population_11]); 
  tmp_obj['population2012']=Number(y[population_12]);
  tmp_obj['population2013']=Number(y[population_13]);
plot.push(tmp_obj);
  });
console.log(plot);

fs.writeFileSync('output/plotpower.json',JSON.stringify(plot));

//Aggregate the Population and GDP of the G20 countries by continent and plot
console.log("Aggregate the Population and GDP of the G20 countries by continent and plot")
var agg=[];

//aggregrate the population
arr_2.forEach(function(y)
{
 var tmp_obj={};
 tmp_obj['Country_Name']=y['Country Name'];
  tmp_obj['total_value']=Number(y['Population (Millions) - 2010'])+Number(y['Population (Millions) - 2011'])+
    Number(y['Population (Millions) - 2012'])+Number(y['Population (Millions) - 2013']);
agg.push(tmp_obj);
});
console.log(agg);
fs.writeFileSync('output/aggr.json',JSON.stringify(agg));
  
  //aggregrate the GDP of G20 Countries
  console.log("aggregrate the GDP of G20 Countries")
var agg_gdp=[]
  arr_2.forEach(function(y)
{
 var tmp_obj2={};
 tmp_obj2['Country_Name']=y['Country Name'];
  tmp_obj2['totalGDP_value']=Number(y['GDP Billions (US$) - 2010'])+Number(y['GDP Billions (US$) - 2011'])+
    Number(y['GDP Billions (US$) - 2012'])+Number(y['GDP Billions (US$) - 2013']);
agg_gdp.push(tmp_obj2);
});
  console.log(agg_gdp);

console.log("Final aggregrate the GDP of G20 Countries")
var Continents={
  Argentina:'South_America',  Brazil:'South_America',
 Canada:'North_America',  Mexico:'North_America',USA:'North_America',
  France:'Europe', Germany:'Europe',Italy:'Europe',UnitedKingdom:'Europe',
  EuropeanUnion:'Europe',
  India:'Asia', 
  China:'Asia',Indonesia:'Asia',Japan:'Asia',Russia:'Asia'
  ,'Saudi Arabia':'Asia',Korea:'Asia',Turkey:'Asia',

  Australia:'Australia',
  'South Africa':'Africa',
  World:'World',

}
 var cont_pop = {
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    North_America : 0,
    South_America:0
  }
  var cont_GDP ={
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    North_America : 0,
    South_America:0
  }
  var final_data=[];
  for(var i=0;i<agg.length;i++){
   cont_pop[Continents[agg[i].Country_Name]] += parseInt(agg[i].total_value);
 
   cont_GDP[Continents[agg[i].Country_Name]]+= parseInt(agg_gdp[i].totalGDP_value);
 }
 tmp_obj={}
 tmp_obj.continent='Africa';
 tmp_obj.population=cont_pop['Africa'];
 tmp_obj.gdp=cont_GDP['Africa'];
 final_data.push(tmp_obj);

 tmp_obj1={}
 tmp_obj1.continent='North_America';
 tmp_obj1.population=cont_pop['North_America'];
 tmp_obj1.gdp=cont_GDP['North_America'];
final_data.push(tmp_obj1);

tmp_obj2={}
tmp_obj2.continent='South_America';
tmp_obj2.population=cont_pop['South_America'];
tmp_obj2.gdp=cont_GDP['South_America'];
final_data.push(tmp_obj2);

 tmp_obj3={}
 tmp_obj3.continent='Asia';
 tmp_obj3.population=cont_pop['Asia'];
 tmp_obj3.gdp=cont_GDP['Asia'];
 final_data.push(tmp_obj3);
 
 tmp_obj4={}
  tmp_obj4.continent='Australia';
 tmp_obj4.population=cont_pop['Australia'];
 tmp_obj4.gdp=cont_GDP['Australia'];
 final_data.push(tmp_obj4);

 tmp_obj5={}
 tmp_obj5.continent='Europe';
 tmp_obj5.population=cont_pop['Europe'];
 tmp_obj5.gdp=cont_GDP['Europe'];
 final_data.push(tmp_obj5);

console.log(final_data);
  fs.writeFileSync('output/aggregration.json',JSON.stringify(final_data))
};
