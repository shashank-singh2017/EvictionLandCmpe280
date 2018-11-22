function validateEvictionForm() {
    let validFlag = true;
    const name = document.forms["evictionForm"]["name"].value;
    const year = document.forms["evictionForm"]["year"].value;
    const povRate = document.forms["evictionForm"]["povRate"].value;
    const MedGrossRent = document.forms["evictionForm"]["MedGrossRent"].value;
    const MedHouseInc = document.forms["evictionForm"]["MedHouseInc"].value;
    const MedianPropValue = document.forms["evictionForm"]["MedianPropValue"].value;
    const Population = document.forms["evictionForm"]["population"].value;
    const RentBurden = document.forms["evictionForm"]["RentBurden"].value;

    if (name === '') {
        document.getElementById("NameError").innerHTML = "State Name cannot be empty";
        validFlag = false;
    }
    if (year === '') {
        document.getElementById("yearError").innerHTML = "Year cannot be empty";
        validFlag = false;
    }
    if (povRate === '') {
        document.getElementById("povRateError").innerHTML = "Poverty Rate  cannot be empty";
        validFlag = false;
    }
    if (MedGrossRent === '') {
        document.getElementById("MedGrossRentError").innerHTML = "Median Gross Rent cannot be empty";
        validFlag = false;
    }
    if (MedHouseInc === '') {
        document.getElementById("MedHouseIncError").innerHTML = "Median House Income cannot be empty";
        validFlag = false;
    }
    if (MedianPropValue === '') {
        document.getElementById("MedianPropValueError").innerHTML = "Median Property Value cannot be empty";
        validFlag = false;
    }
    if (Population === '') {
        document.getElementById("populationError").innerHTML = "Population cannot be empty";
        validFlag = false;
    }
    if (RentBurden === '') {
        document.getElementById("RentBurdenError").innerHTML = "Rent Burden cannot be empty";
        validFlag = false;
    }

    return validFlag;
}
