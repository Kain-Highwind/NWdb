var cdata;
var nchara;
var activePopUp = false;

function createNavBar(){
   let navBarBox = document.createElement("div");
   navBarBox.classList.add("topNavBar");

   let firstLink = document.createElement("a");
   firstLink.innerHTML = "Characters";
   firstLink.classList.add("navBarActive");
   firstLink.setAttribute("href", "index.html");
   navBarBox.appendChild(firstLink);

   let secondLink = document.createElement("a");
   secondLink.innerHTML = "Equipment";
   secondLink.classList.add("navBarInactive");
   navBarBox.appendChild(secondLink);

   let thirdLink = document.createElement("a");
   thirdLink.innerHTML = "About";
   thirdLink.classList.add("navBarInactive");
   navBarBox.appendChild(thirdLink);

   document.body.insertAdjacentElement("afterbegin", navBarBox);
}

async function getfile(file){
   let obj = await fetch(file);
   let txt = await obj.text();
   cdata = JSON.parse(txt);
   nchara = cdata.length;

   console.log("found " + nchara + " characters:\n");
   console.log(cdata);
}

function textColourElement(element){
   switch(element){
      case "water": return "blue";
      case "fire": return "red";
      case "earth": return "orange";
      case "wind": return "green";
      case "space": return "yellow";
      case "time": return "black";
      default: return "white";
   }
}

function createParentDiv(){
   let parentDiv = document.createElement("div");
   parentDiv.classList.add("parentDiv")
   return parentDiv;
}

function createCharaBloc(charaObject){

   let parentDiv = createParentDiv();

   let charaNameBloc = document.createElement("div");
   charaNameBloc.innerHTML = charaObject.name;
   charaNameBloc.classList.add("characterName");
   charaNameBloc.style.color = textColourElement(charaObject.element);
   parentDiv.appendChild(charaNameBloc);

   let charaType = document.createElement("div");
   charaType.innerHTML = charaObject.type;
   parentDiv.appendChild(charaType);

   let charaJob = document.createElement("div")
   charaJob.innerHTML = charaObject.job;
   parentDiv.appendChild(charaJob);

   let charaRole = document.createElement("div");
   charaRole.innerHTML = charaObject.role;
   parentDiv.appendChild(charaRole);

   let popUpWindowId = charaObject.name;
   createPopUpWindow(charaObject, popUpWindowId);

   return parentDiv;
}

function createAllCharaDivs(){
   let firstDiv = document.createElement("div");
   firstDiv.classList.add("firstDiv");
   firstDiv.setAttribute("id", "main");
   let end = document.getElementById("end");
   for (var i = 0 ; i < nchara ; i++){
      let newCharaBloc = createCharaBloc(cdata[i]);
      firstDiv.appendChild(newCharaBloc);
   }
   document.body.insertBefore(firstDiv, end)
}

async function startUp(){
   createNavBar();
   getfile("./charadata.json").then((cdata) => createAllCharaDivs());
}



function createPopUpWindow(popUpContent, id, type){
   let window = document.createElement("div");
   window.classList.add("popUpWindow");
   window.setAttribute("id", id);

   function popUpDivs(text){
      let div = document.createElement("div");
      div.innerHTML = text;
      window.appendChild(div);
   }

   function linebr(){
      window.appendChild(document.createElement("br"));
   }

   function popUpSliders(min, max, type){
      let slider = document.createElement("slidecontainer");
      let metadata = document.createElement("input");
      metadata.setAttribute("type", "range");
      metadata.setAttribute("min", min);
      metadata.setAttribute("max", max);
      metadata.setAttribute("value", 1);
      slider.appendChild(metadata);
      slider.addEventListener("change", function(){
         let newLevel = "level" + metadata.value;
         slider.nextSibling.innerHTML = cdata.type;
      })
      window.appendChild(slider);
   }

   popUpDivs(popUpContent.sbreak.name);
   popUpSliders(1, 4, "sbreak");
   popUpDivs(popUpContent.sbreak.lvl1);
   linebr();
   popUpDivs(popUpContent.ability1.name);
   popUpSliders(1, 5, "ability1");
   popUpDivs(popUpContent.ability1.lvl1);
   linebr();
   popUpDivs(popUpContent.ability2.name);
   popUpSliders(1, 5, "ability2");
   popUpDivs(popUpContent.ability2.lvl1);

   let lineBreak = document.createElement("br");
   window.appendChild(lineBreak);

   let closeButton = document.createElement("button");
   closeButton.setAttribute("type", "button");
   closeButton.setAttribute("class", "close");
   closeButton.innerHTML = "close";
   window.appendChild(closeButton);

   document.body.insertAdjacentElement("afterbegin", window);
}

addEventListener("click", function(element){
   //hide pop-up window on click
   if(element.target.classList.contains("close")){
      element.target.parentNode.style.visibility = "hidden";
      activePopUp = false;
   }

   //open requested pop-up window
   if (element.target.classList.contains("characterName") && !activePopUp){
      document.getElementById(element.target.innerHTML).style.visibility = "visible";
      activePopUp = true;
   }
})
