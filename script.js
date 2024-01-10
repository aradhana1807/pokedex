const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const typeColor = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

let getPokeData = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
        });

}

let generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgData = data.sprites.other.dream_world.front_default;
    const pokemonName = data.name[0].toUpperCase() + data.name.slice(1);
    const atkStat = data.stats[1].base_stat;
    const defStat = data.stats[2].base_stat;
    const spdStat = data.stats[5].base_stat;

    const themeColor = typeColor[data.types[0].type.name]


    card.innerHTML =
        `
    <p class="hp">
                <span>HP</span>
                ${hp}
            </p>
            <img src=${imgData}>
            <h2 class="pokemon-name">${pokemonName}</h2>
            <div class="types">
                
            </div>
            <div class="stats">
                <div>
                    <h3>${atkStat}</h3>
                    <p>Attack</p>
                </div>

                <div>
                    <h3>${defStat}</h3>
                    <p>Defense</p>
                </div>

                <div>
                    <h3>${spdStat}</h3>
                    <p>Speed</p>
                </div>
            </div>
    `;

    appendTypes(data.types);
    styleCard(themeColor);
}

let appendTypes = (types) => {
    types.forEach(item => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    })
};

let styleCard = (color) => {
    card.style.background = ` radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach(
        (typeColor) => {
            typeColor.style.backgroundColor = color;
        }
    )
}

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);


