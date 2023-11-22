export type TranslationKeys =
  | WelcomeTerms
  | GeneralTerms
  | GameTerms
  | RulesTerms
  | SeasonBannerOffer
  | Intro
  | AchievementsDialog
  | GuideTerms
  | Conversations
  | HenHouseTerms
  | ShopItems
  | RewardTerms
  | ConfirmationTerms
  | ErrorTerms
  | TransactionTerms
  | Onboarding
  | Questions
  | Statements
  | BumpkinTrade;

export type GeneralTerms =
  | "2x.sale"
  | "achievements"
  | "alrClaim"
  | "alrClaim"
  | "back"
  | "beta"
  | "buy"
  | "cancel"
  | "card.cash"
  | "claim"
  | "claimSkill"
  | "claimSkill"
  | "clear"
  | "close"
  | "comingSoon"
  | "congrats"
  | "connected"
  | "connecting"
  | "continue"
  | "crops"
  | "date"
  | "delivery"
  | "details"
  | "equip"
  | "error"
  | "exotics"
  | "farm"
  | "featured"
  | "for"
  | "forbidden"
  | "fruit"
  | "fruits"
  | "gotIt"
  | "guide"
  | "item"
  | "lastUpdated"
  | "letsGo"
  | "list"
  | "loading"
  | "lvl"
  | "maintenance"
  | "mint"
  | "minting"
  | "nextSkillPtLvl"
  | "noThanks"
  | "ok"
  | "print"
  | "purchasing"
  | "rank"
  | "readMore"
  | "refresh"
  | "refreshing"
  | "reqSkillPts"
  | "reqSkillPts"
  | "reqSkills"
  | "retry"
  | "save"
  | "saving"
  | "sell.all"
  | "sell.one"
  | "sell.ten"
  | "sell"
  | "skillPts"
  | "skills"
  | "sound"
  | "success"
  | "swapping"
  | "syncing"
  | "task"
  | "total"
  | "tryAgain"
  | "verify"
  | "version"
  | "viewAll"
  | "wallet"
  | "welcome";

export type GameTerms =
  | "blockBucks"
  | "dailyLim"
  | "gobSwarm"
  | "potions"
  | "bumpkinLvl"
  | "sflDiscord";

export type ConfirmationTerms = "confirmation.sellCrops";

export type WelcomeTerms =
  | "welcome.otherWallets"
  | "welcome.needHelp"
  | "welcome.createAccount"
  | "welcome.creatingAccount"
  | "welcome.login"
  | "welcome.signingIn"
  | "welcome.signInMessage"
  | "welcome.email";

export type RulesTerms =
  | "rules"
  | "rules.accounts"
  | "rules.noBots"
  | "rules.game"
  | "rules.termsOfService";

export type SeasonBannerOffer =
  | "season.goodLuck"
  | "season.discount"
  | "season.banner"
  | "season.wearableAirdrop"
  | "season.bonusTickets"
  | "season.boostXP"
  | "season.exclusiveOffer"
  | "season.includes"
  | "season.limitedOffer"
  | "season.accessTo"
  | "season.buyNow";

export type Intro =
  | "intro.one"
  | "intro.two"
  | "intro.three"
  | "intro.four"
  | "intro.five";

export type ShopItems = "shopItems.one" | "shopItems.two" | "shopItems.three";

export type AchievementsDialog =
  | "breadWinner.description"
  | "breadWinner.one"
  | "breadWinner.two"
  | "breadWinner.three"
  | "sunSeeker.description"
  | "cabbageKing.description"
  | "jackOLantern.description"
  | "coolFlower.description"
  | "farmHand.description"
  | "beetrootBeast.description"
  | "myLifeIsPotato.description"
  | "rapidRadish.description"
  | "twentyTwentyVision.description"
  | "stapleCrop.description"
  | "sunflowerSuperstar.description"
  | "bumpkinBillionaire.description"
  | "patientParsnips.description"
  | "cropChampion.description"
  | "busyBumpkin.description"
  | "busyBumpkin.one"
  | "busyBumpkin.two"
  | "kissTheCook.description"
  | "bakersDozen.description"
  | "brilliantBumpkin.description"
  | "chefDeCuisine.description"
  | "scarecrowMaestro.description"
  | "scarecrowMaestro.one"
  | "scarecrowMaestro.two"
  | "bigSpender.description"
  | "museum.description"
  | "highRoller.description"
  | "timbeerrr.description"
  | "craftmanship.description"
  | "driller.description"
  | "ironEyes.description"
  | "elDorado.description"
  | "timeToChop.description"
  | "canary.description"
  | "somethingShiny.description"
  | "bumpkinChainsawAmateur.description"
  | "goldFever.description"
  | "explorer.description"
  | "explorer.one"
  | "expansion.description"
  | "wellOfProsperity.description"
  | "wellOfProsperity.one"
  | "wellOfProsperity.two"
  | "contractor.description"
  | "fruitAficionado.description"
  | "fruitAficionado.one"
  | "fruitAficionado.two"
  | "orangeSqueeze.description"
  | "appleOfMyEye.description"
  | "blueChip.description"
  | "fruitPlatter.description"
  | "crowdFavourite.description"
  | "deliveryDynamo.description"
  | "deliveryDynamo.one"
  | "deliveryDynamo.two"
  | "seasonedFarmer.description"
  | "seasonedFarmer.one"
  | "seasonedFarmer.two"
  | "seasonedFarmer.three"
  | "treasureHunter.description"
  | "treasureHunter.one"
  | "treasureHunter.two"
  | "eggcellentCollection.description"
  | "eggcellentCollection.one"
  | "eggcellentCollection.two";

export type GuideTerms =
  | "guide.intro"
  | "gathering.description.one"
  | "gathering.description.two"
  | "gathering.description.three"
  | "crops.description.one"
  | "crops.description.two"
  | "crops.description.three"
  | "building.description.one"
  | "building.description.two"
  | "cooking.description.one"
  | "cooking.description.two"
  | "cooking.description.three"
  | "cooking.description.one"
  | "cooking.description.two"
  | "cooking.description.three"
  | "cooking.description.four"
  | "cooking.description.five"
  | "animals.description.one"
  | "animals.description.two"
  | "animals.description.three"
  | "crafting.description.one"
  | "crafting.description.two"
  | "crafting.description.three"
  | "crafting.description.four"
  | "deliveries.description.one"
  | "deliveries.description.two"
  | "scavenger.description.one"
  | "scavenger.description.two"
  | "fruit.description.one"
  | "fruit.description.two"
  | "fruit.description.three"
  | "seasons.description.one"
  | "seasons.description.two";

export type Conversations =
  | "hank-intro.headline"
  | "hank-intro.one"
  | "hank-intro.two"
  | "hank-intro.three"
  | "hank-crafting.headline"
  | "hank-crafting.one"
  | "hank-crafting.two"
  | "betty-intro.headline"
  | "betty-intro.one"
  | "betty-intro.two"
  | "betty-intro.three"
  | "bruce-intro.headline"
  | "bruce-intro.one"
  | "bruce-intro.two"
  | "bruce-intro.three"
  | "blacksmith-intro.headline"
  | "blacksmith-intro.one";

export type HenHouseTerms =
  | "henHouse.chickens"
  | "henHouse.text.one"
  | "henHouse.text.two"
  | "henHouse.text.three"
  | "henHouse.text.four"
  | "henHouse.text.five"
  | "henHouse.text.six";

export type RewardTerms =
  | "reward.title"
  | "reward.streak"
  | "reward.comeBackLater"
  | "reward.nextBonus"
  | "reward.unlock"
  | "reward.open"
  | "reward.lvlRequirement"
  | "reward.revealing"
  | "reward.streakBonus"
  | "reward.found";

export type ErrorTerms =
  | "error.congestion.one"
  | "error.congestion.two"
  | "error.forbidden.goblinVillage"
  | "error.multipleDevices.one"
  | "error.multipleDevices.two"
  | "error.multipleWallets.one"
  | "error.multipleWallets.two"
  | "error.toManyRequest.one"
  | "error.toManyRequest.two"
  | "error.blocked.betaTestersOnly"
  | "error.wentWrong"
  | "error.polygonRPC"
  | "error.connection.one"
  | "error.connection.two"
  | "error.connection.three"
  | "error.diagnostic.info"
  | "error.Web3NotFound";

export type TransactionTerms =
  | "transaction.blockBucksFarm"
  | "transaction.blockchain.one"
  | "transaction.blockchain.two"
  | "transaction.congrats"
  | "transaction.creditCard"
  | "transaction.donate"
  | "transaction.donating"
  | "transaction.doNotRefresh"
  | "transaction.estimated.fee"
  | "transaction.excludeFees"
  | "transaction.id"
  | "transaction.matic"
  | "transaction.maticAmount"
  | "transaction.message"
  | "transaction.minblockbucks"
  | "transaction.mintFarm.one"
  | "transaction.mintFarm.two"
  | "transaction.network"
  | "transaction.openSea"
  | "transaction.pay"
  | "transaction.payCash"
  | "transaction.payMatic"
  | "transaction.progChain"
  | "transaction.progress"
  | "transaction.rejected"
  | "transaction.success"
  | "transaction.t&c.one"
  | "transaction.t&c.two"
  | "transaction.thankYou"
  | "transaction.transacting.one"
  | "transaction.transacting.two"
  | "transaction.transacting.three"
  | "transaction.withdraw.one"
  | "transaction.withdraw.two"
  | "transaction.withdraw.three"
  | "transaction.withdraw.four"
  | "transaction.withdraw.five"
  | "transaction.withdraw.six"
  | "transaction.withdraw.polygon";

export type Onboarding =
  | "onboarding.welcome"
  | "onboarding.step.one"
  | "onboarding.step.two"
  | "onboarding.step.three"
  | "onboarding.intro.one"
  | "onboarding.intro.two"
  | "onboarding.cheer"
  | "onboarding.form.one"
  | "onboarding.form.two"
  | "onboarding.duplicateUser.one"
  | "onboarding.duplicateUser.two"
  | "onboarding.starterPack";

export type Questions = "questions.obtain.MATIC" | "questions.lowCash";

export type Statements =
  | "statements.adventure"
  | "statements.beta.one"
  | "statements.beta.two"
  | "statements.blacklist.one"
  | "statements.blacklist.two"
  | "statements.clickBottle"
  | "statements.clock.one"
  | "statements.clock.two"
  | "statements.cooldown"
  | "statements.docs"
  | "statements.dontRefresh"
  | "statements.guide.one"
  | "statements.guide.two"
  | "statements.jigger.one"
  | "statements.jigger.two"
  | "statements.jigger.three"
  | "statements.jigger.four"
  | "statements.jigger.five"
  | "statements.jigger.six"
  | "statements.jigger.seven"
  | "statements.lvlUp"
  | "statements.maintenance"
  | "statements.minted"
  | "statements.minting"
  | "statements.news"
  | "statements.ohNo"
  | "statements.openGuide"
  | "statements.patience"
  | "statements.potionRule.one"
  | "statements.potionRule.two"
  | "statements.potionRule.three"
  | "statements.potionRule.four"
  | "statements.potionRule.five"
  | "statements.potionRule.six"
  | "statements.potionRule.seven"
  | "statements.sflLim.one"
  | "statements.sflLim.two"
  | "statements.sniped"
  | "statements.switchNetwork"
  | "statements.sync"
  | "statements.tapCont"
  | "statements.thankYou"
  | "statements.wrongChain.one";

export type BumpkinTrade =
  | "bumpkinTrade.askPrice"
  | "bumpkinTrade.purchased"
  | "bumpkinTrade.plaza"
  | "bumpkinTrade.lvl"
  | "bumpkinTrade.noTradeLs"
  | "bumpkinTrade.sell"
  | "bumpkinTrade.list";
