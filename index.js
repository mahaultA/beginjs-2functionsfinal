import { prompt } from "./prompt.js";

//------------------------------------------------------------
// CHAINES DE CARACTERES GLOBALES
//------------------------------------------------------------
const charactersLowCase = "abcdefghijklmnopqrstuvwxyz";
const charactersUpCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersNumbers = "0123456789";
const charactersSpecials = "@_/+";

//------------------------------------------------------------
// VALIDATION DES SAISIES UTILISATEUR
//------------------------------------------------------------
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
  if (character.toUpperCase() === "Y") {
    return true;
  } else {
    //(character.toUpperCase() === "N")
    return false;
  }
};

//------------------------------------------------------------
// DEMANDE DE SAISIE UTILISATEUR
//------------------------------------------------------------
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

//------------------------------------------------------------
// GENERATION D'UNE STRING RANDOM A PARTIR D'UNE LISTE
// DE CARACTERES AUTORISES (characters)
//------------------------------------------------------------
const generateString = (length, characters) => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//------------------------------------------------------------
// VALIDATION DE LA CHAINE DE CARACTERES SELON LES
// PARAMETRES RENTRES PAR L'UTILISATEUR
//------------------------------------------------------------
const hasNumber = (myString) => {
  return /\d/.test(myString);
};

const checkPasswordValidFromUserSettings = (
  password,
  specialCharAsked,
  numberAsked,
  upperCaseAsked
) => {
  // Créer une expression régulière basée sur les caractères autorisés
  const regexSpecialChar = new RegExp(`[${charactersSpecials}]`);
  // Vérifier si la chaîne générée contient au moins un des caractères autorisés
  const containsSpecialChar = regexSpecialChar.test(password);
  if (specialCharAsked && !containsSpecialChar) {
    console.log("PROBLEME : Pas de caractere special");
    return false;
  }

  if (numberAsked && !hasNumber(password)) {
    console.log("PROBLEME : Pas de nombres");
    return false;
  }

  // Créer une expression régulière basée sur les caractères autorisés
  const regexUpperCase = new RegExp(`[${charactersUpCase}]`);
  // Vérifier si la chaîne générée contient au moins un des caractères autorisés
  const containsUpperCase = regexUpperCase.test(password);
  if (upperCaseAsked && !containsUpperCase) {
    console.log("PROBLEME : Pas de majuscule");
    return false;
  }

  return true;
};

//DEBUT DU PROGRAMME PRINCIPAL

//DEMANDE DE TOUTES LES SAISIES UTILISATEUR
const nbCharac = askNbCharacters();
const specialCharacPresence = askSpecialCharacters();
const numbersPresence = askNumbers();
const upperCasePresence = askUpperCase();

//CREATION DE LA CHAINE DES CARACTERES AUTORISES POUR lE PASSWORD
let charactersAuthorized = charactersLowCase;

if (specialCharacPresence) {
  charactersAuthorized += charactersSpecials;
}

if (numbersPresence) {
  charactersAuthorized += charactersNumbers;
}

if (upperCasePresence) {
  charactersAuthorized += charactersUpCase;
}

//GENERATION DU PASSWORD
console.log("GENERATION DU PASSWORD EN COURS ...");
let generatedPassword = "";
let validityPassword = false;

do {
  generatedPassword = generateString(nbCharac, charactersAuthorized);
  console.log({ generatedPassword });

  //VERIFICATION DU PASSWORD
  validityPassword = checkPasswordValidFromUserSettings(
    generatedPassword,
    specialCharacPresence,
    numbersPresence,
    upperCasePresence
  );
} while (!validityPassword);

console.log("MOT DE PASSE:", generatedPassword);

// const resultRandom = Math.random().toString(36).substring(0, nbCharac);
// console.log({ resultRandom });
