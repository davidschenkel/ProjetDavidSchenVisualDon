// Quelques fonctions utilitaires
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  document.querySelectorAll(selector).forEach(element => element.addEventListener(event, callback, options));
}

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

import responsivefy from './responsive';
import dataBrutes from '../data/data.json'

console.log(dataBrutes);

// Tri des données dans les tableaux
// 1 tableau par type de données
const tabMotivationBrut = dataBrutes.map(dataBrutes => dataBrutes["motivation"]);
const tabPaysBrut = dataBrutes.map(dataBrutes => dataBrutes["pays"]);
const tabTimeBrut = dataBrutes.map(dataBrutes => dataBrutes["time"]);
const tabSaisonBrut = dataBrutes.map(dataBrutes => dataBrutes["saison"]);
const tabPeopleBrut = dataBrutes.map(dataBrutes => dataBrutes["people"]);
const tabLogementBrut = dataBrutes.map(dataBrutes => dataBrutes["logement"]);
const tabThemeBrut = dataBrutes.map(dataBrutes => dataBrutes["theme"]);

console.log(tabPaysBrut);

// connaitre combien de personnes ont répondu pour ajuster les graphiques
const reponsesTotales = tabThemeBrut.length
// console.log(reponsesTotales);

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
console.log(tabPays);

//console.log(tabTest);
const motivation = Object.entries(tabMotivation)
const time = Object.entries(tabTime)
const pays = Object.entries(tabPays)
const saison = Object.entries(tabSaison)
const people = Object.entries(tabPeople)
const logement = Object.entries(tabLogement)
const theme = Object.entries(tabTheme)
console.log(pays);

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
  onMouseOverWorldCloudMotivation(21)
})

domOn('.motivation73', 'mouseout', () => {
  d3.select('.motivation35').style("fill-opacity", "1")
  d3.select('.motivation20').style("fill-opacity", "1")
  onMouseOutWorldCloudMotivation()
})

domOn('.motivation35', 'mouseover', () => {
  d3.select('.motivation73').style("fill-opacity", "0.5")
  d3.select('.motivation20').style("fill-opacity", "0.5")
  onMouseOverWorldCloudMotivation(10)
})

domOn('.motivation35', 'mouseout', () => {
  // d3.select('.motivation73').style("fill", "green")
  d3.select('.motivation73').style("fill-opacity", "1")
  d3.select('.motivation20').style("fill-opacity", "1")
  onMouseOutWorldCloudMotivation()
})

domOn('.motivation20', 'mouseover', () => {
  d3.select('.motivation35').style("fill-opacity", "0.5")
  d3.select('.motivation73').style("fill-opacity", "0.5")
  onMouseOverWorldCloudMotivation(1)
})

domOn('.motivation20', 'mouseout', () => {
  //d3.select('.motivation73').style("fill", "green")
  d3.select('.motivation35').style("fill-opacity", "1")
  d3.select('.motivation73').style("fill-opacity", "1")
  onMouseOutWorldCloudMotivation()
})

// Mouseover 
function onMouseOverWorldCloudMotivation(d) {

  d3.select('.tooltip1')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(Math.round((d) / reponsesTotales * 100) + " % des votants")
  d3.select('.tooltip1').classed('hidden', false);
}
	// Mouseout 
	function onMouseOutWorldCloudMotivation(d, i){
		d3.select('.tooltip1')
    .text("Passer la souris pour découvrir les %");
	}


// GRAPHIQUE 2 TIME BARS
var svg2 = d3.select("#my_dataviz2").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(responsivefy) // rend la visualisation responsive
  .append("g").attr("id", "viz2")
  .attr("transform", "translate(" + margin.left * 17 + "," + margin.top + ")")

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
//console.log(time);

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
  d3.select('.tooltip2')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(d[1] + " votes (" + Math.round((d[1]) / reponsesTotales * 100) + " %)")
  d3.select('.tooltip2').classed('hidden', false);
}
	// Mouseout event handler
	function onMouseOut(d, i){
		d3.select('.tooltip2')
    .text("Passer la souris pour découvrir les %");
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

  domOn('.saisonEté', 'mouseover', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "0.5")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "0.5")
    }
    d3.select('.saisonEté').style("fill-opacity", "1")
    d3.select(`.saisontexteEté`).style("fill-opacity", "1")
    onMouseOverSaison(16)
  })
  domOn('.saisonEté', 'mouseout', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "1")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "1")
    }
    //d3.select('.saisonEté').style("fill-opacity", "1")
    onMouseOutSaison()
  })

  domOn('.saisonPrintemps', 'mouseover', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "0.5")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "0.5")
    }
    d3.select('.saisonPrintemps').style("fill-opacity", "1")
    d3.select(`.saisontextePrintemps`).style("fill-opacity", "1")
    onMouseOverSaison(8)
  })
  domOn('.saisonPrintemps', 'mouseout', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "1")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "1")
    }
    //d3.select('.saisonPrintemps').style("fill-opacity", "1")
    onMouseOutSaison()
  })

  domOn('.saisonAutomne', 'mouseover', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "0.5")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "0.5")
    }
    d3.select('.saisonAutomne').style("fill-opacity", "1")
    d3.select(`.saisontexteAutomne`).style("fill-opacity", "1")
    onMouseOverSaison(5)
  })
  domOn('.saisonAutomne', 'mouseout', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "1")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "1")
    }
    //d3.select('.saisonAutomne').style("fill-opacity", "1")
    onMouseOutSaison()
  })

  domOn('.saisonHiver', 'mouseover', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "0.5")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "0.5")
    }
    d3.select('.saisonHiver').style("fill-opacity", "1")
    d3.select(`.saisontexteHiver`).style("fill-opacity", "1")
    onMouseOverSaison(3)
  })
  domOn('.saisonHiver', 'mouseout', () => {
    for (const sai of saison) {
      d3.select(`.saison${sai[0]}`).style("fill-opacity", "1")
      d3.select(`.saisontexte${sai[0]}`).style("fill-opacity", "1")
    }
    //d3.select('.saisonHiver').style("fill-opacity", "1")
    onMouseOutSaison()
  })

  // Mouseover 
function onMouseOverSaison(d) {

  d3.select('.tooltip3')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(Math.round((d) / reponsesTotales * 100) + " % des votants")
  d3.select('.tooltip3').classed('hidden', false);
}
	// Mouseout 
	function onMouseOutSaison(d, i){
		d3.select('.tooltip3')
    .text("Passer la souris pour découvrir les %");
	}


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
    .attr("class", function (d) { return `pays${d.text}` })

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

// Mettre en lumière une proposition quand on passe la souris 
domOn('.paysUSA', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysUSA').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(6)
})
domOn('.paysUSA', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysItalie', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysItalie').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(5)
})
domOn('.paysItalie', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysCanada', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysCanada').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(3)
})
domOn('.paysCanada', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysIslande', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysIslande').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(3)
})
domOn('.paysIslande', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysBrésil', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysBrésil').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(2)
})
domOn('.paysBrésil', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysJapon', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysJapon').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(3)
})
domOn('.paysJapon', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysPérou', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysPérou').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(3)
})
domOn('.paysPérou', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysAustralie', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysAustralie').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(3)
})
domOn('.paysAustralie', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysMéxique', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysMéxique').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(1)
})
domOn('.paysMéxique', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysGrèce', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysGrèce').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(1)
})
domOn('.paysGrèce', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysEspagne', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysEspagne').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(1)
})
domOn('.paysEspagne', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

domOn('.paysAfrique.du.Sud', 'mouseover', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "0.5")
  }
  // d3.select('.paysAfrique.du.Sud').style("fill-opacity", "0.5")
  d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOverWorldCloudMPays(1)
})

domOn('.paysAfrique.du.Sud', 'mouseout', () => {
  for (const pay of pays) {
    d3.select(`.pays${pay[0]}`).style("fill-opacity", "1")
  }
  // d3.select('.paysAfrique.du.Sud').style("fill-opacity", "1")
  onMouseOutWorldCloudPays()
})

// Mouseover 
function onMouseOverWorldCloudMPays(d) {

  d3.select('.tooltip4')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(Math.round((d) / reponsesTotales * 100) + " % des votants")
  d3.select('.tooltip4').classed('hidden', false);
}
	// Mouseout 
	function onMouseOutWorldCloudPays(d, i){
		d3.select('.tooltip4')
    .text("Passer la souris pour découvrir les %");
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

  domOn('.peopleEntre.amis', 'mouseover', () => {
    d3.select('.peopleEn.couple').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEn.couple`).style("fill-opacity", "0.5")
    d3.select('.peopleEn.famille').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEn.famille`).style("fill-opacity", "0.5")
    d3.select('.peopleSeul').style("fill-opacity", "0.5")
    d3.select(`.peopletexteSeul`).style("fill-opacity", "0.5")
    onMouseOverPeople(17)
  })
  domOn('.peopleEntre.amis', 'mouseout', () => {
    d3.select('.peopleEn.couple').style("fill-opacity", "1")
    d3.select(`.peopletexteEn.couple`).style("fill-opacity", "1")
    d3.select('.peopleEn.famille').style("fill-opacity", "1")
    d3.select(`.peopletexteEn.famille`).style("fill-opacity", "1")
    d3.select('.peopleSeul').style("fill-opacity", "1")
    d3.select(`.peopletexteSeul`).style("fill-opacity", "1")
    onMouseOutPeople() 
  })

  domOn('.peopleEn.couple', 'mouseover', () => {
    d3.select('.peopleEntre.amis').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEntre.amis`).style("fill-opacity", "0.5")
    d3.select('.peopleEn.famille').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEn.famille`).style("fill-opacity", "0.5")
    d3.select('.peopleSeul').style("fill-opacity", "0.5")
    d3.select(`.peopletexteSeul`).style("fill-opacity", "0.5")
    onMouseOverPeople(11)
  })
  domOn('.peopleEn.couple', 'mouseout', () => {
    d3.select('.peopleEntre.amis').style("fill-opacity", "1")
    d3.select(`.peopletexteEntre.amis`).style("fill-opacity", "1")
    d3.select('.peopleEn.famille').style("fill-opacity", "1")
    d3.select(`.peopletexteEn.famille`).style("fill-opacity", "1")
    d3.select('.peopleSeul').style("fill-opacity", "1")
    d3.select(`.peopletexteSeul`).style("fill-opacity", "1")
    onMouseOutPeople()
  })

  domOn('.peopleEn.famille', 'mouseover', () => {
    d3.select('.peopleEn.couple').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEn.couple`).style("fill-opacity", "0.5")
    d3.select('.peopleEntre.amis').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEntre.amis`).style("fill-opacity", "0.5")
    d3.select('.peopleSeul').style("fill-opacity", "0.5")
    d3.select(`.peopletexteSeul`).style("fill-opacity", "0.5")
    onMouseOverPeople(3)
  })
  domOn('.peopleEn.famille', 'mouseout', () => {
    d3.select('.peopleEn.couple').style("fill-opacity", "1")
    d3.select(`.peopletexteEn.couple`).style("fill-opacity", "1")
    d3.select('.peopleEntre.amis').style("fill-opacity", "1")
    d3.select(`.peopletexteEntre.amis`).style("fill-opacity", "1")
    d3.select('.peopleSeul').style("fill-opacity", "1")
    d3.select(`.peopletexteSeul`).style("fill-opacity", "1")
    onMouseOutPeople()
  })

  domOn('.peopleSeul', 'mouseover', () => {
    d3.select('.peopleEn.couple').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEn.couple`).style("fill-opacity", "0.5")
    d3.select('.peopleEn.famille').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEn.famille`).style("fill-opacity", "0.5")
    d3.select('.peopleEntre.amis').style("fill-opacity", "0.5")
    d3.select(`.peopletexteEntre.amis`).style("fill-opacity", "0.5")
    onMouseOverPeople(1)
  })
  domOn('.peopleSeul', 'mouseout', () => {
    d3.select('.peopleEn.couple').style("fill-opacity", "1")
    d3.select(`.peopletexteEn.couple`).style("fill-opacity", "1")
    d3.select('.peopleEn.famille').style("fill-opacity", "1")
    d3.select(`.peopletexteEn.famille`).style("fill-opacity", "1")
    d3.select('.peopleEntre.amis').style("fill-opacity", "1")
    d3.select(`.peopletexteEntre.amis`).style("fill-opacity", "1")
    onMouseOutPeople()
  })

  // Mouseover 
function onMouseOverPeople(d) {

  d3.select('.tooltip5')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(Math.round((d) / reponsesTotales * 100) + " % des votants")
  d3.select('.tooltip5').classed('hidden', false);
}
	// Mouseout 
	function onMouseOutPeople(d, i){
		d3.select('.tooltip5')
    .text("Passer la souris pour découvrir les %");
	}

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
  .attr("class", function (l) { return `logement${l[0]}` })
  .attr('fill', 'green')

domOn('.logementHôtel', 'mouseover', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "0.5")
  d3.select('.logementHôtel').style("fill-opacity", "1")
  onMouseOverLogement(13)
})
domOn('.logementHôtel', 'mouseout', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "1")
  }
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "1")
  onMouseOutLogement()
})

domOn('.logementAirbnb', 'mouseover', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "0.5")
  d3.select('.logementAirbnb').style("fill-opacity", "1")
  onMouseOverLogement(13)
})
domOn('.logementAirbnb', 'mouseout', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "1")
  }
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "1")
  onMouseOutLogement()
})

domOn('.logementCamping', 'mouseover', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "0.5")
  }
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "0.5")
  d3.select('.logementCamping').style("fill-opacity", "1")
  onMouseOverLogement(5)
})
domOn('.logementCamping', 'mouseout', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "1")
  }
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "1")
  onMouseOutLogement()
})

domOn('.logementAuberge.de.Jeunesse', 'mouseover', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "0.5")
  }
  // d3.select('.paysAuberge.de.Jeunesse').style("fill-opacity", "0.5")
  d3.select('.logementAuberge.de.Jeunesse').style("fill-opacity", "1")
  onMouseOverLogement(1)
})
domOn('.logementAuberge.de.Jeunesse', 'mouseout', () => {
  for (const loge of logement) {
    d3.select(`.logement${loge[0]}`).style("fill-opacity", "1")
  }
  onMouseOutLogement()
})

// Mouseover event handler
function onMouseOverLogement(d) {
  // Update Tooltip's position and value
  d3.select('.tooltip6')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(d + " votes (" + Math.round((d) / reponsesTotales * 100) + " %)")
  d3.select('.tooltip6').classed('hidden', false);
}
	// Mouseout event handler
	function onMouseOutLogement(d, i){
		d3.select('.tooltip6')
    .text("Passer la souris pour découvrir les %");
	}

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
    //console.log(theme[i]);

    return color(theme[i]);
  })
  .attr("class", function (d, i) { return `theme${theme[i][0]}`})
  .attr('transform', 'translate(0, 0)')

// Legende du graph sur le côté 
let legend = svg7.selectAll(".legend")
  .data(pie(theme)) //les données du pie entre dans le groupe qui s'appelle legend
  .enter().append("g")
  //.attr('transform', 'translate(, 0)')
  .attr("transform", function (d, i) {
    return "translate(" + (350) + "," + (theme[i][1]) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
  .attr("class", function (d, i) { return `legendTheme${theme[i][0]}`})

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


  domOn('.themeRoad.Trip.découverte', 'mouseover', () => {
    d3.select('.themeDétente.et.repos').style("fill-opacity", "0.5")
    d3.select('.legendThemeDétente.et.repos').style("fill-opacity", "0.5")
    onMouseOverTheme(25)
  })
  domOn('.themeRoad.Trip.découverte', 'mouseout', () => {
    d3.select('.themeDétente.et.repos').style("fill-opacity", "1")
    d3.select('.legendThemeDétente.et.repos').style("fill-opacity", "1")
    onMouseOutTheme()
  })
  
  domOn('.themeDétente.et.repos', 'mouseover', () => {
    d3.select('.themeRoad.Trip.découverte').style("fill-opacity", "0.5")
    d3.select('.legendThemeRoad.Trip.découverte').style("fill-opacity", "0.5")
    onMouseOverTheme(7)
  })
  domOn('.themeDétente.et.repos', 'mouseout', () => {
    d3.select('.themeRoad.Trip.découverte').style("fill-opacity", "1")
    d3.select('.legendThemeRoad.Trip.découverte').style("fill-opacity", "1")
    onMouseOutTheme()
  })

// Mouseover event handler
function onMouseOverTheme(d) {
  // Update Tooltip's position and value
  d3.select('.tooltip7')
  .style("text-align", "center")
  .style("font-family", "Titillium Web")
  .text(Math.round((d) / reponsesTotales * 100) + " % des votants")
  d3.select('.tooltip7').classed('hidden', false);
}
	// Mouseout event handler
	function onMouseOutTheme(d, i){
		d3.select('.tooltip7')
    .text("Passer la souris pour découvrir les %");
	}
