var cdata;
var nchara;

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

   return parentDiv;
}

function createAllCharaDivs(){
   let firstDiv = document.createElement("div");
   firstDiv.classList.add("firstDiv");
   let end = document.getElementById("end");
   for (var i = 0 ; i < nchara ; i++){
      let newCharaBloc = createCharaBloc(cdata[i]);
      firstDiv.appendChild(newCharaBloc);
   }
   document.body.insertBefore(firstDiv, end);
}

async function startUp(){
   getfile("./charadata.json").then((cdata) => createAllCharaDivs());
}