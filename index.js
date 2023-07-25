var webNameInput = document.getElementById("webName");
var webUrlInput = document.getElementById("web-url");
var websites = [];

if (localStorage.getItem('bookMarks') != null) {
  websites = JSON.parse(localStorage.getItem("bookMarks"));
  display(websites);
}

function isValidURL(url) {
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
  return urlPattern.test(url);
}

function isValidName(name) {
  return name.trim().length >= 3;
}

function isNameUnique(name) {
  return !websites.some(site => site.websiteName === name);
}

function addWebsite() {
  const name = webNameInput.value;
  const url = webUrlInput.value;

  if (isValidURL(url) && isValidName(name) && isNameUnique(name)) {
    const site = {
      websiteName: name,
      webUrl: url
    };
    websites.push(site);
    localStorage.setItem("bookMarks", JSON.stringify(websites));
    display(websites);
    clearForm();
  } else {
    window.alert("Invalid input! Please enter a valid URL and a name of at least 3 letters that's not entered before.");
  }
}

function display(websites){
    var elementsToBeDisplayed="";
    
    for( let i =0; i<websites.length; i++){
        elementsToBeDisplayed +=  `<tr>
        <th scope="row">${i+1}</th>
        <td>${websites[i].websiteName}</td>
        <td><button class="btn  btn-outline-success ">
        <a class=" text-decoration-none aa" href="${websites[i].webUrl}">Visit</a>
        </button></td>
        <td><button class="btn btn-outline-success " onclick="deleteWebsite(${i})">Delete</button></td>
      </tr>`
    }
    document.getElementById("table-body").innerHTML=elementsToBeDisplayed;
}
function clearForm(){
    webNameInput.value= "";
    webUrlInput.value= "";
}

function deleteWebsite(index){
    websites.splice(index, 1);
     localStorage.setItem("bookMarks", JSON.stringify(websites));
    display(websites);
}