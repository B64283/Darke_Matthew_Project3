//alert("javaScript works");
// Matthew Darke
//VFW 1306 Project3

// waits untill DOM is ready
window.addEventListener("DOMContentLoaded", function() {
    
//shortcut get ele by id
    
    function $(x) {
	    var ele = document.getElementById(x);
	    return ele;
    }
    
   function climate(){
	   var formTag = document.getElementsByTagName("form"),
	   	selectli = $("climates"),
	   	makeSelect = document.createElement("select");
	   	makeSelect.setAttribute("id", "climates");
	 for (var i=0,  j=climates.length; i<j; i++){
	 	var makeOption = document.createElement("option");
	    optText = climates[i]; 
	 	makeOption.setAttribute("value", optText);
	 	makeOption.innerHTML = optText;
	 	makeSelect.appendChild(makeOption);
	 }
	selectLi.appendChild(makeSelect);   	
}
   //var climatesvalue = ["Hot", "Raining", "Cold"];
   //climate();
   
   // check box values
   
   function getClothesvalue(){
	   if ($("Clothes").checked){
		   Clothesvalue = $("Clothes").value;
	   } else { Clothesvalue = "none";	    
	   };
   };
   function getMedicationvalue(){
	   if ($("Medication").checked){
		   Medicationvalue = $("Medication").value;
	   } else { Medicationvalue = "none";	    
	   };
   };
   function getToiletriesvalue(){
	   if ($("Toiletries").checked){
		   Toiletriesvalue = $("Toiletries").value;
	   } else { Toiletriesvalue = "none";	    
	   };
   };
   function toggleControls(n){
	   switch(n){
	        case "on":
	       	    $("vacationForm").style.display = "none";
	       	    $("clear").style.display = "inline";
	       	    $("Display").style.display = "none";
	       	    $("addNew").style.display = "inline";
	       	    break;
	        case "off":
	            $("vacationForm").style.display = "block";
	       	    $("clear").style.display = "inline";
	       	    $("Display").style.display = "inline";
	       	    $("addNew").style.display = "none";
	       	    $("items").style.display = "none";
	       	    break;
	        default:
	            return false;      
      };
   };
    function storeData() {
	    var id           = Math.floor(Math.random()*10000001);
	    //gets all form field values and store in object.
	    //object properties contain array with the form labels and input values.
        getClothesvalue();
        getMedicationvalue();
        getToiletriesvalue()
	    var item			  = {}; 
	        item.name         =["Item name:", $( "Iname" ).value];
	        item.clothes       =["checkbox Clothes:", Clothesvalue];
	        item.meds         =["checkbox Medication:", Medicationvalue];
	        item.toiletries      =["checkbox Toiletries:", Toiletriesvalue];	        
	        item.Budget        =["Budget scale:" , $("budgetplan").value];
	        item.date           =["Vacation starts on:", $("startdate").value];	        
	        item.climateTyp     =["Type of climate:", $("climates").value];
	        item.extraNotes     =["extra thoughts!:", $("notes").value];
	   //save data in local storage and use stringify to convert data into string
	   localStorage.setItem(id, JSON.stringify(item) );
	   alert("Checklist Complete!");
	       
    }
    function getData (){
    	toggleControls("on");
    	var makeDiv = document.createElement("div");
    	makeDiv.setAttribute("id", "items");
    	var makeList = document.createElement("ul");
    	makeDiv.appendChild(makeList);
    	document.body.appendChild(makeDiv);
    	$("items").style.display = "inline";    	
    	for(var i=0, len=localStorage.length; i<len; i++){
	    	var makeli = document.createElement("li");
	    	var linksLi = document.createElement("li");
	    	makeList.appendChild(makeli);
	    	var key = localStorage.key(i);
	    	var value = localStorage.getItem(key);
	    	// convert the string from local storage value back to an object using JSON.parse()
	    	var obj = JSON.parse(value);
	    	var makeSubList = document.createElement("ul");
	    	makeli.appendChild(makeSubList);
	    	for (var n in obj){
		    	var makeSubLi = document.createElement("li");
		    	makeSubList.appendChild(makeSubLi);
		    	var optSubText = obj[n][0]+" "+obj[n][1];
		    	makeSubLi.innerHTML = optSubText; 
		    	makeSubList.appendChild(linksLi);
		   } 
		   makeItemLinks(localStorage.key(i), linksLi);     // create edit and delete buttons / link for each ltem in local storage
	    }
    }
    //make item links function
    //create the edit and delete links for each stored item when displayed
    function makeItemLinks(key, linksLi){
	    //add edit single item link 
	    var editLink = document.createElement("a");
	    editLink.href = "#";
	    editLink.key = key;
	    var editText = "Edit Vacation";
	    //editLink.addEventListener("click", editItem);
	    editLink.innerHTML = editText;
	    linksLi.appendChild(editLink);
	    
	    //add line break
	    var breakTag = document.createElement("br");
	    linksLI.appendChild(breakTag);
	    
	     //add a delete single item link
	    var deleteLink = document.createElement("a");
	    deleteLink.href = "#";
	    deleteLink.key = key;
	    var deleteText = "Delete Vacation";
	    //deleteLink.addEventListener("click", deleteItem);
	    deleteLink.innerHTML = deleteText;
	    linksLi.appendChild(deleteLink);
	    
	    
	    
	    
	    
	    
	 
    }
    
    
    function clearLocal(){
	    if (localStorage.length === 0){
		    alert("No Data To Clear.");
	    } else {
	        localStorage.clear();
	        alert("All Vacations Deleted.");
	        window.location.reload();
	        return false;
	   }
 }
    var displayData = $("Display");
    displayData.addEventListener("click", getData);
    var clearData = $("clear");
    clearData.addEventListener("click", clearLocal);
    var completeChecklist = $("submit");
    submit.addEventListener("click", storeData);



} );




