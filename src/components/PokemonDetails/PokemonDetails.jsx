import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonDetails.css";
import { useParams } from "react-router-dom";
import Outer from "../Outer-pokedesk/Outer";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <Outer />
      <div className="pokemon-details-name"> {pokemon.name} </div>
      <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokemon-details-size">
        <div id="height">Height: {pokemon.height} </div>
        <div id="weight">Weight: {pokemon.weight} </div>
      </div>

      <div className="pokemon-details-types">
        {pokemon.types?.map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
