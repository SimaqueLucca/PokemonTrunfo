const pokemons = ["zapdos", "moltres", "articuno", "bulbasaur", 'pikachu', 'charmander'];

function createCard({
    sprite,
    cardColor,
    pokemonName,
    pokemonHP,
    pokemonAttack,
    pokemonDefense,
    pokemonSpeed
}) {
    const divContainer = document.querySelector('.container')

    const card = document.createElement('div')
    card.classList.add('card')
    card.id = pokemonName
    card.style.backgroundColor = cardColor
    divContainer.append(card)

    const divIMG = document.createElement('div')
    divIMG.classList.add('divIMG')
    card.append(divIMG)

    const img = document.createElement('img')
    img.classList.add('img')
    img.src = sprite
    divIMG.append(img)

    const divAttributes = document.createElement('div')
    divAttributes.classList.add('attributes')
    card.append(divAttributes)

    const attLife = document.createElement('p')
    attLife.innerText = `Life: ${pokemonHP}`
    const attAttack = document.createElement('p')
    attAttack.innerText = `Attack: ${pokemonAttack}`
    const attDefense = document.createElement('p')
    attDefense.innerText = `Defense: ${pokemonDefense}`
    const attSpeed = document.createElement('p')
    attSpeed.innerText = `Speed: ${pokemonSpeed}`

    divAttributes.append(attLife)
    divAttributes.append(attAttack)
    divAttributes.append(attDefense)
    divAttributes.append(attSpeed)

}

pokemons.map((pokemon) => {

    const getAPIData = async (endpoint) => {
        let response = await fetch(endpoint)
        return (await response.json())
    }

    const apiResponse = getAPIData('https://pokeapi.co/api/v2/pokemon/' + pokemon)

    const getPokemonData = async () => {

        const pokemonData = await apiResponse

        let color

        switch (pokemonData.types[0].type.name) {
            case 'fire':
                color = '#cd5c5c'
                break;
            case 'electric':
                color = '#ffff40'
                break;
            case 'water':
                color = '#4086ff'
                break;
            case 'grass':
                color = '#8CFA2A'
                break;
            case 'ice':
                color = '#7DABFA'
                break;
            default:
                color = '#B2B2B2'
                break;
        }

        createCard({
            sprite: pokemonData.sprites.front_default,
            pokemonName: pokemonData.forms[0].name,
            pokemonHP: pokemonData.stats[0].base_stat,
            pokemonAttack: pokemonData.stats[1].base_stat,
            pokemonDefense: pokemonData.stats[2].base_stat,
            pokemonSpeed: pokemonData.stats[5].base_stat,
            cardColor: color
        })

    }

    getPokemonData()
})

