"use strict";

// ----- VARIABLES ----- //
// Time between every loop in milliseconds
const loopTime = 1000;
// Beer colors
const hefeweizenColor = "#fcc12e"
const IpaColor = "#d8a327"
const OktoberfestColor = "#e2b92c"
const EuropeanLagerColor = "#e9b041"
const StoutColor = "#080905"
const BelgianSpecialityAleColor = "#72331c"
const CaliforniaCommonColor = "#89260b"
// Random
let beerDesc;

// ----- VARIABLES SLUT ----- //

// ----- INITIAL FUNCTIONS ----- //

document.addEventListener("DOMContentLoaded", startFunc);

function startFunc() {
    // Static functions
    staticFunc();
    // Dynamic functions
    loop();
}

function loop() {
    // dynamicFunc() bliver kaldt ved hvert loop
    let dynamicVar = dynamicData();
    setInterval(function () {
        dynamicFunc(dynamicVar);
    }, loopTime);
}

// Modtager den statiske data, og parser stringify til JSON og returner
function staticData() {
    let fooData = FooBar.getData();
    let dataArray = JSON.parse(fooData);
    return dataArray;
}

// Modtager den dynamiske data, og parser stringify til JSON og returner
function dynamicData() {
    let fooData = FooBar.getData(true);
    let dataArray = JSON.parse(fooData);
    return dataArray;
}

// Kalder alle funktioner, der ikke skal loopes
function staticFunc() {
    let staticVar = staticData();
    barSign(staticVar);
    getTime(staticVar);
    screenSlide();
    createTaps(staticVar);
    beerTaps(staticVar);
    beerStorage(staticVar);
}

// Kalder alle funktioner, der skal loopes
function dynamicFunc() {
    let dynamicVar = dynamicData();
    setTimeout(function () {
        beerAmount(dynamicVar);
    }, 1000);
    bartenderPosition(dynamicVar);
    bartenderReplaceKeg(dynamicVar);
    tvScreen(dynamicVar);
    resetKegs(dynamicVar);
}

// ----- INITIAL FUNCTIONS SLUT ----- //

// ---------- BAR SIGN --------- //

// Funktion der henter barnavnet, og ændrer til uppercase
function barSign(parm) {
    document.querySelector(".bar_name").innerHTML = parm.bar.name.toUpperCase();
    setTimeout(function () {
        document.querySelector("#sign").style.animationName = "moveSign";
    }, 3000);
}

// Hover over skiltet, for at ændre Codebros, til Codepros
document.querySelector("#sign").addEventListener("mouseover", function () {
    document.querySelector(".bar_bros").innerHTML = "by Code pros"
})

document.querySelector("#sign").addEventListener("mouseleave", function () {
    document.querySelector(".bar_bros").innerHTML = "by Code bros"
})

// ---------- BAR SIGN SLUT --------- //

// ---------- CLOCK --------- //

// Funktion der viser hvor lang tid der er tilbage til baren lukker
function getTime(parm) {
    let d = new Date(parm.timestamp);
    let dDate = d.getDate();
    let dMonth = d.getMonth() + 1;
    let dYear = d.getFullYear();
    // Set the date we're counting down to
    let countDownDate = new Date(`${dMonth} ${dDate}, ${dYear} ${parm.bar.closingTime}`).getTime();

    // Update the count down every 1 second
    let x = setInterval(function () {

        // Get todays date and time
        let now = new Date().getTime();

        // Find the distance between now an the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.querySelector(".closingTime").innerHTML = "CLOSING IN " + ((hours < 10 ? '0' : '') +
                hours) + ":" +
            ((minutes < 10 ? '0' : '') + minutes) + ":" + ((seconds < 10 ? '0' : '') + seconds);

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".closingTime").innerHTML = "CLOSED";
        }
    }, 1000);
}
// ---------- CLOCK SLUT --------- //

// --------- BARTENDERS ---------- //

// Funktion der bestemmer hvor bartenderne står, ifht. hvilken øl de serverer, ifht. deres left-value
// Hvis bartenderne ikke står ved en beertap, har de en opacity på 0.4, så det er nemmere at
// se tv-skærmen bag dem, samt for at indikere at de ikke arbejder
function bartenderPosition(parm) {
    const peter = document.querySelector("#bartenders").children[0]
    const jonas = document.querySelector("#bartenders").children[1]
    const martin = document.querySelector("#bartenders").children[2]
    let i;
    for (i = 0; parm.bartenders.length > i; i++) {
        // for hvert loop der kører er det den næste bartender
        // da "i" starter på 0 incrementer med 1 hvert loop vil "children[i]" se sådan ud for de respektive loops
        // første loop: children[0] // Peter
        // andet loop: children[1] // Jonas
        // tredje loop: children[2] // Martin
        let bartender = document.querySelector("#bartenders").children[i]
        bartender.style.opacity = "1";
        if (parm.bartenders[i].usingTap == 0) {
            bartender.style.left = "6.4%"
        } else if (parm.bartenders[i].usingTap == 1) {
            bartender.style.left = "16.8%"
        } else if (parm.bartenders[i].usingTap == 2) {
            bartender.style.left = "27.2%"
        } else if (parm.bartenders[i].usingTap == 3) {
            bartender.style.left = "37.3%"
        } else if (parm.bartenders[i].usingTap == 4) {
            bartender.style.left = "47.3%"
        } else if (parm.bartenders[i].usingTap == 5) {
            bartender.style.left = "57%"
        } else if (parm.bartenders[i].usingTap == 6) {
            bartender.style.left = "67%"
        } else {
            if (parm.bartenders[i].name == "Peter") {
                peter.style.left = "75%"
            } else if (parm.bartenders[i].name == "Jonas") {
                jonas.style.left = "83%";
            } else {
                martin.style.left = "90%"
            }
            bartender.style.opacity = "0.4";
        }
    }
}

// Funktion der ændrer bartendernes background-image, hvis deres statusDetail == "replaceKeg"
function bartenderReplaceKeg(parm) {
    const peter = document.querySelector("#bartenders").children[0]
    const jonas = document.querySelector("#bartenders").children[1]
    const martin = document.querySelector("#bartenders").children[2]
    let i;
    for (i = 0; parm.bartenders.length > i; i++) {
        // PETER
        if (parm.bartenders[0].statusDetail == "replaceKeg") {
            peter.style.backgroundImage = "url('images/scene/peter_keg.png')"
        } else {
            peter.style.backgroundImage = "url('images/scene/Peter.png')"
        }
        // JONAS
        if (parm.bartenders[1].statusDetail == "replaceKeg") {
            jonas.style.backgroundImage = "url('images/scene/jonas_keg.png')"

        } else {
            jonas.style.backgroundImage = "url('images/scene/Jonas.png')"
        }
        // MARTIN
        if (parm.bartenders[2].statusDetail == "replaceKeg") {
            martin.style.backgroundImage = "url('images/scene/martin_keg.png')"
        } else {
            martin.style.backgroundImage = "url('images/scene/Martin.png')"
        }
    }
}

// --------- BARTENDERS SLUT ---------- //

// ---------- TV ---------- //

// Funktion der får tv'et til at skifte skærm
function screenSlide() {
    
    const screen1 = document.querySelector("#screen1");
    const screen2 = document.querySelector("#screen2");
    setInterval(function () {
        popularBeer();
    if (screen1.classList.contains("active")) {
        screen1.style.left = "0";
        screen2.style.left = "100%";
        screen1.classList.remove("active");
        screen2.classList.remove("active");
    } else {
        screen1.style.left = "-100%";
        screen2.style.left = "0";
        screen1.classList.add("active");
        screen2.classList.add("active");
    }
    }, 7000);
}

// Funktion der viser hvor mange der er i kø, hvem der er i kø, og hvad deres bestilling er
function tvScreen(parm) {
    // Viser hvor mange der er i kø, i tilfælde af der er én, ændrer den det rigtigt grammatisk
    document.querySelector(".in_queue").innerHTML =
        `There are ${parm.queue.length} customers in queue <br><br>`;
    if (parm.queue.length == 1) {
        document.querySelector(".in_queue").innerHTML =
            `There is ${parm.queue.length} customer in queue <br><br>`;
    }
    // Her tømmer den indholdet af .being_served, før den skaber nyt indhold
    document.querySelector(".being_served").innerHTML = "";
    // Viser hvad kunden har bestilt
    if (parm.serving.length > 0) {
        parm.serving.forEach(customer => {
            let createItem;
            let customerOrder = customer.order.join(" - ");
            createItem =
                `<div class="order">Customer ${customer.id} has ordered ${customer.order.length} beers: <br> <i>${customerOrder}</i></div>`;
                // Ændrer igen her til at være grammatisk korrekt, i tilfælde af én enkelt genstand
            if (customer.order.length = 1) {
                createItem =
                    `<div class="order">Customer ${customer.id} has ordered ${customer.order.length} beer: <br> <i>${customerOrder}</i></div>`;
            }
            document.querySelector(".being_served").innerHTML += createItem;
        });
    }
}

// Funktion der sorterer mellem de øl, der er blevet solgt mest af, samt viser de tre mest populære øl, på tv-skærmen
function popularBeer() {
    let dataDynamic = dynamicData()
    let dataStatic = staticData()
    
    // Kalder funktion der sorterer øllene, og modtager den sorterede data
    sortingFunc(dataDynamic)
    let i;
    for (i = 0; dataDynamic.taps.length > i; i++) {
        let ii;
        for (ii = 0; dataStatic.beertypes.length > ii; ii++) {
            // Hvis dataDynamic.taps[i].beer = én af de beertypes[ii].navn 
            if (dataDynamic.taps[i].beer == dataStatic.beertypes[ii].name) {
                // console.log("Tab:", (i+1) + ":", dataDynamic.taps[i].beer, "Beertype:", (ii+1) + ":", dataStatic.beertypes[ii].name)
                if (dataDynamic.taps[i].beer == dataDynamic.taps[0].beer) {
                    document.querySelector(".first_place").style.backgroundImage =
                        `url("images/labels/${dataStatic.beertypes[ii].label}")`;
                }
                if (dataDynamic.taps[i].beer == dataDynamic.taps[1].beer) {
                    document.querySelector(".second_place").style.backgroundImage =
                        `url("images/labels/${dataStatic.beertypes[ii].label}")`;
                }
                if (dataDynamic.taps[i].beer == dataDynamic.taps[2].beer) {
                    document.querySelector(".third_place").style.backgroundImage =
                        `url("images/labels/${dataStatic.beertypes[ii].label}")`;
                }
            }
        }
    }
}

// Funktion der modtager JSON(parm), parm sorterer taps, og vælger at den skal sorte og returne deres level
function sortingFunc(parm) {
    parm.taps.sort(function (a, b) {
        // Tager første del i arrayet, og sammenligner de to, ifht. hvad der er højst og lavest
        return a.level - b.level;
    });
}

// ---------- TV SLUT ---------- //

// ---------- TAPS ------------ //

// Laver taps, og tap elements
function createTaps(parm) {
    let i;
    // Genererer antallet af længden af taps
    for (i = 0; parm.taps.length > i; i++) {
        let iDiv = document.createElement("div");
        iDiv.className = `tap`;
        document.querySelector("#taps").appendChild(iDiv);
        let ii;
        // Generer tre div'er, og appender til deres parent
        for (ii = 0; 3 > ii; ii++) {
            let iDiv = document.createElement("div");
            document.querySelector("#taps").children[i].appendChild(iDiv);
        }
    }
}

// Funktion der bestemmer label, og farven på øl og stråle
function beerTaps(parm) {
    let tapsList = document.querySelector("#taps");
    let i;
    for (i = 0; tapsList.children.length > i; i++) {
        let ii;
        for (ii = 0; parm.beertypes.length > ii; ii++) {
            if (parm.taps[i].beer == parm.beertypes[ii].name) {

                // Hvis man klikker på label på en tap, åbnes modalvindue med information om øl
                tapsList.children[i].children[2].addEventListener("click", beerModal);
                tapsList.children[i].children[2].setAttribute("data-id", parm.beertypes[ii].name);
                tapsList.children[i].children[2].style.backgroundImage =
                    `url("images/labels/${parm.beertypes[ii].label}")`;
                    
                    // Bestemmer hvilken farve øllen har, ifht. hvilken ølkategori det er
                if (parm.beertypes[ii].category == "Hefeweizen") {
                    tapsList.children[i].children[0].style.backgroundColor = hefeweizenColor;
                    tapsList.children[i].children[1].style.backgroundColor = hefeweizenColor;
                } else if (parm.beertypes[ii].category == "IPA") {
                    tapsList.children[i].children[0].style.backgroundColor = IpaColor;
                    tapsList.children[i].children[1].style.backgroundColor = IpaColor;
                } else if (parm.beertypes[ii].category == "Oktoberfest") {
                    tapsList.children[i].children[0].style.backgroundColor = OktoberfestColor;
                    tapsList.children[i].children[1].style.backgroundColor = OktoberfestColor;
                } else if (parm.beertypes[ii].category == "European Lager") {
                    tapsList.children[i].children[0].style.backgroundColor = EuropeanLagerColor;
                    tapsList.children[i].children[1].style.backgroundColor = EuropeanLagerColor;
                } else if (parm.beertypes[ii].category == "Stout") {
                    tapsList.children[i].children[0].style.backgroundColor = StoutColor;
                    tapsList.children[i].children[1].style.backgroundColor = StoutColor;
                } else if (parm.beertypes[ii].category == "Belgian Specialty Ale") {
                    tapsList.children[i].children[0].style.backgroundColor = BelgianSpecialityAleColor;
                    tapsList.children[i].children[1].style.backgroundColor = BelgianSpecialityAleColor;
                } else {
                    tapsList.children[i].children[0].style.backgroundColor = CaliforniaCommonColor;
                    tapsList.children[i].children[1].style.backgroundColor = CaliforniaCommonColor;
                }
            }
        }
    }
}

// Funktion der viser oversigt over hvor meget øl der er tilbage i en tap
function beerAmount(parm) {
    let tapsList = document.querySelector("#taps");
    let i;
    for (i = 0; tapsList.children.length > i; i++) {
        // Vi ganger kapaciteten med 4, for at komme op på 1000, for derefter at dividere med 10.000, så man tager 2% for hver øl
        let tapsProcent = parm.taps[i].level * 4 / 10000;
        // Funktionen transformer ud fra den procentdel, der er tilbage
        // EKSEMPEL: 1 = 100%, 0,5 = 50%, derfor når scaleY(0.5), vil fustagen være halvt fuld
        tapsList.children[i].children[0].style.transform = `scaleY(${tapsProcent})`;

        // Finder ud af om den respektive fustage bliver brugt
        // Hvis den bliver brugt, scaler strålen op til 1
        // Hvis ikke, scaler den til 0
        if (parm.taps[i].inUse == true) {
            tapsList.children[i].children[1].style.transformOrigin = "top";
            tapsList.children[i].children[1].style.transform = `scaleY(1)`;
        } else {
            tapsList.children[i].children[1].style.transformOrigin = "bottom";
            tapsList.children[i].children[1].style.transform = `scaleY(0)`;
        }
        if (parm.taps[i].level == 0) {
            tapsList.children[i].children[1].style.visibility = "hidden";
        } else {
            tapsList.children[i].children[1].style.visibility = "visible";
        }
    }
}

// ---------- TAPS SLUT ------------ //

// --------- BEER STORAGE -------- //

function beerStorage(parm) {
    let tapsStorage = document.querySelector("#taps_storage");
    let i;
    // For-loop der tilføjer divs, samt tilføjer billeder og tekst, der forholder sig til de forskellige øl
    for (i = 0; i < parm.storage.length; i++) {
        if (tapsStorage.children.length < parm.storage.length) {
            let addLabel = document.createElement("IMG");
            addLabel.className = "storage_label";
            addLabel.src = (`images/labels/${parm.beertypes[i].label}`);
            let labelDiv = document.createElement("div");
            labelDiv.className = "label_div"
            let storageDiv = document.createElement("div");
            storageDiv.className = "storage_div";
            let storageTextP = document.createElement("p");
            let storageText = document.createTextNode(
                `${parm.storage[i].name} has ${parm.storage[i].amount} kegs left`);
            storageTextP.className = "storage_text";
            let kegsStorage = document.createElement("div");
            kegsStorage.className = "kegs_storage";

            // For-loop der tilføjer et billede af en fustage, for hvor mange fustager der er tilbage på lager
            let ii;
            for (ii = 0; ii < parm.storage[i].amount; ii++) {
                let kegsAmount = document.createElement("img");
                kegsAmount.src = "images/scene/beerkeg.png";
                kegsStorage.appendChild(kegsAmount);
            }

            // Appender al materialet i de tilsvarende divs
            labelDiv.appendChild(addLabel);
            storageDiv.appendChild(labelDiv);
            storageTextP.appendChild(storageText);
            storageDiv.appendChild(storageTextP);
            storageDiv.appendChild(kegsStorage);
            tapsStorage.appendChild(storageDiv);

            // Gør det muligt at klikke på labels, for at læse mere om øllen
            addLabel.addEventListener("click", beerModal);
            addLabel.setAttribute("data-id", parm.storage[i].name);
        }
    }
}

// Funktion der nulstiller antallet af kegs billeder, samt tekst om mængden af kegs
function resetKegs(parm) {
    let tapsStorage = document.querySelector("#taps_storage");
    let i;
    // For-loop der tilføjer divs, samt tilføjer billeder og tekst, der forholder sig til de forskellige øl
    for (i = 0; i < parm.storage.length; i++) {
        // Elementet med tekst om hvor mange kegs der er tilbage, samt visualiseringen af kegs bliver nulstillet
        tapsStorage.children[i].children[1].innerHTML = "";
        tapsStorage.children[i].children[2].innerHTML = "";
    }
    // Funktionen der genopfylder kegs bliver kaldt
    refillKegs(parm)
}

// Funktion der opdaterer information omkring hvor mange kegs der er tilbage i storage
function refillKegs(parm) {
    let i;
    let tapsStorage = document.querySelector("#taps_storage");
    // For-loop der tilføjer divs, samt tilføjer billeder og tekst, der forholder sig til de forskellige øl
    for (i = 0; i < parm.storage.length; i++) {
        tapsStorage.children[i].children[1].innerHTML =
            `${parm.storage[i].name} has ${parm.storage[i].amount} kegs left`;
        if (parm.storage[i].amount == 1) {
            tapsStorage.children[i].children[1].innerHTML =
                `${parm.storage[i].name} has ${parm.storage[i].amount} keg left`;
        }
        let ii;
        let storageDiv = tapsStorage.children[i].children[2];
        // Opdaterer mængden af keg images
        for (ii = 0; ii < parm.storage[i].amount; ii++) {
            let kegsAmount = document.createElement("img");
            kegsAmount.src = "images/scene/beerkeg.png";
            storageDiv.appendChild(kegsAmount);
        }
    }
}

// --------- BEER STORAGE SLUT -------- //

// --------- MODAL VINDUE -------- //

// Funktion der åbner modalvindue med mere information om de forskellige øl
function beerModal(evt) {
    let modalWindow = document.querySelector("#modal_window");
    let beerAlc = document.querySelector("#beer_alc");
    let beerName = document.querySelector("#beer_name h2");
    let beerCat = document.querySelector("#beer_cat");
    beerDesc = document.querySelector("#beer_desc");
    let beerLabel = document.querySelector("#beer_label");
    let beerAppear = document.querySelector("#beer_appear");
    let beerAroma = document.querySelector("#beer_aroma");
    let beerFlavor = document.querySelector("#beer_flavor");
    let beerMouth = document.querySelector("#beer_mouth");
    let beerOverall = document.querySelector("#beer_overall");
    let dataStatic = staticData();
    modalWindow.style.display = "block";

    // Finder id'et på den øl der bliver klikket på
    let mit_id = evt.currentTarget.getAttribute("data-id");
    let beerId = dataStatic.beertypes.find(function (element) {
        return element.name == mit_id;
    });

    // Tilpasser tekstelementerne til den valgte øl
    beerLabel.innerHTML = (`<img src="images/labels/${beerId.label}">`);
    beerName.innerHTML = (`${beerId.name}`);
    beerAlc.innerHTML = (`<b>Alcohol percentage:</b> ${beerId.alc}%`);
    beerCat.innerHTML = (`<b>Category:</b> ${beerId.category}`);
    beerAppear.innerHTML = (`<b>Appearance:</b> ${beerId.description.appearance}`);
    beerAroma.innerHTML = (`<b>Aroma:</b> ${beerId.description.aroma}`);
    beerFlavor.innerHTML = (`<b>Flavor:</b> ${beerId.description.flavor}`);
    beerMouth.innerHTML = (`<b>Mouthfeel:</b> ${beerId.description.mouthfeel}`);
    beerOverall.innerHTML = (`<b>Overall impression:</b> ${beerId.description.overallImpression}`);
}

// Funktion der åbner op for en mere detaljeret beskrivelse af øllene
function moreInfo(x) {
    if (x.classList.contains("active") != true) {
        x.classList.add("active");
        beerDesc.style.display = "block";
    } else {
        x.classList.remove("active");
        beerDesc.style.display = "none";
    }
}

// Når modalvinduet er åbent, kan man klikke på overlay'et, for at komme til closeButton()
document.querySelector("#modal_window").addEventListener("click", closeButton);
document.querySelector("#close_button").addEventListener("click", closeButton);

// Simpel funktion der lukker modalvinduet ved et klassisk X
function closeButton() {
    document.querySelector("#modal_window").style.display = "none";
    beerDesc.style.display = "none";
}

// --------- MODAL VINDUE SLUT -------- //
