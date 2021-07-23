//New: v3.0 / Old: v1.79
let qMs = {
	tmp: {},
	data: {
		types: ["sr", "en", "rl", "ch"],
		sr: {
			name: "Speedrun",
			targ: () => qu_save.best,
			targDisp: timeDisplay,
			targKind: "quantum",
			daysStart: () => tmp.dtMode ? 0.25 : tmp.exMode ? 0.375 : tmp.bgMode ? 0.75 : 0.5,
			gain: (x) => Math.log10(86400 * qMs.data.sr.daysStart() / x) / Math.log10(2) * 2 + 1,
			nextAt: (x) => Math.pow(2, (1 - x) / 2) * 86400 * qMs.data.sr.daysStart()
		},
		en: {
			name: "Enegretic",
			targ: () => qu_save.bestEnergy || 0,
			targDisp: shorten,
			targKind: "energy",
			gain: (x) => Math.sqrt(Math.max(x - 0.5, 0)) * 3,
			nextAt: (x) => Math.pow(x / 3, 2) + 0.5
		},
		rl: {
			name: "Relativistic",
			unl: () => pos.unl(),
			targ: () => new Decimal(player.dilation.bestTP || 0),
			targDisp: shorten,
			targKind: "TP",
			gain: (x) => (x.max(1).log10() - 90) / 3 + 1,
			nextAt: (x) => Decimal.pow(10, (x - 1) * 3 + 90)
		},
		ch: {
			name: "Challenging",
			unl: () => QCs.unl(),
			targ: () => (PCs_save && PCs_save.comps.length) || 0,
			targDisp: getFullExpansion,
			targKind: "completions",
			gain: (x) => x * 1.5,
			nextAt: (x) => Math.ceil(x / 1.5)
		}
	},
	update() {
		let data = {}
		qMs.tmp = data

		data.amt = 0
		data.points = 0
		data.metaSpeed = 10
		if (!tmp.quUnl) return

		//Milestone Points
		let types = qMs.data.types
		for (var i = 0; i < types.length; i++) {
			var type = types[i]
			var typeData = qMs.data[type]
			var unl = typeData.unl ? typeData.unl() : true

			data["targ_" + type] = typeData.targ()
			data["amt_" + type] = Math.max(Math.floor(typeData.gain(data["targ_" + type])), 0)
			data.points += data["amt_" + type]
		}

		//Milestones
		for (var i = 1; i <= qMs.max; i++) {
			if (data.points >= qMs[i].req) data.amt++
			else delete qu_save.disabledRewards[i]
		}

		if (qMs.tmp.amt >= 12) data.metaSpeed *= Math.pow(0.9, Math.pow(qMs.tmp.amt - 12 + 1, 1 + Math.max(qMs.tmp.amt - 15, 0) / 15))
	},
	updateDisplay() {
		if (tmp.quUnl) {
			let types = qMs.data.types
			for (var i = 0; i < types.length; i++) {
				var type = types[i]
				var typeData = qMs.data[type]
				var unl = typeData.unl ? typeData.unl() : true

				getEl("qMs_" + type + "_cell").style.display = unl ? "" : "none"
			}

			for (var i = 1; i <= qMs.max; i++) {
				var shown = qMs.tmp.amt >= i - 1
				getEl("qMs_reward_" + i).style.display = shown ? "" : "none"

				if (shown) {
					getEl("qMs_reward_" + i).className = qMs.tmp.amt < i || qMs.forceOff(i) ? "qMs_locked" :
						!this[i].disablable ? "qMs_reward" :
						"qMs_toggle_" + (!qu_save.disabledRewards[i] ? "on" : "off")
					getEl("qMs_reward_" + i).innerHTML = qMs[i].eff() + (false && qMs.tmp.amt >= i ? "" : "<br>(requires " + getFullExpansion(qMs[i].req) + " MP)")
				}
			}
			getEl("qMs_next").textContent = qMs.tmp.amt >= qMs.max ? "" : "Next milestone unlocks at " + getFullExpansion(qMs[qMs.tmp.amt + 1].req) + " Milestone Points."
		}

		getEl('dilationmode').style.display = qMs.tmp.amt >= 4 ? "block" : "none"
		getEl('rebuyupgauto').style.display = qMs.tmp.amt >= 11 ? "" : "none"
		getEl('metaboostauto').style.display = qMs.tmp.amt >= 14 ? "" : "none"
		getEl("autoBuyerQuantum").style.display = qMs.tmp.amt >= 17 ? "block" : "none"
		getEl('toggleautoquantummode').style.display = qMs.tmp.amt >= 17 ? "" : "none"
		getEl('rebuyupgmax').style.display = qMs.tmp.amt < 20 ? "" : "none"

        var autoAssignUnl = qMs.tmp.amt >= 23
		getEl('respec_quarks').style.display = autoAssignUnl ? "" : "none"
        getEl('autoAssign').style.display = autoAssignUnl ? "" : "none"
        getEl('autoAssignRotate').style.display = autoAssignUnl ? "" : "none"
	},
	updateDisplayOnTick() {
		let types = qMs.data.types
		for (var i = 0; i < types.length; i++) {
			var type = types[i]
			var typeData = qMs.data[type]
			var unl = typeData.unl ? typeData.unl() : true

			if (unl) {
				getEl("qMs_" + type + "_target").textContent = typeData.targDisp(qMs.tmp["targ_" + type])
				getEl("qMs_" + type + "_points").textContent = "+" + getFullExpansion(qMs.tmp["amt_" + type]) + " MP"
				getEl("qMs_" + type + "_next").textContent = qMs.tmp["amt_" + type] > 50 ? "" : "(Next at: " + typeData.targDisp(typeData.nextAt(qMs.tmp["amt_" + type] + 1)) + " " + typeData.targKind + ")"
			}
		}

		getEl("qMs_points").textContent = getFullExpansion(qMs.tmp.points)
	},
	isOn(id) {
		return qMs.tmp.amt >= id && (!this[id].disablable || !qu_save.disabledRewards[id]) && !qMs.forceOff(id)
	},
	forceOff(id) {
		return qMs[id].forceDisable !== undefined && qMs[id].forceDisable()
	},
	toggle(id) {
		if (!qMs[id].disablable) return
		if (qMs.forceOff(id)) return
		if (qMs.tmp.amt < id) return

		let on = !qu_save.disabledRewards[id]
		qu_save.disabledRewards[id] = on
		getEl("qMs_reward_" + id).className = "qMs_toggle_" + (!on ? "on" : "off")
	},

	max: 24,
	1: {
		req: 1,
		eff: () => "Completing an EC only exits your challenge.",
		effGot: () => "Completing an EC now only exits your challenge."
	},
	2: {
		req: 2,
		eff: () => "Unlock the TT autobuyer, start with 3x more Eternities per milestone (" + shortenDimensions(Math.pow(3, qMs.tmp.amt >= 2 ? qMs.tmp.amt : 0) * 100) + "), and keep Eternity Challenges",
		effGot: () => "You now can automatically buy TT, start with 3x more Eternities per milestone, and keep Eternity Challenges."
	},
	3: {
		req: 3,
		disablable: true,
		eff: () => "Keep all your Eternity Upgrades and Time Studies",
		effGot: () => "You now can keep all your Eternity Upgrades and Time Studies."
	},
	4: {
		req: 4,
		eff: () => "Unlock auto-Dilation and new modes for auto-Eternity",
		effGot: () => "You have unlocked the 'X times eternitied' mode for auto-Eternity... And you can now automatically dilate time!"
	},
	5: {
		req: 5,
		disablable: true,
		eff: () => "Start with Time Dilation unlocked" + (tmp.dtMode ? "" : " and '3x TP' upgrade is retroactive"),
		effGot: () => "You now start with Time Dilation unlocked" + (tmp.dtMode ? "." : " and '3x TP' upgrade is now retroactive.")
	},
	6: {
		req: 6,
		eff: () => "Start with all 8 Time Dimensions",
		effGot: () => "You now start with all 8 Time Dimensions."
	},
	7: {
		req: 7,
		eff: () => "Keep all your dilation upgrades except the repeatables",
		effGot: () => "You now can keep all your dilation upgrades except the repeatables."
	},
	8: {
		req: 8,
		forceDisable: () => tmp.dtMode || QCs.inAny(),
		disablable: true,
		eff: () => tmp.dtMode ? "N/A" : "Keep " + (tmp.exMode ? "25% of" : tmp.bgMode ? "all" : "50% of") + " your dilation upgrades that boost TP gain",
		effGot: () => tmp.dtMode ? "" : "You now can keep " + (tmp.exMode ? "25% of" : tmp.bgMode ? "all" : "50% of") + " your dilation upgrades that boost TP gain."
	},
	9: {
		req: 9,
		eff: () => "Start with Meta Dimensions unlocked",
		effGot: () => "You now start with Meta Dimensions unlocked."
	},
	10: {
		req: 10,
		forceDisable: () => !QCs.isntCatched() || QCs.in(7),
		eff: () => "Keep all your mastery studies",
		effGot: () => "You now can keep all your mastery studies."
	},
	11: {
		req: 12,
		eff: () => "Unlock the autobuyer for repeatable dilation upgrades",
		effGot: () => "You now can automatically buy repeatable dilation upgrades."
	},
	12: {
		req: 13,
		eff: () => "Reduce the interval of auto-dilation upgrades and MDs by 10% per milestone" + (qMs.tmp.amt >= 12 ? " (" + shorten(1 / qMs.tmp.metaSpeed) + "/s)" : ""),
		effGot: () => "The interval of auto-dilation upgrades and MDs is now reduced by 10% per milestone."
	},
	13: {
		req: 15,
		eff: () => "Reduce the interval of auto-slow MDs by 1 tick per milestone",
		effGot: () => "The interval of auto-slow MDs is now reduced by 1 tick per milestone."
	},
	14: {
		req: 16,
		eff: () => "Unlock the autobuyer for meta-Dimension Boosts, and start with 4 MDBs",
		effGot: () => "You now can automatically buy meta-Dimension Boosts, and you now start with 4 MDBs."
	},
	15: {
		req: 18,
		eff: () => "All Meta Dimensions are available for purchase on Quantum",
		effGot: () => "All Meta Dimensions are now available for purchase on Quantum."
	},
	16: {
		req: 19,
		eff: () => "Each milestone greatly reduces the interval of auto-dilation upgrades and MDBs",
		effGot: () => "Each milestone now greatly reduces the interval of auto-dilation upgrades and MDBs."
	},
	17: {
		req: 20,
		eff: () => "Unlock the autobuyer for Quantum runs",
		effGot: () => "You can now automatically go Quantum."
	},
	18: {
		req: 21,
		eff: () => "'2 Million Infinities' effect is always applied",
		effGot: () => "'2 Million Infinities' effect is now always applied."
	},
	19: {
		req: 22,
		eff: () => "Meta-Dimension Boosts no longer reset Meta Dimensions",
		effGot: () => "Meta-Dimension Boosts no longer reset Meta Dimensions anymore."
	},
	20: {
		req: 24,
		eff: () => "All Infinity-related autobuyers fire for each tick",
		effGot: () => "All Infinity-related autobuyers now fire for each tick"
	},
	21: {
		req: 25,
		forceDisable: () => !PCs.milestoneDone(32) && QCs.in(3),
		eff: () => "Every second, you gain Tachyon Particles, if you dilate.",
		effGot: () => "Every second, you now gain Tachyon Particles, if you dilate."
	},
	22: {
		req: 35,
		eff: () => "Gain banked infinities based on your post-crunch infinitied stat",
		effGot: () => "Gain banked infinities based on your post-crunch infinitied stat."
	},
	23: {
		req: 50,
		eff: () => "Unlock QoL features for quark assortion, like automation and respec.",
		effGot: () => "You have unlocked QoL features for quark assortion!"
	},
	24: {
		req: 200,
		eff: () => "Able to purchase all time studies without blocking",
		effGot: () => "You now can buy every single time study."
	},
}