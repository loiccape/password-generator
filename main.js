
const uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercases = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = `"!@#$%^&*()_+-=[]{}|;:'",.<>?/`;
let optionPassword = "";
let securityLevel = 0;

const generatedPassword = document.getElementById("generatedPassword");
const characterLength = document.getElementById("characterLength");
const form = document.querySelector("#form");
const lengthNumber = document.getElementById("lengthNumber");
const copyIcon = document.getElementById("copyIcon")

// Initialise lengthNumber avec la valeur de characterLength
lengthNumber.innerText = characterLength.value;

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Ajout pour empêcher le rechargement de la page
    getAllOptions();
    genPassword();
    levelPassword(parseInt(characterLength.value, 10));
    colorBar()
});

// Met à jour la valeur de lengthNumber en fonction de la valeur du range
characterLength.addEventListener("input", () => {
    lengthNumber.innerText = characterLength.value;
});

// Fonction qui récupère les options et génère la chaîne de caractères à utiliser
function getAllOptions() {
    optionPassword = "";

    const uppercase = document.getElementById("checkboxUppercase").checked;
    const lowercase = document.getElementById("checkboxLowercase").checked;
    const number = document.getElementById("checkboxNumbers").checked;
    const symbol = document.getElementById("checkboxSymbols").checked;

    if (uppercase) optionPassword += uppercases;
    if (lowercase) optionPassword += lowercases;
    if (number) optionPassword += numbers;
    if (symbol) optionPassword += symbols;

}

// Fonction de génération de mot de passe
function genPassword() {
    // Vérification si au moins une option est sélectionnée
    if (!optionPassword) {alert("Select one options")
        return;
    }

    let generatedPasswordValue = "";
    for (let i = 0; i < characterLength.value; i++) {
        const randomIndex = Math.floor(Math.random() * optionPassword.length);
        generatedPasswordValue += optionPassword[randomIndex];
    }

    generatedPassword.innerText = generatedPasswordValue;
}

// Fonction d'évaluation du niveau de sécurité du mot de passe
function levelPassword(length) {
    securityLevel = 0; // Réinitialise le niveau de sécurité à chaque appel

    if (length >= 6 && length <= 8) {
        securityLevel = 1;
    } else if (length >= 9 && length < 10) {
        securityLevel = 2;
    } else if (length >= 10) {
        securityLevel = 4;
    }

    if (document.getElementById("checkboxUppercase").checked) securityLevel++;
    if (document.getElementById("checkboxLowercase").checked) securityLevel++;
    if (document.getElementById("checkboxNumbers").checked) securityLevel++;
    if (document.getElementById("checkboxSymbols").checked) securityLevel++;
console.log(securityLevel);

}

function colorBar(){
    const areas = document.querySelectorAll("#pw")
    const levelText = document.getElementById("levelText")
    
    areas.forEach((element)=>{
        element.style.backgroundColor = "#18171F"
    })
    if (securityLevel <= 2) {
       areas[0].style.backgroundColor = "red"
       levelText.innerText = "TOO WEAK !"
       
    }else if(securityLevel > 1 && securityLevel <=4){
        areas[0].style.backgroundColor = "#FB7C58"
        areas[1].style.backgroundColor = "#FB7C58"
        levelText.innerText = "WEAK"
        
    }else if( securityLevel > 4 && securityLevel <= 6){
        areas[0].style.backgroundColor = "#F8CD65"
        areas[1].style.backgroundColor = "#F8CD65"
        areas[2].style.backgroundColor = "#F8CD65"
        levelText.innerText = "MEDIUM"
        
    }else{
        
    areas.forEach((element)=>{
        element.style.backgroundColor = "#A4FFAF"
    })
        
        levelText.innerText = "STRONG"
        
    }
}


copyIcon.addEventListener('click',function copy(params) {
    const passwordText = generatedPassword.innerText;

    if (passwordText) {
        navigator.clipboard.writeText(passwordText)
            .then(() => {
                console.log("Mot de passe copié dans le presse-papiers !");
                // Optionnel : ajouter une notification visuelle pour l'utilisateur
            })
            .catch(err => {
                console.error("Erreur lors de la copie :", err);
            });
    } else {
        console.log("Aucun mot de passe à copier !");
    }
})