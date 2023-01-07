locality_dropdown_landmarks = new Map()
//  stat from here -----------------------------------------------------------------------------------
console.log("inside the javascrpt file ")

let getData = async () => {
    var citiesArrayForList = JSON.parse(localStorage.getItem("citiesArr")) || [];

    return citiesArrayForList;
}

function createe(tagname) {
    return document.createElement(tagname)
}

function gett(id) {
    return document.querySelector(`#${id}`)
}


// -----------------------------------------global variable declaration section -------------------------------------

const API_KEY = `AIzaSyBpZPN1MYtjDBvj_pi8O0dMLMf_qldiRas`
let map_element = gett("map_iframe")
// map_element.src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d687.6662667361319!2d77.64445335605313!3d12.841477280455933!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd92704396db640bf!2sStanza%20Living%20Amsterdam%20House!5e0!3m2!1sen!2sin!4v1672959720217!5m2!1sen!2sin"
map_element.src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Stanza+Licing,Amsterdam+House,Electronic+City+Phase+1`

function createMapUrl(elem) {

    let myownmapsrc = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=` + `Stanza+Living+${elem.name.split(" ")[0]}+${elem.name.split(" ")[1]}`
    let landmarkAddress = elem.micromarketName
    let landmarkAddressString = ""
    landmarkAddressString = landmarkAddress.split(" ").join("+")

    myownmapsrc += `+${landmarkAddressString}`
    myownmapsrc += `&center=${elem.latitude},${elem.longitude}`

    return myownmapsrc
}


// populatefunction 

let populateHouseList = async (data) => {

    //console.log(data, "data mil chuka hai doston !!!!!!!!!!!!")

    let listContainer = document.querySelector("#plp_content_left_list")
    listContainer.textContent = ""
    let number_of_search_results = gett("number_of_search_results")
    number_of_search_results.textContent = ""
    number_of_search_results.textContent = data.length
    //console.log(typeof(data), data, "-----------------------------------------------------------------------------------")
    let count = 0;
    data.some((elem) => {

        if (count == 12) {
            return true
        }

        // house div which will container two divs - img and deets 
        let house_card = createe("div")
        house_card.classList.add("plp_house_lists")

        // house image div - placed first in house div flex wise

        let house_img_div = createe("div")
        house_img_div.classList.add("plp_house_img_div")

        let house_img = createe("img")
        house_img.src = elem.images[0].imageUrl
        house_img.classList.add("plp_house_img")

        house_img_div.append(house_img)
        house_img_div.addEventListener("mouseover", function () {
            house_img.classList.add("plp_house_img_hover")
        })

        house_img_div.addEventListener("mouseleave", function () {
            house_img.classList.remove("plp_house_img_hover")
        })

        // house deetsdiv, placed second in the house div , flex wise , 

        let house_deets = createe("div")
        house_deets.classList.add("plp_house_deets")
        house_deets.addEventListener("mouseover", function () {

            let linkk = createMapUrl(elem)
            if (linkk == map_element.src) {
                console.log("same hi hai bhia -----------------")
                return
            }
            map_element.src = linkk
        })

        // house deets - house name // koyto house
        let house_deets_name = createe("div")
        house_deets_name.classList.add("plp_house_deets_housename")

        let house_deets_name_h3 = createe("h3")
        house_deets_name_h3.textContent = elem.name

        let house_deets_name_fav_btn = createe("span")
        house_deets_name_fav_btn.innerHTML = `<span class="material-symbols-outlined"> favorite </span>`

        house_deets_name.append(house_deets_name_h3, house_deets_name_fav_btn)

        // house deets - house area // koramangala
        let house_deets_area = createe("p")
        house_deets_area.textContent = elem.micromarketName

        // house deets - male, female and directions 

        let house_deets_tray1 = createe("div")
        house_deets_tray1.classList.add("plp_house_deets_malefemale")

        let house_deets_tray1_left = createe("div")

        let house_deets_tray1_gender = createe("span")
        house_deets_tray1_gender.textContent = elem.genderName

        let verticalBar = createe("span")
        verticalBar.textContent = " | "

        let house_deets_tray1_occupancy = createe("span")
        combinedOccupancyString = ""
        for (var occu of elem.residenceOccupancies) {
            if (occu.soldOut == false) {

                combinedOccupancyString += occu.occupancyName.split(" ")[0] + ". "
            }
        }
        house_deets_tray1_occupancy.textContent = combinedOccupancyString

        house_deets_tray1_left.append(house_deets_tray1_gender, verticalBar, house_deets_tray1_occupancy)


        // house deets - tray 1 - directions button 
        let house_deets_tray1_right = createe("div")

        let house_deets_directions_btn = createe("button")
        house_deets_directions_btn.classList.add("plp_house_deets_directions")

        let house_deets_directions_btn_logo = createe("span")
        house_deets_directions_btn_logo.innerHTML = `<span class="material-symbols-outlined"> my_location </span>`

        let house_deets_directions_btn_txt = createe("span")
        house_deets_directions_btn_txt.textContent = " View Directions "

        house_deets_directions_btn.append(house_deets_directions_btn_logo, house_deets_directions_btn_txt)

        house_deets_tray1_right.append(house_deets_directions_btn)

        house_deets_tray1.append(house_deets_tray1_left, house_deets_tray1_right)


        let house_deets_amneties = createe("p")
        house_deets_amneties.textContent = "Amneties"

        let house_deets_tray2 = createe("div")
        if (elem.feature != null) {
            for (let feature of elem.features) {
                if (feature.enabled == true) {
                    let feature_btn = createe("button")
                    feature_btn.textContent = feature.name
                    house_deets_tray2.append(feature_btn)
                }
            }
        }
        let house_deets_tray3 = createe("div")

        let house_deets_tray3_price = createe("div")

        let house_deets_tray3_price_txt = createe("p")
        house_deets_tray3_price_txt.textContent = "Starts from :"

        let house_deets_tray3_price_value = createe("h3")
        house_deets_tray3_price_value.textContent = elem.startingPrice

        house_deets_tray3_price.append(house_deets_tray3_price_txt, house_deets_tray3_price_value)


        let house_deets_tray3_btn1 = createe("button")
        house_deets_tray3_btn1.textContent = "Schedule a Visit"

        let house_deets_tray3_btn2 = createe("button")
        house_deets_tray3_btn2.textContent = "Unlock Discount"

        house_deets_tray3.append(house_deets_tray3_price, house_deets_tray3_btn1, house_deets_tray3_btn2)

        house_deets.append(house_deets_name, house_deets_area, house_deets_tray1, house_deets_amneties, house_deets_tray2, house_deets_tray3)

        house_card.append(house_img_div, house_deets)

        let linebreak = createe("hr")

        listContainer.append(house_card, linebreak)

        count += 1

    })


}

let globalData

async function callFirstTime() {
    globalData = await getData()
    populateHouseList(globalData)
}

callFirstTime()
// console.log(globalData, "yaaaaaaaaaa")


// ---------------------------------- filter section -------------------------------------------------------

function populate_locality_dropdown() {
    let resultdiv = gett("dropdown_locality_results")
    let inputquery = gett("dropdown_locality_input")

    let count = 0
    for (var i of locality_dropdown_landmarks) {
        console.log(i)
        let btn = createe("button")
        btn.textContent = i[0]
        btn.classList.add("all_locality_buttons")
        btn.addEventListener("click", function () {
            let locality_name = btn.textContent
            let indexx = locality_selected_array.indexOf(locality_name)

            if (indexx > -1 && indexx < locality_selected_array.length) {
                btn.style.backgroundColor = "rgb(240,240,240)"
                locality_selected_array.splice(indexx, 1)
            }
            else {
                btn.style.backgroundColor = "gray"
                locality_selected_array.push(locality_name)
            }

            console.log(locality_selected_array)
        })
        resultdiv.append(btn)

        count += 1;

        if (count == 8)
            break
    }

}

async function createMapforLocality() {
    let data = await getData()

    for (var i of data) {
        locality_dropdown_landmarks.set(i.micromarketName, 1)
    }
    console.log(locality_dropdown_landmarks, "yeah man here")
    populate_locality_dropdown()
}

createMapforLocality()

let show = 0
function showfunction(category) {
    closeAllfilters()
    console.log("category --------------", category)
    let showdiv = gett(`dropdown_${category}`)
    if (show == 0) {
        console.log("1")

        showdiv.style.display = "block"

        show = 1
        return
    }
    else if (show == 1) {
        console.log("2")
        showdiv.style.display = "none"
        show = 0
        return
    }


}

//  individual filters -----------------

//locality filter 

let locality_selected_array = []

locality_save_savebtn = gett("locality_save_savebtn")
locality_save_clearbtn = gett("locality_save_clearbtn")

locality_save_clearbtn.addEventListener("click", function () {
    // by now locality_seleected_array should have all the selected buttons 
})

locality_save_savebtn.addEventListener("click", function () {
    closeAllfilters()
    filterLocality(locality_selected_array, globalData)
})

function closeAllfilters() {
    gett("dropdown_locality").style.display = "none"
    gett("dropdown_occupancy").style.display = "none"
    gett("dropdown_budget").style.display = "none"
    gett("dropdown_gender").style.display = "none"
    gett("dropdown_amneties").style.display = "none"
}

function filterLocality(arr_location, dat) {

    let filteredData = dat.filter(function (elem) {
        for (var i of arr_location) {
            //console.log(elem.micromarketName , i, "comparison kar rahe hai" )
            if (elem.micromarketName == i) {
                return elem
            }
        }
    })

    console.log(filteredData)
    populateHouseList(filteredData)

    //clear array 
    locality_selected_array = []

    //make css of all clikced buttons normal
    clearFilterButtonsCSS(document.querySelectorAll(".all_locality_buttons"))
}

function clearFilterButtonsCSS(xx) {
    //console.log(xx, "ye xXXX hai")

    for (var i of xx) {
        i.style.backgroundColor = "rgb(240,240,240)"
    }
}
// budget filter -----------------------------

console.log(gett("budget_save_savebtn"))
gett("budget_save_savebtn").addEventListener("click", function () {
    closeAllfilters()
    let minpricee = gett("budget_input_min").value
    let maxpricee = gett("budget_input_max").value

    if (minpricee != '' && maxpricee != '' && minpricee != null && maxpricee != null) {
        showInBudget(minpricee, maxpricee)
    }
})

function showInBudget(start, end) {
    console.log(start, end, "these are my price filters")

    let filteredData = globalData.filter(function (e) {
        if (e.startingPrice >= start && e.startingPrice < end) {
            return e
        }
    })

    populateHouseList(filteredData)


}





//  occuapncy filter ----------------------------------------------

let occupancy_selected_array = []

function fill_selected_occupancy_array() {
    buttontext = event.target.textContent
    let btn = event.target
    let indexx = occupancy_selected_array.indexOf(buttontext)
    if (indexx > -1) {
        btn.style.backgroundColor = "rgb(240,240,240)"
        occupancy_selected_array.splice(indexx, 1)
    }
    else {
        btn.style.backgroundColor = "grey"
        occupancy_selected_array.push(buttontext)
    }
}

gett("occupancy_save_savebtn").addEventListener("click", function () {
    closeAllfilters()
    filterOccupancy(occupancy_selected_array, globalData)
})

function filterOccupancy(filterarr, data) {
    console.log(filterarr, "??????????")
    filteredData = data.filter(function (e) {
        for (var occupancyType of filterarr) {
            for (var y of e.residenceOccupancies) {
                console.log(y.soldOut, y.occupancyName, occupancyType)
                if (y.soldOut == false && y.occupancyName.split(" ")[0] == occupancyType) {
                    return e
                }
            }
        }
    })

    console.log(filteredData)

    populateHouseList(filteredData)

    occupancy_selected_array = []

    //make css of all clikced buttons normal
    clearFilterButtonsCSS(document.querySelectorAll(".all_occupancy_buttons"))
}

// gender filter -----------------------

let gender_selected_array = []

function fill_selected_gender_array() {
    let btn = event.target
    indexx = gender_selected_array.indexOf(btn.textContent)

    if (indexx > -1) {
        btn.style.backgroundColor = "rgb(240,240,240)"
        gender_selected_array.splice(indexx, 1)
    }
    else {
        gender_selected_array.push(btn.textContent)
        btn.style.backgroundColor = "grey"
    }
}

gett("gender_save_savebtn").addEventListener("click", function () {
    closeAllfilters()
    filterGender(gender_selected_array, globalData)
})

function filterGender(filterarr, data) {

    let filteredData = data.filter(function (e) {
        for (var genderr of filterarr) {
            // console.log(genderr, e.genderName)
            if (e.genderName == genderr) {
                return e
            }
        }
    })

    populateHouseList(filteredData)

    gender_selected_array = []

    clearFilterButtonsCSS(document.querySelectorAll(".all_gender_buttons"))
}
//amneties filter ----------------------------

let amneties_selected_array = []

function fill_selected_amneties_array() {

    let checkboxTxt = event.target.value
    let indexx = amneties_selected_array.indexOf(checkboxTxt)

    if (indexx > -1) {
        // element already present 

    }
    else {
        amneties_selected_array.push(checkboxTxt)
    }
}

gett("amneties_save_savebtn").addEventListener("click", function () {
    closeAllfilters()
    filterAmneties(amneties_selected_array, globalData)
})

function filterAmneties(filterarr, data) {
    let filteredData = data.filter(function (e) {
        for (var amnetyType of filterarr) {
            // console.log(e.features , "features")
            if (e.features != null) {
                for (var y of e.features) {
                    if (y.enabled == true && y.name == amnetyType)
                        return e
                }
            }
            else {
                console.log(e, "yahan pe null tha feature")
            }
        }
    })

    console.log(filteredData)

    populateHouseList(filteredData)

    amneties_selected_array = []

    clearAmnetiesCheckboxValues(document.querySelectorAll(".all_amneties_checkbox"))
}

function clearAmnetiesCheckboxValues(amneties_checboxes) {
    console.log(amneties_checboxes, "all the menties vhecboxes")
    for (var i of amneties_checboxes) {
        i.checked = false
    }
}


// -------------------------------------------------- sort functionality -----------------------------------------------------------------------------------// 

function sortData() {
    let sorttype = gett("sort_data_dropdown")
    console.log(sorttype.value)
    if (sorttype.value == "ascending") {
        // get from localstorage 
        //console.log(globalData, "before sort")
        globalData.sort(function (x, y) {
            if (x.startingPrice > y.startingPrice)
                return 1
            else if (x.startingPrice < y.startingPrice)
                return -1
            else
                return 0
        })
        // console.log(globalData, "after sort")
        populateHouseList(globalData)
    }
    else if (sorttype.value == "descending") {
        // console.log(globalData, "before sort")
        globalData.sort(function (x, y) {
            if (x.startingPrice > y.startingPrice)
                return -1
            else if (x.startingPrice < y.startingPrice)
                return 1
            else
                return 0
        })
        // console.log(globalData, "after sort")
        populateHouseList(globalData)
    }
    else if (sorttype.value == "popularity") {

        populateHouseList(globalData)
    }
    else {
        console.log("wrong sort type mate")
    }
}