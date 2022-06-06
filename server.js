const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');
const PORT = 8000;

app.use(cors());

// Very long objects here, feel free to collapse them (or scroll past them if your
// IDE doesn't let you collapse objects)
// Actual server code starts on line 175
const pokeNameToType = {
	"'M": ["Bird", "Normal"],
	"Bulbasaur": ["Grass", "Poison"],
	"Ivysaur": ["Grass", "Poison"],
	"Venusaur": ["Grass", "Poison"],
	"Charmander": ["Fire"],
	"Charmeleon": ["Fire"],
	"Charizard": ["Fire", "Flying"],
	"Squirtle": ["Water"],
	"Wartortle": ["Water"],
	"Blastoise": ["Water"],
	"Caterpie": ["Bug"],
	"Metapod": ["Bug"],
	"Butterfree": ["Bug", "Flying"],
	"Weedle": ["Bug", "Poison"],
	"Kakuna": ["Bug", "Poison"],
	"Beedrill": ["Bug", "Poison"],
	"Pidgey": ["Normal", "Flying"],
	"Pidgeotto": ["Normal", "Flying"],
	"Pidgeot": ["Normal", "Flying"],
	"Rattata": ["Normal"],
	"Raticate": ["Normal"],
	"Spearow": ["Normal", "Flying"],
	"Fearow": ["Normal", "Flying"],
	"Ekans": ["Poison"],
	"Arbok": ["Poison"],
	"Pikachu": ["Electric"],
	"Raichu": ["Electric"],
	"Sandshrew": ["Ground"],
	"Sandslash": ["Ground"],
	"Nidoran♀": ["Poison"],
	"Nidorina": ["Poison"],
	"Nidoqueen": ["Poison", "Ground"],
	"Nidoran♂": ["Poison"],
	"Nidorino": ["Poison"],
	"Nidoking": ["Poison", "Ground"],
	"Clefairy": ["Normal"],
	"Clefable": ["Normal"],
	"Vulpix": ["Fire"],
	"Ninetales": ["Fire"],
	"Jigglypuff": ["Normal"],
	"Wigglytuff": ["Normal"],
	"Zubat": ["Poison", "Flying"],
	"Golbat": ["Poison", "Flying"],
	"Oddish": ["Grass", "Poison"],
	"Gloom": ["Grass", "Poison"],
	"Vileplume": ["Grass", "Poison"],
	"Paras": ["Bug", "Grass"],
	"Parasect": ["Bug", "Grass"],
	"Venonat": ["Bug", "Poison"],
	"Venomoth": ["Bug", "Poison"],
	"Diglett": ["Ground"],
	"Dugtrio": ["Ground"],
	"Meowth": ["Normal"],
	"Persian": ["Normal"],
	"Psyduck": ["Water"],
	"Golduck": ["Water"],
	"Mankey": ["Fighting"],
	"Primeape": ["Fighting"],
	"Growlithe": ["Fire"],
	"Arcanine": ["Fire"],
	"Poliwag": ["Water"],
	"Poliwhirl": ["Water"],
	"Poliwrath": ["Water", "Fighting"],
	"Abra": ["Psychic"],
	"Kadabra": ["Psychic"],
	"Alakazam": ["Psychic"],
	"Machop": ["Fighting"],
	"Machoke": ["Fighting"],
	"Machamp": ["Fighting"],
	"Bellsprout": ["Grass", "Poison"],
	"Weepinbell": ["Grass", "Poison"],
	"Victreebel": ["Grass", "Poison"],
	"Tentacool": ["Water", "Poison"],
	"Tentacruel": ["Water", "Poison"],
	"Geodude": ["Rock", "Ground"],
	"Graveler": ["Rock", "Ground"],
	"Golem": ["Rock", "Ground"],
	"Ponyta": ["Fire"],
	"Rapidash": ["Fire"],
	"Slowpoke": ["Water", "Psychic"],
	"Slowbro": ["Water", "Psychic"],
	"Magnemite": ["Electric"],
	"Magneton": ["Electric"],
	"Farfetch'd": ["Normal", "Flying"], //This pest right here is why this object uses double quotes
	"Doduo": ["Normal", "Flying"],
	"Dodrio": ["Normal", "Flying"],
	"Seel": ["Water"],
	"Dewgong": ["Water", "Ice"],
	"Grimer": ["Poison"],
	"Muk": ["Poison"],
	"Shellder": ["Water"],
	"Cloyster": ["Water", "Ice"],
	"Gastly": ["Ghost", "Poison"],
	"Haunter": ["Ghost", "Poison"],
	"Gengar": ["Ghost", "Poison"],
	"Onix": ["Rock", "Ground"],
	"Drowzee": ["Psychic"],
	"Hypno": ["Psychic"],
	"Krabby": ["Water"],
	"Kingler": ["Water"],
	"Voltorb": ["Electric"],
	"Electrode": ["Electric"],
	"Exeggcute": ["Grass", "Psychic"],
	"Exeggutor": ["Grass", "Psychic"],
	"Cubone": ["Ground"],
	"Marowak": ["Ground"],
	"Hitmonlee": ["Fighting"],
	"Hitmonchan": ["Fighting"],
	"Lickitung": ["Normal"],
	"Koffing": ["Poison"],
	"Weezing": ["Poison"],
	"Rhyhorn": ["Ground", "Rock"],
	"Rhydon": ["Ground", "Rock"],
	"Chansey": ["Normal"],
	"Tangela": ["Grass"],
	"Kangaskhan": ["Normal"],
	"Horsea": ["Water"],
	"Seadra": ["Water"],
	"Goldeen": ["Water"],
	"Seaking": ["Water"],
	"Staryu": ["Water"],
	"Starmie": ["Water", "Psychic"],
	"Mr. Mime": ["Psychic"],
	"Scyther": ["Bug", "Flying"],
	"Jynx": ["Ice", "Psychic"],
	"Electabuzz": ["Electric"],
	"Magmar": ["Fire"],
	"Pinsir": ["Bug"],
	"Tauros": ["Normal"],
	"Magikarp": ["Water"],
	"Gyarados": ["Water", "Flying"],
	"Lapras": ["Water", "Ice"],
	"Ditto": ["Normal"],
	"Eevee": ["Normal"],
	"Vaporeon": ["Water"],
	"Jolteon": ["Electric"],
	"Flareon": ["Fire"],
	"Porygon": ["Normal"],
	"Omanyte": ["Rock", "Water"],
	"Omastar": ["Rock", "Water"],
	"Kabuto": ["Rock", "Water"],
	"Kabutops": ["Rock", "Water"],
	"Aerodactyl": ["Rock", "Flying"],
	"Snorlax": ["Normal"],
	"Articuno": ["Ice", "Flying"],
	"Zapdos": ["Electric", "Flying"],
	"Moltres": ["Fire", "Flying"],
	"Dratini": ["Dragon"],
	"Dragonair": ["Dragon"],
	"Dragonite": ["Dragon", "Flying"],
	"Mewtwo": ["Psychic"],
	"Mew": ["Psychic"]
};
//Now, the structure above allows for search-by-number, and also search by name.
//But this presents a problem:
//Who types the actual symbols for Nidoran, anyways?
//Thus the need for this object.
const nidoranWithoutSymbol = {"Nidoran": ["Poison"]};
//And this will serve as a catch-all for searching outside Pokedex values:
const missingNo = {"MissingNo.": ["Bird", "Normal"]};
//There are other glitch pokemon but they don't have pokedex numbers assigned.
//Perhaps in the future I'll modify this to allow search by internal hex value.

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.get('/css/normalize.css', (req, res) => {
	res.sendFile(__dirname + '/css/normalize.css');
});
app.get('/css/style.css', (req, res) => {
	res.sendFile(__dirname + '/css/style.css');
});

//This search is completely non-robust for now. No errors permitted.
//In the future I may make this case agnostic...
//But Farfetch'd and Mr. Mime make that a hassle.
app.get('/api/name/:name', (req, res) => {
	const name = req.params.name;
	let responseObject = {name: name};
	if(pokeNameToType[name]){
		responseObject.types = pokeNameToType[name];
	}
	else if(nidoranWithoutSymbol[name]){
		responseObject.types = nidoranWithoutSymbol[name];
	}
	else if(missingNo[name]){
		responseObject.types = missingNo[name];
	}
	else{
		responseObject.name = `Unrecognized name '${name}'`;
		responseObject.types = "Ghost";
	}
	res.json(responseObject);
})

app.get('/api/dex/:number', (req, res) => {
	const num = Number(req.params.number);
	const name = Object.keys(pokeNameToType)[num];
	if(name){
		let responseObject = {
			name: name,
			types: pokeNameToType[name]
		}
		res.json(responseObject);
	}
	else{
		let responseObject = {
			name: "MissingNo.",
			types: missingNo[name]
		};
		res.json(responseObject);
	}
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}, you'd better let him out... Wait, that's not the right line.`)
})