// TODO: 
// extra features
// expand definitions
// MAKE SITE REAL
// if extra time:
// clicking definitions should give tokiponized definitions and clicking words should give groups i guess?
// add 3:"toki pona definition" and 4:{"example usage"} to every definition 
let storage = {}

// outsourced
function getSelectValues(select) {
  var result = []
  var options = select && select.options
  var opt

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i]

    if (opt.selected) {
      result.push(opt.value || opt.text)
    }
  }
  return result
}

document.addEventListener("DOMContentLoaded", function() { // wait for the doc to load
    
   let dict = {
        "a": {
            1: "emotion, emphasis, add after the target phrase, !",
            2: {
              1:"partical",
              2:"modifier"
            },
            3:"pilin mute pini toki",
            4:{
                1:"my pilin pona tawa toki pona a",
                2:"I love toki pona!"
            }
        },
        "akesi": {
            1: "lizard or reptile",
            2: {
              1:"biological",
            },
            3:"misa kiwen",
            4:{
                1:"akesi mi nimi e askesi Pipo",
                2:"my lizard's name is Pipo"
            }
        },
        "ala": {
            1: "no, nil, void, can invert words when acting as an adverb",
            2: {
              1:"partical",
              2:"modifier"
            },
            3:"how do I define this mannn", // bad
            4:{
                1:"ni li akesi ala",
                2:"this is not a lizard"
            }
        },
        "alasa": {
            1: "hunt, try to, search, pursue",
            2: {
              1:"pre",
            },
            3:"tawa ijo",
            4:{
                1:"mi alasa soweli la soweli alasa tawa",
                2:"what I hunt animals, they try to run"
            }
        },
        "ale": {
            1: "all, infinite, countless, hundred, 100",
            2: {
              1:"number",
            },
            3:"ala ala, mute mute mute mute mute",
            4:{
                1:"jan ale e pona",
                2:"every person is good"
            }
        },
        "anpa": {
            1: "down, lowly",
            2: {
              1:"positional",
            },
            3:"sewi ala", // bad
            4:{
                1:"kiwen lon anpa mi",
                2:"ground is under me"
            }
        },
        "ante": {
            1: "different, other",
            2: {},
            3:"sama ala", // bad
            4:{
                1:"mi en sina e ante mute",
                2:"me and you are very different"
            }
        },
        "anu": {
            1: "boolean question, add 'anu seme' to make a y/n question",
            2: {
              1:"modifier"
            },
            3:"nimi Seme pi lon e ala, seme pi ijo nanpa wan e ijo nanpa tu",
            4:{
                1:"sina wile tawa tomo mi anu seme | sina pilin pona tawa loje anu laso",
                2:"do you want to go to my house?  |         do you prefer red or blue?"
            }
        },
        "awen": {
            1: "wait, keep doing, stay, endure, survive, continue",
            2: {
              1:"pre",
              2:"modifier"
            },
            3:"lon tenpo mute", // bad
            4:{
                1:"tenpo ike la mi awen",
                2:"what times are tough, I endure"
            }
        },
        "e": {
            1: "direct object bridge partical",
            2: {
              1:"partical"
            },
            3:"nimi Li nanpa tu",
            4:{
                1:"jan pona li tawa e mi  | mi pilin pona tawa loje e laso",
                2:"friends follow me      |            i like red and blue"
            }
        },
        "en": {
            1: "and but for subjects",
            2: {
              1:"partical"
            },
            3:"nimi E mute pi jan",
            4:{
                1:"jan Jon en jan Lisa e jan pona",
                2:"John and Lisa are friends"
            }
        },
        "esun": {
            1: "market, trade, business",
            2: {},
            3:"mani something", // bad
            4:{
                1:"jan pi esun Upele li tawa tomo mi",
                2:"uber person is coming to my house"
            }
        },
        "ijo": {
            1: "object, thing, matter, something that exists",
            2: {}
        },
        "ike": {
            1: "bad, poorly, negative",
            2: {}
        },
        "ilo": {
            1: "tool, device, technology",
            2: {}
        },
        "insa": {
            1: "inside, stomach",
            2: {
              1:"biological",
              2:"positional"
            }
        },
        "jaki": {
            1: "dirty, disgusting",
            2: {}
        },
        "jan": {
            1: "person, human, somebody",
            2: {
              1:"biological"
            }
        },
        "jelo": {
            1: "yellow, light green",
            2: {
              1:"color"
            }
        },
        "jo": {
            1: "have, own, hold, possess, carry",
            2: {
              1:"pre"
            }
        },
        "kala": {
            1: "fish, water creature, swimming animal",
            2: {
              1:"biological"
            }
        },
        "kalama": {
            1: "sound, noise, recite",
            2: {}
        },
        "kama": {
            1: "come, become",
            2: {
              1:"pre"
            }
        },
        "kasi": {
            1: "plant, nature",
            2: {
              1:"biological"
            }
        },
        "ken": {
            1: "can, may, possible",
            2: {
              1:"pre"
            }
        },
        "kepeken": {
            1: "use, using",
            2: {
              1:"pre"
            }
        },
        "kili": {
            1: "fruit, vegetable, edible plant ",
            2: {
              1:"biological"
            }
        },
        "kijetesantekalu": {
            1: "raccoon",
            2: {
              1:"biological",
              2:"strange"
            }
        },
        "kin": {
            1: "also, too, as well as",
            2: {
              1:"partical"
            }
        },
        "kipisi": {
            1: "cut, divide, part, portion, section",
            2: {}
        },
        "kiwen": {
            1: "hard, solid, stone",
            2: {}
        },
        "ko": {
            1: "paste, powder, goo, slime",
            2: {}
        },
        "kon": {
            1: "soul, spirit, air, smell, scent, gas",
            2: {}
        },
        "ku": {
            1: "relating to the toki pona dictionary",
            2: {}
        },
        "ju": {
            1: "relating to 'lipu ilo pi toki pona' (this dictionary)",
            2: {}
        },
        "kule": {
            1: "color, paint",
            2: {
              1:"color"
            }
        },
        "kupulu": {
            1: "group, team, community",
            2: {}
        },
        "kute": {
            1: "ear,hear,listen,obey",
            2: {
              1:"biological"
            }
        },
        "la": {
            1: "<sentenceA> la <sentenceB> turns sentenceA into context for sentenceB,or can function as an 'if A then B'",
            2: {
              1:"partical"
            }
        },
        "lape": {
            1: "sleep, rest",
            2: {}
        },
        "laso": {
            1: "blue, green",
            2: {
              1:"color"
            }
        },
        "lawa": {
            1: "head, mind, control, leader, lead, command",
            2: {
              1:"biological"
            }
        },
        "leko": {
            1: "block, square, 3 dimensional",
            2: {
              1:"geometric"
            }
        },
        "len": {
            1: "cloth, clothing, cover, privacy",
            2: {}
        },
        "lete": {
            1: "cool, cold, raw",
            2: {}
        },
        "li": {
            1: "bridges a nouns to verbs",
            2: {
              1:"partical"
            }
        },
        "lili": {
            1: "small, little, young",
            2: {}
        },
        "linja": {
            1: "line, bendy, string, hair, 1 dimensional",
            2: {
              1:"geometric"
            }
        },
        "lipu": {
            1: "paper, document, 2 dimensional, thing that can store information.",
            2: {
              1:"geometric"
            }
        },
        "loje": {
            1: "red",
            2: {
                1:"color"
            }
        },
        "lon": {
            1: "at, exist, in, on, real, true, yes",
            2: {
              1:"pre",
              2:"partical"
            }
        },
        "luka": {
            1: "hand, arm, do, five, 5",
            2: {
              1:"biological",
              2:"number"
            }
        },
        "lukin": {
            1: "eye, see, look, try",
            2: {
              1:"biological"
            }
        },
        "lupa": {
            1: "hole, door, orifice, window",
            2: {
                1:"biological"
            }
        },
        "ma": {
            1: "land, earth, countr, place",
            2: {}
        },
        "mama": {
            1: "parent, guardian, ancestor, creator",
            2: {}
        },
        "mani": {
            1: "money, wealth, goods, trading token of any sort",
            2: {}
        },
        "meli": {
            1: "female, wife, feminine",
            2: {}
        },
        "mi": {
            1: "me, we, I, us",
            2: {}
        },
        "mije": {
            1: "male, husband, masculine",
            2: {}
        },
        "misikele": {
            1: "medicine, cure, health",
            2: {}
        },
        "moku": {
            1: "eat, food, consume",
            2: {
              1:"biological"
            }
        },
        "moli": {
            1: "dead, die, deceased, kill",
            2: {
                1:"biological"
            }
        },
        "monsi": {
            1: "back, rear, butt",
            2: {
              1:"positional"
            }
        },
        "monsuta": {
            1: "monster, dangerous, scary, fear",
            2: {}
        },
        "mu": {
            1: "any animal noise",
            2: {
              1:"modifier"
            }
        },
        "mun": {
            1: "moon, lunar, night sky object",
            2: {}
        },
        "musi": {
            1: "recreational, game, art, playing, fun, entertainment",
            2: {}
        },
        "mute": {
            1: "very, many, much, several, large number of, abundance of, more, twenty, 20",
            2: {
              1:"number"
            }
        },
        "n": {
            1: "umm, hmm, thinking about what to say",
            2: {
              1:"modifier"
            }
        },
        "namako": {
            1: "extra, aditional, bonus, spice, seasoning",
            2: {}
        },
        "nanpa": {
            1: "number, # symbol",
            2: {
              1:"pre",
              2:"partical",
              3:"number"
            }
        },
        "nasa": {
            1: "silly, crazy, insane, drunk, strange, wierd",
            2: {}
        },
        "nasin": {
            1: "method, way, path, road, system, custom, manner",
            2: {}
        },
        "nena": {
            1: "hill, bump, mountain, button, nose, outcrop",
            2: {
              1:"biological"
            }
        },
        "ni": {
            1: "this, that",
            2: {
              1:"modifier"
            }
        },
        "nimi": {
            1: "word, name",
            2: {}
        },
        "noka": {
            1: "leg, body part for movement, foot",
            2: {
              1:"biological"
            }
        },
        "o": {
            1: "command word or grab attention, put after the subject to grab attention or a verb to make it a command",
            2: {
              1:"partical",
              2:"modifier"
            }
        },
        "olin": {
            1: "platonic love, romantic love, respect",
            2: {}
        },
        "oko": {
            1: "eye, sight, vision",
            2: {
                1:"biological"
            }
        },
        "ona": {
            1: "pronouns, gender, he him his, she her hers, they them their, it it's",
            2: {}
        },
        "open": {
            1: "open, begin, start, initial",
            2: {}
        },
        "pakala": {
            1: "blunder, accident, mistake, destruction, damaged, break, broken",
            2: {}
        },
        "pali": {
            1: "create, make, activity, work, work on, deed, project, service, job",
            2: {}
        },
        "palisa": {
            1: "stick, rod, usually cylindrical long sturdy object",
            2: {}
        },
        "pan": {
            1: "grain, cereal, bread, pasta, rice, carb food",
            2: {}
        },
        "pana": {
            1: "give, send, release, emit, place, put somewhere",
            2: {}
        },
        "pi": {
            1: "modifier phrase marker, can turn (meat raw big fish) into (raw meat) of (big fish) by placing it as a seperator",
            2: {
              1:"partical",
              2:"modifier"
            }
        },
        "pilin": {
            1: "feeling, feel, emotion, heart",
            2: {}
        },
        "pimeja": {
            1: "black, dark, shadow",
            2: {
              1:"color"
            }
        },
        "pini": {
            1: "end, finish, stop, ended",
            2: {}
        },
        "pipi": {
            1: "bug, insect",
            2: {
                1:"biological"
            }
        },
        "poka": {
            1: "beside, next to, hip, near, side",
            2: {
              1:"biological",
              2:"positional"
            }
        },
        "poki": {
            1: "container, box, bowl, cage, package",
            2: {}
        },
        "pona": {
            1: "good, simple, useful, friendly",
            2: {}
        },
        "pu": {
            1: "relating to 'toki pona: the language of good'",
            2: {}
        },
        "sama": {
            1: "same, equal, like, identical, twin",
            2: {}
        },
        "seli": {
            1: "fire, warmth, heat, hot, burn",
            2: {}
        },
        "selo": {
            1: "outside, surface, skin, boundary, border, edge",
            2: {
              1:"biological",
              2:"positional"
            }
        },
        "seme": {
            1: "what, which, when, question indicator",
            2: {
              1:"partical",
              2:"modifier"
            }
        },
        "sewi": {
            1: "high, above, sacred, god, holy, up, sky",
            2: {
              1:"positional"
            }
        },
        "sijelo": {
            1: "body, physical state, relating to health",
            2: {
              1:"biological"
            }
        },
        "sike": {
            1: "circle, ball, wheel, year, round, cylindrical",
            2: {
              1:"geometric"
            }
        },
        "sin": {
            1: "new, fresh, another",
            2: {}
        },
        "sina": {
            1: "you, your, yall",
            2: {}
        },
        "sinpin": {
            1: "front, wall, chest, face",
            2: {
              1:"biological",
              2:"positional"
            }
        },
        "sitelen": {
            1: "writing, glyphs, write, draw, picture, image",
            2: {}
        },
        "sona": {
            1: "know, information, wisdom, think",
            2: {}
        },
        "soweli": {
            1: "animal, land mammal, mammal",
            2: {
              1:"biological"
            }
        },
        "suli": {
            1: "big, tall, long, wide, important, adult",
            2: {}
        },
        "suno": {
            1: "sun, light, astronomical star",
            2: {}
        },
        "supa": {
            1: "strong horizontal surface, chair, table, platform, furniture",
            2: {}
        },
        "suwi": {
            1: "sweet, cute, sugar",
            2: {}
        },
        "tan": {
            1: "by, from, because of, caused by, cause, origin",
            2: {
              1:"pre",
              2:"modifier"
            }
        },
        "taso": {
            1: "but, only, exclusively",
            2: {
              1:"pre",
              2:"modifier"
            }
        },
        "tawa": {
            1: "movement, to, leave, transportation, from the perspective of, going to, <thing> to <thing>",
            2: {
              1:"pre",
              2:"modifier",
              3:"positional"
            }
        },
        "telo": {
            1: "water, liquid, wash, wet, beverage",
            2: {}
        },
        "teje": {
            1: "right, side, starboard",
            2: {
              1:"positional"
            },
        },
        "tenpo": {
            1: "temporal, time, moment, sitiation, point in time, duration",
            2: {
              1:"modifier"
            }
        },
        "toki": {
            1: "say, speak, language, talk, communicate",
            2: {}
        },
        "tomo": {
            1: "house, room, building",
            2: {}
        },
        "tonsi": {
            1: "gender queer, nonbinary, transgender, genderfluid",
            2: {}
        },
        "tu": {
            1: "2, two, half",
            2: {
              1:"number"
            }
        },
        "unpa": {
            1: "sex, sexual",
            2: {}
        },
        "uta": {
            1: "mouth, lips, jaw, oral",
            2: {
              1:"biological"
            }
        },
        "utala": {
            1: "battle, fight, war, complete, conflict",
            2: {}
        },
        "walo": {
            1: "while, pale, light-colored",
            2: {
              1:"color"
            }
        },
        "wan": {
            1: "one, 1, unity",
            2: {
              1:"number"
            }
        },
        "waso": {
            1: "bird, winged animal",
            2: {
              1:"biological"
            }
        },
        "wasoweli": {
            1: "flying bird mammal",
            2: {
              1:"biological",
              2:"strange"
            }
        },
        "wawa": {
            1: "strong, power, energy, independant, dependable, electric",
            2: {}
        },
        "weka": {
            1: "away, absent, missing, lack of",
            2: {}
        },
        "wile": {
            1: "want, need, must, desire",
            2: {
              1:"pre"
            }
        },
        "lanpan": {
            1: "grab, seize, steal",
            2: {}
        },
        "jasima": {
            1: "reflection, mirror, flipped",
            2: {}
        },
        "soko": {
            1: "mushroom, fungus, mycelia",
            2: {
                1:"biological"
            }
        },
        "soto": {
            1: "left, side, port",
            2: {
              1:"positional"
            },
        },
        "meso": {
            1: "average, mid, medium",
            2: {}
        },
        "epiku": {
            1: "epic, legendary, heroic",
            2: {}
        },
        "kokosila": {
            1: "speak another language when toki pona would be more effective",
            2: {
              1:"strange"
            }
        },
        "usawi": {
            1: "magic, spell, wizard, supernatural, sorcer, enchant",
            2: {}
        },
        "ojuta": {
            1: "o uta 'deez nuts'",
            2: {
              1:"strange"
            }
        },
        "misa": {
            1: "rat, mouse, rodent, small land creature",
            2: {}
        },
        "********": {
            1: "use one or more of the banned syllables, **, **, **, or **",
            2: {
              1:"strange"
            }
        },
    }

    let Indexes = {}
    let all = {}

    const page = document.getElementById("btn")
    const selecttype = document.getElementById("selectsearchtype")
    const selectgroups = document.getElementById("selectgroups")
    
    // setup initial state
    let index = 0
    for (const key in dict) {
        index++
        
        const element = dict[key]
        
        // LABEL CREATION
        let label = document.createElement("button")
        label.appendChild(document.createTextNode(key))
        label.setAttribute("class","word")
        
        // DEFINITION CREATION
        let definition = document.createElement("button")
        definition.setAttribute("class","meaning")
        definition.appendChild(document.createTextNode(element[1]))
        
        // PREP ROW
        let row = document.createElement("tr")
        let tda = document.createElement("td")
        let tdb = document.createElement("td")
        tdb.name = "meaning"

        // SET PARENTS
        page.appendChild(row)
        row.appendChild(tda)
        row.appendChild(tdb)
        tda.appendChild(label)
        tdb.appendChild(definition)
        row.id = key
        // ADD TO lIST
        Indexes[index] = key
        all[key] = row
        // temporary way to filter out results, used for testing
        label.addEventListener("click", function() {
            selecttype.selectedIndex = 2
        })
        definition.addEventListener("click", function() {
            selecttype.selectedIndex = 1
        })
    }

    document.getElementById("refresh").addEventListener("click", function() {
        // empty storage
        if (!storage.length) {return}
        for (const key in storage) {
            if (!storage[key]) {
                continue
            }
            //console.log(key,storage)
            const element = storage[key]
            page.appendChild(element)
            storage[key] = null
        }
        selectgroups.options.selectedIndex = -1
    })

    // event for whenever you type anything
    function updateSearch() {
        //console.log("update")
        let query = document.getElementById("searchbox").value.toLowerCase()
        let gfilter = getSelectValues(selectgroups)
        let searcht = getSelectValues(selecttype).toString()
        //console.log(query)

        // main search logic

        let results = {}
        
        for (const key in all) { // for everything
            let entry = dict[key]
            if (!entry || entry == undefined) {continue}

            // group matching (ouch)
            let gcheck = 0
            if (entry[2] && entry[2] != undefined) {
                for (const g of gfilter) { // for group filters
                    try {
                        for (const groupinthing in entry[2]) { // for groups in thing
                        console.log(entry[2])
                            if (g == entry[2][groupinthing]) { // if a match
                                //console.log(gfilter[g],"match in",key)
                                gcheck++
                            }
                        }
                    } catch (error) {
                        console.error(error)
                    }
                    
                }
            }
            
            // if group check failed
            if (gcheck != gfilter.length) {
                results[key] = false
                continue
            }

            // checks def and name for query
            let check1 = key.includes(query)
            let check2 = entry[1].includes(query)
            let check3 = null
            if ((searcht == "both" || searcht == "definition") && !query=="") {
                let formattedstr = entry[1]

                // replace bad symbols with space
                formattedstr=formattedstr.replaceAll(",","").replaceAll(".","").replaceAll("("," ").replaceAll(")"," ").replaceAll("/"," ")
                formattedstr = formattedstr.split(" ")
                formattedstr.push(key)
                
                for (const element of formattedstr) {
                    if (element.toLowerCase() == query) {
                        check3 = true
                        break
                    }
                }
                
            }

            // run the checks with search types
            if (
                (searcht == "both" && (check1||check2)) ||
                (searcht == "definition" && check2) ||
                (searcht == "word" && check1)
            ) {
                // write success
                results[key] = true
            } if (!results[key]) {
                // write failure
                results[key] = false
            } if (check3) {


                // this code happens twice because bad

                let element = document.getElementById(key)
                if (!element) {element = storage[key]}

                if (results[key] == false){

                    // send to storage
                    storage[key] = element.cloneNode(true)
                    element.remove() 

                // if in storage but succeeded
                } else if (results[key] == true) {
                    // bring from storage
                    if (storage[key]) {storage[key] = null }

                    let newclone =  element.cloneNode(true) // clone
                    element.remove() // clean
                    page.appendChild(newclone) // implement clone
                    newclone.id = key
                }
                results[key] = "perfect"

                document.getElementById(key).childNodes[1].childNodes[0].style.background = "rgb(92, 92, 92)" // highlight meaning

                if 
                (
                    (key == query.replaceAll(" ", "") && (searcht == "both" || searcht == "word")) || searcht == "definition"
                ) 
                {
                    document.getElementById(key).childNodes[0].childNodes[0].style.background = "rgb(92, 92, 92)" // highlight word if it matches
                }
            } 

        }

        for (const key in all) {
            //console.log(results,results[key])
            let element = document.getElementById(key)
            if (!element || element == undefined) element = storage[key]; // if not real, use storage
            if (!element || element == undefined) continue; // if STILL not real, continue
            
            if (results[key] == "perfect") continue; // if perfect we have already done things

            // if shown but failed
            if (results[key] == false){

                // send to storage
                storage[key] = element.cloneNode(true)
                element.remove() 
                
            // if in storage but succeeded
            } else if (results[key] == true) {
                
                if (storage[key]) {storage[key] = null} // clean storage

                let newclone =  element.cloneNode(true) // clone
                element.remove() // clean
                page.appendChild(newclone) // implement clone
                newclone.id = key
            }

            if (element.childNodes[1] && document.getElementById(key)) {
                document.getElementById(key).childNodes[1].childNodes[0].style.background = "rgb(51, 51, 51)"
                document.getElementById(key).childNodes[0].childNodes[0].style.background = "rgb(51, 51, 51)"
            };
        }
    }
    document.getElementById("searchbox").addEventListener("keyup", updateSearch)
    selectgroups.addEventListener("change", updateSearch)
    selecttype.addEventListener("change", updateSearch)
})
