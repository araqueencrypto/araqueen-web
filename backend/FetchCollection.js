import { fetchNFTsFromQueenColors } from "./collections/queen-colors/fetchNFTsFromQueenColors.js";
import { fetchNFTsFromQueenPets } from "./collections/queen-pets/fetchNFTsFromQueenPets.js";
import { fetchNFTsFromQueenPlants } from "./collections/queen-plants/fetchNFTsFromQueenPlants.js";
import { fetchNFTsFromQueenPunk } from "./collections/queen-punk/fetchNFTsFromQueenPunk.js";
import { fetchNFTsFromQueenGreen } from "./collections/queen-green/fetchNFTsFromQueenGreen.js";
import { saveNFTsToDB } from "./services/saveNFTsToDB.js";

export const FetchCollection = async () => {
  try {
    console.log("🔄 Loading all collections...");

    const queenColors = await fetchNFTsFromQueenColors();
    const queenPets   = await fetchNFTsFromQueenPets();
    const queenPlants = await fetchNFTsFromQueenPlants();
    const queenPunk = await fetchNFTsFromQueenPunk();
    const queenGreen = await fetchNFTsFromQueenGreen();

    const all = [...queenColors,...queenPets,...queenPlants,...queenPunk,...queenGreen];

    saveNFTsToDB(all);

    return all;
  } catch (err) {
    console.error("❌ FetchCollection Error:", err.message);
    return [];
  }
};
