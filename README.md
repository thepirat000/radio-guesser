# Radio Guesser

Simple static game (HTML + CSS + JavaScript with jQuery) to guess the country of random radio stations.

## Features

- No backend, no Node server, no React.
- Uses [Radio Browser API](https://api.radio-browser.info/) to fetch stations.
- Only uses stations with `lastcheckok = 1`.
- Plays random stations and asks user to guess country.
- Supports **English** and **Spanish (LatAm)**.
- Theme selector with **System / Light / Dark**.
- Country names are resolved with `Intl.DisplayNames` based on selected language.
- Loads `country-info.json` at startup and calculates approximate country-to-country distance (km).
- Distance-based points:
- Difficulty level selector:
  - **Beginner**: choose one correct country from 4 options.
  - **Intermediate**: choose one correct country from 6 options, station name hidden.
  - **Advanced**: type blind country guess with autocomplete.
- Optional per-round timer via dropdown (`No limit`, `1m`, `2m`, `5m`) that starts when stream playback begins.
- If stream does not start within 10 seconds: the round is automatically skipped.
- Per-round feedback and final game summary.
- Game history saved in `localStorage`.
- Game settings saved in `localStorage` (language, level, round count, timer).

## Run

Demo: https://thepirat000.github.io/radio-guesser/

If your browser blocks autoplay, click play in the audio control.
