// get rid of duplicates - occurs when there are multiple

// https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/

var ageForm = document.getElementById("age");
var today = new Date();
var date2search = new Date(document.getElementById("date").value);

var names = [];
var deadline = [];
var level = [];
var category = [];
var age_group = [];
var description = [];
var link = [];

var nNames = [];
var nDeadline = [];
var nLevel = [];
var nCategory = [];
var nAge_Group = [];
var nDescription = [];
var nLink = [];
var oLink = [];

var oNames = [];
var oDeadline = [];
var oLevel = [];
var oCategory = [];
var oAge_Group = [];
var oDescription = [];
var oLink = [];

function retrieveCol(arr, ind) {
  var temp = arr.filter(x => ((x != "<tr>") & (x != "</tr>") & (x != "<th>") & (x != "</th>")))
  var result = [];

  for (let n = ind; n < temp.length; n = n + 7) {
    result.push(temp[n]);
  }

  return result;
}

function printData(arr1, arr2, arr3) {
  var display = "<th class = 'head' style = 'width:33%'>Name</th><th class = 'head' style = 'width:33%'>Deadline</th><th class = 'head' style = 'width:33%'>Level</th>";
  
  for (let p = 1; p < arr1.length; p++) {
    display = display + "<tr>";
    display = display + "<th>" + arr1[p] + "</th>";
    display = display + "<th>" + arr2[p] + "</th>";
    display = display + "<th>" + arr3[p] + "</th>";
    display = display + "</tr>";
  }
  display = display.replaceAll('\"', "");
  display = display.replaceAll(",", ", ");
  display = display.replaceAll("i1", "International");
  display = display.replaceAll("n1", "National");
  display = display.replaceAll("s1", "State");
  display = display.replaceAll("c1", "County");
  display = display.replaceAll("s2", "School");
  
  document.getElementById("myTable").innerHTML = display;
}

function addIn(ind) {
  nNames.push(names[ind]);
  nDeadline.push(deadline[ind]);
  nLevel.push(level[ind]);
  nCategory.push(category[ind]);
  nAge_Group.push(age_group[ind]);
  nDescription.push(description[ind]);
  nLink.push(link[ind]);
}

function update() {
  names = nNames;
  deadline = nDeadline;
  level = nLevel;
  category = nCategory;
  age_group = nAge_Group;
  description = nDescription;
  link = nLink;

  nNames = [];
  nDeadline = [];
  nLevel = [];
  nCategory = [];
  nAge_Group = [];
  nDescription = [];
  nLink = [];
}

function filterDate() {
  var year2search = date2search.getFullYear().toString();
  var month2search = date2search.getMonth();
  var year2searchNext = parseInt(year2search) + 1;
  var diffArr = [];

  year2searchNext = year2searchNext.toString();

  for (let r = 0; r < deadline.length; r++) {
    temp = new Date(deadline[r]+year2search);
    if ((month2search > 10) & (temp.getMonth() < 3)) {
      temp = new Date(deadline[r]+year2searchNext);
    }
    diff = Math.floor((temp.getTime() - date2search.getTime())/(1000 * 3600 * 24));
    //.toLocaleDateString()
    if (diff > 0 && diff < 62) {
      addIn(r);
      diffArr.push(diff)
    }
  }

  update();
  
  for (let p = 0; p < diffArr.length-1; p++) {
    for (let r = p+1; r < diffArr.length; r++) {
      if (diffArr[p] > diffArr[r]) {
        switchElem(diffArr, p, r);
        switchElem(names, p, r);
        switchElem(deadline, p, r);
        switchElem(level, p, r);
        switchElem(category, p, r);
        switchElem(age_group, p, r);
        switchElem(description, p, r);
        switchElem(link, p, r);
      }
    }
  }
}

function switchElem(arr, ind1, ind2) {
  var temp = 0;
  temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;
}

function filterAge() {
  var target = "";

  for(let p = 0; p < ageForm.options.length; p++) {
    if(ageForm.options[p].selected == true) {
      target = ageForm.options[p].value;
    }
  }
  // console.log(target);
  if (target != "all") {
      for (let q = 0; q < age_group.length; q++) {
        if (age_group[q].includes(target)) {
          addIn(q);
      }
    }
    update();
  }
}

function updateNotes() {
  var temp = "";
  var linkWorks = false;

  for (let r = 1; r < names.length; r++) {
    temp = temp + "<div id = 'group'>";
    temp = temp + "<h2 class = 'title'>";
    if (link[r].includes("http")) {
      temp = temp + "<a href = '" + link[r] + "' target = '_blank'>";
      linkWorks = true;
    }
    else {
      linkWorks = false;
    }
    temp = temp + names[r] + "</h2>";
    temp = temp + "</a>";
    temp = temp + "<p>" + description[r] + "</p>";
    if (linkWorks == false) {
      temp = temp + "<p> " + link[r] + "</p>";
    }
    temp = temp + "</div>";
  }

  temp = temp + "<br>"
  temp = temp.replaceAll('\"', "");
  document.getElementById("notes").innerHTML = temp;
}

function checkAllBoxes() {
  var checkboxes = document.getElementsByName("category")

  for (let s = 0; s < checkboxes.length; s++) {
    checkboxes[s].checked = true;
  }
}

function filterBox() {
  var checkboxes = document.getElementsByName("category");
  var unchecked = [];
  var decide = true;

  for (let t = 0; t < checkboxes.length; t++) {
    if (checkboxes[t].checked == false) {
      unchecked.push(checkboxes[t].value);
    }
  }

  if (unchecked.length > 0) {
    for (let u = 0; u < unchecked.length; u++) {
      for (let v = 0; v < category.length; v++) {
        if ((category[v].includes(unchecked[u]) == false) && (nNames.indexOf(names[v]) < 0)) {
        addIn(v);
      }
    }
  }
  update();
  }
  console.log(names.length);
}

function submitClick() {
  date2search = new Date(document.getElementById("date").value);

  filterDate();
  filterAge();
  filterBox();

  printData(names, deadline, level);
  updateNotes();

  names = oNames;
  deadline = oDeadline;
  level = oLevel;
  category = oCategory;
  age_group = oAge_Group;
  description = oDescription;
  link = oLink;
}

function clearForm() {
  document.getElementById("date").value = "mm/dd/yyyy"
  ageForm.selectedIndex = 0;
  checkAllBoxes();
}

async function getData() {
  const response = await fetch("v1.csv");
  const data = await response.text();
  var doubleQuotes = [];
  var commas = [];
  var clean = [];
  var first = 0;
  var cleanString = "";

  dataArr = data.split("vacuus");

  for(let i = 0; i < dataArr.length; i++) {
    temp = dataArr[i];
    // find all indices of double quotes
    for (let j = 0; j < temp.length; j++) {
      if (temp[j] == "\"") {
        doubleQuotes.push(j);
      }
      if (temp[j] == ",") {
        commas.push(j);
      }
    }

    first = 0;
    if (doubleQuotes.length == 0) {
      for (let m = 0; m < temp.length; m++) {
        if (m = commas[0]) {
          clean.push(temp.slice(first, m));
          first = m+1;
          commas.shift();
        }
      }
    }

    else {
      for (let k = 0; k < temp.length; k++) {
        if (k != doubleQuotes[0]) {
          if (temp[k] == ",") {
            clean.push(temp.slice(first,k));
            first = k+1;
          }
        }
        else {
          doubleQuotes.shift();
          k = doubleQuotes[0];
          doubleQuotes.shift();
        }
      }
    }
    doubleQuotes = [];
    commas = [];
    
  }

  names = retrieveCol(clean, 0)
  deadline = retrieveCol(clean, 1);
  level = retrieveCol(clean, 2);
  category = retrieveCol(clean, 3);
  age_group = retrieveCol(clean, 4);
  description = retrieveCol(clean, 5);
  link = retrieveCol(clean, 6);

  oNames = names;
  oDeadline = deadline;
  oLevel = level;
  oCategory = category;
  oAge_Group = age_group;
  oDescription = description;
  oLink = link;

  date2search = today;
  checkAllBoxes();
  filterDate();
  updateNotes();

  printData(names, deadline, level);
}

getData();