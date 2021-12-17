var inflationCheck = false
var notifyId = 0
var forceToQuantumAndRemove = false

function setOptionsIfUndefined(){
        if (player.options === undefined) {
		player.options = {
			scientific: false,
			animationOn: true
		}
	}
	if (player.options.invert === true) player.options.theme = "Inverted"; player.options.invert = undefined;
	if (player.options.notation === undefined) player.options.notation = "Standard"
	if (player.options.scientific === undefined || typeof(player.options.scientific) == "boolean") player.options.scientific = {significantDigits: undefined}
	if (player.options.challConf === undefined) player.options.challConf = false
	if (player.options.logarithm === undefined) player.options.logarithm = {base: 10}
	if (player.options.tetration === undefined) player.options.tetration = {base: 2}
	if (player.options.hypersci === undefined) player.options.hypersci = {bump: 10}
	if (player.options.spazzy === undefined) player.options.spazzy = {subNotation: "Scientific"}
	if (player.options.standard === undefined) player.options.standard = { useMyr: false, useTam: false }
	if (player.options.aas === undefined) player.options.aas = { useDe: false }
	if (player.options.newsHidden === undefined) player.options.newsHidden = false;
	if (player.options.sacrificeConfirmation === undefined) player.options.sacrificeConfirmation = true;
	if (player.options.retryChallenge === undefined) player.options.retryChallenge = false;
	if (player.options.bulkOn === undefined) player.options.bulkOn = true
	if (player.options.cloud === undefined) player.options.cloud = true
	if (player.options.hotkeys === undefined) player.options.hotkeys = true
	if (player.options.eternityconfirm === undefined) player.options.eternityconfirm = true
	if (player.options.themes === undefined) player.options.themes = "Normal"
	if (player.options.secretThemeKey === undefined) player.options.secretThemeKey = 0
        if (player.options.commas === undefined) player.options.commas = true
        if (player.options.chart === undefined) player.options.chart = {}
	if (player.options.chart.updateRate === undefined) player.options.chart.updateRate = 1000
	if (player.options.chart.duration === undefined) player.options.chart.duration = 10
	if (player.options.chart.warning === undefined) player.options.chart.warning = 0
	if (player.options.chart.on === undefined) player.options.chart.on = false
	if (player.options.chart.dips === undefined) player.options.chart.dips = true
	if (player.options.animations === undefined) player.options.animations = {floatingText: true, bigCrunch: true, eternity: true, tachyonParticles: true}
        if (player.options.notation == "Mixed") player.options.notation = "Mixed scientific"
        if (player.options.commas == "Default") {
                player.options.commas == "AF2019";
                updateNotationOption();
        }
        if (player.options.notation == "Default") {
                player.options.notation = typeof(player.options.commas) === "boolean" ? "AF2019" : "Brackets";
                updateNotationOption();
        }
}

function setPreBreakIfUndefined(){
        if (player.achievements === undefined) player.achievements = [];
	if (player.sacrificed === undefined) player.sacrificed = new Decimal(0);
	if (player.infinityUpgrades === undefined) player.infinityUpgrades = [];
	if (player.infinityPoints === undefined) player.infinityPoints = new Decimal(0);
	if (player.infinitied === undefined) player.infinitied = 0;
	if (player.totalTimePlayed === undefined) player.totalTimePlayed = 0;
	if (player.bestInfinityTime === undefined) player.bestInfinityTime = 9999999999;
	if (player.thisInfinityTime === undefined) player.thisInfinityTime = 9999999999;
	if (player.galaxies === undefined) player.galaxies = 0;
	if (player.lastUpdate === undefined) player.lastUpdate = new Date().getTime();
	if (player.achPow === undefined) player.achPow = 1;
	if (player.newsArray === undefined) player.newsArray = [];
	if (player.chall2Pow === undefined) player.chall2Pow = 1;
	if (player.chall3Pow === undefined) player.chall3Pow = 0.01;
	if (player.challenges === undefined) player.challenges = []
	if (player.currentChallenge === undefined) player.currentChallenge = ""
	if (player.infinitied > 0 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1")
	if (player.matter === undefined) player.matter = new Decimal(0)
	if (player.autobuyers === undefined) player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	if (player.costMultipliers === undefined) player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
	if (player.tickspeedMultiplier === undefined) player.tickspeedMultiplier = new Decimal(10)
	if (player.partInfinityPoint === undefined) player.partInfinityPoint = 0
	if (player.challengeTimes === undefined) player.challengeTimes = [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31]
	if (player.infchallengeTimes === undefined) player.infchallengeTimes = [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31]
	if (player.lastTenRuns === undefined) player.lastTenRuns = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
}

function setPreEterIfUndefined(){
	if (player.infMult === undefined) player.infMult = new Decimal(1)
	if (player.infMultCost === undefined) player.infMultCost = new Decimal(100)
	if (player.tickSpeedMultDecrease === undefined) player.tickSpeedMultDecrease = 10
	if (player.tickSpeedMultDecreaseCost === undefined) player.tickSpeedMultDecreaseCost = 3e6
	if (player.dimensionMultDecrease === undefined) player.dimensionMultDecrease = 10
	if (player.dimensionMultDecreaseCost === undefined) player.dimensionMultDecreaseCost = 1e8
	if (player.overXGalaxies === undefined) player.overXGalaxies = 10;
	if (player.partInfinitied === undefined) player.partInfinitied = 0
	if (player.spreadingCancer === undefined) player.spreadingCancer = 0
	if (player.postC4Tier === undefined) player.postC4Tier = 0
	if (player.postC3Reward === undefined) player.postC3Reward = new Decimal(1)
	if (player.postC8Mult === undefined) player.postC8Mult = new Decimal(1)
	if (player.offlineProd === undefined) player.offlineProd = 0
	if (player.offlineProdCost === undefined) player.offlineProdCost = 1e7
	if (player.autoSacrifice === undefined) player.autoSacrifice = 1
	if (player.postChallUnlocked === undefined) player.postChallUnlocked = 0
	if (player.infMultBuyer === undefined) player.infMultBuyer = false
	if (player.autoCrunchMode === undefined) player.autoCrunchMode = "amount"
	if (player.challengeTarget === undefined) {
		player.challengeTarget = 0
		if (player.currentChallenge != "") player.challengeTarget = Number.MAX_VALUE
	}
}

function setPreNGp3IfUndefined(){
        if (player.lastTenEternities === undefined) player.lastTenEternities = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
	if (player.respec === undefined) player.respec = false
	if (player.eternityChalls === undefined) player.eternityChalls = {}
	if (player.eternityChallGoal === undefined) player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
	if (player.currentEternityChall === undefined) player.currentEternityChall = ""
	if (player.eternityChallUnlocked === undefined) player.eternityChallUnlocked = 0
	if (player.etercreq === undefined) player.etercreq = 0
	if (player.options.updateRate === undefined) player.options.updateRate = 50
	if (player.eterc8ids === undefined) player.eterc8ids = 50
	if (player.eterc8repl === undefined) player.eterc8repl = 40
	if (player.infinitiedBank === undefined) player.infinitiedBank = 0
	if (player.dimlife === undefined) player.dimlife = false
	if (player.dead === undefined) player.dead = false
	if (player.dilation === undefined) player.dilation = {}
	if (player.dilation.studies === undefined) player.dilation.studies = []
	if (player.dilation.active === undefined) player.dilation.active = false
	if (player.dilation.tachyonParticles === undefined) player.dilation.tachyonParticles = new Decimal(0)
	if (player.dilation.dilatedTime === undefined) player.dilation.dilatedTime = new Decimal(0)
	if (player.dilation.totalTachyonParticles === undefined) player.dilation.totalTachyonParticles = new Decimal(0)
	if (player.dilation.nextThreshold === undefined) player.dilation.nextThreshold = new Decimal(1000)
	if (player.dilation.freeGalaxies === undefined) player.dilation.freeGalaxies = 0
	if (player.dilation.upgrades === undefined) player.dilation.upgrades = []
	if (player.dilation.rebuyables === undefined) player.dilation.rebuyables =  { 1: 0, 2: 0, 3: 0 }
	if (player.timeDimension5 === undefined) player.timeDimension5 = {cost: new Decimal("1e2350"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
	if (player.timeDimension6 === undefined) player.timeDimension6 = {cost: new Decimal("1e2650"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
	if (player.timeDimension7 === undefined) player.timeDimension7 = {cost: new Decimal("1e3000"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
	if (player.timeDimension8 === undefined) player.timeDimension8 = {cost: new Decimal("1e3350"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
	if (player.why === undefined) player.why = 0
}

function checkShowTS(){
        if (player.secondAmount !== 0) {
		getEl("tickSpeed").style.visibility = "visible";
		getEl("tickSpeedMax").style.visibility = "visible";
		getEl("tickLabel").style.visibility = "visible";
		getEl("tickSpeedAmount").style.visibility = "visible";
	}
}

function setIDIfUndefined(){
        if (player.infinityPower === undefined) {
		player.infinityPower = new Decimal(1)
		player.infinityDimension1 = {
			cost: new Decimal(1e8),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
		player.infinityDimension2 = {
			cost: new Decimal(1e9),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
		player.infinityDimension3 = {
			cost: new Decimal(1e10),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
		player.infinityDimension4 = {
			cost: new Decimal(1e20),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
		player.infDimensionsUnlocked = [false, false, false, false]
	}
        if (player.infinityDimension1.baseAmount === undefined) {
		player.infinityDimension1.baseAmount = 0;
		player.infinityDimension2.baseAmount = 0;
		player.infinityDimension3.baseAmount = 0;
		player.infinityDimension4.baseAmount = 0;

		player.infinityDimension1.baseAmount = new Decimal(player.infinityDimension1.power).log(50).times(10).toNumber()
		player.infinityDimension2.baseAmount = new Decimal(player.infinityDimension2.power).log(30).times(10).toNumber()
		player.infinityDimension3.baseAmount = new Decimal(player.infinityDimension3.power).log(10).times(10).toNumber()
		player.infinityDimension4.baseAmount = new Decimal(player.infinityDimension4.power).log(5).times(10).toNumber()
	}

        if (player.infinityDimension5 === undefined) {
		player.infDimensionsUnlocked.push(false)
		player.infDimensionsUnlocked.push(false)
		player.infinityDimension5 = {
			cost: new Decimal(1e140),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
		player.infinityDimension6 = {
			cost: new Decimal(1e200),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
	}

	if (player.infinityDimension7 == undefined) {
		player.infDimensionsUnlocked.push(false)
		player.infDimensionsUnlocked.push(false)
		player.infinityDimension7 = {
			cost: new Decimal(1e250),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
		player.infinityDimension8 = {
			cost: new Decimal(1e280),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		}
	}
}

function setTD1to4IfUndefined(){
        if (player.timeShards === undefined) {
		player.timeShards = new Decimal(0)
		player.eternityPoints = new Decimal(0)
		player.tickThreshold = new Decimal(1)
		player.totalTickGained = 0
		player.eternities = 0
		player.timeDimension1 = {
			cost: new Decimal(1),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		}
		player.timeDimension2 = {
			cost: new Decimal(5),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		}
		player.timeDimension3 = {
			cost: new Decimal(100),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		}
		player.timeDimension4 = {
			cost: new Decimal(1000),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		}
	}
}

function setABIfUndefined(){
    if (player.autoIP === undefined) player.autoIP = new Decimal(0)
	if (player.autoTime === undefined) player.autoTime = 1e300;
	if (player.matter === null) player.matter = new Decimal(0)
	for (var i = 0; i < 12; i++) {
		if (player.autobuyers[i] % 1 !== 0 && player.autobuyers[i].tier === undefined) {
			player.autobuyers[i].tier = i + 1
		}
		if (player.autobuyers[i] % 1 !== 0 && player.autobuyers[i].target % 1 !== 0) {
			player.autobuyers[i].target = i + 1
			if (i == 8) player.autobuyers[i].target = 1
		}

		if (player.autobuyers[i]%1 !== 0 && (player.autobuyers[i].bulk === undefined || isNaN(player.autobuyers[i].bulk) || player.autobuyers[i].bulk === null)) {
			player.autobuyers[i].bulk = 1
		}
	}
	if (player.autobuyers[8].tier == 10) player.autobuyers[8].tier = 9
}

function setPeakIfUndefined(){
	GPminpeak = new Decimal(0)
	IPminpeak = new Decimal(0)
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	QKminpeak = new Decimal(0)
	QKminpeakValue = new Decimal(0)
	GHPminpeak = new Decimal(0)
	GHPminpeakValue = new Decimal(0)
}

function dov1tov5(){
	if (player.version === undefined) { 
		for (var i = 0; i < player.autobuyers.length; i++) {
			if (player.autobuyers[i]%1 !== 0) player.infinityPoints = player.infinityPoints + player.autobuyers[i].cost - 1
		}
		player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		player.version = 1
	}
	if (player.version == 1) {
		if (player.dimensionMultDecrease != 10) {
			if (player.dimensionMultDecrease == 9) {
				player.dimensionMultDecrease = 10
				player.dimensionMultDecreaseCost = 1e8
				player.infinityPoints = player.infinityPoints.plus(1e8)
			}
			if (player.dimensionMultDecrease == 8) {
				player.dimensionMultDecrease = 10
				player.dimensionMultDecreaseCost = 1e8
				player.infinityPoints = player.infinityPoints.plus(2.1e9)
			}
			if (player.dimensionMultDecrease == 7) {
				player.dimensionMultDecrease = 10
				player.dimensionMultDecreaseCost = 1e8
				player.infinityPoints = player.infinityPoints.plus(4.21e10)
			}
		}
		player.version = 2
	}
	if (player.version < 5) {
		player.newsArray = []
		player.version = 5
	}
}

function setReplTSIfUndefined(){
        if (player.replicanti === undefined) {
		player.replicanti = {
			amount: new Decimal(0),
			unl: false,
			chance: 0.01,
			chanceCost: new Decimal(1e150),
			interval: 1000,
			intervalCost: new Decimal(1e140),
			gal: 0,
			galaxies: 0,
			galCost: new Decimal(1e170)
		}
	}
	if (player.bestEternity === undefined) {
		player.bestEternity = 9999999999
		player.thisEternity = player.totalTimePlayed
	}
	if (player.timestudy === undefined) {
		player.timestudy = {
			theorem: 0,
			amcost: new Decimal("1e20000"),
			ipcost: new Decimal(1),
			epcost: new Decimal(1),
			studies: [],
		}
	}
}

function setEverythingPreNGp3onLoad(){
	clickedAntimatter = 0
	happyHalloween = false
	if (player.totalmoney === undefined || isNaN(player.totalmoney)) player.totalmoney = player.money;
	if (player.tickspeed === undefined) player.tickspeed = new Decimal(1000)
	setOptionsIfUndefined()
	setPreBreakIfUndefined()
	setPreEterIfUndefined()
	setPreNGp3IfUndefined()
	setTheme(player.options.theme);
	sliderText.textContent = "Update rate: " + player.options.updateRate + "ms";
	slider.value = player.options.updateRate;
	checkShowTS()
	setIDIfUndefined()
	setTD1to4IfUndefined()
	setABIfUndefined()
	getEl("totaltickgained").textContent = "You've gained " + getFullExpansion(player.totalTickGained) + " tickspeed upgrades."
	setPeakIfUndefined()
	dov1tov5()
	if (typeof player.autobuyers[9].bulk !== "number") player.autobuyers[9].bulk = 1
        setReplTSIfUndefined()

	if (player.eternityUpgrades === undefined) player.eternityUpgrades = []

	if (player.infDimBuyers === undefined) player.infDimBuyers = [false, false, false, false, false, false, false, false]

	if (player.replicanti.auto === undefined) player.replicanti.auto = [false, false, false]
	if (player.eternityBuyer === undefined) {
		player.eternityBuyer = {
			limit: new Decimal(0),
			isOn: false
		}
	}
  
	if (typeof(player.options.commas) !== "string") {
		if (player.options.commas) player.options.commas = "Commas"
		else player.options.commas = player.options.notation
	}
	if (player.shameLevel === undefined) player.shameLevel = 0;
        getEl("break").textContent = (player.break ? "FIX" : "BREAK") + " INFINITY"
}

function setAarexModIfUndefined(){
	//First Aarex's Mods option: Decimal Library Toggle
	if (player.aarexModifications === undefined) {
		player.aarexModifications = {
			breakInfinity: false
		}
		break_infinity_js = false
		aarMod = player.aarexModifications
	}

	getEl("decimalMode").innerHTML = aarMod.breakInfinity ? "break_infinity.js<br>(slow, up to e9e15)" : "logarithmica_numerus.js<br>(fast, up to e1.79e308)"
	getEl("decimalModeBtn").style.visibility = Decimal.gt(player.totalmoney,Decimal.pow(10, 9e15)) ? "hidden" : ""

	if (aarMod.dilationConf === undefined) aarMod.dilationConf = true
	if (aarMod.offlineProgress === undefined)  aarMod.offlineProgress = true
	if (aarMod.autoSave === undefined) aarMod.autoSave = true
	if (aarMod.progressBar === undefined) aarMod.progressBar = true
	if (aarMod.logRateChange === undefined) aarMod.logRateChange = 0
	else if (aarMod.logRateChange === false || aarMod.logRateChange === true) aarMod.logRateChange = aarMod.logRateChange ? 1 : 0
	if (aarMod.hideProductionTab === undefined) aarMod.hideProductionTab = !(!player.boughtDims) && aarMod.ersVersion === undefined
	if (aarMod.eternityChallRecords === undefined) aarMod.eternityChallRecords = {}
	if (aarMod.popUpId === undefined) aarMod.popUpId = 0

	if (aarMod.tabsSave === undefined) aarMod.tabsSave = {on: false}
	if (aarMod.noFooter == undefined) {
		aarMod.noFooter = player.options.theme == "Aarex's Modifications" || player.options.theme == "Aarex's Mods II"
	}
	if (aarMod.layerHidden === undefined) aarMod.layerHidden = {}

	if (aarMod.render === undefined) aarMod.render = {tick: 0, rate: 1}
	getEl("renderrate").textContent = "Render rate: " + aarMod.render.rate + " tick";
	getEl("renderrateslider").value = aarMod.render.rate

	setFPSDisplay()
}

function doNGp3Init1() {
	tmp.ngp3 = player.masterystudies !== undefined
	tmp.ngpX = tmp.ngp3 ? 3 :
		player.meta !== undefined ? 2 :
		0
	tmp.ngp3_boost = tmp.ngpX >= 3 || (aarMod.newGamePlusVersion && tmp.ngpX != 2)
	tmp.ngp3_mul = tmp.ngp3 && aarMod.newGameMult!== undefined
	tmp.ngp3_exp = tmp.ngp3 && aarMod.newGameExpVersion !== undefined
	tmp.ngp3_em = getNGP3EterMilestones()

	setupSaveDataNGP3()

	transformSaveToDecimal();
	tmp.tickUpdate = true;
	updateAchievements();
	updateCheckBoxes();
	toggleChallengeRetry()
	toggleChallengeRetry()
	toggleBulk()
	toggleBulk()
}

function setSomeEterEraStuff(){
        if (player.replicanti.unl == true) {
		getEl("replicantidiv").style.display="inline-block"
		getEl("replicantiunlock").style.display="none"
	} else {
		getEl("replicantidiv").style.display="none"
		getEl("replicantiunlock").style.display="inline-block"
	}
        if (!player.replicanti.auto[0]) getEl("replauto1").textContent = "Auto: OFF"
	if (!player.replicanti.auto[1]) getEl("replauto2").textContent = "Auto: OFF"
	if (!player.replicanti.auto[2]) getEl("replauto3").textContent = "Auto: OFF"

	updateNotationOption()

	getEl("floatingTextAnimBtn").textContent = "Floating text: " + ((player.options.animations.floatingText) ? "ON" : "OFF")
	getEl("bigCrunchAnimBtn").textContent = "Big crunch: " + (player.options.animations.bigCrunch === "always" ? "ALWAYS" : player.options.animations.bigCrunch ? "ON" : "OFF")
	getEl("tachyonParticleAnimBtn").textContent = "Tachyon particles: " + ((player.options.animations.tachyonParticles) ? "ON" : "OFF")

	if (player.infinitied == 0 && getEternitied() == 0) getEl("infinityPoints2").style.display = "none"

	if (player.eternityChallUnlocked === null) player.eternityChallUnlocked = 0
	if (player.eternityChallUnlocked !== 0) getEl("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"

	if (getEternitied()<1) getEl("infmultbuyer").textContent="Max buy IP mult"
	else getEl("infmultbuyer").textContent="Autobuy IP mult O"+(player.infMultBuyer?"N":"FF")

	if (player.epmult === undefined || player.epmult == 0) {
		player.epmult = new Decimal(1)
		player.epmultCost = new Decimal(500)
	}
}

function setSaveStuffHTML(){
	getEl("save_name").textContent = "You are currently playing in " + (aarMod.save_name ? aarMod.save_name : "Save #" + savePlacement)
	getEl("offlineProgress").textContent = "Offline progress: O"+(aarMod.offlineProgress?"N":"FF")
	getEl("autoSave").textContent = "Auto save: " + (aarMod.autoSave ? "ON" : "OFF")
	getEl("autoSaveInterval").textContent = "Auto-save interval: " + getAutoSaveInterval() + "s"
	getEl("autoSaveIntervalSlider").value = getAutoSaveInterval()
}

function setSomeEterEraStuff2(){
	loadAutoBuyerSettings();
	var updatedLTR = []
	for (var lastRun = 0; lastRun < 10; lastRun++) {
		if (typeof(player.lastTenRuns[lastRun]) !== "number") if (player.lastTenRuns[lastRun][0] != 26784000 || player.lastTenRuns[lastRun][1].neq(1)) updatedLTR.push(player.lastTenRuns[lastRun])
		if (player.lastTenEternities[lastRun][0] == 26784000 && player.lastTenEternities[lastRun][1].eq(1)) player.lastTenEternities[lastRun] = [26784000, new Decimal(0)]
	}
	for (var a = updatedLTR.length; a < 10; a++) updatedLTR.push([26784000, new Decimal(0)])
	player.lastTenRuns = updatedLTR
	updateLastTenRuns()
	updateLastTenEternities()

	updateInfCosts()
}

function dov7tov10(){
        var inERS=!(!player.boughtDims)
        if (player.version > 7 && inERS && !aarMod.ersVersion) player.version = 7
	if (player.version < 9) {
		player.version = 9
		let achs = []
		if (hasAch("r22")) {
			achs.push("r35")
			player.achievements.splice(player.achievements.indexOf("r22"), 1)
		}
		if (hasAch("r35")) {
			achs.push("r76")
			player.achievements.splice(player.achievements.indexOf("r35"), 1)
		}
		if (hasAch("r41")) {
			achs.push("r22")
			player.achievements.splice(player.achievements.indexOf("r41"), 1)
		}
		if (hasAch("r76")) {
			achs.push("r41")
			player.achievements.splice(player.achievements.indexOf("r76"), 1)
		}

		for (var i = 0; i < achs.length;i++) player.achievements.push(achs[i])
		updateAchievements()
		if (!inERS) player.replicanti.intervalCost = player.replicanti.intervalCost.dividedBy(1e20)
	}
	getEl(inERS?"r22":"r35").appendChild(getEl("Don't you dare sleep"))
	getEl(inERS?"r35":"r76").appendChild(getEl("One for each dimension"))
	getEl(inERS?"r41":"r22").appendChild(getEl("Fake News"))
	getEl(inERS?"r76":"r41").appendChild(getEl("Spreading Cancer"))
	getEl("Infinite time").style["background-image"]="url(images/"+(inERS?79:69)+".png)"

	if (player.version < 9.5) {
		player.version = 9.5
		if (player.timestudy.studies.includes(191)) player.timestudy.theorem += 100
	}

	if (player.version < 10) {
		player.version = 10
		if (player.timestudy.studies.includes(72)) {
			for (i = 4; i < 8; i++) {
				player["infinityDimension" + i].amount = player["infinityDimension" + i].amount.div(calcTotalSacrificeBoost().pow(0.02))
			}
		}
	}
}

function doNGM1Versions(){
        if (aarMod.newGameMinusVersion === undefined && !player.boughtDims) {
                if (checkNGM() > 0) {
                        aarMod.newGameMinusVersion = (aarMod.newGameMinusUpdate !== undefined ? aarMod.newGameMinusUpdate : player.newGameMinusUpdate === undefined ? checkNGM() : 1.1)
                        delete aarMod.newGameMinusUpdate
                        delete player.newGameMinusUpdate
                }
        }
        if (aarMod.newGameMinusVersion < 1.1) {
                player.totalTimePlayed+=1728000
                player.timestudy.theorem+=1
                player.timestudy.ipcost=Decimal.div(player.timestudy.ipcost,2)
                if (player.eternityChalls.eterc1==undefined) player.eternityChalls.eterc1=-6
                else player.eternityChalls.eterc1-=6
                if (player.eternityChalls.eterc11==undefined) player.eternityChalls.eterc11=1
                else if (player.eternityChalls.eterc11<5) player.eternityChalls.eterc11+=1
                aarMod.newGameMinusVersion = 1.1
        }
        if (aarMod.newGameMinusVersion < 2) {
                if (player.eternities == -20) {
                        player.infinitied += 991
                        player.offlineProdCost = Decimal.times(player.offlineProdCost, 5e4)
                } player.infinitiedBank -= 996
                player.spreadingCancer -= 9000
                player.timeDimension1.power = player.timeDimension1.power.mul(2)
                player.timestudy.theorem--
                player.timestudy.ipcost = player.timestudy.ipcost.div(5e11)
                player.dilation.nextThreshold.e = 6
                player.dilation.totalTachyonParticles = new Decimal(500)
                player.dilation.rebuyables[2] = 1
                player.timeDimension5.power = Decimal.pow(10, -3)
                player.timeDimension6.power = new Decimal(0.0004)
                player.timeDimension7.power = Decimal.pow(10, -4)
                player.timeDimension8.power = new Decimal(0.00004)
        }
        if (aarMod.newGameMinusVersion < 2.1) {
                player.timeDimension1.power = player.timeDimension1.power.mul(8)
                player.timeDimension4.power = player.timeDimension4.power.mul(4)
                player.timestudy.theorem--
                player.dilation.totalTachyonParticles = player.dilation.totalTachyonParticles.add(1500)
        }
        if (aarMod.newGameMinusVersion < 2.2) {
                player.timestudy.theorem += 3;
                const pow_div = [0,160,5/3,1,3,100,80,100/3,20];
                for (i=1;i<=8;i++) player["timeDimension"+i].power = player["timeDimension"+i].power.div(pow_div[i]);
                if (player.eternityChalls.eterc11 == 1) delete player.eternityChalls.eterc11
                else player.eternityChalls.eterc11--
                $.notify('Your NG- save has been updated due to few balancing issues.', 'info')
        }
}



function doNGP3NewPlayerStuff(){
        aarMod.newGame3PlusVersion = 2.3
        player.respecMastery=false
        player.dbPower = 1
        player.dilation.times = 0
        player.masterystudies = []
        qu_save.reached = false
        player.meta.bestOverQuantums = player.meta.bestAntimatter
        player.options.animations.quarks = true
        qu_save.usedQuarks = {
                r: 0,
                g: 0,
                b: 0
        }
        qu_save.colorPowers = {
                r: 0,
                g: 0,
                b: 0
        }
        qu_save.gluons = {
                rg: 0,
                gb: 0,
                br: 0
        }
        qu_save.assignAllRatios = {
                r: 1,
                g: 1,
                b: 1
        }
        player.eternityBuyer.statBeforeDilation = 0
        player.eternityBuyer.dilationPerAmount = 10
        player.eternityBuyer.dilMode = "amount"
        player.eternityBuyer.tpUpgraded = false
        player.eternityBuyer.slowStop = false
        player.eternityBuyer.slowStopped = false
        player.eternityBuyer.ifAD = false
        qu_save.autobuyer = {
			enabled: false,
			limit: 1,
			mode: "amount",
			peakTime: 0
		}
        qu_save.disabledRewards = {}
        qu_save.metaAutobuyerWait = 0
        qu_save.multPower = {rg:0,gb:0,br:0,total:0}
        qu_save.nonMAGoalReached = []
        player.dilation.bestTP = 0
        player.old = false
        qu_save.autoOptions = {}

        qu_save.notrelative = false
        qu_save.wasted = false
        qu_save.bigRip = {
                active: false,
                conf: true,
                times: 0,
                bestThisRun: 0,
                totalAntimatter: 0,
                bestGals: 0,
                savedAutobuyersNoBR: {},
                savedAutobuyersBR: {},
                spaceShards: 0,
                upgrades: []
        }
        qu_save.breakEternity = {
                unlocked: false,
                break: false,
                eternalMatter: 0,
                upgrades: [],
                epMultPower: 0
        }
        player.ghostify = getGhostifyOnNewNGP3Data()
        tmp.bl=player.ghostify.bl
        for (var g=1;g<=br.limits[maxBLLvl];g++) tmp.bl.glyphs.push(0)
        player.options.animations.ghostify = true
        aarMod.ghostifyConf = true
}

function getGhostifyOnNewNGP3Data(){
        return {
                reached: false,
                times: 0,
                time: player.totalTimePlayed,
                best: 9999999999,
                last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
                milestones: 0,
                disabledRewards: {},
                ghostParticles: 0,
                multPower: 1,
                neutrinos: {
                        electron: 0,
                        mu: 0,
                        tau: 0,
                        generationGain: 1,
                        multPower: 1,
                        upgrades: []
                },
                automatorGhosts: setupAutomaticGhostsData(),
                ghostlyPhotons: {
                        unl: false,
                        amount: 0,
                        ghostlyRays: 0,
                        darkMatter: 0,
                        lights: [0,0,0,0,0,0,0,0],
                        maxRed: 0,
                        enpowerments: 0
                },
                bl: {
                        watt: 0,
                        speed: 1,
                        ticks: 0,
                        am: 0,
                        typeToExtract: 1,
                        extracting: false,
                        extractProgress: 0,
                        autoExtract: 0,
                        glyphs: [],
                        enchants: {},
                        usedEnchants: [],
                        upgrades: [],
                        battery: 0,
                        odSpeed: 1
                },
                wzb: {
                        unl: false,
                        dP: 0,
                        dPUse: 0,
                        wQkUp: true,
                        wQkProgress: 0,
                        zNeGen: 1,
                        zNeProgress: 1,
                        zNeReq: 1,
                        wpb: 0,
                        wnb: 0,
                        zb: 0
                }
        }
}

function doInitNGp2NOT3Stuff(){
	if (aarMod.newGamePlusPlusVersion === undefined && !tmp.ngp3) { 
		if (player.dilation.rebuyables[4] !== undefined) {
			var migratedUpgrades = []
			var v2_1check=player.version>13
			for (id=5;id<(v2_1check?18:14);id++) if (player.dilation.upgrades.includes(id)) migratedUpgrades.push(id>16?10:(id>12&&v2_1check)?("ngpp"+(id-10)):(id%4<1)?("ngpp"+(id/4-1)):Math.floor(id/4)*3+id%4)
			if (player.meta) {
					for (dim=1;dim<9;dim++) {
							player.meta[dim].bought += player.meta[dim].tensBought * 10
							delete player.meta[dim].tensBought
					}
					if (player.autoEterMode) aarMod.newGamePlusPlusVersion = 2.2
					else if (v2_1check) {
							player.version = 12.1
							aarMod.newGamePlusPlusVersion = 2.1
					} else if (player.meta) aarMod.newGamePlusPlusVersion = 2
			} else aarMod.newGamePlusPlusVersion = 1
			var newAchievements=[]
			var v2_3check=player.ep5xAutobuyer!==undefined
			for (id=0;id<player.achievements.length;id++) {
					r=player.achievements[id].split("r")[1]
					newAchievements.push(r>138?"ngpp"+(r-130):player.achievements[id])
					if (r>138) v2_3check=true
			}
			if (v2_3check) {
					aarMod.newGamePlusVersion = 1
					aarMod.newGamePlusPlusVersion = 2.3
					player.autoEterOptions = {epmult:player.ep5xAutobuyer}
					for (dim=1;dim<9;dim++) player.autoEterOptions["td"+dim] = player.timeDimensionAutobuyer
					player.achievements=newAchievements
					updateAchievements()
					delete player.timeDimensionAutobuyer
					delete player.ep5xAutobuyer
			}
			qu_save = player.quantum
			if (qu_save) {
					aarMod.newGamePlusPlusVersion = 2.901
					qu_save.time = player.totalTimePlayed
					qu_save.best = 9999999999
					qu_save.last10 = [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]]
					aarMod.quantumConf = true
			}
			aarMod.newGamePlusVersion = 1
			player.dilation.upgrades=migratedUpgrades
			resetDilationGalaxies()
		}
	} else if (player.dilation.rebuyables[4] == null) {
		delete aarMod.meta
		delete aarMod.autoEterMode
		delete aarMod.autoEterOptions
		delete qu_save
	}
}

function doNGP2v2tov2302(){
        if (aarMod.newGamePlusPlusVersion < 2) {
                for (dim=1;dim<5;dim++) {
                        var dim = player["timeDimension" + dim]
                        if (Decimal.gte(dim.cost, "1e20000")) dim.cost = Decimal.pow(timeDimCostMults[dim]*2.2, dim.bought).times(timeDimStartCosts[dim]).times(Decimal.pow(new Decimal('1e1000'),Math.pow(dim.cost.log(10) / 1000 - 20, 2)))
                }
                player.meta = {resets: 0, antimatter: 10, bestAntimatter: 10}
                for (dim=1;dim<9;dim++) player.meta[dim] = {amount: 0, bought: 0, cost: initCost[dim]}
        }
        if (aarMod.newGamePlusPlusVersion < 2.2) {
                for (dim=1;dim<5;dim++) {
                        var dim = player["timeDimension" + dim]
                        if (Decimal.gte(dim.cost, "1e100000")) dim.cost = Decimal.pow(timeDimCostMults[dim]*100, dim.bought).times(timeDimStartCosts[dim]).times(Decimal.pow(new Decimal('1e1000'),Math.pow(dim.cost.log(10) / 1000 - 100, 2)))
                }
                
                player.autoEterMode == "amount"
                aarMod.newGamePlusPlusVersion = 2.2
        }
        if (aarMod.newGamePlusPlusVersion < 2.3) {
                var autoEterOptions={epmult:player.autoEterOptions?player.autoEterOptions.epMult===true:false}
                for (dim=1;dim<9;dim++) if (player.autoEterOptions===undefined?true:player.autoEterOptions["td"+dim]) autoEterOptions["td"+dim]=false
                player.autoEterOptions=autoEterOptions
        }
        if (aarMod.newGamePlusPlusVersion < 2.301) {
                var metaAchCheck = player.dilation.studies.includes(6)
                var noD9AchCheck = player.meta[8].bought > 0 || player.meta.resets > 4
                var metaBoostCheck = player.meta.resets > 9
                if (metaBoostCheck) giveAchievement("And still no ninth dimension...")
                if (noD9AchCheck||metaBoostCheck) giveAchievement("Meta-boosting to the max")
                if (metaAchCheck||noD9AchCheck||metaBoostCheck) giveAchievement("I'm so meta")
                player.galaxyMaxBulk = false
        }
        if (aarMod.newGamePlusPlusVersion < 2.303) aarMod.newGamePlusPlusVersion = 2.303
}

function doQuantumRestore(){
        var quantumRestore = aarMod.newGamePlusPlusVersion < 2.9 || (!qu_save && aarMod.newGamePlusPlusVersion > 2.4)
        if (quantumRestore) {
                player.quantum={
                        times: 0,
                        quarks: 0,
                        producedGluons: 0,
                        realGluons: 0,
                        bosons: {
                                'w+': 0,
                                'w-': 0,
                                'z0': 0
                        },
                        neutronstar: {
                                quarks: 0,
                                metaAntimatter: 0,
                                dilatedTime: 0
                        },
                        rebuyables: {
                                1: 0,
                                2: 0
                        },
                        upgrades: []
                }
                qu_save=player.quantum
        }
        if (quantumRestore || aarMod.newGamePlusPlusVersion < 2.901) {
                qu_save.time = player.totalTimePlayed
                qu_save.best = 9999999999
                qu_save.last10 = [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]]
        }
        if (aarMod.newGamePlusPlusVersion < 2.901) {
                aarMod.quantumConf = true
                $.notify('NG++ was updated to include quantum reset.', 'info')
        }
        if (aarMod.newGamePlusPlusVersion < 2.9011 && player.autoEterOptions === undefined) {
                player.autoEterOptions = {epmult:false}
                for (dim=1;dim<9;dim++) player.autoEterOptions["td"+dim] = false
        }
        if (aarMod.newGamePlusPlusVersion < 2.9013) if (aarMod.quantumConf===undefined||qu_save.times<1) aarMod.quantumConf=true
        if (aarMod.newGamePlusPlusVersion < 2.90142) aarMod.newGamePlusPlusVersion = 2.90142
        if (aarMod.newGame3PlusVersion < 1.01) aarMod.dbPower = new Decimal(getDimensionBoostPower())
        if ((aarMod.newGame3PlusVersion && !tmp.ngp3) || aarMod.newGame3PlusVersion < 1.02) player.masterystudies = []
        if (aarMod.newGame3PlusVersion < 1.21) player.replicanti.chanceCost = Decimal.pow(1e15, player.replicanti.chance * 100 + 9)
        if ((quantumRestore && player.masterystudies) || aarMod.newGame3PlusVersion < 1.5) {
                qu_save.usedQuarks = {
                        r: 0,
                        g: 0,
                        b: 0
                }
                qu_save.colorPowers = {
                        r: 0,
                        g: 0,
                        b: 0
                }
        }
        if ((quantumRestore && player.masterystudies) || aarMod.newGame3PlusVersion < 1.51) {
                qu_save.gluons = {
                        rg: 0,
                        gb: 0,
                        br: 0
                }
        }
}

function doNGp3v15tov199(){
        if (aarMod.newGame3PlusVersion < 1.511) if (player.autoEterMode !== undefined) player.autoEterMode = "amount"
        if (aarMod.newGame3PlusVersion < 1.8) {
                player.eternityBuyer.statBeforeDilation = 0
                player.eternityBuyer.dilationPerAmount = 10
                qu_save.autobuyer = {
                        enabled: false,
                        limit: 1,
                        mode: "amount"
                }
        }
        if (aarMod.newGame3PlusVersion < 1.9) {
                player.replicanti.intervalCost = Decimal.pow(1e10, Math.round(Math.log10(1000/player.replicanti.interval)/-Math.log10(0.9))+14)
                qu_save.disabledRewards={}
        }
        if (aarMod.newGame3PlusVersion < 1.95) {
                qu_save.multPower=0
                qu_save.challenge=0
                qu_save.challenges=0
        }
        if (aarMod.newGame3PlusVersion < 1.99) {
                qu_save.challenge=qu_save.challenge>0?[qu_save.challenge]:[]
                var newChallenges={}
                for (c=1;c<=qu_save.challenges;c++) newChallenges[c]=1
                qu_save.challenges=newChallenges
                qu_save.metaAutobuyerWait=0
        }
}

function doNGp3v199tov19995(){
        if (aarMod.newGame3PlusVersion < 1.9975&&!qu_save.challenge) qu_save.challenge=[]
        if (aarMod.newGame3PlusVersion < 1.9979) {
                player.dilation.bestTP=hasAch("ng3p18")?player.dilation.tachyonParticles:new Decimal(0)
                player.old=false
        }
        if (aarMod.newGame3PlusVersion < 1.99795) player.options.animations.quarks = true
        if (aarMod.newGame3PlusVersion < 1.99799) player.respecOptions={time:player.respec,mastery:player.respec}
        if (aarMod.newGame3PlusVersion < 1.998) {
                var respecedMS=[]
                for (id=0;id<player.masterystudies.length;id++) {
                        if (player.masterystudies[id]=="t322") respecedMS.push("t323")
                        else respecedMS.push(player.masterystudies[id])
                }
                player.masterystudies=respecedMS
                qu_save.autoOptions = {}
        }
        if (aarMod.newGame3PlusVersion < 1.9985) qu_save.multPower = {rg:Math.ceil(qu_save.multPower/3),gb:Math.ceil((qu_save.multPower-1)/3),br:Math.floor(qu_save.multPower/3),total:qu_save.multPower}
        if (aarMod.newGame3PlusVersion < 1.9986) {
                player.respec=player.respecOptions.time
                player.respecMastery=player.respecOptions.mastery
                updateRespecButtons()
                delete player.respecOptions
        }
        if (aarMod.newGame3PlusVersion < 1.9995) {
                player.meta.bestOverQuantums = player.meta.bestAntimatter
                qu_save.autobuyer.peakTime = 0
                qu_save.assignAllRatios = {
                        r: 1,
                        g: 1,
                        b: 1
                }
                qu_save.notrelative = false
                qu_save.wasted = false
        }
}

function doNGp3v19995tov21(){
        var setTTAfterQuantum = 0
        if (aarMod.newGame3PlusVersion < 1.9997) {
                player.dilation.times = 0
        }
        if (aarMod.newGame3PlusVersion < 2) {
                player.eternityBuyer.dilMode = "amount"
                player.eternityBuyer.tpUpgraded = false
                player.eternityBuyer.slowStop = false
                player.eternityBuyer.slowStopped = false
                player.eternityBuyer.ifAD = false
                qu_save.reached = qu_save.times > 0
                qu_save.nonMAGoalReached = {}
                qu_save.bigRip = {
                        active: false,
                        conf: true,
                        times: 0,
                        bestThisRun: 0,
                        totalAntimatter: 0,
                        savedAutobuyersNoBR: {},
                        savedAutobuyersBR: {},
                        spaceShards: 0,
                        upgrades: []
                }
                qu_save.breakEternity = {
                        unlocked: false,
                        break: false,
                        eternalMatter: 0,
                        upgrades: [],
                        epMultPower: 0
                }
                player.ghostify = {
                        reached: false,
                        times: 0,
                        time: player.totalTimePlayed,
                        best: 9999999999,
                        last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
                        milestones: 0,
                        disabledRewards: {},
                        ghostParticles: 0,
                        multPower: 1,
                        neutrinos: {
                                electron: 0,
                                mu: 0,
                                tau: 0,
                                generationGain: 1,
                                boosts: 0,
                                multPower: 1,
                                upgrades: []
                        },
                        automatorGhosts: setupAutomaticGhostsData()
                }
                player.options.animations.ghostify = true
                aarMod.ghostifyConf = true
        }
        if (aarMod.newGamePlusVersion < 2) {
                if (player.masterystudies!==undefined?!qu_save.reached&&!player.ghostify.reached:true) {
                        player.money=Decimal.max(player.money,1e25)
                        player.infinitiedBank=nMx(player.infinitiedBank,1e6)
                        var filter=["timeMult","dimMult","timeMult2","unspentBonus","27Mult","18Mult","36Mult","resetMult","passiveGen","45Mult","resetBoost","galaxyBoost"]
                        for (var u=0;u<filter.length;u++) if (!player.infinityUpgrades.includes(filter[u])) player.infinityUpgrades.push(filter[u])
                        if (!hasAch("r85")) player.infMult=Decimal.times(player.infMult,4)
                        if (!hasAch("r93")) player.infMult=Decimal.times(player.infMult,4)
                        player.dimensionMultDecrease=2
                        player.tickSpeedMultDecrease=1.65
                        player.eternities=nMx(player.eternities,100)
                        for (var c=2;c<(player.tickspeedBoosts!==undefined?16:inNGM(2)?15:13);c++) if (!player.challenges.includes("challenge"+c)) player.challenges.push("challenge"+c)
                        player.replicanti.unl=true
                        player.replicanti.amount=Decimal.max(player.replicanti.amount,1)
                        if (!player.dilation.studies.includes(1)) player.dilation.studies.push(1)
                }
                if (!hasAch("r77")) player.achievements.push("r77")
                if (!hasAch("r78")) player.achievements.push("r78")
                if (!hasAch("r85")) player.achievements.push("r85")
                if (!hasAch("r93")) player.achievements.push("r93")
                if (!hasAch("r95")) player.achievements.push("r95")
                if (!hasAch("r102")) player.achievements.push("r102")
                if (!hasAch("r131")) player.achievements.push("r131")
                aarMod.newGamePlusVersion=2
        }
        if (aarMod.newGame3PlusVersion < 2.1) {
                player.ghostify.ghostlyPhotons = {
                        unl: false,
                        amount: 0,
                        ghostlyRays: 0,
                        darkMatter: 0,
                        lights: [0,0,0,0,0,0,0,0],
                        maxRed: 0,
                        enpowerments: 0
                }
        }
}

function doNGp3v21tov221(){
        if (aarMod.newGame3PlusVersion < 2.101) {
                var newAchievements=[]
                for (var a=0;a<player.achievements.length;a++) if (player.achievements[a]!="ng3p67") newAchievements.push(player.achievements[a])
                player.achievements=newAchievements
        }
        if (aarMod.newGame3PlusVersion < 2.2) {
                player.ghostify.bl = getBrandNewBosonicLabData()
                player.ghostify.wzb = getBrandNewWZBosonsData()
        }
        if (aarMod.newGame3PlusVersion < 2.21) {
                alert("Welcome to the NG+3.1 update! You are receiving this message because this save has been made before the update. This update changes and rebalances NG+3 significantly. The opportunity of NG+3L has been expired. Your journey now has been re-experienced.")
                var oldBRUpg20Bought = qu_save.bigRip.upgrades.pop()
                if (oldBRUpg20Bought != 20) qu_save.bigRip.upgrades.push(oldBRUpg20Bought)
        }
        if (tmp.ngp3) setupNGP31Versions()

		//To-do: move this
        if (aarMod.newGameMinusMinusVersion === undefined && !player.meta) {
                if (player.exdilation == undefined && player.version == 13) player.version = 12
                if (inNGM(2)) {
                        player.galacticSacrifice.time = (player.lastUpdate - player.galacticSacrifice.last) / 100
                        aarMod.newGameMinusMinusVersion = 1.29
                        delete player.galacticSacrifice.last
                } else if (player.galaxyPoints) aarMod.newGameMinusMinusVersion = 1.1
                else if ((Decimal.gt(player.postC3Reward, 1) && player.infinitied < 1 && player.eternities < 1) || (Math.round(new Decimal(player.achPow).log(5) * 100) % 100 < 1 && Decimal.gt(player.achPow, 1))) aarMod.newGameMinusMinusVersion = 1
                if (player.firstTotalBought != undefined) {
                        player.totalBoughtDims = {}
                        for (d=1;d<9;d++) {
                                var name = TIER_NAMES[d]
                                player.totalBoughtDims[name] = player[name + "TotalBought"]
                                delete player[name + "TotalBought"]
                        }
                        aarMod.newGameMinusMinusVersion = 1.295
                }
                if (player.tickBoughtThisInf) {
                        var haveAutoSacrifice = player.autobuyers[12] % 1 !== 0
                        player.autoSacrifice = haveAutoSacrifice ? player.autobuyers[12] : 1
                        if (haveAutoSacrifice) {
                                player.autoSacrifice.priority = new Decimal(player.autoSacrifice.priority)
                                getEl("prioritySac").value = player.autoSacrifice.priority
                                getEl("13ison").checked = player.autoSacrifice.isOn
                        }
                        var popThis = player.autobuyers.pop()
                        var haveAutoGalSacrifice = popThis % 1 !== 0
                        player.autobuyers[12] = haveAutoGalSacrifice ? popThis : 13
                        if (haveAutoGalSacrifice) {
                                player.autobuyers[12].priority = new Decimal(player.autobuyers[12].priority)
                                getEl("priority14").value = player.autobuyers[12].priority
                                getEl("14ison").checked = player.autobuyers[12].isOn
                        }
                        aarMod.newGameMinusMinusVersion = 1.301
                        updateAutobuyers()
                }
                if (player.dimPowerIncreaseCost) {
                        if (player.challengeTimes[12]) aarMod.newGameMinusMinusVersion = 1.41
                        else aarMod.newGameMinusMinusVersion = 1.4
                }
                if (player.infchallengeTimes[8]) {
                        player.currentChallenge=renameIC(player.currentChallenge)
                        for (c=0;c<player.challenges.length;c++) player.challenges[c]=renameIC(player.challenges[c])
                        player.postC4Tier=player.postC6Tier
                        delete player.postC6Tier
                        aarMod.newGameMinusMinusVersion = 1.5
                        updateChallenges()
                }
                if (Decimal.pow(1e15, player.replicanti.chance*100).times(1e135).div(player.replicanti.chanceCost).gte(1e59)) aarMod.newGameMinusMinusVersion = 2
                if (aarMod.newGameMinusMinusVersion) updateAchievements()
        }
}

function doNGm2v11tov3(){
        if (aarMod.newGameMinusMinusVersion < 1.1) player.galaxyPoints = 0
        if (aarMod.newGameMinusMinusVersion < 1.2) {
                player.galacticSacrifice = {}
                player.galacticSacrifice = resetGalacticSacrifice()
                player.galacticSacrifice.galaxyPoints = player.galaxyPoints
                $.notify('Your NG-- save has been updated because dan-simon made upgrades for Galactic Sacrifice.', 'info')
                aarMod.newGameMinusMinusVersion = 1.2
                delete player.galaxyPoints
        }
        if (aarMod.newGameMinusMinusVersion < 1.21) {
                if (hasGalUpg(11)) for (d=1;d<8;d++) {
                        var name = TIER_NAMES[d]
                        player[name+"Cost"] = Decimal.div(player[name+"Cost"], 10)
                }
        }
        if (aarMod.newGameMinusMinusVersion < 1.22) {
                if (hasGalUpg(11)) for (d=1;d<8;d++) {
                        var name = TIER_NAMES[d]
                        player[name+"Cost"] = Decimal.div(player[name+"Cost"], 10)
                }
        }
        if (aarMod.newGameMinusMinusVersion < 1.24) {
                if (ECComps("eterc6")>0) {
                        forceHardReset=true
                        inflationCheck=true
                        reset_game()
                        forceHardReset=false
                        return
                }
        }
        if (aarMod.newGameMinusMinusVersion < 1.26) {
                if (hasGalUpg(11)) for (d=1;d<8;d++) {
                        var name = TIER_NAMES[d]
                        player[name+"Cost"] = Decimal.times(player[name+"Cost"], 100)
                }
                reduceDimCosts()
        }
        if (aarMod.newGameMinusMinusVersion < 1.295) player.totalBoughtDims = {}
        if (aarMod.newGameMinusMinusVersion < 1.3) {
                player.options.gSacrificeConfirmation = player.options.sacrificeConfirmation
                player.tickBoughtThisInf = resetTickBoughtThisInf()
                player.autobuyers.push(13)
                updateAutobuyers()
        }
        if (aarMod.newGameMinusMinusVersion < 1.3005) {
                if (player.autobuyers[10].interval) player.autobuyers[10].interval = Math.max(player.autobuyers[10].interval / 2.5, 100);
                if (player.autobuyers[11].interval) player.autobuyers[11].interval = Math.max(player.autobuyers[11].interval / 5, 100);
        }
        if (aarMod.newGameMinusMinusVersion < 1.301 && player.currentChallenge=="challenge14" && player.tickBoughtThisInf.pastResets.length<1) player.tickBoughtThisInf.pastResets.push({resets:player.resets,bought:player.tickBoughtThisInf.current-new Decimal(player.tickSpeedCost).e+3})
        if (aarMod.newGameMinusMinusVersion < 1.4) {
                if (player.autobuyers.length>14) {
                        var haveAutoSacrifice = player.autobuyers[12] % 1 !== 0
                        player.autoSacrifice = haveAutoSacrifice ? player.autobuyers[12] : 1
                        if (haveAutoSacrifice) {
                                player.autoSacrifice.priority = new Decimal(player.autoSacrifice.priority)
                                getEl("prioritySac").value = player.autoSacrifice.priority
                                getEl("13ison").checked = player.autoSacrifice.isOn
                        }
                        var popThis = player.autobuyers.pop()
                        var haveAutoGalSacrifice = popThis % 1 !== 0
                        player.autobuyers[12] = haveAutoGalSacrifice ? popThis : 13
                        if (haveAutoGalSacrifice) {
                                player.autobuyers[12].priority = new Decimal(player.autobuyers[12].priority)
                                getEl("priority14").value = player.autobuyers[12].priority
                                getEl("14ison").checked = player.autobuyers[12].isOn
                        }
                } else if (player.autoSacrifice === 0) player.autoSacrifice = 1
                player.extraDimPowerIncrease = 0
                player.dimPowerIncreaseCost = 1e3
        }
        if (aarMod.newGameMinusMinusVersion < 1.41) {
                if (player.version == 13) player.version = 12
                player.challengeTimes.push(600*60*24*31)
                player.challengeTimes.push(600*60*24*31)
                aarMod.newGameMinusMinusVersion = 1.41
        }
        if (aarMod.newGameMinusMinusVersion < 1.5) {
                player.infchallengeTimes.push(600*60*24*31)
                player.infchallengeTimes.push(600*60*24*31)
                aarMod.newGameMinusMinusVersion = 1.5
        }
        if (aarMod.newGameMinusMinusVersion < 1.9) {
                player.replicanti.chanceCost=player.replicanti.chanceCost.div(1e60)
                player.replicanti.intervalCost=player.replicanti.intervalCost.div(1e60)
                player.replicanti.galCost=player.replicanti.galCost.div(1e60)
        }
        if (aarMod.newGameMinusMinusVersion < 1.91) {
                for (tier=1;tier<9;tier++) {
                        let dim = player["infinityDimension"+tier]
                        dim.cost = Decimal.pow(getIDCostMult(tier),dim.baseAmount/10).times(infBaseCost[tier])
                }
        }
        if (aarMod.newGameMinusMinusVersion < 2) {
                for (tier=1;tier<9;tier++) {
                        let dim = player["infinityDimension"+tier]
                        dim.power = Decimal.pow(getInfBuy10Mult(tier), dim.baseAmount/10)
                }
        }
        if (aarMod.newGameMinusMinusVersion < 3) aarMod.newGameMinusMinusVersion = 3
}

function doNGm3v21tov3202() {
        if (aarMod.newGame3MinusVersion < 2.1) {
                player.autobuyers[13]=14
                player.overXGalaxiesTickspeedBoost=1
                player.challengeTimes.push(600*60*24*31)
        }
        if (aarMod.newGame3MinusVersion < 2.2) {
                player.dimPowerIncreaseCost*=300
                var newChallRecords = []
                for (c=0;c<2;c++) newChallRecords.push(player.infchallengeTimes[c])
                newChallRecords.push(600*60*24*31)
                newChallRecords.push(600*60*24*31)
                for (c=2;c<10;c++) newChallRecords.push(player.infchallengeTimes[c])
                player.infchallengeTimes=newChallRecords
        }
        if (aarMod.newGame3MinusVersion < 3) {
                var newUpgs=[]
                for (var u=0;u<player.galacticSacrifice.upgrades.length;u++) if (player.galacticSacrifice.upgrades[u]!=34) newUpgs.push(player.galacticSacrifice.upgrades[u])
                player.galacticSacrifice.upgrades=newUpgs
                aarMod.newGame3MinusVersion = 3
                if (tmp.ngmX >= 4) reduceDimCosts()
        } else if (!tmp.ngmX && player.tickspeedBoosts !== undefined) {
                aarMod.newGame4MinusVersion = 1
                reduceDimCosts()
        }
        if (aarMod.newGame3MinusVersion < 3.201) {
                player.infchallengeTimes.push(600*60*24*31)
                player.infchallengeTimes.push(600*60*24*31)
                aarMod.newGame3MinusVersion = 3.201
        }
        if (aarMod.newGame3MinusVersion < 3.202) {
                player.replicanti.chanceCost = Decimal.pow(10, 150)
                player.replicanti.intervalCost = Decimal.pow(10, 140)
                player.replicanti.galCost = Decimal.pow(10, 170)
                aarMod.newGame3MinusVersion = 3.202
        }
}

function doERSv0tov102(){
        if (aarMod.ersVersion === undefined && player.timestudy.studies.length>0 && typeof(player.timestudy.studies[0])!=="number") {
                newAchievements=[]
                for (id=0;id<player.achievements.length;id++) {
                        var r=player.achievements[id].split("r")[1]
                        newAchievements.push(r==105?"r117":player.achievements[id])
                }
                player.achievements=newAchievements
                player.dimlife=true
                player.dead=true
                for (d=1;d<9;d++) {
                        var name = TIER_NAMES[d]
                        if (costMults[d].lt(player.costMultipliers[d-1])) player[name+"Bought"] += (Math.round(Decimal.div(player.costMultipliers[d-1],costMults[d]).log(player.dimensionMultDecrease))+Math.ceil(Decimal.div(Number.MAX_VALUE,initCost[d]).log(costMults[d]))-1)*10
                        else player[name+"Bought"] += Decimal.div(player[name+"Cost"],initCost[d]).log(costMults[d])*10
                        if (player[name+"Bought"]>0) {
                                if (d>1) player.dead=false
                                if (d<8) player.dimlife=false
                        }
                }
                player.boughtDims=[]
                player.timestudy.ers_studies=[null]
                for (s=1;s<7;s++) player.timestudy.ers_studies[s]=player.timestudy.studies[s]?player.timestudy.studies[s]:0
                player.timestudy.studies=[]
                if (player.eternityChallenges) {
                        player.currentEternityChall=player.eternityChallenges.current?"eterc"+player.eternityChallenges.current:""
                        player.eternityChallUnlocked=player.eternityChallenges.unlocked?"eterc"+player.eternityChallenges.unlocked:0
                        player.eternityChalls={}
                        for (c in player.eternityChallenges.done) player.eternityChalls["eterc"+c]=player.eternityChallenges.done[parseInt(c)]
                }
                player.tickspeed=player.tickspeed.div(Decimal.pow(getTickSpeedMultiplier(),player.totalTickGained))
                player.totalTickGained=0
                player.tickThreshold=new Decimal(1)
                if (player.darkMatter) {
                        player.eterc8repl=player.ec8PurchasesMade.repl
                        player.eterc8ids=player.ec8PurchasesMade.ids
                }
                aarMod.ersVersion=1
                delete player.eternityChallenges
        }
        if (aarMod.ersVersion<1.02) {
                if (hasAch("r85")) player.infMult=player.infMult.times(4)
                if (hasAch("r93")) player.infMult=player.infMult.times(4)
                aarMod.ersVersion=1.02
        }
}

function doNGExpv0tov111(){
        if (aarMod.newGameExpVersion === undefined && !tmp.ngp3 && Decimal.gt(player.infMultCost,10) && Math.round(Decimal.div(player.infMultCost,10).log(4)*1e3)%1e3<1) aarMod.newGameExpVersion = 1
        if (aarMod.newGameExpVersion < 1.11) aarMod.newGameExpVersion = 1.11
}

function doNGUdv0tov11(){
        if (aarMod.newGameUpdateVersion === undefined && player.exdilation != undefined) {
                aarMod.newGameUpdateVersion=1.01
                player.options.animations.blackHole=true
                aarMod.dilationConf=player.options.dilationconfirm
                var newAchievements=[]
                for (id=0;id<player.achievements.length;id++) {
                        r=player.achievements[id].split("r")[1]
                        newAchievements.push(r==148?"ngpp13":r==146?"ngpp18":r>140?"ngud"+(r-130):player.achievements[id])
                        if (r>138) v2_3check=true
                }
                player.achievements=newAchievements
                delete player.options.dilationconfirm
                updateAchievements()
                if (player.version==13) {
                        player.version=12
                        var newDilUpgs=[]
                        for (var u=0;u<player.dilation.upgrades.length;u++) {
                                var id=player.dilation.upgrades[u]
                                if (id>10) id="ngud"+(id-10)
                                newDilUpgs.push(id)
                        }
                        player.dilation.upgrades=newDilUpgs
                        aarMod.newGameUpdateVersion=1.1
                }
        }
        if (aarMod.newGameUpdateVersion<1.01) player.blackholeDimension4.cost=Decimal.min(player.blackholeDimension4.cost,"1e20000")
        if (aarMod.newGameUpdateVersion<1.1) {
                player.version = 12
                aarMod.newGameUpdateVersion=1.1
        }
}

function doExdilationIfUndefined(){
        if (player.exdilation !== undefined) {
                if (player.options.exdilationconfirm === undefined) player.options.exdilationconfirm = true
                if (player.options.exdilationConfirm !== undefined) {
                        player.options.exdilationconfirm = player.options.exdilationConfirm
                        delete player.options.exdilationConfirm
                }
                if (player.meta !== undefined && player.exdilation.spent[4] === undefined) player.exdilation.spent[4] = 0
        }
}

function doIRSv0tov12(){
        if (aarMod.irsVersion < 1.1) {
                player.singularity = {
                        unlocked: false,
                        sacrificed: 0,
                        upgraded: 0,
                        singularityPower: 0,
                        darkMatter: 0
                }
        }
        if (aarMod.irsVersion < 1.2) {
                player.dimtechs = {
                        unlocked: false,
                        discounts: 0,
                        tickUpgrades: 0,
                        respec: false
                }
                for (dim=1;dim<9;dim++) player.dimtechs["dim"+dim+"Upgrades"] = 0
                aarMod.irsVersion = 1.2
        }
}

function doNGM4v0tov2111(){
        if (aarMod.newGame4MinusVersion<2) {
                player.tdBoosts=0
                resetTDs()
        }
        if (aarMod.newGame4MinusVersion<2.1) {
                if ((player.galacticSacrifice.times > 0 || player.infinitied > 0 || player.eternities != 0 || (qu_save !== undefined && qu_save.times > 0) || (player.ghostify !== undefined && player.ghostify.times > 0)) && !player.challenges.includes("challenge1")) player.challenges.push("challenge1")
                player.autobuyers.push(15)
                player.challengeTimes.push(600*60*24*31)
        }
        if (aarMod.newGame4MinusVersion<2.111) aarMod.newGame4MinusVersion=2.111
}

function doNGM5v0tov052(){
        if (aarMod.ngm5V<0.1) aarMod.ngm5V=0.1
        if (aarMod.ngm5V<0.5) {
                player.infDimensionsUnlocked[0]=true
                resetIDs_ngm5()
                resetPDs(true)
        }
        if (aarMod.ngm5V<0.52) aarMod.ngm5V=0.52
}

function doNGSPUpdatingVersion(){
        if (aarMod.nguspV !== undefined) {
                if (player.blackholeDimension5 === undefined) for (var d=5;d<9;d++) player["blackholeDimension"+d] = {
                        cost: blackholeDimStartCosts[d],
                        amount: 0,
                        power: 1,
                        bought: 0
                }
                if (player.dilation.autoUpgrades === undefined) player.dilation.autoUpgrades = []
        }
}

function dov12tov122(){
        if (player.version < 12) {
                for (i=1; i<5; i++) {
                        if (player["timeDimension"+i].cost.gte("1e1300")) {
                                player["timeDimension"+i].cost = Decimal.pow(timeDimCostMults[i]*2.2, player["timeDimension"+i].bought).times(timeDimStartCosts[i])
                        }
                }
                if (player.bestEternity <= 0.01 || player.bestInfinityTime <= 0.01) giveAchievement("Less than or equal to 0.001");
        }
        if (player.version < 12.1) {
                if (hasAch("s36")) {
                        player.achievements.splice(player.achievements.indexOf("s36"), 1)
                        updateAchievements();
                }
        }
        if (player.version < 12.2) {
                player.version = 12.2
                player.sixthCost = Decimal.times(player.sixthCost, 10)
                if (player.meta) player.meta[6].cost = Decimal.times(player.meta[6].cost, 10)
        }
}

function updateVersionsONLOAD(){
	dov7tov10()
	doNGM1Versions()
	if (aarMod.newGamePlusVersion === undefined && player.eternities < 20 && ECComps("eterc1") > 0) aarMod.newGamePlusVersion = 1
	doInitNGp2NOT3Stuff()
	doNGP2v2tov2302()
	doQuantumRestore()
	doNGp3v15tov199()
	doNGp3v199tov19995()
	doNGp3v19995tov21()
	doNGp3v21tov221()
	doNGm2v11tov3()
	doNGm3v21tov3202()
	doERSv0tov102()
	doNGExpv0tov111()
	doNGUdv0tov11()
	doExdilationIfUndefined()
	if (aarMod.ngudpV < 1.12) aarMod.ngudpV = 1.12
	if (aarMod.nguepV < 1.03) aarMod.nguepV = 1.03
	doIRSv0tov12()
	doNGM4v0tov2111()
	doNGM5v0tov052()
	doNGSPUpdatingVersion()
	dov12tov122()
}

function doNGp3Init2(){
	qMs.update()
	qMs.updateDisplay()

	if (!tmp.ngp3) return
	if (tmp.ngp3) {
		setupMasteryStudiesHTML()
		tmp.bl = player.ghostify.bl
		delete tmp.badm
	}

	updateBosonicLimits()

	if (tmp.ngp3) {
		if (player.eternityBuyer.presets === undefined) player.eternityBuyer.presets = {on: false, autoDil: false, selected: -1, selectNext: 0, left: 1, order: []}
		if (player.meta.bestOverQuantums === undefined) player.meta.bestOverQuantums = player.meta.bestAntimatter
		tmp.be=qu_save.bigRip.active&&qu_save.breakEternity.break
		updateQuantumWorth()
		if (qu_save.autoOptions === undefined) qu_save.autoOptions = {}
		if (qu_save.autobuyer.peakTime === undefined) qu_save.autobuyer.peakTime = 0
		if (qu_save.bigRip.bestGals == undefined) qu_save.bigRip.bestGals = 0
		if (player.ghostify.neutrinos.boosts == undefined|| !player.ghostify.times) player.ghostify.neutrinos.boosts = 0
		if (player.ghostify.ghostlyPhotons.maxRed == undefined) player.ghostify.ghostlyPhotons.maxRed = 0
		if (player.ghostify.wzb.unl) giveAchievement("Even Ghostlier than before")
		for (var g = tmp.bl.glyphs.length + 1; g <= br.limits[maxBLLvl]; g++) tmp.bl.glyphs.push(0)
		if (!tmp.bl.usedEnchants.length) tmp.bl.usedEnchants=[]
		if (player.ghostify.wzb.dPUse === undefined) {
			player.ghostify.wzb.dPUse = 0
			player.ghostify.wzb.wQkUp = true
			player.ghostify.wzb.zNeGen = 1
		}
		tmp.bl.odSpeed = Math.max(tmp.bl.odSpeed, 1)
		if (Decimal.eq(player.ghostify.wzb.zNeReq, 0)) player.ghostify.wzb.zNeReq = 1
		updateAutoGhosts(true)
		updateTmp(true)
	}
}

function setConfirmationsDisplay(){
		var sacDisplay = player.resets >= 5 || player.galaxies >= 2 || pH.did("infinity") || (pH.did("galaxy") && tmp.ngmX < 5) ? "inline-block" : "none"
        getEl("confirmations").style.display = sacDisplay
        getEl("confirmation").style.display = sacDisplay
        getEl("sacrifice").style.display = sacDisplay
        getEl("sacConfirmBtn").style.display = sacDisplay

        var gSacDisplay = pH.did("galaxy") && (inNGM(2) && player.galaxies >= 1) ? "inline-block" : "none"
        getEl("gConfirmation").style.display = gSacDisplay
        getEl("gConfirmation").style.display = gSacDisplay
        getEl("gSacrifice").style.display = gSacDisplay
        getEl("gSacConfirmBtn").style.display = gSacDisplay

        getEl("challengeconfirmation").style.display = pH.did("infinity") ? "inline-block" : "none"
        getEl("eternityconf").style.display = pH.did("eternity") ? "inline-block" : "none"
        getEl("dilationConfirmBtn").style.display = (player.dilation.studies.includes(1) || pH.did("quantum")) ? "inline-block" : "none"
        getEl("quantumConfirmBtn").style.display = pH.did("quantum") ? "inline-block" : "none"
        getEl("bigRipConfirmBtn").style.display = tmp.ngp3 && qu_save.bigRip.times ? "inline-block" : "none"
        getEl("ghostifyConfirmBtn").style.display = pH.did("ghostify") ? "inline-block" : "none"
        getEl("leConfirmBtn").style.display = pH.did("ghostify") && player.ghostify.ghostlyPhotons.enpowerments ? "inline-block" : "none"

        getEl("confirmation").checked = !player.options.sacrificeConfirmation
        getEl("sacConfirmBtn").textContent = "Sacrifice confirmation: O" + (player.options.sacrificeConfirmation ? "N" : "FF")
        getEl("gConfirmation").checked = !player.options.gSacrificeConfirmation
        getEl("gSacConfirmBtn").textContent = "Galactic sacrifice confirmation: O" + (player.options.gSacrificeConfirmation ? "N" : "FF")
        getEl("challengeconfirmation").textContent = "Challenge confirmation: O" + (player.options.challConf ? "N" : "FF")
        getEl("eternityconf").textContent = "Eternity confirmation: O" + (player.options.eternityconfirm ? "N" : "FF")
        getEl("dilationConfirmBtn").textContent = "Dilation confirmation: O" + (aarMod.dilationConf ? "N" : "FF")
        getEl("exdilationConfirmBtn").textContent = "Reverse dilation confirmation: O" + (player.options.exdilationconfirm ? "N" : "FF")
        getEl("quantumConfirmBtn").textContent = "Quantum confirmation: O" + (aarMod.quantumConf ? "N" : "FF")
        getEl("bigRipConfirmBtn").textContent = "Big Rip confirmation: O" + (tmp.ngp3 && qu_save.bigRip.conf ? "N" : "FF")
        getEl("ghostifyConfirmBtn").textContent = "Ghostify confirmation: O" + (aarMod.ghostifyConf ? "N" : "FF")
        getEl("leConfirmBtn").textContent = "Light Empowerment confirmation: O" + (aarMod.leNoConf ? "FF" : "N")
}

function setOptionsDisplaysStuff1() {
	setProgressBar("setup")
	getEl("toggleLogRateChange").textContent = "Rate displays: " + ["Normal", "Logarithm", "None"][aarMod.logRateChange]
	getEl("tabsSave").textContent = "Saved tabs: O"+(aarMod.tabsSave.on?"N":"FF")
	updatePerformanceTicks()
	dimDescEnd = (aarMod.logRateChange ? " OoM" : "%") + "/s)"

	getEl("maxHighestTD").parentElement.parentElement.style.display = tmp.ngmX > 3 ? "" : "none"
	getEl("maxHighestTD").textContent = "Max only highest Time Dimensions: O"+(aarMod.maxHighestTD?"N":"FF")

	getEl("chartDurationInput").value = player.options.chart.duration;
	getEl("chartUpdateRateInput").value = player.options.chart.updateRate;
	if (player.options.chart.on) getEl("chartOnOff").checked = true
	else getEl("chartOnOff").checked = false
	if (player.options.chart.dips) getEl("chartDipsOnOff").checked = true
	else getEl("chartDipsOnOff").checked = false

	if (player.options.theme == "Dark" || player.options.theme == "Dark Metro") {
			Chart.defaults.global.defaultFontColor = '#888';
			normalDimChart.data.datasets[0].borderColor = '#888'
	} else {
			Chart.defaults.global.defaultFontColor = 'black';
			normalDimChart.data.datasets[0].borderColor = '#000'
	}

	getEl("infmultbuyer").style.display = getEternitied()>0||player.masterystudies?"inline-block":"none"
	if (!player.options.hotkeys) getEl("hotkeys").textContent = "Enable hotkeys"

	document.getElementsByClassName("hideInMorse").display = player.options.notation == "Morse code" ? "none" : ""

	getEl("hideProductionTab").textContent = (aarMod.hideProductionTab?"Show":"Hide")+" production tab"
	setStatsDisplay()
	getEl("hideRepresentation").textContent=(aarMod.hideRepresentation?"Show":"Hide")+" antimatter representation"
	setAchsDisplay()
	getEl("showAchRowNums").textContent=(aarMod.showAchRowNums?"Hide":"Show")+" achievement row info"
	getEl("hideCompletedAchs").textContent=(aarMod.hideCompletedAchs?"Show":"Hide")+" completed achievement rows"
	getEl("hideSecretAchs").textContent=(aarMod.hideSecretAchs?"Show":"Hide")+" secret achievements"
}

function setDisplaysStuff1(){
	getEl("secretstudy").style.opacity = 0
	getEl("secretstudy").style.cursor = "pointer"
  
	getEl("bestAntimatterType").textContent = player.masterystudies && pH.did("quantum") ? "Your best meta-antimatter for this quantum" : "Your best-ever meta-antimatter"

	let masteryUnl = mTs.unl()
	getEl("masterystudyunlock").style.display = masteryUnl ? "" : "none"
	getEl("respecMastery").style.display = masteryUnl ? "block" : "none"
	getEl("respecMastery2").style.display = masteryUnl ? "block" : "none"

	if (inNGM(2)) {
		getEl("galaxy11").innerHTML = "Normal " + (inNGM(4) ? "and Time " : "") + "Dimensions are " + (pH.did("infinity") ? "cheaper based on your Infinities.<br>Currently: <span id='galspan11'></span>x" : "99% cheaper.") + "<br>Cost: 1 GP"
		getEl("galaxy15").innerHTML = "Normal and Time Dimensions produce " + (pH.did("infinity") ? "faster based on your Infinities.<br>Currently: <span id='galspan15'></span>x" : "100x faster.") + "<br>Cost: 1 GP"
	} else {
		let base = getMPTPreInfBase()
		if (!tmp.ngC) getEl("infi21desc").innerHTML = "Increase the multiplier for buying 10 Dimensions.<br>" + base.toFixed(1) + "x -> " + (base * infUpg12Pow()).toFixed(1) + "x"
		getEl("infi33desc").innerHTML = "Increase the multiplier for each Dimension Boost.<br>2x -> 2.5x"
	}
	getEl("infi24desc").textContent = "Antimatter Galaxies are " + (tmp.ngC ? "quadruple" : "twice") + " as effective."

	for (let u = 1; u <= 4; u++) {
		let benefits = [(u + 4) + "th Dimension unlocked"]
		if (inNGM(3)) benefits.push((u * 5) + " Tickspeed Boosts")
		if (u == 4) benefits.push("an Antimatter Galaxy")
		getEl("infi4" + u + "desc").textContent = "Start with " +
		wordizeList(benefits) + "."
	}

	for (let r = 1; r <= 4; r++) {
		for (let c = 1; c <= 4; c++) {
			let id = c * 10 + r
			getEl("infi" + id + "cost").textContent = INF_UPGS.normal.getCost(id)
		}
	}
}

function setChallengeDisplay(){
        var showMoreBreak = inNGM(2) ? "" : "none"
        for (i=1;i<5;i++) getEl("postinfi0"+i).parentElement.style.display=showMoreBreak
        getEl("d1AutoChallengeDesc").textContent=(tmp.ngmX>=4?"Galactic Sacrifice":"Big Crunch")+" for the first time."
        getEl("d5AutoChallengeDesc").textContent=tmp.exMode?"Each Dimension Boost reduces your tickspeed reduction by 0.1% additively, but galaxies are 50% stronger.":inNGM(2)?"Tickspeed upgrades"+(player.tickspeedBoosts==undefined?"":" and Tickspeed Boosts")+(tmp.ngmX>=4?" are weaker":" start out useless")+", but galaxies make them stronger.":"Tickspeed starts at 7%."
        getEl("tbAutoChallengeDesc").textContent=player.tickspeedBoosts==undefined?"Whenever you buy 10 of a dimension or tickspeed, everything else of equal cost will increase to its next cost step.":"You can't get Tickspeed Boosts and Antimatter Galaxies are 25% weaker."
        getEl("autoDBChallengeDesc").textContent="There are only 6 dimensions, with Dimension Boost"+(player.tickspeedBoosts==undefined?"":", Tickspeed Boost,")+" and Antimatter Galaxy costs modified."
        getEl("autoCrunchChallengeDesc").textContent="Each Normal Dimension produces the Dimension 2 tiers before it; First Dimensions produce reduced antimatter. "+(inNGM(2)?"Galaxies are far more powerful.":"")
        getEl("autoDSChallengeDesc").textContent=player.tickspeedBoosts==undefined?"Per-ten multiplier is always 1x, but the product of dimensions bought multiplies all dimensions.":"The product of amount is used instead of the product of bought."
        getEl("autoGSChallengeDesc").textContent=tmp.ngmX>=4?"You can hold up to 10 total Dimension Boosts, Time Dimension Boosts, Tickspeed Boosts, and Galaxies.":(tmp.ngmX>2?"All galaxy upgrades from the third column are disabled and Tickspeed Boosts give 20 free tickspeed purchases each instead.":"You can only get 308 tickspeed upgrades. This count does not reset on resets.")
        getEl("autoTBChallengeDesc").textContent=tmp.ngmX>=4?"Dimension Boosts and Time Dimension Boosts divide Tickspeed Multiplier instead.":"Dimension Boosts and Galaxies only boost Galaxy point gain and Tickspeed Boosts are nerfed, but Galaxy points boost Tickspeed Boosts."
        getEl("infPowEffectPowerDiv").innerHTML = inNGM(2) || tmp.ngC ? "which is raised by <span id='infPowEffectPower' style='font-size:35px; color: black'></span>, and then t" : "which is t"
        getEl("ngmmchalls").style.display=inNGM(2)?"":"none"
        getEl("ngmmmchalls").style.display=player.tickspeedBoosts==undefined?"none":""
        getEl("ngm4chall").style.display=tmp.ngmX>3?"":"none"
        getEl("irschalls").style.display=player.infinityUpgradesRespecced==undefined?"none":""
}

function setInfChallengeDisplay(){
	let ngmm = inNGM(2)
	let ngm3 = player.tickspeedBoosts !== undefined

	if (ngmm) {
		getEl("icngmm_row").style.display=""
		getEl("icngmm_3div").style.display=""
		getEl("ic2div").style.display="none"
		getEl("icngmm_4div").style.display=""
		getEl("ic3div").style.display="none"
		getEl("icngmm_4div").appendChild(getEl("postc2").parentElement.parentElement)
	} else {
		getEl("icngmm_row").style.display="none"
		getEl("icngmm_3div").style.display="none"
		getEl("ic2div").style.display=""
		getEl("icngmm_4div").style.display="none"
		getEl("ic3div").style.display=""
		getEl("ic2div").appendChild(getEl("postc2").parentElement.parentElement)
	}
	getEl("postc2reward").textContent = "Reward: "+(inNGM(2)?"S":"Get the sacrifice autobuyer, and s")+"acrifice is more powerful."

	if (!ngm3) {
		getEl("icngm3_row").style.display="none"
		getEl("icngm3_row2").style.display="none"
		getEl("icngm3_div1").style.display="none"
		galCosts[31]=2
		galCosts[12]=3
		galCosts[32]=8
		galCosts[13]=20
		galCosts[33]=1e3
		getEl("ic4div").appendChild(getEl("postc4").parentElement.parentElement)
		getEl("ic4div").style.display=""
	} else {
		getEl("icngm3_row").style.display=""
		getEl("icngm3_row2").style.display=""
		getEl("icngm3_div1").style.display=""
		galCosts[31]=5
		galCosts[12]=5
		galCosts[32]=20
		galCosts[13]=50
		galCosts[33]=1e15
		getEl("icngm3_div2").appendChild(getEl("postc4").parentElement.parentElement)
		getEl("ic4div").style.display="none"
	}

	order = []
	if (ngmm) {
		order.push("postcngmm_1")
		order.push("postcngmm_2")
	}
	if (ngm3) {
		order.push("postcngm3_1")
		order.push("postcngm3_2")
	}
	if (ngmm) order.push("postcngmm_3")
	order.push("postc1")
	order.push("postc2")
	if (!ngmm) order.push("postc3")
	if (ngm3) order.push("postcngm3_3")
	order.push("postc4")
	if (ngm3) order.push("postcngm3_4")
	for (let c = 5; c <= 8; c++) order.push("postc" + c)
	if (tmp.ngC) {
		order.push("postcngc_1")
		order.push("postcngc_2")
	}
	getEl("icngc_row").style.display = tmp.ngC ? "" : "none"

	identifyICs()
}

function setOtherChallDisplay(){
        getEl("galaxy21").innerHTML=(player.tickspeedBoosts!=undefined?"Reduce the Dimension Boost cost multiplier to "+(tmp.ngmX>3?10:5):"Dimension Boost scaling starts 2 boosts later, and increases the cost by 5 each")+".<br>Cost: 1 GP"
        getEl("galaxy12").innerHTML="Normal "+(tmp.ngmX>3?"and Time D":"D")+"imensions gain a multiplier based on time spent in this Galactic Sacrifice.<br>Currently: <span id='galspan12'>x</span>x<br>Cost: "+galCosts[12]+" GP"
        getEl("galBuff22").textContent=tmp.ngmX>3?2:5
        getEl("galaxy13").innerHTML="Normal "+(tmp.ngmX>3?"and Time D":"D")+"imensions gain a multiplier based on your Galaxy points.<br>Currently: <span id='galspan13'>x</span>x<br>Cost: "+galCosts[13]+" GP"
        getEl("galDesc23").textContent="Dimension "+(tmp.ngmX>3?" Boosts and Time Dimension B":"B")+"oosts are stronger based on your Galaxy points."
        getEl("galcost31").textContent=galCosts[31]
        getEl("galcost32").textContent=galCosts[32]
        getEl("preinfupgrades").style.display=player.infinityUpgradesRespecced?"none":""
        getEl("infi1div").style.display=player.infinityUpgradesRespecced==undefined?"none":""
        getEl("infi3div").style.display=player.infinityUpgradesRespecced==undefined?"none":""
        getEl("postinfbtn").style.display=player.infinityUpgradesRespecced?"none":""
  
        if (player.infinityUpgradesRespecced != undefined) order = []
        getEl("ic1desc").textContent="All the previous challenges (except for the Tickspeed challenge"+(inNGM(2)?',':" and")+" Automatic Big Crunch challenge"+(inNGM(2)?", and Automatic Galactic Sacrifice challenge":"")+") are applied at once."
        getEl("ic1reward").textContent="Reward: Get "+(inNGM(2)?2:1.3)+"x on all Infinity Dimensions for each Infinity Challenge completed."
        getEl("ic2desc").textContent=(player.tickspeedBoosts==undefined?"":"Infinity Dimensions are disabled, but Sacrifice is way stronger. ")+"You automatically sacrifice every 8 ticks once you have the 8th Dimension."
        getEl("ic4desc").textContent=player.tickspeedBoosts==undefined?"Only the latest bought Normal Dimension's production is normal, all other Normal Dimensions produce less.":"All Normal Dimension multipliers are square rooted without the dilation penalty."
        getEl("ic5desc").textContent=player.tickspeedBoosts==undefined?"When buying Normal Dimensions 1-4, everything with costs smaller or equal increases. When buying Normal Dimensions 5-8, everything with costs bigger or equal increases. When buying tickspeed, everything with the same cost increases.":"You can't get tickspeed upgrades and galaxies. Tickspeed Boosts boost tickspeed instead."
        getEl("ic7desc").textContent="You can't get Antimatter Galaxies, but the Dimension Boost multiplier "+(inNGM(2)?"is cubed":"is increased to 10x")+"."
        getEl("ic7reward").textContent="Reward: The Dimension Boost multiplier "+(inNGM(2)? "is squared":" is increased to 4x.")
}

function setReplDisplay() {
	getEl("replDesc").textContent = tmp.ngC ? "IP gain & all Normal Dimensions (after softcaps)" : "all Infinity Dimensions"
	getEl("replicantiresettoggle").textContent="Auto galaxy "+(player.replicanti.galaxybuyer?"ON":"OFF")+(!canAutoReplicatedGalaxy()?" (disabled)":"")
}

function setTSDisplay(){
        getEl("41desc").textContent=tsMults[41]()
        getEl("42desc").textContent=inNGM(2)?"Galaxy cost multiplier is reduced by "+Math.round(tsMults[42]()*15)+"/15x.":"Galaxy cost increases by "+(60*tsMults[42]())+" 8ths instead of 60."
        getEl("61desc").innerHTML=tsMults[61]()+"x more EP"
        getEl("62desc").textContent=tsMults[62]()
        getEl("81desc").textContent=inNGM(2)?"is cubed":"becomes 10x"
        getEl("131desc").textContent = tmp.ngC ? "You can get 50% more replicanti galaxies" : "Automatic replicanti galaxies are disabled, but you can get 50% more"
        getEl("181desc").textContent = "You gain " + (inNGM(2) && player.tickspeedBoosts === undefined ? "1% of your GP and IP gain on next reset" : "1% of your IP gained on crunch") + " each second" + (tmp.ngC ? ", and the first three IP softcaps are 90% weaker":"")
        getEl("191desc").textContent = "You bank 5% of your Infinities on Eternity."
        getEl("211desc").textContent=tsMults[211]()
        getEl("213desc").textContent=tsMults[213]()
        getEl("222desc").textContent=tsMults[222]()
}

function updateNGp3DisplayStuff(){
	getEl('rebuyupgauto').textContent="Rebuyable upgrade auto: O"+(player.autoEterOptions.rebuyupg?"N":"FF")
	getEl('dilUpgsauto').textContent="Auto-buy dilation upgrades: O"+(player.autoEterOptions.dilUpgs?"N":"FF")
	getEl('metaboostauto').textContent="Meta-boost auto: O"+(player.autoEterOptions.metaboost?"N":"FF")
	getEl('priorityquantum').value=formatValue("Scientific", new Decimal(qu_save.autobuyer.limit), 2, 0)
	getEl("ratio_r").value = qu_save.assignAllRatios.r
	getEl("ratio_g").value = qu_save.assignAllRatios.g
	getEl("ratio_b").value = qu_save.assignAllRatios.b
	getEl('autoAssign').textContent="Auto: O"+(qu_save.autoOptions.assignQK?"N":"FF")
	getEl('autoAssignRotate').textContent="Rotation: "+(qu_save.autoOptions.assignQKRotate>1?"Left":qu_save.autoOptions.assignQKRotate?"Right":"None")
	getEl("ghostifyAnimBtn").textContent="Ghostify: O"+(player.options.animations.ghostify?"N":"FF")
	getEl("gphUnl").textContent="To unlock Ghostly Photons, you need to get "+shortenCosts(Decimal.pow(10,6e9))+" antimatter while your universe is Big Ripped first."
	updateBLUnlockDisplay()
	getEl("odSlider").value=Math.round((tmp.bl.odSpeed-1)/4*50)
	for (var g=1;g<=br.limit;g++) getEl("typeToExtract"+g).className=tmp.bl.typeToExtract==g?"chosenbtn":"storebtn"

	handleDispOnQuantum()
	updateBraveMilestones()
	updateNeutrinoBoosts()
	updateNeutrinoUpgradeUnlocks(5, 12)
	tmp.updateLights = true
	updateGPHUnlocks()
	updateBLUnlocks()
	updateBosonicStuffCosts()
}

function setSomeQuantumAutomationDisplay(){
        var suffix = "NG" + (player.meta != undefined ? "pp" : "ud")
        getEl("uhDiv" + suffix).appendChild(getEl("Universal harmony"))
        getEl("feDiv" + suffix).appendChild(getEl("In the grim darkness of the far endgame"))
        getEl("dil12desc").textContent = tmp.ngp3 ? "Tachyonic Galaxies scale slower." : "Tachyonic Galaxies scale slower, but reset dilated time and those galaxies."
        getEl("dil13desc").textContent = tmp.ngp3 ? "Tachyonic Galaxies scale slower." : "Tachyonic Galaxies scale slower, but reset dilated time and those galaxies."
        getEl("dil14desc").textContent = aarMod.nguspV ? "Make the TP multiplier upgrade more powerful." : "Increase the exponent of the TP formula."
        getEl("dil52").style["font-size"] = !tmp.ngp3 || aarMod.nguspV !== undefined ? "10px" : "9px"
        getEl("dil52formula").style.display = !tmp.ngp3 || aarMod.nguspV !== undefined ? "none" : ""
        getEl("exDilationDesc").innerHTML = aarMod.nguspV ? 'making galaxies <span id="exDilationBenefit" style="font-size:25px; color: black">0</span>% stronger in dilation.' : 'making dilation <span id="exDilationBenefit" style="font-size:25px; color: black">0</span>% less severe.'
        getEl("metaAntimatterEffectType").textContent = "power to Dimension Boosts"
        if (player.meta) {
                getEl('epmultauto').textContent="Auto: O"+(player.autoEterOptions.epmult?"N":"FF")
                for (i=1;i<9;i++) getEl("td"+i+'auto').textContent="Auto: O"+(player.autoEterOptions["td"+i]?"N":"FF")
        }
        getEl('replicantibulkmodetoggle').textContent="Mode: "+(player.galaxyMaxBulk?"Max":"Singles")
        getEl('versionDesc').style.display = tmp.ngp3 ? "" : "none"
		if (tmp.ngp3) {
			getEl('versionDescAlpha').style.display = beta ? "" : "none"
			getEl('warningBeta').textContent = beta ? "THIS BETA IS CURRENTLY IN ALPHA, ANYTHING CAN BREAK" :
				"THIS UPDATE IS CURRENTLY IN BETA, ANYTHING CAN BREAK"
		}
}

function setReplAutoDisplay(){
        getEl('replicantigalaxypowerdiv').style.display=hasAch("r106")&&player.boughtDims?"":"none"
        getEl("blackHoleAnimBtn").style.display="none"
        if (player.exdilation != undefined) {
                if (player.dilation.studies.includes(1)) getEl("dilationeterupgrow").style.display="table-row"
                getEl("blackHoleAnimBtn").textContent = "Black hole: " + ((player.options.animations.blackHole) ? "ON" : "OFF")
                getEl("blackholeMax").style.display = aarMod.ngudpV || aarMod.nguspV ? "" : "none"
                getEl("blackholeAuto").style.display = aarMod.ngudpV && hasAch("ngpp17") ? "" : "none"
                getEl('blackholeAuto').textContent="Auto: O"+(aarMod.ngudpV&&player.autoEterOptions.blackhole?"N":"FF")
                if (player.blackhole.unl == true) {
                        getEl("blackholediv").style.display="inline-block"
                        getEl("blackholeunlock").style.display="none"
                        getEl("blackHoleAnimBtn").style.display="inline-block"
                } else {
                        getEl("blackholediv").style.display="none"
                        getEl("blackholeunlock").style.display="inline-block"
                }
        }
}

function updateNGModeMessage(){
	let condensed = player.condensed !== undefined

	ngModeMessages = []

	//Difficulties
	if (tmp.bgMode) ngModeMessages.push("Welcome to Beginner Mode! This is a easy version of Antimatter Dimensions. I don't recommend you to play this mode if you experience incremental games.")
	if (tmp.exMode) ngModeMessages.push("Welcome to Expert Mode! This is a quite harder version of Antimatter Dimensions. This is a intermediary step, between normal and hardcore difficulties. It is neccessary to play this mode if you want to go hardcore mode for the first time. Have fun!")
	if (tmp.dtMode) ngModeMessages.push("Welcome to Death Mode! This is a more difficult version of Antimatter Dimensions. Please note that this mod is in beta and may be unfinished. If you experience unbalancing, report it to #other_modifications in the Discord server. Good luck!")

	//Others
	if (aarMod.newGameMult) ngModeMessages.push("Welcome to NG Multiplied, made by Despacit and Soul147! This mode adds many buffs which may break the game, similar to NG^.")
	if (aarMod.newGameExpVersion) ngModeMessages.push("Welcome to NG^, made by Naruyoko! This mode adds many buffs to features that can end up unbalancing the game significantly.")
	if (condensed) {
                ngModeMessages.push("Welcome to NG Condensed, made by Jacorb! This mode significantly changes the game, including NG+++, to speed it up while also adding new features along the way. Have fun! :)")
                ngModeMessages.push("WARNING! NG Condensed is in Beta! Some content is not completely balanced yet. Currently, everything is balanced until Meta Dimensions (only ported until ECs).")
	}
	if (player.meta!==undefined||player.exdilation!==undefined) {
		if (!aarMod.newGamePlusVersion && !condensed) ngModeMessages.push("You have disabled NG+ features on NG++. This means you start off from the beginning of Antimatter Dimensions without any buffs, and with NG+3 enabled, it can be considered as The Grand Run. If you want to go for it, good luck.")

		if (player.exdilation!==undefined) {
			if (aarMod.nguspV) ngModeMessages.push("Welcome to NG Update Semiprime, made by Aarex! This is like NGUd', but with balancing changes implemented. Good luck! :)")
			if (aarMod.ngumuV||aarMod.nguepV) {
				if (aarMod.ngumuV) ngModeMessages.push("Welcome to NG Update Multiplied Prime, made by Aarex! This is a NG*-like mod of NGUd'. This mod will thus be very fast, but it's unlikely that you will break it.")
				if (aarMod.nguepV) ngModeMessages.push("Welcome to NG Update Exponential Prime, made by pg132! NGUd^' is like NGUd', but nerfs unrelated to the Black Hole are removed to make NGUd^' a NG^-like mod of NGUd'. This mod will be fast as a result, but it is somewhat unlikely that you will break it.")
			} else if (aarMod.nguspV) {}
			else if (aarMod.ngudpV) ngModeMessages.push("Welcome to NG Update Prime, made by pg132! NGUd' is like NGUd+, but you can't reverse dilation. Good luck for beating this mod. >:)")
			else if (player.meta!==undefined) ngModeMessages.push("Welcome to NG Update+, a combination made by Soul147 (Sigma)! This is a combination of dan-simon's NG Update and Aarex's NG+++, which can end up unbalancing the game because of some mechanics.")
			else ngModeMessages.push("Welcome to NG Update, made by dan-simon! In this mod, Black Hole and Ex-Dilation are available after the endgame of the vanilla Antimatter Dimensions.")
		} else if (player.masterystudies && !aarMod.ngp3mpV) ngModeMessages.push("Welcome to NG+++ mode, the extension of dan-simon's NG++, made by Aarex! There is a lot of content in this mod, so good luck!")
		else ngModeMessages.push("Welcome to NG++, made by dan-simon! In this mode, more Dilation upgrades and Meta Dimensions are added to push the endgame further. Disclaimer: This is not NG+3, there is no Quantum content available.")
	} else if (aarMod.newGamePlusVersion) ngModeMessages.push("Welcome to NG+, made by usavictor and Aarex! You start with many things unlocked and given to you immediately to get through the early game faster.")
	if (player.infinityUpgradesRespecced) ngModeMessages.push('Welcome to Infinity Respecced, created by Aarex! In this mode, all of infinity upgrades are replaced with new upgrades except for the 2x IP mult, Break Infinity is removed, but there is new content in Infinity.')
	if (player.boughtDims) ngModeMessages.push('Welcome to Eternity Respecced, created by dan-simon! In this mode, Eternity is changed to be balanced better without any scaling. Note: The port is not complete on this site, so you should search for the separate website for the mod itself to get the latest version.')
	if (inNGM(2)) {
		if (tmp.ngmX>4) ngModeMessages.push('Welcome to NG-5, the nerfed version of NG-4! This is very hardcore because you are stuck in more challenges. You are also stuck in Automated Big Crunches Challenge which is a big impact on this mod. Good luck! This mod is made by Aarex, with help from Anthios, Apeirogon, and TheMkeyHolder.')
		else if (tmp.ngmX>3) ngModeMessages.push('Welcome to NG-4, the nerfed version of NG-3! This mode features even more changes from NG---, and is very hardcore. WIP by Nyan Cat and edited by Aarex.')
		else if (aarMod.newGame3MinusVersion) ngModeMessages.push('Welcome to NG-3, the nerfed version of NG--! This mode reduces tickspeed multiplier multiplier and nerfs galaxies, but has a new feature called \"Tickspeed Boosts\" and many more changes to NG--.')
		else ngModeMessages.push('Welcome to NG--, created by Nyan cat! You are always in Dilation and IC3, but there is a new layer called Galactic Sacrifice.')
	}
	if (aarMod.newGameMinusVersion) ngModeMessages.push("Welcome to NG-, created by slabdrill! Originally made as a save file modification, NG- is now ported as a 'mod'. Everything in the original Antimatter Dimensions is nerfed, making the endgame harder to reach.")
	if (aarMod.aau) ngModeMessages.push("You have applied the AAU 'mod', made by Apeirogon. This will unbalance many areas of the game, as you get all achievements available in your save along with their rewards. It is not recommended to choose this 'mod' for this reason, unless you want fast gameplay.")
	if (aarMod.ls) ngModeMessages.push("You have applied the Light Speed 'mod', made by Aarex Tiaokhiao. This will unbalance many areas of the game, as you can speed up some mechanics, including the entire game. It is not recommended to choose this 'mod' for this reason, unless you want fast gameplay.")

	if (inflationCheck) ngModeMessages = ["I'm terribly sorry, but it seems there has been an inflation problem in your save, which is why this save file has been reset."]
	if (forceToQuantumAndRemove) {
		quantum(false, true, 0)
		ngModeMessages = ["Due to balancing changes, you are forced to quantum and reset your TT and your best TP, but you are given  " + shorten(setTTAfterQuantum) + " TT as compensation."]
		player.timestudy.theorem = setTTAfterQuantum
		player.dilation.bestTP = new Decimal(0)
		getEl('bestTP').textContent = "Your best Tachyon particles was 0."
	}
}


function onLoad(noOffline) {
	qu_save = player.quantum
	aarMod = player.aarexModifications
	if (qu_save == undefined || aarMod.newGamePlusPlusVersion == undefined) {
		tmp.quActive = false
		tmp.quUnl = false
		qMs.tmp.amt = 0
	}
	ghostifyDenied = 0
	setEverythingPreNGp3onLoad()
	setAarexModIfUndefined()

	tmp.bgMode = aarMod.ez !== undefined
	tmp.exMode = aarMod.ngexV !== undefined
	tmp.dtMode = aarMod.dtMode
	doNGp3Init1()

	setSaveStuffHTML()

	setSomeEterEraStuff2()
	setSomeEterEraStuff()

	clearOldAchieves()

	ngmR.compile()
	tmp.ngmX = calcNGMX()
	if (tmp.ngmX) aarMod.ngmX = tmp.ngmX
	ngC.compile()
	ngSg.compile()

	pH.reset()
	ls.reset()

	setupTimeStudies()
	performedTS = false
	updateVersionsONLOAD()
	doInitInfMultStuff()
	transformSaveToDecimal()
	doNGp3Init2()
	for (s = 0; s < (player.boughtDims ? 4 : 3); s++) toggleCrunchMode(true)
	updateAutoEterMode()
	pH.updateDisplay()
	setConfirmationsDisplay()
	setOptionsDisplaysStuff1()
	updateHotkeys()
	setDisplaysStuff1()
	setChallengeDisplay()
	setInfChallengeDisplay()
	updateSingularity()
	updateDimTechs()
	setOtherChallDisplay()
	setReplDisplay()
	setTSDisplay()
	setReplAutoDisplay()
	setSomeQuantumAutomationDisplay()
	if (tmp.ngmX >= 5) {
		updateParadoxUpgrades()
		updatePUCosts()
		updateGalstones()
        ParadoxUpgradeButtonTypeDisplay() // ng-5 updating
	}
	updateGalaxyTabs()
	if (tmp.ngp3) updateNGp3DisplayStuff()
	handleDispOutOfQuantum()
	hideDimensions()
	updateChallenges()
	updateNCVisuals()
	updateChallengeTimes()
	checkForEndMe()
	updateAutobuyers()
	updatePriorities()
	updateMilestones()
	loadInfAutoBuyers()
	updateEternityUpgrades()
	updateTheoremButtons()
	updateTimeStudyButtons()
	toggle_preset_reset(true)
	updateRespecButtons()
	updateEternityChallenges()
	updateEterChallengeTimes()
	updateDilationUpgradeCosts()
	updateExdilation()
	handleDispOnQuantum()
	maybeShowFillAll()
	updateLastTenGhostifies()
	onNotationChangeNeutrinos()
	setAchieveTooltip()
	if (player.boughtDims) {
		if (getEl("timestudies").style.display=="block") showEternityTab("ers_timestudies",true)
		updateGalaxyControl()
	} else if (getEl("ers_timestudies").style.display=="block") showEternityTab("timestudies",true)
	poData=metaSave["presetsOrder"+(player.boughtDims?"_ers":"")]
	setAndMaybeShow('bestTP', tmp.quUnl, () => "Your best Tachyon Particles was " + shorten(player.dilation.bestTP) + ".")
	getEl('autoDisableQuantum').style.display=hasAch("ng3p66")?"":"none"
	getEl("quarksAnimBtn").style.display=pH.did("quantum")&&player.masterystudies?"inline-block":"none"
	getEl("quarksAnimBtn").textContent="Quarks: O"+(player.options.animations.quarks?"N":"FF")

	var removeMaxTD = false
	if (hasAch("ngpp17")) {
		for (d = 1 ; d <= 8; d++) {
			if (player.autoEterOptions["td" + d]) if (d == 8) removeMaxTD=true
			else break
		}
	}
	getEl("maxTimeDimensions").style.display = removeMaxTD ? "none" : ""

	getEl("ghostifyAnimBtn").style.display=pH.did("ghostify")?"inline-block":"none"
	notifyId=qMs.tmp.amt
	notifyId2=player.masterystudies===undefined?0:player.ghostify.milestones
	showHideFooter()
	getEl("newsbtn").textContent=(player.options.newsHidden?"Show":"Hide")+" news ticker"
	getEl("game").style.display=player.options.newsHidden?"none":"block"

	var tabsSave = aarMod.tabsSave
	showDimTab((tabsSave.on && tabsSave.tabDims) || 'antimatterdimensions')
	showStatsTab((tabsSave.on && tabsSave.tabStats) || 'stats')
	showAchTab((tabsSave.on && (tabsSave.tabAchs == 'normalachievements' || tabsSave.tabAchs == 'secretachievements') && tabsSave.tabAchs) || 'normalachievements')
	showChallengesTab((tabsSave.on && tabsSave.tabChalls) || 'normalchallenges')
	showGalTab((tabsSave.on && tabsSave.tabGalaxy && player.pSac !== undefined) || 'galUpgs')
	showAutoTab((tabsSave.on && tabsSave.tabAuto) || 'autobuyers')
	showInfTab((tabsSave.on && tabsSave.tabInfinity) || 'preinf')
	showEternityTab((tabsSave.on && tabsSave.tabEternity) || 'timestudies', true)
	if (tmp.ngp3) {
		showQuantumTab((tabsSave.on && tabsSave.tabQuantum) || 'uquarks')
		fluc.showTab((tabsSave.on && tabsSave.tabFluc) || 'ffTab')
		showNFTab((tabsSave.on && tabsSave.tabNF) || 'nanoverse')
		showGhostifyTab((tabsSave.on && tabsSave.tabGhostify) || 'neutrinos')
		showBLTab((tabsSave.on && tabsSave.tabBL) || 'bextab')
	}
	if (!player.options.newsHidden) scrollNextMessage()
	getEl("secretoptionsbtn").style.display=player.options.secrets?"":"none"
	getEl("ghostlynewsbtn").textContent=((player.options.secrets!==undefined?player.options.secrets.ghostlyNews:false)?"Hide":"Show")+" ghostly news ticker"

	updateConvertSave(eligibleConvert())
	pauseGame(true)

	getEl("welcome").style.display = "none"
	getEl("ghostlyNewsTicker").style.height=((player.options.secrets!==undefined?player.options.secrets.ghostlyNews:false)?24:0)+"px"
	getEl("ghostlyNewsTickerBlock").style.height=((player.options.secrets!==undefined?player.options.secrets.ghostlyNews:false)?16:0)+"px"
	resetUP()
	updateAchievements()

	if (player.totalTimePlayed < 1 || inflationCheck || forceToQuantumAndRemove) {
		updateNGModeMessage()
		inflationCheck = false
		infiniteCheck = false
		closeToolTip()
		showNextModeMessage()
	} else if (welcomeUpdates.length) {
		ngModeMessages = []
		inflationCheck = false
		infiniteCheck = false
		closeToolTip()
		showNextModeMessage()
	}

	if (aarMod.offlineProgress && !aarMod.pause && !noOffline) {
		let diff = new Date().getTime() - player.lastUpdate
		if (diff > 1e6) simulateTime(diff / 1000)
	} else player.lastUpdate = new Date().getTime()
}


/*
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
END OF ONLOAD
*/

var welcomeUpdates = []
function setupNGP31Versions() {
	if (aarMod.ngp3lV) {
		alert("NG+3L is no longer supported. This save will now go through a mandatory migration to NG+3R.")
		delete aarMod.ngp3lV
	}

	if (!qu_save.pos) qu_save.pos = pos.setup()
	delete player.ghostify.hb
	aarMod.newGame3PlusVersion = 3

	//NG+3R Builds
	var rollback = 0
	if (aarMod.ngp3Build === undefined) aarMod.ngp3Build = 0
	if (aarMod.ngp3Build < 20210517) {
		delete qu_save.challenge
		delete qu_save.challenges
		delete qu_save.challengeRecords
		delete qu_save.pairedChallenges
		delete qu_save.qcDataMods
		delete qu_save.qcDataNoDil
		delete qu_save.nonMAGoalReached
	}
	if (aarMod.ngp3Build < 20210519) qu_save.quarkEnergy = qu_save.bestEnergy || 0
	if (aarMod.ngp3Build < 20210529) QCs_save.qc5 = new Decimal(0)
	if (aarMod.ngp3Build < 20210614 && player.masterystudies.includes("d7")) {
		alert("Your mastery studies has been respecced due to the rework of Positronic-era studies.")
		mTs.respec(true)
	}
	if (aarMod.ngp3Build < 20210625 && (player.masterystudies.includes("t241") || player.masterystudies.includes("t282"))) resetReplicantiUpgrades()
	if (player.dilation.studies.includes(1) && !canUnlockDilation()) {
		player.timestudy.theorem += 4000
		player.dilation.studies = []
	}
	if (aarMod.ngp3Build < 20210802) PCs.reset()
	if (aarMod.ngp3Build < 20210802 && Decimal.log10(player.money) >= 2e13) rollback = 1e20
	if (aarMod.ngp3Build < 20210829) str_save.vibrated = []
	if (aarMod.ngp3Build < 20211204 && Decimal.log10(player.money) >= 6e13) rollback = 1e190

	welcomeUpdates = []
	if (aarMod.ngp3Build) {
		if (!aarMod.ngp3r) aarMod.ngp3r = 0
		if (aarMod.ngp3r < 0.5) welcomeUpdates.push(0.5)
		if (aarMod.ngp3r < 0.6) welcomeUpdates.push(0.6)
		if (aarMod.ngp3r < 0.61) welcomeUpdates.push(0.61)
		if (aarMod.ngp3r < 0.611) welcomeUpdates.push(0.611)

		if (!beta && (aarMod.ngp3Alpha ? aarMod.ngp3r == 0.7 : aarMod.ngp3r < 0.7)) welcomeUpdates.push(0.7)
		if (beta && aarMod.ngp3r < 0.7) welcomeUpdates.push("alpha")
	}
	aarMod.ngp3r = 0.7
	aarMod.ngp3Alpha = beta
	aarMod.ngp3Build = 20211216

	if (tmp.ngp3_boost && !player.timestudy.auto) player.timestudy.auto = {}
	if (rollback) {
		rollbackQuantum(rollback)
		if (rollback <= 1e190) fluc.resetLayer()
	}
}

function checkNGM(imported) {
	var temp = imported || player
	var td1PowerDiv = Decimal.pow(2, player.timeDimension1.bought).div(player.timeDimension1.power).toNumber()
	if (Math.round(td1PowerDiv) == 100) return 2.2
	if (Math.round(td1PowerDiv*8) == 5) return 2.1
	if (Math.round(td1PowerDiv) == 5) return 2
	if (Math.round(new Decimal(temp.timestudy.ipcost).mantissa) != 1) return 1.1
	if (Math.round(td1PowerDiv) == 10) return 1
	return 0
}

var savePlacement
function load_game(noOffline, init) {
	if (!metaSave.saveOrder.includes(metaSave.current)) metaSave.current = metaSave.saveOrder[0]
	var dimensionSave = get_save(metaSave.current)
	infiniteDetected = false
	if (dimensionSave!=null) {
		if (dimensionSave.quantum !== undefined) if (dimensionSave.quantum.timeFluxPower !== undefined) dimensionSave = get_save(metaSave.current + "_af2019")
		player = dimensionSave
		if (detectInfinite()) infiniteCheck=true
	}
	savePlacement=1
	while (metaSave.saveOrder[savePlacement - 1] != metaSave.current) savePlacement++
	if (break_infinity_js == null) {
		if (aarMod) break_infinity_js = aarMod.breakInfinity
		if (break_infinity_js) Decimal = Decimal_BI
		initCost = [null, new Decimal(10), new Decimal(1e2), new Decimal(1e4), new Decimal(1e6), new Decimal(1e9), new Decimal(1e13), new Decimal(1e18), new Decimal(1e24)]
		costMults = [null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
		setUnlocks = [Decimal.pow(Number.MAX_VALUE, 2.9)]
	}
	loadICData()
	if (infiniteCheck) exportInfiniteSave()
	if (infiniteCheck || infiniteCheck2) {
		updateNewPlayer("reset")
		infiniteCheck2 = false
	}
	onLoad(noOffline)
	startInterval()
}

function reload() {
	clearInterval(gameLoopIntervalId)
	updateNewPlayer()
	load_game(true)
}

var noSave=false
function save_game(silent) {
	isInfiniteDetected()
	if (!game_loaded || noSave || infiniteDetected) return
	set_save(metaSave.current, player);
	$.notify("Game saved", "info")
}

function toggleAutoSave() {
	aarMod.autoSave = !aarMod.autoSave
	getEl("autoSave").textContent = "Auto save: " + (aarMod.autoSave ? "ON" : "OFF")
	autoSaveSeconds = 0
}

function changeAutoSaveInterval() {
	aarMod.autoSaveInterval = getEl("autoSaveIntervalSlider").value
	getEl("autoSaveInterval").textContent = "Auto-save interval: " + aarMod.autoSaveInterval + "s"
	autoSaveSeconds = 0
}

function getAutoSaveInterval() {
	return aarMod.autoSaveInterval || 30
}

function overwrite_save(id) {
	if (id == metaSave.current) {
		save_game()
		return
	}
	var placement=1
	while (metaSave.saveOrder[placement-1]!=id) placement++
	if (!confirm("Are you really sure you want to overwrite save #"+placement+"? All progress in the current save will be overwritten with the new save!")) return
	set_save(id, player)
	$.notify("Save overwritten", "info")
}

function change_save(id) {
	if (!game_loaded) {
		metaSave.current=id
		localStorage.setItem(metaSaveId, btoa(JSON.stringify(metaSave)))
		document.location.reload(true)
		return
	}
	save_game(true)
	clearInterval(gameLoopIntervalId)
	var oldId=metaSave.current
	metaSave.current=id
	changeSaveDesc(oldId, savePlacement)
	updateNewPlayer()
	infiniteCheck2 = false
	load_game(shiftDown)
	savePlacement=1
	while (metaSave.saveOrder[savePlacement-1]!=id) savePlacement++
	changeSaveDesc(metaSave.current, savePlacement)

	$.notify("Save #"+savePlacement+" loaded", "info")
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}

function rename_save(id) {
	if (metaSave.current != id && id !== undefined) {
		var placement=1
		while (metaSave.saveOrder[placement-1]!=id) placement++
	}
	var save_name = prompt("Input the new name of "+((metaSave.current == id || id === undefined) ? "your current save" : "save #" + placement)+". It's recommended to put the name of the mod as your save name. Leave blank to reset the save's name.")
	if (save_name === null) return
	if (metaSave.current == id || id === undefined) {
		aarMod.save_name = save_name
		getEl("save_name").textContent = "You are currently playing in " + (aarMod.save_name ? aarMod.save_name : "Save #" + savePlacement)
	} else {
		var temp_save = get_save(id)
		if (!temp_save.aarexModifications) temp_save.aarexModifications={
			dilationConf: false,
			offlineProgress: true,
			autoSave: true,
			progressBar: true,
			logRateChange: false,
			hideProductionTab: true,
			eternityChallRecords: {},
			popUpId: 0,
			tabsSave: {on: false},
			breakInfinity: false
        }
		temp_save.aarexModifications.save_name = save_name
	}
	set_save(id, temp_save)
	placement=1
	while (metaSave.saveOrder[placement-1]!=id) placement++
	changeSaveDesc(id, placement)
	$.notify("Save #"+placement+" renamed", "info")
}

function export_save(id) {
	var placement=1
	if (!id) id=metaSave.current
	while (metaSave.saveOrder[placement-1]!=id) placement++

	var save
	if (id == metaSave.current) save = btoa(JSON.stringify(player, function(k, v) { return (v === Infinity) ? "Infinity" : v }))
	else save = localStorage.getItem(btoa(savePrefix+id))
	
	copyToClipboard(save, null, "save #" + placement)
}

function copyToClipboard(x, el, msg) {
	let output = getEl(el || "output")
	let parent = output.parentElement

	parent.style.display = ""
	output.value = x
	output.onblur = function() { parent.style.display = "none" }
	output.focus()
	output.select()
	
	try {
		if (document.execCommand('copy')) {
			$.notify("Exported" + (msg ? " " + msg : "") + " into clipboard", "info")
			output.blur()
			output.onblur()
		}
	} catch(ex) {
		// well, we tried.
	}
}

function move(id,offset) {
	placement=0
	while (metaSave.saveOrder[placement]!=id) placement++
	if (offset<0) {
		if (placement<-offset) return
	} else if (placement>metaSave.saveOrder.length-offset-1) return
	var temp=metaSave.saveOrder[placement]
	if (temp==metaSave.current) savePlacement+=offset
	if (metaSave.saveOrder[placement+offset]==metaSave.current) savePlacement-=offset
	metaSave.saveOrder[placement]=metaSave.saveOrder[placement+offset]
	metaSave.saveOrder[placement+offset]=temp
	getEl("saves").rows[placement].innerHTML=getSaveLayout(metaSave.saveOrder[placement])
	getEl("saves").rows[placement+offset].innerHTML=getSaveLayout(id)
	changeSaveDesc(metaSave.saveOrder[placement], placement+1)
	changeSaveDesc(id, placement+offset+1)
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}

function delete_save(saveId) {
	if (metaSave.saveOrder.length<2) {
		reset_game()
		return
	} else if (!confirm("Do you really want to erase this save? All game data in this save will be deleted!")) return
	var alreadyDeleted=false
	var newSaveOrder=[]
	for (orderId=0;orderId<metaSave.saveOrder.length;orderId++) {
		if (alreadyDeleted) changeSaveDesc(metaSave.saveOrder[orderId], orderId)
		if (metaSave.saveOrder[orderId]==saveId) {
			localStorage.removeItem(btoa(savePrefix+saveId))
			alreadyDeleted=true
			getEl("saves").deleteRow(orderId)
			if (savePlacement>orderId+1) savePlacement--
			loadedSaves--
		} else newSaveOrder.push(metaSave.saveOrder[orderId])
	}
	metaSave.saveOrder=newSaveOrder
	if (metaSave.current==saveId) {
		change_save(metaSave.saveOrder[0])
		getEl("loadmenu").style.display="block"
	} else localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
	$.notify("Save deleted", "info")
}

var ngModeMessages=[]
function new_game(type) {
	if (modes.ngmm == 4 && !confirm("Warning: NG-5 is currently in work in progress! It is not recommended to play this mod until a more stable version has been released. However, if you want to help test NG+5, you can disregard this message. You can contribute by talking in the NG-5 channel on the NG+3 Discord Server.")) return

	save_game(true)
	clearInterval(gameLoopIntervalId)
	updateNewPlayer(type ? "quick" : "new", type)
	infiniteCheck2 = false

	var oldId = metaSave.current
	metaSave.current=1
	while (metaSave.saveOrder.includes(metaSave.current)) metaSave.current++
	metaSave.saveOrder.push(metaSave.current)
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))

	changeSaveDesc(oldId, savePlacement)
	latestRow = getEl("saves").insertRow(loadedSaves)
	latestRow.innerHTML = getSaveLayout(metaSave.current)
	loadedSaves++
	changeSaveDesc(metaSave.current, loadedSaves)
	savePlacement = loadedSaves

	onLoad()
	startInterval()
	
	$.notify("Save created", "info")
	localStorage.setItem(metaSaveId, btoa(JSON.stringify(metaSave)))

	showDimTab('antimatterdimensions')
	showStatsTab('stats')
	showAchTab('normalachievements')
	showAutoTab('autobuyers')
	showChallengesTab('normalchallenges')
	showGalTab('galUpgs')
	showInfTab('preinf')
	showEternityTab('timestudies', true)
	showQuantumTab('uquarks')
	showGhostifyTab('neutrinos')
	showBLTab('bextab')
}


/*
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF
STUFF




Does transformSaveToDecimal() even do anything anymore
we can just remove back compatibility right
no one should have a AD save from back then
I guess we shoudln't but ew its laggy, maybe a variable that says if we have done so
*/

function conToDeciPreInf(){
	player.money = new Decimal(player.money)
	player.tickSpeedCost = new Decimal(player.tickSpeedCost)
	player.tickspeed = new Decimal(player.tickspeed)
	player.firstAmount = new Decimal(player.firstAmount)
	player.secondAmount = new Decimal(player.secondAmount)
	player.thirdAmount = new Decimal(player.thirdAmount)
	player.fourthAmount = new Decimal(player.fourthAmount)
	player.fifthAmount = new Decimal(player.fifthAmount)
	player.sixthAmount = new Decimal(player.sixthAmount)
	player.seventhAmount = new Decimal(player.seventhAmount)
	player.eightAmount = new Decimal(player.eightAmount)
	player.firstCost = new Decimal(player.firstCost)
	player.secondCost = new Decimal(player.secondCost)
	player.thirdCost = new Decimal(player.thirdCost)
	player.fourthCost = new Decimal(player.fourthCost)
	player.fifthCost = new Decimal(player.fifthCost)
	player.sixthCost = new Decimal(player.sixthCost)
	player.seventhCost = new Decimal(player.seventhCost)
	player.eightCost = new Decimal(player.eightCost)
	player.sacrificed = new Decimal(player.sacrificed)
	player.totalmoney = new Decimal(player.totalmoney)
}

function conToDeciTD(){
        player.timeDimension1.amount = new Decimal(player.timeDimension1.amount)
        player.timeDimension2.amount = new Decimal(player.timeDimension2.amount)
        player.timeDimension3.amount = new Decimal(player.timeDimension3.amount)
        player.timeDimension4.amount = new Decimal(player.timeDimension4.amount)
        player.timeDimension5.amount = new Decimal(player.timeDimension5.amount)
        player.timeDimension6.amount = new Decimal(player.timeDimension6.amount)
        player.timeDimension7.amount = new Decimal(player.timeDimension7.amount)
        player.timeDimension8.amount = new Decimal(player.timeDimension8.amount)
        player.timeDimension1.cost = new Decimal(player.timeDimension1.cost)
        player.timeDimension2.cost = new Decimal(player.timeDimension2.cost)
        player.timeDimension3.cost = new Decimal(player.timeDimension3.cost)
        player.timeDimension4.cost = new Decimal(player.timeDimension4.cost)
        player.timeDimension5.cost = new Decimal(player.timeDimension5.cost)
        player.timeDimension6.cost = new Decimal(player.timeDimension6.cost)
        player.timeDimension7.cost = new Decimal(player.timeDimension7.cost)
        player.timeDimension8.cost = new Decimal(player.timeDimension8.cost)
        player.timeDimension1.power = new Decimal(player.timeDimension1.power)
        player.timeDimension2.power = new Decimal(player.timeDimension2.power)
        player.timeDimension3.power = new Decimal(player.timeDimension3.power)
        player.timeDimension4.power = new Decimal(player.timeDimension4.power)
        player.timeDimension5.power = new Decimal(player.timeDimension5.power)
        player.timeDimension6.power = new Decimal(player.timeDimension6.power)
        player.timeDimension7.power = new Decimal(player.timeDimension7.power)
        player.timeDimension8.power = new Decimal(player.timeDimension8.power)
}

function conToDeciPreEter(){
        player.infinityPoints = new Decimal(player.infinityPoints)
        getEl("eternitybtn").style.display = ((player.infinityPoints.gte(Number.MAX_VALUE) && player.infDimensionsUnlocked[7]) || getEternitied() > 0) ? "inline-block" : "none"

        conToDeciPreInf()
        player.infinitied = nP(player.infinitied)
        player.infinitiedBank = nP(player.infinitiedBank)
        player.chall3Pow = new Decimal(player.chall3Pow)
        player.chall11Pow = new Decimal(player.chall11Pow)
        if (inNGM(2)) {
        player.galacticSacrifice.galaxyPoints = Decimal.round(player.galacticSacrifice.galaxyPoints)
        if (player.dimPowerIncreaseCost !== undefined) player.dimPowerIncreaseCost = new Decimal(player.dimPowerIncreaseCost)
        }
        if (player.pSac !== undefined) {
                player.pSac.px = new Decimal(player.pSac.px)
                for (var d=1;d<=8;d++) player["infinityDimension"+d].costAM = Decimal.max(player["infinityDimension"+d].costAM, idBaseCosts[d])
                if (player.pSac.dims !== undefined) {
                        player.pSac.dims.power = new Decimal(player.pSac.dims.power)
                        for (var d=1;d<9;d++) {
                                player.pSac.dims[d].cost = new Decimal(player.pSac.dims[d].cost)
                                player.pSac.dims[d].amount = new Decimal(player.pSac.dims[d].amount)
                                player.pSac.dims[d].power = new Decimal(player.pSac.dims[d].power)
                        }
                }
        }
        player.costMultipliers = [new Decimal(player.costMultipliers[0]), new Decimal(player.costMultipliers[1]), new Decimal(player.costMultipliers[2]), new Decimal(player.costMultipliers[3]), new Decimal(player.costMultipliers[4]), new Decimal(player.costMultipliers[5]), new Decimal(player.costMultipliers[6]), new Decimal(player.costMultipliers[7])]
        player.tickspeedMultiplier = new Decimal(player.tickspeedMultiplier)
        player.matter = new Decimal(player.matter)
        
        if (player.singularity != undefined) {
                player.singularity.sacrificed = new Decimal(player.singularity.sacrificed)
                player.singularity.singularityPower = new Decimal(player.singularity.singularityPower)
                player.singularity.darkMatter = new Decimal(player.singularity.darkMatter)
        }
        player.infinityPower = new Decimal(player.infinityPower)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.amount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.amount)
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.amount)
        player.infinityDimension4.amount = new Decimal(player.infinityDimension4.amount)
        player.infinityDimension5.amount = new Decimal(player.infinityDimension5.amount)
        player.infinityDimension6.amount = new Decimal(player.infinityDimension6.amount)
        player.infinityDimension7.amount = new Decimal(player.infinityDimension7.amount)
        player.infinityDimension8.amount = new Decimal(player.infinityDimension8.amount)
}

function conToDeciLateEter(){
	if (player.exdilation !== undefined) {
		player.blackhole.power = new Decimal(player.blackhole.power)

		for (var d = 1; d <= 8; d++) {
			var dim = player["blackholeDimension"+d]
			if (dim !== undefined) {
				dim.amount = new Decimal(dim.amount)
				dim.cost = new Decimal(dim.cost)
				dim.power = new Decimal(dim.power)
			}
		}

		player.exdilation.unspent = new Decimal(player.exdilation.unspent)
		player.exdilation.spent[1] = new Decimal(player.exdilation.spent[1])
		player.exdilation.spent[2] = new Decimal(player.exdilation.spent[2])
		player.exdilation.spent[3] = new Decimal(player.exdilation.spent[3])
		if (player.exdilation.spent[4] !== undefined) player.exdilation.spent[4] = new Decimal(player.exdilation.spent[4])
	}

        if (player.meta !== undefined) {
        player.meta.antimatter = new Decimal(player.meta.antimatter);
        player.meta.bestAntimatter = new Decimal(player.meta.bestAntimatter);
        for (let i = 1; i <= 8; i++) {
                player.meta[i].amount = new Decimal(player.meta[i].amount);
                player.meta[i].cost = new Decimal(player.meta[i].cost);
        }
		if (qu_save) {
			if (qu_save.last10) for (i=0;i<10;i++) qu_save.last10[i][1] = new Decimal(qu_save.last10[i][1])
			qu_save.quarks = new Decimal(qu_save.quarks);
			if (!tmp.ngp3) {
				qu_save.gluons = (qu_save.gluons ? qu_save.gluons.rg !== null : true) ? new Decimal(0) : new Decimal(qu_save.gluons);
				qu_save.neutronstar.quarks = new Decimal(qu_save.neutronstar.quarks);
				qu_save.neutronstar.metaAntimatter = new Decimal(qu_save.neutronstar.metaAntimatter);
				qu_save.neutronstar.dilatedTime = new Decimal(qu_save.neutronstar.dilatedTime);
			}
		}
        }
        player.timeShards = new Decimal(player.timeShards)
        player.eternityPoints = new Decimal(player.eternityPoints)
        player.tickThreshold = new Decimal(player.tickThreshold)
        player.postC3Reward = new Decimal(player.postC3Reward)
        player.postC8Mult = new Decimal(player.postC8Mult)

        for (var i=0; i<10; i++) {
                player.lastTenRuns[i][0] = parseFloat(player.lastTenRuns[i][0])
                player.lastTenRuns[i][1] = new Decimal(player.lastTenRuns[i][1])
                player.lastTenEternities[i][1] = new Decimal(player.lastTenEternities[i][1])
        }
        player.replicanti.chanceCost = new Decimal(player.replicanti.chanceCost)
        player.replicanti.intervalCost = new Decimal(player.replicanti.intervalCost)
        player.replicanti.galCost = new Decimal(player.replicanti.galCost)

        for (var i=1; i<=8; i++) {
        player["infinityDimension"+i].cost = new Decimal(player["infinityDimension"+i].cost)
        player["infinityDimension"+i].power = new Decimal(player["infinityDimension"+i].power)
        }

        player.infMultCost = new Decimal(player.infMultCost)
        player.infMult = new Decimal(player.infMult)
        player.timestudy.amcost = new Decimal(player.timestudy.amcost)
        player.timestudy.ipcost = new Decimal(player.timestudy.ipcost)
        player.timestudy.epcost = new Decimal(player.timestudy.epcost)

        player.autoIP = new Decimal(player.autoIP)

        if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autobuyers[11].priority !== "undefined" && player.autobuyers[11].priority.toString().toLowerCase()!="max") player.autobuyers[11].priority = new Decimal(player.autobuyers[11].priority)

        player.epmultCost = new Decimal(player.epmultCost)
        player.epmult = new Decimal(player.epmult)
        player.eternityBuyer.limit = new Decimal(player.eternityBuyer.limit)
        player.eternityChallGoal = new Decimal(player.eternityChallGoal)
        player.replicanti.amount = new Decimal(player.replicanti.amount)
		delete player.replicanti.infinityPoints
        if (player.boughtDims) {
                player.replicanti.limit = new Decimal(player.replicanti.limit)
                player.replicanti.newLimit = new Decimal(player.replicanti.newLimit)
                if (player.darkMatter) player.darkMatter = new Decimal(player.darkMatter)
        }

        player.dilation.tachyonParticles = new Decimal(player.dilation.tachyonParticles)
        player.dilation.dilatedTime = new Decimal(player.dilation.dilatedTime)
        player.dilation.totalTachyonParticles = new Decimal(player.dilation.totalTachyonParticles)
        player.dilation.nextThreshold = new Decimal(player.dilation.nextThreshold)
}

function conToDeciMS(){
	if (player.masterystudies) {
		player.dbPower = new Decimal(player.dbPower)
		player.meta.bestOverQuantums = Decimal.max(player.meta.bestOverQuantums, player.meta.bestAntimatter)
		if (qu_save) {
			qu_save.quarkEnergy = new Decimal(qu_save.quarkEnergy)
			qu_save.bestEnergy = new Decimal(qu_save.bestEnergy)
			if (qu_save.usedQuarks) {
				qu_save.usedQuarks.r = new Decimal(qu_save.usedQuarks.r)
				qu_save.usedQuarks.g = new Decimal(qu_save.usedQuarks.g)
				qu_save.usedQuarks.b = new Decimal(qu_save.usedQuarks.b)
				if (typeof(qu_save.colorPowers.r) !== "number") {
					qu_save.colorPowers.r = 0
					qu_save.colorPowers.g = 0
					qu_save.colorPowers.b = 0
				}
			}

			if (qu_save.gluons && aarMod.newGame3PlusVersion > 1.5) {
				qu_save.gluons.rg = new Decimal(qu_save.gluons.rg)
				qu_save.gluons.gb = new Decimal(qu_save.gluons.gb)
				qu_save.gluons.br = new Decimal(qu_save.gluons.br)
			}
			qu_save.entBoosts = Decimal.round(qu_save.entBoosts)

			if (qu_save.electrons) delete qu_save.electrons //RIP positrons
			if (qu_save.replicants) delete qu_save.replicants //RIP replicants
			if (qu_save.emperorDimensions) delete qu_save.emperorDimensions //RIP emperor dimensions
			if (qu_save.nanofield) delete qu_save.nanofield //RIP nanofield
			if (qu_save["10ofield"]) delete qu_save["10ofield"]
			if (qu_save.tod) delete qu_save.tod //RIP Tree of Decay

			if (qu_save.autobuyer) qu_save.autobuyer.limit = new Decimal(qu_save.autobuyer.limit)
			if (player.dilation.bestTP == undefined) player.dilation.bestTP = hasAch("ng3p18") || hasAch("ng3p37") ? player.dilation.tachyonParticles : 0
			player.dilation.bestTP = new Decimal(player.dilation.bestTP)

			delete qu_save.bosons
			delete qu_save.neutronstar
			delete qu_save.realGluons
			delete qu_save.rebuyables
		}
	}
}

function conToDeciGhostify(){
	if (player.ghostify) {
		player.meta.bestOverGhostifies = Decimal.max(player.meta.bestOverGhostifies, player.meta.bestOverQuantums)
		qu_save.bigRip.bestThisRun = new Decimal(qu_save.bigRip.bestThisRun)
		qu_save.bigRip.totalAntimatter = new Decimal(qu_save.bigRip.totalAntimatter)
		qu_save.bigRip.spaceShards = new Decimal(qu_save.bigRip.spaceShards)
		qu_save.breakEternity.eternalMatter = new Decimal(qu_save.breakEternity.eternalMatter)
		player.ghostify.times = nP(player.ghostify.times)
		player.ghostify.ghostParticles = new Decimal(player.ghostify.ghostParticles)
		for (var r=0;r<10;r++) player.ghostify.last10[r][1] = new Decimal(player.ghostify.last10[r][1])
		player.ghostify.neutrinos.electron = new Decimal(player.ghostify.neutrinos.electron)
		player.ghostify.neutrinos.mu = new Decimal(player.ghostify.neutrinos.mu)
		player.ghostify.neutrinos.tau = new Decimal(player.ghostify.neutrinos.tau)
		if (player.ghostify.automatorGhosts!==undefined) player.ghostify.automatorGhosts[15].a=new Decimal(player.ghostify.automatorGhosts[15].a)
		if (player.ghostify.ghostlyPhotons) {
			player.ghostify.ghostlyPhotons.amount=new Decimal(player.ghostify.ghostlyPhotons.amount)
			player.ghostify.ghostlyPhotons.ghostlyRays=new Decimal(player.ghostify.ghostlyPhotons.ghostlyRays)
			player.ghostify.ghostlyPhotons.darkMatter=new Decimal(player.ghostify.ghostlyPhotons.darkMatter)
		}
		if (player.ghostify.bl && player.ghostify.wzb) {
			tmp.bl = player.ghostify.bl

			tmp.bl.watt=new Decimal(tmp.bl.watt)
			tmp.bl.speed=new Decimal(tmp.bl.speed)
			tmp.bl.ticks=new Decimal(tmp.bl.ticks)
			tmp.bl.am=new Decimal(tmp.bl.am)
			tmp.bl.extractProgress=new Decimal(tmp.bl.extractProgress)
			tmp.bl.autoExtract=new Decimal(tmp.bl.autoExtract)
			for (var t=0;t<=br.limits[maxBLLvl]-1;t++) tmp.bl.glyphs[t]=new Decimal(tmp.bl.glyphs[t]||0)
			tmp.bl.battery=new Decimal(tmp.bl.battery)
			for (var g2=2;g2<=br.limits[maxBLLvl];g2++) for (var g1=1;g1<g2;g1++) if (tmp.bl.enchants[g1*10+g2]!==undefined) tmp.bl.enchants[g1*10+g2]=new Decimal(tmp.bl.enchants[g1*10+g2])

			player.ghostify.wzb.dP=new Decimal(player.ghostify.wzb.dP)
			player.ghostify.wzb.wQkProgress=new Decimal(player.ghostify.wzb.wQkProgress)
			player.ghostify.wzb.zNeProgress=new Decimal(player.ghostify.wzb.zNeProgress)
			player.ghostify.wzb.zNeReq=new Decimal(player.ghostify.wzb.zNeReq)
			player.ghostify.wzb.wpb=new Decimal(player.ghostify.wzb.wpb)
			player.ghostify.wzb.wnb=new Decimal(player.ghostify.wzb.wnb)
			player.ghostify.wzb.zb=new Decimal(player.ghostify.wzb.zb)
		}
		if (player.ghostify.gds) delete player.ghostify.gds //No Gravity Dimensions for NG+3R. :(
	}
}

function transformSaveToDecimal() {
	conToDeciPreEter()
	player.eternities = nP(player.eternities)
	conToDeciTD()
	conToDeciLateEter()
	conToDeciMS()
	conToDeciGhostify()
}


function loadAutoBuyerSettings() {
        getEl("priority10").value = player.autobuyers[9].priority
        getEl("priority11").value = player.autobuyers[10].priority
        getEl("priority12").value = player.autoCrunchMode == "amount" ? formatValue("Scientific", player.autobuyers[11].priority, 2, 0) : player.autobuyers[11].priority
        getEl("overGalaxies").value = player.overXGalaxies
        getEl("bulkDimboost").value = player.autobuyers[9].bulk
        getEl("prioritySac").value = player.autoSacrifice.priority
        getEl("bulkgalaxy").value = player.autobuyers[10].bulk
        getEl("priority13").value = formatValue("Scientific", new Decimal(player.eternityBuyer.limit), 2, player.autoEterMode == "eternitied" || player.autoEterMode == "exponent" ? 2 : 0)
        if (hasAch("ng3p52") && player.eternityBuyer.presets !== undefined) {
        }
        if (player.autobuyers[12] !== undefined) getEl("priority14").value = formatValue("Scientific", new Decimal(player.autobuyers[12].priority), 2, 0)
        if (inNGM(3) && player.autobuyers[13] % 1 !== 0) {
                getEl("priority15").value = player.autobuyers[13].priority
                getEl("overGalaxiesTickspeedBoost").value = player.overXGalaxiesTickspeedBoost
                getEl("bulkTickBoost").value = player.autobuyers[13].bulk
        }
        if (inNGM(4) && player.autobuyers[14] % 1 !== 0) {
                getEl("priority16").value = player.autobuyers[14].priority
                getEl("overGalaxiesTDBoost").value = player.autobuyers[14].overXGals
                getEl("bulkTickBoost").value = player.autobuyers[14].bulk
        }
        if (player.boughtDims) {
                getEl("maxReplicantiCrunchSwitch").checked = player.autobuyers[11].requireMaxReplicanti;
                getEl("requireIPPeak").checked = player.autobuyers[11].requireIPPeak;
        }
        if (player.masterystudies) {
			getEl("prioritydil").value = player.eternityBuyer.dilationPerAmount
			getEl("autoalwaysdil").checked = player.eternityBuyer.alwaysDil
			if (qu_save) {
				let data = qu_save.autobuyer
				if (data) {
					if (isNaN(break_infinity_js ? data.limit : data.limit.l)) data.limit = new Decimal(1)
					getEl("priorityquantum").value = data.mode == "amount" || data.mode == "relative" ? formatValue("Scientific", data.limit, 2, 0) : data.limit
					getEl("priorityAutoDisableQuantum").value = data.autoDisable || 0
				}
			}
        }
}

function set_save(id, value) {
	localStorage.setItem(btoa(savePrefix+id), btoa(JSON.stringify(value, function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
}

function get_save(id) {
        try {
                var dimensionSave = localStorage.getItem(btoa(savePrefix+id))
                if (dimensionSave !== null) dimensionSave = JSON.parse(atob(dimensionSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
                return dimensionSave
        } catch(e) { }
}

function pauseGame(load) {
	if (!load) aarMod.pause = !aarMod.pause
	if (isGamePaused()) alert("YOUR GAME IS PAUSED! Please note that you must unpause for automation and production to continue normally. However, you may navigate through the game manually, but it will not display any immediate effects until you unpause the game.")
	getEl("pauseStatus").textContent = aarMod.pause ? "Unpause" : "Pause"
}

var meta_started = false
function initiateMetaSave() {
	metaSave = localStorage.getItem(metaSaveId)
	if (metaSave == null) {
		metaSave = {presetsOrder: [], version: 2.02}
		meta_started = true
	} else metaSave = JSON.parse(atob(metaSave))
	if (metaSave.current == undefined) {
		metaSave.current = 1
		metaSave.saveOrder = [1]
	}
	if (!metaSave.current) {
		metaSave.current = 1
		metaSave.alert = true
	}
}

function migrateOldSaves() {
	if (metaSave.newGameMinus!=undefined) {
		metaSave.saveOrder = []
		var ngSave = localStorage.getItem('dimensionSave_aarexModifications')
		if (ngSave != null) {
			ngSave = JSON.parse(atob(ngSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
			if (ngSave.saves != null) {
				for (id=0;id<3;id++) {
					if (ngSave.saves[id] != null) {
						metaSave.saveOrder.push(1+id)
						localStorage.setItem(btoa('dsAM_'+(1+id)), btoa(JSON.stringify(ngSave.saves[id], function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
					}
				}
				if (!metaSave.newGameMinus) metaSave.current=1+ngSave.currentSave
			} else {
				if (!metaSave.newGameMinus) metaSave.current=1
				metaSave.saveOrder.push(1)
				localStorage.setItem(btoa('dsAM_1'), btoa(JSON.stringify(ngSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
			}
		}
		localStorage.removeItem('dimensionSave_aarexModifications')
		var ngmSave = localStorage.getItem('dimensionSave_NGM')
		if (ngmSave != null) {
			ngmSave = JSON.parse(atob(ngmSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
			if (ngmSave.saves != null) {
				for (id=0;id<3;id++) {
					if (ngmSave.saves[id] != null) {
						metaSave.saveOrder.push(4+id)
						localStorage.setItem(btoa('dsAM_'+(4+id)), btoa(JSON.stringify(ngmSave.saves[id], function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
					}
				}
				if (metaSave.newGameMinus) metaSave.current=4 + ngmSave.currentSave
			} else {
				if (metaSave.newGameMinus) metaSave.current=4
				metaSave.saveOrder.push(4)
				localStorage.setItem(btoa('dsAM_4'), btoa(JSON.stringify(ngmSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
			}
		}
		localStorage.removeItem('dimensionSave_NGM')
		delete metaSave.newGameMinus
	}
	if (metaSave.version == undefined) {
		metaSave.presetsOrder=[]
		for (id=1;id<4;id++) {
			var studyTreePreset=localStorage.getItem("studyTree"+id)
			if (studyTreePreset !== null) {
				metaSave.presetsOrder.push(id)
				localStorage.setItem(btoa("dsAM_ST_"+id),btoa(JSON.stringify({preset:studyTreePreset})))
				localStorage.removeItem("studyTree"+id)
			}
		}
	}
	if (metaSave.version < 2.01) metaSave.presetsOrder_ers=[]
	metaSave.version = 2.02
}

//Save Storage System
var beta = true
var preBeta = false
var betaId = beta || preBeta ? "A-" : ""
var correctBetaId = "A-"
var betaLink = "Respecced-Alpha"

//Was "ds" before Respecced happened.
var prefix = "Gds"
var savePrefix = betaId + prefix + "AM_"
var presetPrefix = betaId + prefix + "AM_ST_"
var metaSaveId = betaId + "GAD_aarexModifications"
