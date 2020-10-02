# Dessau-Map von Zeig was du machst!

## Über das Projekt
Die **Dessau-Map** soll eine interaktive Karte werden, bei der die Nutzer sich über Events und Locations 
in der Stadt informieren können. Ziel ist es, automatisiert öffentliche Veranstaltungen auszulesen
und diese an einem gemeinsamen Ort darzustellen.

**Dessau-Map** ist eine Idee von **Zeig was du machst!** und wird im Rahmen mehrerer Workshops mit
den Teilnehmern zusammen entwickelt und umgesetzt.

## Mitmachen
Wir freuen uns über jede Unterstützung! Wenn du eine Idee für das Projekt hast, kontaktiere uns
gerne über Social Media, unsere Website oder erstelle einfach direkt einen Pull Request mit deinen
Änderungen.

## Lokale Entwicklung
Dieses Projekt basiert auf Node.js und wird hauptsächlich in JavaScript entwickelt. Eine existierende
Installation von NPM und Node.js wird vorausgesetzt.

Unsere Karte nutzt [Mapbox](https://www.mapbox.com/). Für die lokale Entwicklung benötigst du einen
API-Schlüssel, welchen du nach erfolgreicher Registrierung bei Mapbox erstellen kannst.

Um die Seite lokal auf deinem Rechner laufen zu lassen, führe einfach die folgenden Schritte aus:
1. Führe ```npm install``` aus. Damit werden alle nötigen Bibliotheken heruntergeladen
2. Lege eine Datei namens ```.env```. In diese fügst du nun eine Zeile mit ```MAPBOX_API_KEY=XYZ```
ein. ```XYZ``` muss dabei durch den von dir erstellen Mapbox API-Schlüssel ersetzt werden.
3. Führe ```npm run dev``` aus. Dieser Befehl startet zwei Hintergrundprozesse, welche die Dateien
in das von uns benötigte Format umwandeln und gleichzeitig immer wieder aktualisieren, sobald du
Änderungen daran vornimmst.
4. Die Seite kann nun von dir mit dem Browser aufgerufen werden. Normalerweise läuft diese unter der
Adresse ```http://localhost:3000/```. Die genutzte Adresse
findest du ebenfalls in der Konsolenausgabe.
