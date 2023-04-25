
function addCat(){
    const catData = document.getElementById("catName").value+";"+document.getElementById("catGender").value+";"+document.getElementById("catAge").value;
      navigator.sendBeacon('http:localhost:3000/addCat/'+ catData);
      console.log(catData);
    }