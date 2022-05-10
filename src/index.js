//first page handling 
document.querySelector("#explications").classList.remove("hide")

domOn('#enter', 'click', () => {
  document.querySelector("#explications").classList.add("hide")
  document.querySelector("#vizs").classList.remove("hide")
})

domOn('#enter2', 'click', () => {
  document.querySelector("#vizs").classList.add("hide")
  document.querySelector("#final").classList.remove("hide")
})

domOn('#enter3', 'click', () => {
  document.querySelector("#final").classList.add("hide")
  document.querySelector("#explications").classList.remove("hide")

})





// Quelques fonctions utilitaires
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  document.querySelectorAll(selector).forEach(element => element.addEventListener(event, callback, options));
}

//import dataBrutes from '../data/Projet_data.csv'

import responsivefy from './responsive';
import dataBrutes from '../data/data.json'
import propositions from '../data/dataPropositions.json'


// Tri des données dans les tableaux
// 1 tableau par type de données
const tabMotivationBrut = dataBrutes.map(dataBrutes => dataBrutes["motivation"]);
const tabPaysBrut = dataBrutes.map(dataBrutes => dataBrutes["pays"]);
const tabTimeBrut = dataBrutes.map(dataBrutes => dataBrutes["time"]);
const tabSaisonBrut = dataBrutes.map(dataBrutes => dataBrutes["saison"]);
const tabPeopleBrut = dataBrutes.map(dataBrutes => dataBrutes["people"]);
const tabLogementBrut = dataBrutes.map(dataBrutes => dataBrutes["logement"]);
const tabThemeBrut = dataBrutes.map(dataBrutes => dataBrutes["theme"]);


// connaitre combien de personnes ont répondu pour ajuster les graphiques
const reponsesTotales = tabThemeBrut.length
console.log(reponsesTotales);


// const count = (array, question) => {

//   for (const i of array) {
//     // faire correspondre propostions et le i en itérant sur les deux (le i et les propositions)
//   }








// }

// Fonction de comptage des données
// Connaître la proportion des données dans chaque tableaux envoyés
function rendCount(array) {

  const compteur = {};

  for (const i of array) {


    if (compteur[i]) {
      compteur[i] += 1;
    } else {
      compteur[i] = 1;
    }
  }
  return compteur;

}



const tabMotivation = rendCount(tabMotivationBrut);
const tabTime = rendCount(tabTimeBrut);
const tabPays = rendCount(tabPaysBrut);
const tabSaison = rendCount(tabSaisonBrut);
const tabPeople = rendCount(tabPeopleBrut);
const tabLogement = rendCount(tabLogementBrut);
const tabTheme = rendCount(tabThemeBrut);

// console.log(logement);
// console.log(logement["Hôtel"]);
//console.log(tabLogement);




// //const tabTest = [{word: , size:}];
// for (const [key, value] of Object.entries(motivation)) {
//   //console.log(`${key}: ${value}`);
//   //tabTest = [{word: key, size: value}];
// }


//console.log(tabTest);
const motivation = Object.entries(tabMotivation)
const time = Object.entries(tabTime)
const pays = Object.entries(tabPays)
const saison = Object.entries(tabSaison)
const people = Object.entries(tabPeople)
const logement = Object.entries(tabLogement)
const theme = Object.entries(tabTheme)
console.log(pays);




// List of words
//var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]
//var myWords = [{word: "Volonté de découvrir le monde et soif d'apprentissage", size: "10"}, {word: "S'évader du quotidien fatiguant et penser à autre chose", size: "20"}, {word: "Voyage de rêve en tête et volonté de le réaliser", size: "50"}, {word: "Habitude de voyager régulièrement", size: "30"} ]

// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 30, left: 30 },
  width = 1800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// GRAPHIQUE 1 MOTIVATION WORLD CLOUD 
var svg1 = d3.select("#my_dataviz1").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom - 200)
  // appelle une fonction dans le file reponsive.js
  .call(responsivefy) // rend la visualisation responsive
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + (-150) + ")");

var layout = d3.layout.cloud()
  .size([width, height])
  // une des phrases n'a qu'1 vote, je l'aggrandis juste pour qu'elle soit lisible
  .words(motivation.map(function (d) { if (d[1] == 1) { return { text: d[0], size: d[1] * 20 } } return { text: d[0], size: d[1] * 3.5 }; }))
  .padding(10)        //space between words
  .rotate(function () { return 0; })
  .fontSize(function (d) { return d.size })    // font size of words
  // pour pas que l'emplacement change au refresh, on met o.5 ou 1
  .random(function (d) { return 1; })
  .on("end", draw);
layout.start();

function draw(words) {
  //console.log(words);
  svg1
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    // .attr("x", function (d) { return d.size; })
    // .attr("y", function (d) { return d.size; })
    .attr("class", function (d) { return `motivation${d.size}` })
    .style("font-size", function (d) { return d.size * 0.8; })
    .style("fill", "green")
    .attr("text-anchor", "middle")
    .style("font-family", "Titillium Web")
    .style("font-weight", "bold")

    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}


// Mettre en lumière une proposition quand on passe la souris 
domOn('.motivation73', 'mouseover', () => {
  d3.select('.motivation35').style("fill-opacity", "0.5")
  d3.select('.motivation20').style("fill-opacity", "0.5")
})

domOn('.motivation73', 'mouseout', () => {
  d3.select('.motivation35').style("fill-opacity", "1")
  d3.select('.motivation20').style("fill-opacity", "1")
})

domOn('.motivation35', 'mouseover', () => {
  d3.select('.motivation73').style("fill-opacity", "0.5")
  d3.select('.motivation20').style("fill-opacity", "0.5")
})

domOn('.motivation35', 'mouseout', () => {
  // d3.select('.motivation73').style("fill", "green")
  d3.select('.motivation73').style("fill-opacity", "1")
  d3.select('.motivation20').style("fill-opacity", "1")
})



domOn('.motivation20', 'mouseover', () => {
  d3.select('.motivation35').style("fill-opacity", "0.5")
  d3.select('.motivation73').style("fill-opacity", "0.5")
})

domOn('.motivation20', 'mouseout', () => {
  //d3.select('.motivation73').style("fill", "green")
  d3.select('.motivation35').style("fill-opacity", "1")
  d3.select('.motivation73').style("fill-opacity", "1")
})




// GRAPHIQUE 2 TIME BARS
var svg2 = d3.select("#my_dataviz2").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(responsivefy) // rend la visualisation responsive
  .append("g").attr("id", "viz2")
  .attr("transform", "translate(" + margin.left * 17 + "," + margin.top + ")")


// let data = time.map((u) => {
//   let postsVar = posts.filter((p, i) => p.userId == u.id)
//   let variable = {
//     "nom": u.username,
//     "nbPosts": postsVar.map(posts => posts.title),

//   }

//   return variable;

// })


let x = d3.scaleBand()
  .domain(time.map(function (t) { return t[0]; }))
  .range([800, 0]);

const y = d3.scaleLinear()
  .domain([0, reponsesTotales])
  .range([height, 0])

svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-2,10)")

svg2.append("g")
  .call(d3.axisLeft(y));


svg2.selectAll("bars")
  .data(time)
  .enter()
  .append('rect')
  .attr("x", function (t) { return x(t[0]) + 124; })
  .attr("y", function (t) { return y(t[1]); })
  .attr('width', 20)
  .attr('height', function (t) { return height - y(t[1]); })
  .attr("class", function (t) { return `time${t[1]}` })
  .attr('fill', 'green')
  .on("mouseover", onMouseOver) // Add listener for event
  .on("mouseout", onMouseOut)
console.log(time);

domOn('.time16', 'mouseover', () => {
  d3.select('.time11').style("fill-opacity", "0.5")
  d3.select('.time5').style("fill-opacity", "0.5")
})

domOn('.time16', 'mouseout', () => {
  d3.select('.time11').style("fill-opacity", "1")
  d3.select('.time5').style("fill-opacity", "1")
})

domOn('.time11', 'mouseover', () => {
  d3.select('.time16').style("fill-opacity", "0.5")
  d3.select('.time5').style("fill-opacity", "0.5")
})

domOn('.time11', 'mouseout', () => {
  d3.select('.time16').style("fill-opacity", "1")
  d3.select('.time5').style("fill-opacity", "1")
})

domOn('.time5', 'mouseover', () => {
  d3.select('.time11').style("fill-opacity", "0.5")
  d3.select('.time16').style("fill-opacity", "0.5")
})

domOn('.time5', 'mouseout', () => {
  d3.select('.time11').style("fill-opacity", "1")
  d3.select('.time16').style("fill-opacity", "1")
})




// Mouseover event handler
function onMouseOver(d, i) {
  // Get bar's xy values, ,then augment for the tooltip
  var xPos = parseFloat(d3.select(this).attr('x')) ;
  var yPos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

  // Update Tooltip's position and value
  d3.select('.tooltip')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(d[1] + " personnes préfèrent " + d[0])
  
  
  d3.select('.tooltip').classed('hidden', false);

}

	// Mouseout event handler
	function onMouseOut(d, i){

		
		d3.select('#tooltip').classed('hidden', true);
	}




// GRAPHIQUE 3 CIRCLE SEASON 
var svg3 = d3.select("#my_dataviz3").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(responsivefy) // rend la visualisation responsive
  .append("g").attr("id", "viz3")
  .attr("transform", "translate(" + margin.left * 8 + "," + margin.top + ")")


// Add a scale for bubble size
const z = d3.scaleLinear()
  .domain([0, reponsesTotales])
  .range([1, 150]);

var elem = svg3.selectAll("g")
  .data(saison)

/*Create and place the "blocks" containing the circle and the text */
var elemEnter = elem.enter()
  .append("g")
// .attr("transform", function(d){return "translate("+d.x+",80)"})

/*Create the circle for each block */
var circle = elemEnter.append("circle")
  .attr("class", function (s) { return `saison${s[0]}` })
  .attr("cx", function (s) { return s[1] * 70 })
  .attr("cy", height / 2)
  .attr("r", function (s) { return z(s[1] * 2); })
  .attr('fill', 'green')

/* Create the text for each block */
elemEnter.append("text")
  .text(function (s) { return s[0] })
  .attr("class", function (s) { return `saisontexte${s[0]}` })
  .style('fill', 'black')
  // .attr("color", "green")
  .attr("x", function (s) { return s[1] * 80 })
  .attr("y", height / 2.6)
  .style("font-family", "Titillium Web")
  .style("font-weight", "regular")
  .style("font-size", 20)












// GRAPHIQUE 4 PAYS WORLD CLOUD 
var svg4 = d3.select("#my_dataviz4").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  // appelle une fonction dans le file reponsive.js
  .call(responsivefy) // rend la visualisation responsive
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + (-50) + ")");

var layout = d3.layout.cloud()
  .size([width, height + 200])
  .words(pays.map(function (d) { return { text: d[0], size: d[1] * 15 }; }))
  .padding(50)        //space between words
  .rotate(function () { return 0; })
  .fontSize(function (d) { return d.size })    // font size of words
  // pour pas que l'emplacement change au refresh, on met o.5 ou 1
  .random(function (d) { return 0.5; })
  .on("end", draw3);
layout.start();

function draw3(words) {
  svg4
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    // .attr("x", function (d) { return d.size; })
    // .attr("y", function (d) { return d.size; })
    .attr("class", function (d) { return `pays${d.size}` })

    .style("font-size", function (d) { return d.size * 1.2; })
    .style("fill", "green")
    .attr("text-anchor", "middle")
    .style("font-family", "Titillium Web")
    .style("font-weight", "bold")

    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}











// GRAPHIQUE 5 CIRCLE PEOPLE 
var svg5 = d3.select("#my_dataviz5").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(responsivefy) // rend la visualisation responsive
  .append("g").attr("id", "viz5")
  .attr("transform", "translate(" + margin.left * 8 + "," + margin.top + ")")


// Add a scale for bubble size
const w = d3.scaleLinear()
  .domain([0, reponsesTotales])
  .range([1, 150]);

var elem2 = svg5.selectAll("g")
  .data(people)

/*Create and place the "blocks" containing the circle and the text */
var elemEnter2 = elem2.enter()
  .append("g")
// .attr("transform", function(d){return "translate("+d.x+",80)"})

/*Create the circle for each block */
elemEnter2.append("circle")
  .attr("class", function (p) { return `people${p[0]}` })
  .attr("cx", function (p) { return p[1] * 70 })
  .attr("cy", height / 2)
  .attr("r", function (p) { return w(p[1] * 2); })
  .attr('fill', 'green')

/* Create the text for each block */
elemEnter2.append("text")
  .text(function (p) { return p[0] })
  .attr("class", function (p) { return `peopletexte${p[0]}` })
  .style('fill', 'black')
  // .attr("color", "green")
  .attr("x", function (p) { return p[1] * 80 })
  .attr("y", height / 2.2)
  .style("font-family", "Titillium Web")
  .style("font-weight", "regular")
  .style("font-size", 20)






// GRAPHIQUE 6 LOGEMENT BARS
var svg6 = d3.select("#my_dataviz6").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(responsivefy) // rend la visualisation responsive
  .append("g").attr("id", "viz6")
  .attr("transform", "translate(" + margin.left * 17 + "," + margin.top + ")")




let x6 = d3.scaleBand()
  .domain(logement.map(function (l) { return l[0]; }))
  .range([800, 0]);

const y6 = d3.scaleLinear()
  .domain([0, 32])
  .range([height, 0])

svg6.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x6))
  .selectAll("text")
  .attr("transform", "translate(-2,10)")

svg6.append("g")
  .call(d3.axisLeft(y6));


svg6.selectAll("bars")
  .data(logement)
  .enter()
  .append('rect')
  .attr("x", function (l) { return x6(l[0]) + 90; })
  .attr("y", function (l) { return y6(l[1]); })
  .attr('width', 20)
  .attr('height', function (l) { return height - y6(l[1]); })
  .attr("class", function (l) { return `logement${l[1]}` })
  .attr('fill', 'green')

// domOn('.time16', 'mouseover', () => {
//   d3.select('.time11').style("fill-opacity", "0.5")
//   d3.select('.time5').style("fill-opacity", "0.5")
// })

// domOn('.time16', 'mouseout', () => {
//   d3.select('.time11').style("fill-opacity", "1")
//   d3.select('.time5').style("fill-opacity", "1")
// })

// domOn('.time11', 'mouseover', () => {
//   d3.select('.time16').style("fill-opacity", "0.5")
//   d3.select('.time5').style("fill-opacity", "0.5")
// })

// domOn('.time11', 'mouseout', () => {
//   d3.select('.time16').style("fill-opacity", "1")
//   d3.select('.time5').style("fill-opacity", "1")
// })

// domOn('.time5', 'mouseover', () => {
//   d3.select('.time11').style("fill-opacity", "0.5")
//   d3.select('.time16').style("fill-opacity", "0.5")
// })

// domOn('.time5', 'mouseout', () => {
//   d3.select('.time11').style("fill-opacity", "1")
//   d3.select('.time16').style("fill-opacity", "1")
// })














// GRAPHIQUE 7 THEME WORLD CLOUD 

var donutWidth = 75;
var radius = Math.min(width, height) / 2;

var svg7 = d3.select("#my_dataviz7").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  // appelle une fonction dans le file reponsive.js
  .call(responsivefy) // rend la visualisation responsive
  .append("g")
  .attr("transform", "translate(" + 900 + "," + 250 + ")");

let colors = ["green", "red"];

var color = d3.scaleOrdinal()
  .domain(theme)
  .range(colors);

var arc = d3.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.pie()
  .value(function (d) {
    return d[1];
  })
  .sort(null);

var path = svg7.selectAll('path')
  .data(pie(theme))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function (d, i) {
    console.log(theme[i]);

    return color(theme[i]);
  })
  .attr('transform', 'translate(0, 0)')

// Legende du graph sur le côté 
let legend = svg7.selectAll(".legend")
  .data(pie(theme)) //les données du pie entre dans le groupe qui s'appelle legend
  .enter().append("g")
  //.attr('transform', 'translate(, 0)')
  .attr("transform", function (d, i) {
    return "translate(" + (350) + "," + (theme[i][1]) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
  .attr("class", "legend");


legend.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function (d, i) {
    return color(theme[i]);
  });

legend.append("text")
  .transition()
  .duration(1500)
  .text(function (d, i) {
    return theme[i][0];
  })
  .style("font-size", 20)
  .style("font-family", "Titillium Web")
  .style("font-weight", "regular")
  .attr("y", 10)
  .attr("x", 20)




// var innerRadius = 80,
//     outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

//     // X scale
//   var b = d3.scaleBand()
//   .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
//   .align(0)                  // This does nothing ?
//   .domain( theme.map(function(d) { return d[0]; }) ); // The domain of the X axis is the list of states.

// // Y scale
// var c = d3.scaleRadial()
//   .range([innerRadius, outerRadius])   // Domain will be define later.
//   .domain([0, 50]); // Domain of Y is from 0 to the max seen in the data

// // Add bars
// svg7.append("g")
// .selectAll("path")
// .data(theme)
// .enter()
// .append("path")
//   .attr("fill", "#69b3a2")
//   .attr("d", d3.arc()     // imagine your doing a part of a donut plot
//       .innerRadius(innerRadius)
//       .outerRadius(function(d) { return c(d[1]); })
//       .startAngle(function(d) { return b(d[1]); })
//       .endAngle(function(d) { return b(d[1]) + b.bandwidth(); })
//       .padAngle(0.01)
//       .padRadius(innerRadius))






// var svg7 = d3.select("#my_dataviz7").append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   // appelle une fonction dans le file reponsive.js
//   .call(responsivefy) // rend la visualisation responsive
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var layout2 = d3.layout.cloud()
//   .size([width, height])
//   // une des phrases n'a qu'1 vote, je l'aggrandis juste pour qu'elle soit lisible
//   .words(theme.map(function (th) { return { text: th[0], size: th[1] * 3.5 }; }))
//   .padding(10)
//   .rotate(function () { return 0; })
//   .fontSize(function (th) { return th.size })    // font size of words
//   // pour pas que l'emplacement change au refresh, on met o.5 ou 1
//   .random(function (th) { return 0.5; })
//   .on("end", draw2);
// layout2.start();

// function draw2(words) {
//   //console.log(words);
//   svg7
//     .append("g")
//     .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//     .selectAll("text")
//     .data(words)
//     .enter().append("text")
//     // .attr("x", function (d) { return d.size; })
//     // .attr("y", function (d) { return d.size; })
//     .attr("class", function (th) { return `theme${th.size}` })
//     .style("font-size", function (th) { return th.size * 1.1; })
//     .style("fill", "green")
//     .attr("text-anchor", "middle")
//     .style("font-family", "Titillium Web")
//     .style("font-weight", "bold")

//     .attr("transform", function (d) {
//       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//     })
//     .text(function (d) { return d.text; });
// }


// // Mettre en lumière une proposition quand on passe la souris
// domOn('.theme87', 'mouseover', () => {
//   d3.select('.theme24').style("fill-opacity", "0.5")
// })

// domOn('.theme87', 'mouseout', () => {
//   d3.select('.theme24').style("fill-opacity", "1")
// })

// domOn('.theme24', 'mouseover', () => {
//   d3.select('.theme87').style("fill-opacity", "0.5")
// })

// domOn('.theme24', 'mouseout', () => {
//   d3.select('.theme87').style("fill-opacity", "1")
// })
