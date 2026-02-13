// if extra time:
// clicking definitions should give tokiponized definitions and clicking words should give groups i guess?
// add 3:"toki pona definition" and 4:{"example usage"} to every definition 
let storage = {}


// bad lines of JSON:  31 64 73 96 127

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
    
    let dict = undefined

    fetch('./dict.json').then(response => {

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })

        .then(data => dict = data; console.log(data); console.log(dict);)
        .catch(error => console.error('Error fetching JSON:', error));
    console.log(dict)

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







