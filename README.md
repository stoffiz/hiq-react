# Formulärsbyggare

## Om projektet

Detta projekt är en påbörjad formulärsbyggare för att kunna bygga ett dynamiskt formulär. Målsättningen är att kunna rendera detta formulär så att en användare sen kan använda det till att skicka in data.

I dagsläget består formulärsbyggaren av följande fält

- Bild (Enbart uppvisning av bild, en användare ska inte kunna lägga in egna värden)
- Text (Enbart uppvisning av text, en användare ska inte kunna lägga in egna värden)
- Radioknappar (För input från användare)
- Checkboxar (För input från användare)

När man trycker på knappen "Spara formulär" visas formuläret som en array i en `console.log()`.

## Uppgift:

- Läs igenom koden och se om du hittar några saker du tycker är bra eller saker som hade kunnat förbättras. Notera och ha med till nästkommande möte.
- Skapa en ny fälttyp till formulärsbyggaren för ett input-fält av typen text. För att sedan kunna rendera detta fält i ett formulär behövs en label och en placeholder. Denna data behöver vara en del av arrayen som skrivs ut i konsollen när man tycker på "Spara formulär".
- Rendera formuläret från formulärsbyggaren. Om du till exempel lagt till en bild och radioknappar ska dessa fält renderas ut så att en användare kan se och fylla i egna värden.
- Bygg funktionalitet för att skicka in det dynamiskt renderade formuläret med värdena en användare skrivit in. Det räcker med en `console.log(formValues)`.
