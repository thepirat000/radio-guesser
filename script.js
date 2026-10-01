const RADIO_API_BASE = "https://de1.api.radio-browser.info/json";
const HISTORY_STORAGE_KEY = "guessStationHistory";
const SETTINGS_STORAGE_KEY = "guessStationSettings";
const MAX_HISTORY_ITEMS = 20;
const STREAM_START_TIMEOUT_SECONDS = 10;
const COUNTRY_INFO_PATH = "country-info.json";
const SCORE_RULES = {
  exactMatchPoints: 10,
  distanceBands: [
    { maxKm: 1000, labelKey: "distanceNearby", basePoints: 4, sameRegionBonusPoints: 1 },
    { maxKm: 3000, labelKey: "distanceRelativelyClose", basePoints: 2, sameRegionBonusPoints: 1 },
    { maxKm: 7000, labelKey: "distanceFar", basePoints: 0, sameRegionBonusPoints: 0 },
    { maxKm: Number.POSITIVE_INFINITY, labelKey: "distanceVeryFar", basePoints: 0, sameRegionBonusPoints: 0 },
  ],
};

const translations = {
  en: {
    appTitle: "Radio Guesser",
    appSubtitle: "Listen to a random radio station and guess the country.",
    language: "Language",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    setupTitle: "Game Setup",
    stationsToGuess: "Stations to guess",
    maxSecondsPerStation: "Time limit per station",
    levelLabel: "Level",
    levelBeginner: "Beginner - 4 options, pick from list",
    levelIntermediate: "Intermediate - 6 options, hidden station",
    levelAdvanced: "Advanced - Blind guess",
    timerOptionNone: "No time limit",
    timerOption30s: "30 seconds",
    timerOption1m: "1 minute",
    timerOption2m: "2 minutes",
    timerOption5m: "5 minutes",
    toggleSetupShow: "Show Options",
    toggleSetupHide: "Hide Options",
    beginnerGuessLabel: "Pick the correct country",
    setupSummary: "{level} - {timer}",
    noLimitPlaceholder: "No limit",
    startGame: "Start Game",
    roundTitle: "Round",
    roundProgressRemaining: "{count} remaining",
    currentPoints: "Points: {points} / {max}",
    typeCountryGuess: "Type your country guess",
    countryPlaceholder: "Start typing a country...",
    submitGuess: "Submit Guess",
    nextStation: "Next Station",
    seeFinalResult: "See Final Result",
    summaryTitle: "Game Results",
    playAgain: "Play Again",
    historyTitle: "Previous Games",
    resetHistory: "Reset",
    colRound: "#",
    colStation: "Station",
    colGuess: "Your Guess",
    colCorrect: "Correct Country",
    colStatus: "Status",
    loadingStations: "Loading stations...",
    loadStationsError: "Failed to load stations",
    noStationsAvailable: "No valid stations available at the moment.",
    listenAndGuess: "Listen and guess the country.",
    stationNameLabel: "Station",
    debugAnswerLabel: "Debug answer",
    waitingForStream: "Waiting for stream...",
    autoplayBlocked: "Press play if autoplay is blocked. Timer starts once the stream is playing.",
    streamTimeout:
      "This station did not start within 10 seconds. It was automatically skipped.",
    timerLeft: "Time left: {time}",
    invalidGuess: "Please select a country from the suggestions.",
    rightTitle: "RIGHT!",
    wrongTitle: "WRONG!",
    closeTitle: "CLOSE!",
    timeUpTitle: "TIME UP!",
    skippedTitle: "SKIPPED",
    rightMessage: "Great guess!",
    wrongMessage: "Nice try!",
    timeUpMessage: "No guess in time.",
    skippedMessage: "Station skipped due to stream issue.",
    yourGuessLabel: "Your guess",
    correctCountryLabel: "Correct country",
    scoreLine: "Correct: {correct}/{total} | Guesses made: {guesses}/{total} | Skipped: {skipped}",
    scoreLineWithPoints: "Correct: {correct}/{total} | Points: {points} / {max}",
    noGamesYet: "No games played yet.",
    gameLabel: "Game",
    dateLabel: "Date",
    scoreLabel: "Score",
    guessesLabel: "Guesses",
    timerLabel: "Timer",
    timerNone: "No timer",
    timerPerRound: "{seconds}s per round",
    roundDetails: "Round Details",
    statusRight: "RIGHT",
    statusClose: "CLOSE",
    statusWrong: "WRONG",
    statusTimeUp: "TIME UP",
    statusSkipped: "SKIPPED",
    unknownCountry: "Unknown",
    pointsLabel: "Points",
    distanceLabel: "Distance",
    distanceUnknown: "unknown",
    distanceNearby: "nearby",
    distanceRelativelyClose: "relatively close",
    distanceFar: "far",
    distanceVeryFar: "very far",
    distanceExact: "exact country",
    historyCompactLine: "{date} | {score}: {correct}/{total} | {pointsLabel}: {points} | {timerLabel}: {timer}",
  },
  es: {
    appTitle: "Radio Guesser",
    appSubtitle: "Escucha una radio aleatoria y adivina el país.",
    language: "Idioma",
    theme: "Tema",
    themeSystem: "Sistema",
    themeLight: "Claro",
    themeDark: "Oscuro",
    setupTitle: "Configuración del juego",
    stationsToGuess: "Emisoras a adivinar",
    maxSecondsPerStation: "Límite de tiempo por emisora",
    levelLabel: "Nivel",
    levelBeginner: "Principiante - 4 opciones para elegir",
    levelIntermediate: "Intermedio - 6 opciones, emisora oculta",
    levelAdvanced: "Avanzado - A ciegas",
    timerOptionNone: "Sin límite",
    timerOption30s: "30 segundos",
    timerOption1m: "1 minuto",
    timerOption2m: "2 minutos",
    timerOption5m: "5 minutos",
    toggleSetupShow: "Mostrar opciones",
    toggleSetupHide: "Ocultar opciones",
    beginnerGuessLabel: "Elige el país correcto",
    setupSummary: "{level} - {timer}",
    noLimitPlaceholder: "Sin límite",
    startGame: "Iniciar juego",
    roundTitle: "Ronda",
    roundProgressRemaining: "{count} restantes",
    currentPoints: "Puntos: {points} / {max}",
    typeCountryGuess: "Escribe tu país",
    countryPlaceholder: "Empieza a escribir un país...",
    submitGuess: "Enviar respuesta",
    nextStation: "Siguiente emisora",
    seeFinalResult: "Ver resultado final",
    summaryTitle: "Resultados",
    playAgain: "Jugar de nuevo",
    historyTitle: "Partidas anteriores",
    resetHistory: "Borrar",
    colRound: "#",
    colStation: "Emisora",
    colGuess: "Tu respuesta",
    colCorrect: "País correcto",
    colStatus: "Estado",
    loadingStations: "Cargando emisoras...",
    loadStationsError: "No se pudieron cargar las emisoras",
    noStationsAvailable: "No hay emisoras válidas disponibles por ahora.",
    listenAndGuess: "Escucha y adivina el país.",
    stationNameLabel: "Emisora",
    debugAnswerLabel: "Respuesta debug",
    waitingForStream: "Esperando audio...",
    autoplayBlocked: "Presiona play si el autoplay está bloqueado. El timer inicia cuando comience el audio.",
    streamTimeout:
      "Esta emisora no inició en 10 segundos. Fue saltada automáticamente.",
    timerLeft: "Tiempo restante: {time}",
    invalidGuess: "Selecciona un país desde las sugerencias.",
    rightTitle: "¡CORRECTO!",
    wrongTitle: "INCORRECTO",
    closeTitle: "CERCA",
    timeUpTitle: "SE ACABÓ EL TIEMPO",
    skippedTitle: "SALTADA",
    rightMessage: "¡Muy bien!",
    wrongMessage: "Buen intento.",
    timeUpMessage: "No hubo respuesta a tiempo.",
    skippedMessage: "Emisora saltada por problema de audio.",
    yourGuessLabel: "Tu respuesta",
    correctCountryLabel: "País correcto",
    scoreLine: "Correctas: {correct}/{total} | Respuestas: {guesses}/{total} | Saltadas: {skipped}",
    scoreLineWithPoints: "Correctas: {correct}/{total} | Puntos: {points} / {max}",
    noGamesYet: "Aún no hay partidas.",
    gameLabel: "Partida",
    dateLabel: "Fecha",
    scoreLabel: "Puntaje",
    guessesLabel: "Respuestas",
    timerLabel: "Timer",
    timerNone: "Sin timer",
    timerPerRound: "{seconds}s por ronda",
    roundDetails: "Detalle por ronda",
    statusRight: "CORRECTO",
    statusClose: "CERCA",
    statusWrong: "INCORRECTO",
    statusTimeUp: "TIEMPO",
    statusSkipped: "SALTADA",
    unknownCountry: "Desconocido",
    pointsLabel: "Puntos",
    distanceLabel: "Distancia",
    distanceUnknown: "desconocida",
    distanceNearby: "cerca",
    distanceRelativelyClose: "relativamente cerca",
    distanceFar: "lejos",
    distanceVeryFar: "muy lejos",
    distanceExact: "país exacto",
    historyCompactLine: "{date} | {score}: {correct}/{total} | {pointsLabel}: {points} | {timerLabel}: {timer}",
  },
};

const gameState = {
  allStations: [],
  countryCodes: [],
  countryOptions: [],
  selectedStations: [],
  results: [],
  currentRoundIndex: 0,
  roundTimerSeconds: null,
  timerIntervalId: null,
  streamWaitTimeoutId: null,
  streamStarted: false,
  roundLocked: false,
  selectedGuessCountryCode: null,
  currentLanguage: "en",
  selectedLevel: "beginner",
  setupExpanded: false,
  debugMode: false,
  themePreference: "system",
  countryInfoByCode: new Map(),
  beginnerChoices: [],
  currentSuggestions: [],
  selectedSuggestionIndex: 0,
};

const displayNamesCache = {};
let systemThemeMediaQuery = null;
let countryInfoLoadPromise = null;

$(function () {
  initializeSettings();
  registerSystemThemeListener();
  bindEvents();
  loadCountryInfoData();
  applyLanguage();
  renderHistory();
});

function initializeSettings() {
  const browserLang = String(navigator.language || "en").toLowerCase();
  const queryParams = new URLSearchParams(window.location.search);
  const defaults = {
    language: browserLang.startsWith("es") ? "es" : "en",
    level: "intermediate",
    theme: "system",
    roundCount: 5,
    roundTimer: 60,
  };
  const settings = readSettings(defaults);
  gameState.debugMode = queryParams.get("d") === "1";

  gameState.currentLanguage = settings.language;
  gameState.selectedLevel = settings.level;
  gameState.themePreference = settings.theme;
  $("#language-select").val(settings.language);
  $("#level-select").val(settings.level);
  $("#theme-select").val(settings.theme);
  $("#round-count").val(settings.roundCount);
  $("#round-timer-select").val(String(settings.roundTimer));
  applyTheme();
  applySetupVisibility();
  updateSetupSummary();
  updateGuessModeUI();
}

function bindEvents() {
  $("#start-game-btn").on("click", startGame);
  $("#submit-guess-btn").on("click", () => submitGuess("manual"));
  $("#next-round-btn").on("click", goToNextRound);
  $("#play-again-btn").on("click", resetToSetup);
  $("#reset-history-btn").on("click", resetHistory);
  $("#toggle-setup-btn").on("click", toggleSetupOptions);
  $("#language-select").on("change", onLanguageChanged);
  $("#level-select").on("change", onLevelChanged);
  $("#theme-select").on("change", onThemeChanged);
  $("#round-count, #round-timer-select").on("change", () => {
    persistCurrentSettings();
    updateSetupSummary();
  });

  $("#country-guess-input").on("input", function () {
    gameState.selectedGuessCountryCode = null;
    renderSuggestions($(this).val());
  });

  $("#country-guess-input").on("keydown", onAdvancedInputKeydown);

  $("#country-guess-input").on("focus", function () {
    renderSuggestions($(this).val());
  });

  $(document).on("click", (event) => {
    if (!$(event.target).closest(".guess-area").length) {
      hideSuggestions();
    }
  });
}

function onLanguageChanged() {
  gameState.currentLanguage = $("#language-select").val() === "es" ? "es" : "en";
  applyLanguage();
  rebuildCountryOptions();
  renderHistory();
  persistCurrentSettings();
  updateSetupSummary();

  if (!$("#game-panel").hasClass("hidden")) {
    updateRoundHeader();
    renderCurrentStationTitle();
    renderDebugAnswer(gameState.selectedStations[gameState.currentRoundIndex]);
    if ($("#country-guess-input").val()) {
      renderSuggestions($("#country-guess-input").val());
    }
  }

  if (!$("#summary-panel").hasClass("hidden")) {
    renderResultsTable();
    renderSummaryScore();
  }

  if (!$("#feedback-panel").hasClass("hidden") && gameState.results.length) {
    showFeedback(gameState.results[gameState.results.length - 1]);
  }
}

function onLevelChanged() {
  const selectedLevel = $("#level-select").val();
  gameState.selectedLevel = ["beginner", "intermediate", "advanced"].includes(selectedLevel)
    ? selectedLevel
    : "beginner";
  persistCurrentSettings();
  updateSetupSummary();
  updateGuessModeUI();
  if (!$("#game-panel").hasClass("hidden")) {
    renderCurrentStationTitle();
    prepareBeginnerChoices(gameState.selectedStations[gameState.currentRoundIndex]);
  }
}

function onThemeChanged() {
  gameState.themePreference = $("#theme-select").val();
  applyTheme();
  persistCurrentSettings();
}

function toggleSetupOptions() {
  gameState.setupExpanded = !gameState.setupExpanded;
  applySetupVisibility();
}

function applySetupVisibility() {
  $("#setup-options").toggleClass("hidden", !gameState.setupExpanded);
  $("#toggle-setup-btn").text(gameState.setupExpanded ? t("toggleSetupHide") : t("toggleSetupShow"));
}

function applyTheme() {
  let resolvedTheme = gameState.themePreference;
  if (resolvedTheme === "system") {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    resolvedTheme = prefersDark ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", resolvedTheme);
}

function registerSystemThemeListener() {
  if (!window.matchMedia) {
    return;
  }
  systemThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (typeof systemThemeMediaQuery.addEventListener === "function") {
    systemThemeMediaQuery.addEventListener("change", () => {
      if (gameState.themePreference === "system") {
        applyTheme();
      }
    });
  } else if (typeof systemThemeMediaQuery.addListener === "function") {
    systemThemeMediaQuery.addListener(() => {
      if (gameState.themePreference === "system") {
        applyTheme();
      }
    });
  }
}

function applyLanguage() {
  const languageTag = gameState.currentLanguage === "es" ? "es-419" : "en";
  document.documentElement.lang = languageTag;
  document.title = t("appTitle");

  $("#app-title").text(t("appTitle"));
  $("#app-subtitle").text(t("appSubtitle"));
  $("#language-label").text(t("language"));
  $("#theme-label").text(t("theme"));
  $("#theme-select option[value='system']").text(t("themeSystem"));
  $("#theme-select option[value='light']").text(t("themeLight"));
  $("#theme-select option[value='dark']").text(t("themeDark"));
  $("#setup-title").text(t("setupTitle"));
  $("#toggle-setup-btn").text(gameState.setupExpanded ? t("toggleSetupHide") : t("toggleSetupShow"));
  $("#round-count-label").text(t("stationsToGuess"));
  $("#round-timer-label").text(t("maxSecondsPerStation"));
  $("#round-timer-select option[value='0']").text(t("timerOptionNone"));
  $("#round-timer-select option[value='30']").text(t("timerOption30s"));
  $("#round-timer-select option[value='60']").text(t("timerOption1m"));
  $("#round-timer-select option[value='120']").text(t("timerOption2m"));
  $("#round-timer-select option[value='300']").text(t("timerOption5m"));
  $("#level-label").text(t("levelLabel"));
  $("#level-select option[value='beginner']").text(t("levelBeginner"));
  $("#level-select option[value='intermediate']").text(t("levelIntermediate"));
  $("#level-select option[value='advanced']").text(t("levelAdvanced"));
  $("#beginner-guess-label").text(t("beginnerGuessLabel"));
  $("#start-game-btn").text(t("startGame"));
  $("#round-title").contents().first()[0].textContent = `${t("roundTitle")} `;
  $("#country-guess-label").text(t("typeCountryGuess"));
  $("#country-guess-input").attr("placeholder", t("countryPlaceholder"));
  $("#submit-guess-btn").text(t("submitGuess"));
  $("#summary-title").text(t("summaryTitle"));
  $("#play-again-btn").text(t("playAgain"));
  $("#history-title").text(t("historyTitle"));
  $("#col-round").text(t("colRound"));
  $("#col-station").text(t("colStation"));
  $("#col-guess").text(t("colGuess"));
  $("#col-correct").text(t("colCorrect"));
  $("#col-status").text(t("colStatus"));
  $("#reset-history-btn").text(t("resetHistory"));
  renderDebugAnswer(gameState.selectedStations[gameState.currentRoundIndex]);
  renderCurrentPoints();
  updateSetupSummary();
}

async function startGame() {
  const requestedRounds = Number.parseInt($("#round-count").val(), 10) || 10;
  const timerValue = Number.parseInt($("#round-timer-select").val(), 10);
  const roundCount = clamp(requestedRounds, 1, 50);
  const roundTimerSeconds = Number.isFinite(timerValue) && timerValue > 0 ? timerValue : null;
  const selectedLevelRaw = $("#level-select").val();
  const selectedLevel = ["beginner", "intermediate", "advanced"].includes(selectedLevelRaw)
    ? selectedLevelRaw
    : "beginner";
  persistCurrentSettings();

  setSetupStatus(t("loadingStations"));
  setSetupLoading(true);
  $("#start-game-btn").prop("disabled", true);

  try {
    await loadCountryInfoData();
    await loadStations();
  } catch (error) {
    setSetupStatus(`${t("loadStationsError")}: ${error.message}`);
    setSetupLoading(false);
    $("#start-game-btn").prop("disabled", false);
    return;
  }

  if (!gameState.allStations.length) {
    setSetupStatus(t("noStationsAvailable"));
    setSetupLoading(false);
    $("#start-game-btn").prop("disabled", false);
    return;
  }

  const finalRoundCount = Math.min(roundCount, gameState.allStations.length);
  gameState.selectedStations = pickRandomItems(gameState.allStations, finalRoundCount);
  gameState.results = [];
  gameState.currentRoundIndex = 0;
  gameState.roundTimerSeconds = roundTimerSeconds;
  gameState.roundLocked = false;
  gameState.selectedGuessCountryCode = null;
  gameState.selectedLevel = selectedLevel;

  setSetupStatus("");
  setSetupLoading(false);
  $("#start-game-btn").prop("disabled", false);
  $("#round-count").val(finalRoundCount);
  renderCurrentPoints();
  showPanel("game");
  startRound();
}

async function loadStations() {
  const endpoint = `${RADIO_API_BASE}/stations/search?hidebroken=true&order=random&limit=10000`;
  const response = await $.getJSON(endpoint);

  const validStations = dedupeStations(
    response.map(normalizeStation).filter((station) => station && station.lastcheckok === 1),
  );

  gameState.allStations = validStations;
  gameState.countryCodes = uniqueCountryCodes(validStations);
  rebuildCountryOptions();
}

function normalizeStation(station) {
  const streamUrl = station.url_resolved || station.url;
  const countryCode = String(station.countrycode || "")
    .trim()
    .toUpperCase();

  if (!streamUrl || !/^[A-Z]{2}$/.test(countryCode)) {
    return null;
  }

  return {
    stationuuid: station.stationuuid,
    name: station.name || "Unknown station",
    streamUrl,
    countryCode,
    lastcheckok: Number(station.lastcheckok),
  };
}

function uniqueCountryCodes(stations) {
  return Array.from(new Set(stations.map((station) => station.countryCode)));
}

function rebuildCountryOptions() {
  gameState.countryOptions = gameState.countryCodes
    .map((countryCode) => ({
      code: countryCode,
      name: getCountryName(countryCode),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, gameState.currentLanguage));
}

function startRound() {
  clearRoundTimer();
  clearStreamWaitTimeout();
  clearGuessInput();

  const station = gameState.selectedStations[gameState.currentRoundIndex];
  gameState.streamStarted = false;
  gameState.roundLocked = false;
  updateRoundHeader();
  renderCurrentStationTitle();
  renderDebugAnswer(station);
  updateGuessModeUI();
  prepareBeginnerChoices(station);
  setBeginnerOptionsEnabled(false);
  renderCurrentPoints();
  setStreamLoading(true);
  $("#stream-status").text(t("waitingForStream"));
  $("#submit-guess-btn").prop("disabled", true);
  $("#timer-display").addClass("hidden").text("");

  startStationPlayback(station);

  if (gameState.selectedLevel === "advanced") {
    window.setTimeout(() => {
      $("#country-guess-input").trigger("focus").select();
    }, 50);
  }
}

function startStationPlayback(station) {
  const player = $("#radio-player")[0];
  const playerWrapper = $("#radio-player");
  playerWrapper.off(".round");

  playerWrapper.on("playing.round", () => {
    if (gameState.roundLocked || gameState.streamStarted) {
      return;
    }
    gameState.streamStarted = true;
    clearStreamWaitTimeout();
    setStreamLoading(false);
    $("#stream-status").text("");
    $("#submit-guess-btn").prop("disabled", false);
    setBeginnerOptionsEnabled(true);

    if (gameState.roundTimerSeconds) {
      startRoundTimer();
    }
  });

  playerWrapper.on("error.round", () => {
    if (gameState.roundLocked || gameState.streamStarted) {
      return;
    }
    $("#stream-status").text(t("streamTimeout"));
    setStreamLoading(false);
    submitGuess("skipped");
  });

  player.pause();
  player.src = station.streamUrl;
  player.load();

  clearStreamWaitTimeout();
  gameState.streamWaitTimeoutId = window.setTimeout(() => {
    if (gameState.roundLocked || gameState.streamStarted) {
      return;
    }
    $("#stream-status").text(t("streamTimeout"));
    setStreamLoading(false);
    submitGuess("skipped");
  }, STREAM_START_TIMEOUT_SECONDS * 1000);

  player.play().catch(() => {
    $("#stream-status").text(t("autoplayBlocked"));
  });
}

function startRoundTimer() {
  let secondsLeft = gameState.roundTimerSeconds;
  $("#timer-display").removeClass("hidden").text(formatText("timerLeft", { time: formatSeconds(secondsLeft) }));

  gameState.timerIntervalId = window.setInterval(() => {
    secondsLeft -= 1;
    $("#timer-display").text(formatText("timerLeft", { time: formatSeconds(secondsLeft) }));

    if (secondsLeft <= 0) {
      clearRoundTimer();
      submitGuess("timeout");
    }
  }, 1000);
}

function submitGuess(mode) {
  if (gameState.roundLocked) {
    return;
  }

  const station = gameState.selectedStations[gameState.currentRoundIndex];
  const inputValue = String($("#country-guess-input").val() || "").trim();
  const matchedCountry =
    gameState.selectedGuessCountryCode ||
    findCountryCodeByName(inputValue) ||
    null;

  if (mode === "manual" && !matchedCountry) {
    window.alert(t("invalidGuess"));
    return;
  }

  gameState.roundLocked = true;
  clearRoundTimer();
  clearStreamWaitTimeout();
  setStreamLoading(false);
  hideSuggestions();
  $("#submit-guess-btn").prop("disabled", true);
  const player = $("#radio-player")[0];

  player.pause();
  player.removeAttribute("src");
  player.load();

  const isCorrect = Boolean(matchedCountry && matchedCountry === station.countryCode);
  const status = resolveRoundStatus(mode, isCorrect);
  const distanceInfo = getDistanceAndPoints(matchedCountry, station.countryCode, gameState.selectedLevel, isCorrect);

  if (status === "skipped") {
    handleSkippedRound();
    return;
  }

  const roundResult = {
    roundNumber: gameState.currentRoundIndex + 1,
    stationName: station.name,
    guessCountryCode: matchedCountry,
    correctCountryCode: station.countryCode,
    status,
    isCorrect,
    level: gameState.selectedLevel,
    distanceKm: distanceInfo.distanceKm,
    distanceBandKey: distanceInfo.bandKey,
    points: distanceInfo.points,
    sameRegion: distanceInfo.sameRegion,
    regionBonusPoints: distanceInfo.regionBonusPoints,
  };

  gameState.results.push(roundResult);
  renderCurrentPoints();
  showFeedback(roundResult);
  playFeedbackSound(roundResult.status);
}

function resolveRoundStatus(mode, isCorrect) {
  if (mode === "skipped") {
    return "skipped";
  }
  if (mode === "timeout") {
    return "timeout";
  }
  return isCorrect ? "right" : "wrong";
}

function getDisplayStatus(result) {
  if (result.status === "right") {
    return "right";
  }
  if (result.level === "beginner") {
    return "wrong";
  }
  if (Number(result.points || 0) > 0) {
    return "close";
  }
  return "wrong";
}

function showFeedback(result) {
  const guessCountryName = result.guessCountryCode ? getCountryName(result.guessCountryCode) : "-";
  const correctCountryName = getCountryName(result.correctCountryCode);
  const distanceText = formatDistanceText(result.distanceKm, result.distanceBandKey);
  const pointsText = `${t("pointsLabel")}: +${result.points}`;

  let title = "";
  let message = "";
  const displayStatus = getDisplayStatus(result);
  if (displayStatus === "right") {
    title = t("rightTitle");
    message = t("rightMessage");
  } else if (displayStatus === "close") {
    title = t("closeTitle");
    message = t("wrongMessage");
  } else if (result.status === "wrong") {
    title = t("wrongTitle");
    message = t("wrongMessage");
  } else if (result.status === "timeout") {
    title = t("timeUpTitle");
    message = t("timeUpMessage");
  } else {
    title = t("skippedTitle");
    message = t("skippedMessage");
  }

  const isGuessed = Boolean(result.guessCountryCode);
  const feedbackPanel = $("#feedback-panel");
  feedbackPanel.removeClass("feedback-unguessed feedback-guessed feedback-close");
  if (displayStatus === "right") {
    feedbackPanel.addClass("feedback-guessed");
  } else if (displayStatus === "close") {
    feedbackPanel.addClass("feedback-close");
  } else {
    feedbackPanel.addClass("feedback-unguessed");
  }

  const guessCardClass = isGuessed ? "feedback-country-card" : "feedback-country-card feedback-country-card-danger";
  const correctCardClass =
    result.status === "right" ? "feedback-country-card feedback-country-card-success" : "feedback-country-card";
  const countriesHtml =
    displayStatus === "right"
      ? `
        <div class="feedback-country-grid">
          <div class="${correctCardClass}">
            <p class="feedback-country-label">${escapeHtml(t("correctCountryLabel"))}</p>
            <div class="feedback-country-value">${formatCountryWithFlag(result.correctCountryCode, correctCountryName, t("unknownCountry"))}</div>
          </div>
        </div>
      `
      : `
        <div class="feedback-country-grid">
          <div class="${correctCardClass}">
            <p class="feedback-country-label">${escapeHtml(t("correctCountryLabel"))}</p>
            <div class="feedback-country-value">${formatCountryWithFlag(result.correctCountryCode, correctCountryName, t("unknownCountry"))}</div>
          </div>
          <div class="${guessCardClass}">
            <p class="feedback-country-label">${escapeHtml(t("yourGuessLabel"))}</p>
            <div class="feedback-country-value">${formatCountryWithFlag(result.guessCountryCode, guessCountryName, "-")}</div>
          </div>
        </div>
      `;

  $("#feedback-round-display").text(`${t("roundTitle")} ${result.roundNumber} / ${gameState.selectedStations.length}`);
  $("#feedback-title").text(title);
  $("#feedback-station-name").text(`${t("stationNameLabel")}: ${result.stationName}`);
  $("#feedback-message").text(`${message} ${pointsText} | ${t("distanceLabel")}: ${distanceText}`);
  $("#feedback-country-detail").html(countriesHtml);
  $("#next-round-btn").text(
    gameState.currentRoundIndex >= gameState.selectedStations.length - 1 ? t("seeFinalResult") : t("nextStation"),
  );
  showPanel("feedback");
}

function handleSkippedRound() {
  const currentStation = gameState.selectedStations[gameState.currentRoundIndex];
  const replacementStation = pickReplacementStation(currentStation);

  if (!replacementStation) {
    goToNextRound();
    return;
  }

  $("#stream-status").text(t("streamTimeout"));
  gameState.selectedStations[gameState.currentRoundIndex] = replacementStation;
  window.setTimeout(() => {
    if (gameState.roundLocked) {
      showPanel("game");
      startRound();
    }
  }, 1200);
}

function goToNextRound() {
  gameState.currentRoundIndex += 1;

  if (gameState.currentRoundIndex >= gameState.selectedStations.length) {
    finishGame();
    return;
  }

  showPanel("game");
  startRound();
}

function finishGame() {
  clearRoundTimer();
  clearStreamWaitTimeout();
  const totalRounds = gameState.results.length;
  const correctCount = gameState.results.filter((result) => result.status === "right").length;
  const guessesMade = gameState.results.filter((result) => Boolean(result.guessCountryCode)).length;
  const skippedCount = gameState.results.filter((result) => result.status === "skipped").length;
  const totalPoints = getAccumulatedPoints();
  const player = $("#radio-player")[0];

  player.pause();

  renderSummaryScore();
  renderResultsTable();
  saveGameHistory({
    playedAt: new Date().toISOString(),
    totalRounds,
    timerSeconds: gameState.roundTimerSeconds,
    correctCount,
    guessesMade,
    skippedCount,
    totalPoints,
    details: gameState.results,
  });
  renderHistory();
  showPanel("summary");
}

function renderSummaryScore() {
  const totalRounds = gameState.results.length;
  const correctCount = gameState.results.filter((result) => result.status === "right").length;
  const totalPoints = getAccumulatedPoints();
  const maxPossiblePoints = totalRounds * SCORE_RULES.exactMatchPoints;

  $("#summary-score").text(
    formatText("scoreLineWithPoints", {
      correct: correctCount,
      total: totalRounds,
      points: totalPoints,
      max: maxPossiblePoints,
    }),
  );
}

function renderCurrentPoints() {
  const totalStations = gameState.selectedStations.length || Number.parseInt($("#round-count").val(), 10) || 0;
  const maxPossiblePoints = totalStations * SCORE_RULES.exactMatchPoints;
  $("#points-display").text(
    formatText("currentPoints", {
      points: getAccumulatedPoints(),
      max: maxPossiblePoints,
    }),
  );
}

function getAccumulatedPoints() {
  return gameState.results.reduce((sum, result) => sum + Number(result.points || 0), 0);
}

function updateSetupSummary() {
  const timerValue = Number.parseInt($("#round-timer-select").val(), 10) || 0;
  const levelText = $("#level-select option:selected").text();
  const timerText = getTimerOptionLabel(timerValue);
  $("#setup-compact-summary").text(formatText("setupSummary", { level: levelText, timer: timerText }));
}

function getTimerOptionLabel(secondsValue) {
  if (!secondsValue) {
    return t("timerOptionNone");
  }
  if (secondsValue === 30) {
    return t("timerOption30s");
  }
  if (secondsValue === 60) {
    return t("timerOption1m");
  }
  if (secondsValue === 120) {
    return t("timerOption2m");
  }
  if (secondsValue === 300) {
    return t("timerOption5m");
  }
  return formatSeconds(secondsValue);
}

function formatSeconds(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const minutesPart = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secondsPart = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutesPart}:${secondsPart}`;
}

function updateGuessModeUI() {
  const isChoiceMode = gameState.selectedLevel === "beginner" || gameState.selectedLevel === "intermediate";
  $("#beginner-guess-container").toggleClass("hidden", !isChoiceMode);
  $("#advanced-guess-container").toggleClass("hidden", isChoiceMode);
}

function prepareBeginnerChoices(station) {
  const isChoiceMode = gameState.selectedLevel === "beginner" || gameState.selectedLevel === "intermediate";
  if (!station || !isChoiceMode) {
    $("#beginner-options").empty();
    return;
  }

  const correctCode = station.countryCode;
  const correctRegion = getCountryRegion(correctCode);
  let candidateCodes = gameState.countryOptions
    .map((country) => country.code)
    .filter((code) => code !== correctCode && getCountryRegion(code) && getCountryRegion(code) === correctRegion);

  if (candidateCodes.length < 3) {
    const fallbackCodes = gameState.countryOptions
      .map((country) => country.code)
      .filter((code) => code !== correctCode && !candidateCodes.includes(code));
    candidateCodes = candidateCodes.concat(fallbackCodes);
  }

  const optionCount = gameState.selectedLevel === "intermediate" ? 8 : 4;
  const shuffled = pickRandomItems(candidateCodes, Math.min(candidateCodes.length, 40));
  const distractors = shuffled.slice(0, Math.max(0, optionCount - 1));
  const finalCodes = pickRandomItems([correctCode, ...distractors], optionCount);
  gameState.beginnerChoices = finalCodes;
  renderBeginnerChoices(finalCodes);
}

function renderBeginnerChoices(codes) {
  const container = $("#beginner-options");
  container.empty();
  codes.forEach((code) => {
    const name = getCountryName(code);
    const button = $(`
      <button type="button" class="beginner-option-btn">
        ${formatCountryWithFlag(code, name, code)}
      </button>
    `);
    button.on("click", () => {
      gameState.selectedGuessCountryCode = code;
      submitGuess("manual");
    });
    button.prop("disabled", !gameState.streamStarted);
    container.append(button);
  });
}

function setBeginnerOptionsEnabled(enabled) {
  $("#beginner-options .beginner-option-btn").prop("disabled", !enabled);
}

function onAdvancedInputKeydown(event) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    if (!gameState.currentSuggestions.length) {
      return;
    }
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    gameState.selectedSuggestionIndex =
      (gameState.selectedSuggestionIndex + step + gameState.currentSuggestions.length) % gameState.currentSuggestions.length;
    highlightSuggestion();
    return;
  }

  if (event.key === "Enter") {
    if (gameState.currentSuggestions.length) {
      event.preventDefault();
      const selected = gameState.currentSuggestions[gameState.selectedSuggestionIndex] || gameState.currentSuggestions[0];
      if (selected) {
        gameState.selectedGuessCountryCode = selected.code;
        $("#country-guess-input").val(selected.name);
      }
      hideSuggestions();
      submitGuess("manual");
      return;
    }
    event.preventDefault();
    submitGuess("manual");
  }
}

function resetHistory() {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
  window.location.reload();
}

function renderResultsTable() {
  const tbody = $("#results-table tbody");
  tbody.empty();

  for (const result of gameState.results) {
    const statusInfo = getStatusInfo(getDisplayStatus(result));
    const guessCountryName = result.guessCountryCode ? getCountryName(result.guessCountryCode) : "-";
    const correctCountryName = getCountryName(result.correctCountryCode);
    const rowHtml = `
      <tr>
        <td>${escapeHtml(String(result.roundNumber))}</td>
        <td>${escapeHtml(result.stationName)}</td>
        <td>${formatCountryWithFlag(result.guessCountryCode, guessCountryName, "-")}</td>
        <td>${formatCountryWithFlag(result.correctCountryCode, correctCountryName, t("unknownCountry"))}</td>
        <td class="${statusInfo.className}">${statusInfo.label} (+${escapeHtml(String(result.points || 0))})</td>
      </tr>
    `;
    tbody.append(rowHtml);
  }
}

function renderSuggestions(query) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  const list = $("#country-suggestions");
  list.empty();

  if (!normalizedQuery) {
    gameState.currentSuggestions = [];
    hideSuggestions();
    return;
  }

  const suggestions = gameState.countryOptions
    .filter((country) => country.name.toLowerCase().includes(normalizedQuery))
    .slice(0, 12);

  if (!suggestions.length) {
    gameState.currentSuggestions = [];
    hideSuggestions();
    return;
  }

  gameState.currentSuggestions = suggestions;
  gameState.selectedSuggestionIndex = 0;

  suggestions.forEach((country, index) => {
    const item = $(`
      <div class="suggestion-item" role="option">
        <img class="flag-icon" src="${getFlagPath(country.code)}" alt="${escapeHtml(country.name)} flag">
        <span>${escapeHtml(country.name)}</span>
      </div>
    `);
    item.attr("data-index", String(index));
    if (index === 0) {
      item.addClass("active");
    }

    item.on("click", () => {
      gameState.selectedGuessCountryCode = country.code;
      $("#country-guess-input").val(country.name);
      hideSuggestions();
    });

    list.append(item);
  });

  list.removeClass("hidden");
}

function hideSuggestions() {
  gameState.currentSuggestions = [];
  $("#country-suggestions").addClass("hidden").empty();
}

function highlightSuggestion() {
  $("#country-suggestions .suggestion-item").removeClass("active");
  $(`#country-suggestions .suggestion-item[data-index='${gameState.selectedSuggestionIndex}']`).addClass("active");
}

function getFlagPath(countryCode) {
  return `flags/w40/${countryCode.toLowerCase()}.png`;
}

function clearGuessInput() {
  $("#country-guess-input").val("");
  gameState.selectedGuessCountryCode = null;
  hideSuggestions();
}

function clearRoundTimer() {
  if (gameState.timerIntervalId) {
    window.clearInterval(gameState.timerIntervalId);
    gameState.timerIntervalId = null;
  }
}

function clearStreamWaitTimeout() {
  if (gameState.streamWaitTimeoutId) {
    window.clearTimeout(gameState.streamWaitTimeoutId);
    gameState.streamWaitTimeoutId = null;
  }
}

function setSetupStatus(message) {
  $("#setup-status").text(message);
}

function setSetupLoading(isLoading) {
  $("#setup-spinner").toggleClass("hidden", !isLoading);
}

function setStreamLoading(isLoading) {
  $("#stream-spinner").toggleClass("hidden", !isLoading);
}

function showPanel(name) {
  $("#setup-panel, #game-panel, #feedback-panel, #summary-panel").addClass("hidden");
  $("#app-subtitle").toggleClass("hidden", name !== "setup");

  if (name === "setup") {
    $("#setup-panel").removeClass("hidden");
  } else if (name === "game") {
    $("#game-panel").removeClass("hidden");
  } else if (name === "feedback") {
    $("#feedback-panel").removeClass("hidden");
  } else if (name === "summary") {
    $("#summary-panel").removeClass("hidden");
  }
}

function resetToSetup() {
  clearRoundTimer();
  clearStreamWaitTimeout();
  setStreamLoading(false);
  $("#stream-status").text("");
  const player = $("#radio-player")[0];
  $("#radio-player").off(".round");
  player.pause();
  player.removeAttribute("src");
  player.load();
  showPanel("setup");
}

function saveGameHistory(record) {
  const existing = readGameHistory();
  existing.unshift(record);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(existing.slice(0, MAX_HISTORY_ITEMS)));
}

function readGameHistory() {
  const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Invalid game history in localStorage. Resetting history.", error);
    return [];
  }
}

function renderHistory() {
  const history = readGameHistory();
  const list = $("#history-list");
  list.empty();

  if (!history.length) {
    list.append(`<li class="muted">${escapeHtml(t("noGamesYet"))}</li>`);
    return;
  }

  history.forEach((game, index) => {
    const playedAt = new Date(game.playedAt).toLocaleString(gameState.currentLanguage === "es" ? "es-419" : "en");
    const timerLabel = game.timerSeconds
      ? formatText("timerPerRound", { seconds: game.timerSeconds })
      : t("timerNone");
    const totalPoints = Number.isFinite(Number(game.totalPoints))
      ? Number(game.totalPoints)
      : Array.isArray(game.details)
        ? game.details.reduce((sum, detail) => sum + Number(detail.points || 0), 0)
        : 0;
    const detailsHtml = Array.isArray(game.details)
      ? game.details
          .map((detail) => {
            const detailStatus = getStatusInfo(
              detail.status === "right" || detail.status === "wrong" || detail.status === "timeout"
                ? getDisplayStatus(detail)
                : detail.status || (detail.isCorrect ? "right" : "wrong"),
            );
            const guessCountryName = detail.guessCountryCode
              ? getCountryName(detail.guessCountryCode)
              : detail.guessCountryName || "-";
            const correctCountryName = detail.correctCountryCode
              ? getCountryName(detail.correctCountryCode)
              : detail.correctCountryName || t("unknownCountry");
            const detailDistance = formatDistanceText(detail.distanceKm ?? null, detail.distanceBandKey || "distanceUnknown");
            const detailPoints = Number(detail.points || 0);

            return `
              <li>
                #${escapeHtml(String(detail.roundNumber))} -
                ${escapeHtml(detail.stationName)} -
                ${escapeHtml(t("yourGuessLabel"))}: ${escapeHtml(guessCountryName)} -
                ${escapeHtml(t("correctCountryLabel"))}: ${escapeHtml(correctCountryName)} -
                ${detailStatus.label} -
                ${escapeHtml(t("distanceLabel"))}: ${escapeHtml(detailDistance)} -
                +${escapeHtml(String(detailPoints))} ${escapeHtml(t("pointsLabel"))}
              </li>
            `;
          })
          .join("")
      : "";

    const itemHtml = `
      <li class="history-item">
        <div class="history-compact">
          <strong>${escapeHtml(t("gameLabel"))} ${history.length - index}</strong>
          <span>${escapeHtml(
            formatText("historyCompactLine", {
              date: playedAt,
              score: t("scoreLabel"),
              correct: String(game.correctCount),
              total: String(game.totalRounds),
              pointsLabel: t("pointsLabel"),
              points: String(totalPoints),
              timerLabel: t("timerLabel"),
              timer: timerLabel,
            }),
          )}</span>
        </div>
        <details class="history-details">
          <summary>${escapeHtml(t("roundDetails"))}</summary>
          <ol>${detailsHtml}</ol>
        </details>
      </li>
    `;
    list.append(itemHtml);
  });
}

function updateRoundHeader() {
  const currentRound = gameState.currentRoundIndex + 1;
  const totalRounds = gameState.selectedStations.length;
  $("#round-display").text(`${currentRound} / ${totalRounds}`);
  updateProgressBar(currentRound, totalRounds);
}

function updateProgressBar(currentRound, totalRounds) {
  const safeTotal = Math.max(totalRounds, 1);
  const percent = Math.min(100, Math.max(0, (currentRound / safeTotal) * 100));
  const remaining = Math.max(0, safeTotal - currentRound);
  $("#round-progress-fill").css("width", `${percent}%`);
  $("#round-progress-text").text(formatText("roundProgressRemaining", { count: remaining }));
}

function renderCurrentStationTitle() {
  const station = gameState.selectedStations[gameState.currentRoundIndex];
  if (!station) {
    $("#station-title").text("");
    return;
  }

  if (gameState.selectedLevel === "advanced" || gameState.selectedLevel === "intermediate") {
    $("#station-title").text("");
    return;
  }

  $("#station-title").text(`${t("stationNameLabel")}: ${station.name}`);
}

function renderDebugAnswer(station) {
  if (!gameState.debugMode || !station) {
    $("#debug-answer").addClass("hidden").text("");
    return;
  }

  const countryName = getCountryName(station.countryCode);
  $("#debug-answer")
    .removeClass("hidden")
    .text(`${t("debugAnswerLabel")}: ${countryName} (${station.countryCode})`);
}

function playFeedbackSound(status) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return;
  }

  const audioContext = new AudioContextCtor();
  const now = audioContext.currentTime;
  const profile =
    status === "right"
      ? { frequencies: [740, 988], gain: 0.15, type: "sine" }
      : status === "wrong"
        ? { frequencies: [220, 180], gain: 0.26, type: "triangle" }
        : status === "timeout"
          ? { frequencies: [300, 260], gain: 0.24, type: "triangle" }
          : { frequencies: [200, 200], gain: 0.24, type: "sawtooth" };

  profile.frequencies.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startAt = now + index * 0.17;

    oscillator.type = profile.type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(profile.gain, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.16);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.16);
  });

  window.setTimeout(() => {
    audioContext.close().catch(() => {});
  }, 700);
}

function readSettings(defaults) {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!raw) {
    return defaults;
  }

  try {
    const parsed = JSON.parse(raw);
    const parsedTimer = Number(parsed.roundTimer);
    const allowedTimers = [0, 30, 60, 120, 300];
    const roundTimer = allowedTimers.includes(parsedTimer) ? parsedTimer : defaults.roundTimer;
    return {
      language: parsed.language === "es" ? "es" : defaults.language,
      level: ["beginner", "intermediate", "advanced"].includes(parsed.level) ? parsed.level : "beginner",
      theme: ["system", "light", "dark"].includes(parsed.theme) ? parsed.theme : defaults.theme,
      roundCount: clamp(Number(parsed.roundCount) || defaults.roundCount, 1, 50),
      roundTimer,
    };
  } catch (error) {
    console.warn("Invalid settings in localStorage. Using defaults.", error);
    return defaults;
  }
}

function persistCurrentSettings() {
  const roundCount = clamp(Number.parseInt($("#round-count").val(), 10) || 10, 1, 50);
  const timerParsed = Number.parseInt($("#round-timer-select").val(), 10);
  const roundTimer = [0, 30, 60, 120, 300].includes(timerParsed) ? timerParsed : 0;
  const settings = {
    language: gameState.currentLanguage,
    level: ["beginner", "intermediate", "advanced"].includes($("#level-select").val()) ? $("#level-select").val() : "beginner",
    theme: ["system", "light", "dark"].includes($("#theme-select").val()) ? $("#theme-select").val() : "system",
    roundCount,
    roundTimer,
  };
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

function findCountryCodeByName(nameInput) {
  const normalized = String(nameInput || "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const match = gameState.countryOptions.find((country) => country.name.toLowerCase() === normalized);
  return match ? match.code : null;
}

function getStatusInfo(status) {
  if (status === "right") {
    return { label: t("statusRight"), className: "status-right" };
  }
  if (status === "close") {
    return { label: t("statusClose"), className: "status-time" };
  }
  if (status === "timeout") {
    return { label: t("statusTimeUp"), className: "status-time" };
  }
  if (status === "skipped") {
    return { label: t("statusSkipped"), className: "status-skipped" };
  }
  return { label: t("statusWrong"), className: "status-wrong" };
}

function dedupeStations(stations) {
  const seen = new Set();
  const unique = [];

  for (const station of stations) {
    const key = `${station.stationuuid}:${station.streamUrl}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(station);
  }

  return unique;
}

function formatCountryWithFlag(countryCode, countryName, fallbackText) {
  if (!countryCode || !countryName) {
    return escapeHtml(fallbackText);
  }

  return `
    <span class="country-cell">
      <img class="flag-icon" src="${getFlagPath(countryCode)}" alt="${escapeHtml(countryName)} flag">
      ${escapeHtml(countryName)}
    </span>
  `;
}

function getCountryName(countryCode) {
  const displayNames = getDisplayNames();
  return displayNames.of(countryCode) || countryCode;
}

async function loadCountryInfoData() {
  if (countryInfoLoadPromise) {
    return countryInfoLoadPromise;
  }

  countryInfoLoadPromise = (async () => {
  try {
    const data = await $.getJSON(COUNTRY_INFO_PATH);
    if (!Array.isArray(data)) {
      console.warn("country-info.json is not an array.");
      return;
    }

    const map = new Map();
    data.forEach((item) => {
      const code = String(item.code || "")
        .trim()
        .toUpperCase();
      const lat = Number(item.lat);
      const lng = Number(item.lng);
      const region = String(item.region || "")
        .trim()
        .toLowerCase();
      if (!/^[A-Z]{2}$/.test(code) || !Number.isFinite(lat) || !Number.isFinite(lng)) {
        return;
      }
      map.set(code, { lat, lng, region });
    });
    gameState.countryInfoByCode = map;
  } catch (error) {
    console.warn("Unable to load country-info.json. Distance scoring will be limited.", error);
  }
  })();

  return countryInfoLoadPromise;
}

function getDistanceAndPoints(guessCountryCode, correctCountryCode, selectedLevel, isCorrect) {
  if (!guessCountryCode || !correctCountryCode) {
    return { distanceKm: null, bandKey: "distanceUnknown", points: 0, sameRegion: false, regionBonusPoints: 0 };
  }

  if (guessCountryCode === correctCountryCode) {
    return {
      distanceKm: 0,
      bandKey: "distanceExact",
      points: SCORE_RULES.exactMatchPoints,
      sameRegion: true,
      regionBonusPoints: 0,
    };
  }

  if (selectedLevel === "beginner" && !isCorrect) {
    const distanceKmBeginner = calculateDistanceKm(guessCountryCode, correctCountryCode);
    return {
      distanceKm: distanceKmBeginner,
      bandKey: distanceKmBeginner == null ? "distanceUnknown" : "distanceVeryFar",
      points: 0,
      sameRegion: isSameRegion(guessCountryCode, correctCountryCode),
      regionBonusPoints: 0,
    };
  }

  const distanceKm = calculateDistanceKm(guessCountryCode, correctCountryCode);
  if (distanceKm == null) {
    return { distanceKm: null, bandKey: "distanceUnknown", points: 0, sameRegion: false, regionBonusPoints: 0 };
  }

  const lastBand = SCORE_RULES.distanceBands[SCORE_RULES.distanceBands.length - 1];
  const band = SCORE_RULES.distanceBands.find((item) => distanceKm < item.maxKm) || lastBand;
  const sameRegion = isSameRegion(guessCountryCode, correctCountryCode);
  const regionBonusPoints = sameRegion ? Number(band.sameRegionBonusPoints || 0) : 0;
  const points = Number(band.basePoints || 0) + regionBonusPoints;
  return {
    distanceKm,
    bandKey: band ? band.labelKey : "distanceUnknown",
    points,
    sameRegion,
    regionBonusPoints,
  };
}

function isSameRegion(countryCodeA, countryCodeB) {
  const regionA = getCountryRegion(countryCodeA);
  const regionB = getCountryRegion(countryCodeB);
  return Boolean(regionA && regionB && regionA === regionB);
}

function getCountryRegion(countryCode) {
  const point = gameState.countryInfoByCode.get(String(countryCode || "").toUpperCase());
  return point && point.region ? point.region : "";
}

function calculateDistanceKm(countryCodeA, countryCodeB) {
  const pointA = gameState.countryInfoByCode.get(String(countryCodeA || "").toUpperCase());
  const pointB = gameState.countryInfoByCode.get(String(countryCodeB || "").toUpperCase());
  if (!pointA || !pointB) {
    return null;
  }

  const earthRadiusKm = 6371;
  const lat1 = toRadians(pointA.lat);
  const lat2 = toRadians(pointB.lat);
  const deltaLat = toRadians(pointB.lat - pointA.lat);
  const deltaLng = toRadians(pointB.lng - pointA.lng);

  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  const centralAngle = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return Math.round(earthRadiusKm * centralAngle);
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function formatDistanceText(distanceKm, bandKey) {
  const bandLabel = t(bandKey || "distanceUnknown");
  if (distanceKm == null) {
    return bandLabel;
  }
  return `${distanceKm.toLocaleString()} km (${bandLabel})`;
}

function getDisplayNames() {
  const cacheKey = gameState.currentLanguage;
  if (!displayNamesCache[cacheKey]) {
    const locale = cacheKey === "es" ? "es-419" : "en";
    displayNamesCache[cacheKey] = new Intl.DisplayNames([locale], { type: "region" });
  }
  return displayNamesCache[cacheKey];
}

function t(key) {
  return translations[gameState.currentLanguage][key] || translations.en[key] || key;
}

function formatText(key, values) {
  let text = t(key);
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function pickRandomItems(items, amount) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, amount);
}

function pickReplacementStation(currentStation) {
  const usedStationIds = new Set(
    gameState.selectedStations
      .filter((station, index) => index !== gameState.currentRoundIndex)
      .map((station) => station.stationuuid),
  );
  let candidates = gameState.allStations.filter(
    (station) => station.stationuuid !== currentStation.stationuuid && !usedStationIds.has(station.stationuuid),
  );

  if (!candidates.length) {
    candidates = gameState.allStations.filter((station) => station.stationuuid !== currentStation.stationuuid);
  }

  if (!candidates.length) {
    return null;
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
