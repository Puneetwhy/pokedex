import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
    setPokemonListState({ ...pokemonListState, isLoading: true });

    const response = await axios.get(pokemonListState.pokedexUrl);

    const pokemonResult = response.data.results;

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultPromise = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(res);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: res,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? " Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={!pokemonListState.prevUrl}
          onClick={() =>
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.prevUrl,
            }))
          }
        >
          Prev
        </button>
        <button
          disabled={!pokemonListState.nextUrl}
          onClick={() =>
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
