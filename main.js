//variables
const uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercases = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = `"!@#$%^&*()_+-=[]{}|;:'",.<>?/`
let optionPassword = ""

const generatedPassword = document.getElementById("generatedPassword")
const characterLength = document.getElementById("characterLength")
const form = document.querySelector("#form")

form.addEventListener("submit", genPassword)


//fonction qui recupere les options
function getAllOptions() {
    
    const uppercase = document.getElementById("checkboxUppercase").checked;
    const lowercase = document.getElementById("checkboxLowercase").checked;
    const number = document.getElementById("checkboxNumbers").checked;
    const symbol = document.getElementById("checkboxSymbols").checked;

    if (uppercase) {
        optionPassword += uppercases
    }

    if (lowercase) {
        optionPassword += lowercases
    }
    
    if (number) {
        optionPassword += numbers
    }
    
    if (symbol) {
        optionPassword += symbols
    }

    if (!uppercase && !lowercase && !number && !symbol) {
        console.log("Veuillez cocher au moins une option pour générer le mot de passe.");
    }    
}


function genPassword(event) {
    event.preventDefault();

    getAllOptions();;
    let generatedPasswordValue = "";

    for (let index = 0; index < characterLength.value; index++) {
        const randomIndex = Math.floor(Math.random() * optionPassword.length);
        const randomCharacter = optionPassword[randomIndex];
        generatedPasswordValue += randomCharacter;
    }
    generatedPassword.innerText = generatedPasswordValue;
}
