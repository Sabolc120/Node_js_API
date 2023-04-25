var url = "http://localhost:3000/checkCats";
var id = "checkCats";

async function createFunc(url, id) {
    var request = await new XMLHttpRequest()

request.open('GET', url, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
checkCats(data, request, id);

}

request.send()
  }

// checkCats funkció formázott változata
function checkCats(data, request, id) {
    if (id == "checkCats") {
      if (request.status >= 200 && request.status < 400) {
        var mainContainer = document.getElementById(id);
        mainContainer.innerHTML = ""; // clear the container
        data.forEach((query) => {
          var div = document.createElement("tr");
          div.innerHTML =
            "<td>" +
            query.id +
            "</td><td><input id='catName" +
            query.id +
            "' placeholder='" +
            query.catName +
            "' value='" +
            query.catName +
            "'/></td><td><input id='catGender" +
            query.id +
            "' placeholder='" +
            query.catGender +
            "' value='" +
            query.catGender +
            "'/></td><td><input id='catAge" +
            query.id +
            "' placeholder='" +
            query.catAge +
            "' value='" +
            query.catAge +
            "'/></td>" +
            "<td><button class='btn btn-light' onclick='editCat(" +
            query.id +
            ")'>Update</button></div></td>" +
            "<td><button class='btn btn-light' onclick='adoptCat(" +
            query.id +
            ")'>Adopt</button></div></td>";
          mainContainer.appendChild(div);
        });
      } else {
        console.log("error");
      }
    }
  }

async function creator(){
await createFunc(url, id);
}

function adoptCat(id){
  navigator.sendBeacon('http://localhost:3000/adoptCat/'+ id);
  console.log(id);
}
function editCat(id){
  const catData = id + ";"+ document.getElementById("catName"+id).value + ";"+ document.getElementById("catGender"+id).value + ";"+ document.getElementById("catAge"+id).value;
  
  navigator.sendBeacon('http://localhost:3000/editCatData/'+ catData);
}

creator();