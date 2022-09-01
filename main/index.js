

//Resume Downloader
let resumeClick = document.getElementById('resume');
let downloadIcon = document.getElementById('download');

resumeClick.addEventListener("click",function(){
  document.getElementById("download").src = "../media/download_done.png";
    setTimeout(function(){
      document.getElementById("download").src = "../media/download_FILL0_wght200_GRAD200_opsz40.png";
  }, 5000); 
} );


function insInput(checkBox){
  //wage section logic
  if(document.getElementById("wage_section") != null && checkBox.id != "Hiring"){
      let divToRemove = document.getElementById("wage_section");
      divToRemove.remove();
      let hiring_button = document.getElementById("Hiring");
      hiring_button.id = "hiring";
  }
  
  else if(checkBox.id == "hiring"){
    
    let div= document.createElement("div");
    let div1= document.createElement("div");
    let div2 = document.createElement("div");
    let span1 = document.createElement("span");
    let input = document.createElement("input");
    
    div.className = "input-group mb-2";
    div1.className = "input-group-prepend";
    span1.className = "input-group-text";
    div2.className = "input-group-append";
    span1.innerHTML = '$';

    div1.appendChild(span1);
    div.appendChild(div1);
    input.type = "text";
    input.className = "form-control";
    input.id = "wage-input"
    input.name = "Wage";
    input.placeholder = "Hourly wage"
    input.setAttribute('aria-label', 'Amount (to the nearest dollar)');
    div.appendChild(input);

    let wage = document.getElementById("col-7");
   
    div.setAttribute('id','wage_section');
    
    wage.appendChild(div);
    checkBox.id = "Hiring";
  }
    //capitalize first letter function
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1) + ':';
    }

   let textAreaTitle = document.getElementById("textAreaTitle");
   let name = capitalizeFirstLetter(checkBox.id);
   
   textAreaTitle.innerHTML = name;
   let labelName = document.querySelector(".form-check-input");
  
  }

window.onload = function() {
  let form = document.querySelector('#contact-form');
  let namePart = document.getElementById("contact-first-name");
  let popup= document.getElementById("popup");
  let thanks = document.getElementById("thanks");
  let formContainer = document.getElementById("container");
  form.onsubmit = function(event){
    if(!form.checkValidity()){
        form.classList.add('was-validated');
        event.preventDefault();
        return false;
    }
    
    popup.classList.add("open-pop");
    formContainer.classList.add("container-pop");

    return true;
  }

}

function close_pop(){
  let form = document.querySelector('#contact-form');
  let formContainer = document.getElementById("container");
  popup.classList.remove("open-pop"); 
  formContainer.classList.remove("container-pop");
  form.reset();

}






/////////////////card flip/////////////






// Scroll progress bar
// let processScroll = () => {
//   let docElem = document.documentElement,
//   docBody = document.body,
//   scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
//   scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
//   scrollPercent = scrollTop / scrollBottom * 100 + '%';

//    document.getElementById('bar-indicator').value = Math.floor(parseInt(scrollPercent)).toString();
//   console.log(Math.floor(parseInt(scrollPercent)).toString());

// }

// document.addEventListener('scroll',processScroll);
    
  
  
  
  
