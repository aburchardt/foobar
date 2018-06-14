# Forklaring på visualisering
### Løsning lavet af Code Bros - Alexander Ellegaard Landberg, Søren Hermansen og Alexander Burchardt

## Start
Når siden bliver loadet, starter funktionerne af sig selv, og looper når det er nødvendigt, ifht. hvilken timeout der er sat på dem.
Det er derfor ikke nødvendigt, at skulle køre nogen funktioner, eller klikke på noget, for at sætte visualiseringen i gang, det hele kører helt af sig selv.

## Skilt
Tre sekunder efter siden er loadet, falder der et skilt ned, med bar navnet, samt hvem den er lavet af.
HINT: Der er et lille easter egg oppe ved skiltet, prøv at finde det.

## Ur
I det øvre højre hjørne, er der en timer, der tæller ned, hvor lang tid i timer, minutter og sekunder, der er til baren lukker.
Da der lige går et sekund eller to, før nedtællingen loades, har vi valgt at skrive i HTML'en "CLOSING IN xx:xx:xx", for at det ikke blot er tomt, når man kommer ind på siden, men at man tværtimod er klar over, at der kommer noget information.

## Taps
Vores taps viser hvilke 7 øl der er på tap, i form af etikette, samt mængden af øl, ifht. deres level. Hver gang der bliver serveret en øl, ryger dens level ned, og dette vises i form af, at "øllen" langsomt bliver drænet, og bliver mindre.
Desuden har de forskellige øl fået en farve der passer til hver deres øl-kategori, for bedre at visualisere hvilken slags øl det er.

## TV
Der bliver automatisk vist på TV-skærmen til højre, hvor mange kunder der er i kø, hvilke kunder der bliver betjent, samt deres ordre.
Kunderne har bevidst ikke fået tilfældige navne, så man kan se hvor mange kunder der har været igennem, i og med deres "navn" fx er "Customer 29", hvis der har været 29 kunder igennem.
TV'et skifter mellem to skærme, hvert 7. sekund. På den anden skærm, kan man se et podie, med de tre mest solgte øl, som tager udgangspunkt i de enkelte taps level.
Når en tap dog er tømt, og bliver udskiftet, vil den dog automatisk miste sin plads på podiet, da dens level nu er 100% igen.

## Bartendere
Bartenderne har en opacity på 0.4, når de står til højre foran TV'et, og ikke arbejder. Dette er for at indikere at de ikke arbejder, samt for at man nemmere kan se informationen på TV-skærmen.

## Udskiftning
Når en keg skal udskiftes, ændres bartendernes background-image, til at de har en keg i hånden, fremfor et øl-krus, for at indikere at de udskifter en keg.
Samtidig når en tap er tom/har en level på 0, vises strålen fra tappen ikke længere.

## Storage
Under selve scenen, har vi en visualisering af hvor mange kegs der er i storage.
Her står de forskellige øl i alfabetisk rækkefølge, og er stylet som en øl-etikette. Først med label, som man kan klikke på (vender tilbage), tekst der beskriver hvilken øl det er, samt hvor mange kegs der er tilbage på storage, og til sidst en visualisering af hvor mange kegs der er på lager, vist med billeder af én keg, for hver keg der er tilbage af de respektive øl.
Dette opdateres hele tiden, så når der er udskiftet en keg, opdateres informationen nede i beer storage.

## Modal vindue
Som nævnt kan man klikke på labels af de forskellige øl, både oppe på deres tap, men også nede i beer storage, i tilfælde af den ønskede øl ikke er på tap på det givende tidspunkt.
Dette åbner et modal vindue, der viser øllens label, navn, alkohol procent, og hvilken kategori det er.
Derudover kan man klikke på "Description", som åbner et nyt tekst-element, der beskriver de resterende informationer omkring øllen. "Description" kan klikkes på igen, for at lukke informationen.
For at komme ud af vinduet, kan man enten klikke på krydset oppe i højre hjørne, eller klikke udenfor modal vinduet, på det mørke overlay over baggrunden.
Når du lukker vinduet, vil "Description", desuden altid lukke sig igen, så den ikke er åben næste gang du åbner et modal vindue, i tilfælde af du ikke lukkede "Description", før du lukkede modal vinduet.

## Data der bliver visualiseret:
### Bar
```
bar.name
bar.closingTime
```

### Bartenders
```
bartenders.name
bartenders.status
bartenders.statusDetail
bartenders.usingTap
```

### Beertypes
```
beertypes.alc
beertypes.category
beertypes.description.appearance
beertypes.description.aroma
beertypes.description.flavor
beertypes.description.mouthfeel
beertypes.description.overallImpression
beertypes.label
beertypes.name
```

### Queue
```
queue.length
```

### Serving
```
serving.id
serving.order
```

### Storage
```
storage.name
storage.amount
```

### Taps
```
taps.level
taps.capacity
taps.beer
```

### Timestamp
```
timestamp
```
