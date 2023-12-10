import { prompt } from "./prompt.js";

// Validate the user's input
const isValidNumber = (number) => {
  return !Number.isNaN(number) && number >= 8 && number <= 36;
};

const isValidYesOrNo = (choice) => {
  try {
    const isValid =
      choice.toUpperCase() === "Y" || choice.toUpperCase() === "N";
    return isValid;
  } catch {
    console.log("Erreur dans l'entree saisie");
    return false;
  }
};

const convertYesOrNoToBoolean = (character) => {
  console.log({ character });
  if (character.toUpperCase() === "Y") {
    console.log("Je suis OUIII"); //TODO à supprimer
    return true;
  } else if (character.toUpperCase() === "N") {
    console.log("Je suis NOOONN"); //TODO à supprimer
    return false;
  }
  console.log("Pourquoi je suis là?"); //TODO à supprimer
  return false; //TODO : A supprimer pour gerer cas d'erreur
};

const askNbCharacters = () => {
  const nbCharacters = Number(prompt("-> Combien de caracteres ? (8-36) "));
  if (!isValidNumber(nbCharacters)) {
    console.log("Cette entrée est invalide\n");
    return askNbCharacters();
  }

  return nbCharacters;
};

const askSpecialCharacters = () => {
  const specialCharacters = prompt("-> Caracteres speciaux ? (y/n) ");
  if (!isValidYesOrNo(specialCharacters)) {
    console.log("Veuillez saisir y pour oui ou n pour non");
    return askSpecialCharacters();
  }

  return convertYesOrNoToBoolean(specialCharacters);
};

const askNumbers = () => {
  const numbers = prompt("-> Chiffres ? (y/n) ");
  if (!isValidYesOrNo(numbers)) {
    console.log("Veuillez saisir y pour oui ou n pour non");
    return askNumbers();
  }
  return convertYesOrNoToBoolean(numbers);
};

const askUpperCase = () => {
  const upperCase = prompt("-> Majuscules ? (y/n) ");
  if (!isValidYesOrNo(upperCase)) {
    console.log("Veuillez saisir y pour oui ou n pour non");
    return askUpperCase();
  }
  return convertYesOrNoToBoolean(upperCase);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const nbCharac = askNbCharacters();
console.log({ nbCharac });
const specialCharacPresence = askSpecialCharacters();
console.log({ specialCharacPresence });
const numbersPresence = askNumbers();
console.log({ numbersPresence });
const upperCasePresence = askUpperCase();
console.log({ upperCasePresence });
