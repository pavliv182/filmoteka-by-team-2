var modal = document.getElementById('footerBtn');
var btn = document.getElementById("teamBtn");
var span = document.getElementsByClassName('footer-close')[0];

btn.onclick = function () {
modal.style.display = "block";

}

span.onclick = function () {
modal.style.display = "none";
  
}

window.onclick = function (event) {
 if (event.target == modal ) {
  modal.style.display = "none";
 }
    
  }



