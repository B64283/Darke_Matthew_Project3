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
	selectli.appendChild(makeSelect);   	
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
    function storeData(key) {
	    //if there is no key, this means this is a new item and needs a new key
	    if (!key){
		   var id           = Math.floor(Math.random()*10000001);
	    }else{
	     // set id to existing key we"re editing so it will save over the data
	     // the key is the same key that is passed along from the edit submit event handeler.
	     // then goes to the validate function and the passed here, into the stor data function
		    id= key;
	    }
	    //gets all form field values and store in object.
	    //object properties contain array with the form labels and input values.
        getClothesvalue();
        getMedicationvalue();
        getToiletriesvalue()
	    var item			  = {}; 
	        item.name         =["Item name:", $( "Iname" ).value];
	        item.length        =["length of vacation:", $("quantity").value];
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
	    editLink.addEventListener("click", editItem);
	    editLink.innerHTML = editText;
	    linksLi.appendChild(editLink);
	    
	    //add line break 
	    var breakTag = document.createElement("br");
	    linksLi.appendChild(breakTag);
	    
	     //add a delete single item link
	    var deleteLink = document.createElement("a");
	    deleteLink.href = "#";
	    deleteLink.key = key;
	    var deleteText = "Delete Vacation";
	    //deleteLink.addEventListener("click", deleteItem);
	    deleteLink.innerHTML = deleteText;
	    linksLi.appendChild(deleteLink);
    }
    function editItem(){
	    //grab data from item from local storage
	    var value = localStorage.getItem(this.key);
	    var item = JSON.parse(value);
	    //show the form
	    toggleControls("off");
	    
	    //populate the form fields with current local storage values
	    $("Iname").value = item.name[1];
	    $("quantity").value = item.length[1];	    
	    if (item.clothes[1] == "Clothes"); {
	        $("Clothes").setAttribute("checked", "checked");
		}
	    if (item.meds[1] == "Medication"); {
	        $("Medication").setAttribute("checked", "checked");
		}
	    if (item.toiletries[1] == "Toiletries"); {
	        $("Toiletries").setAttribute("checked", "checked");
		}
	    $("budgetplan").value = item.Budget[1];
	    $("startdate").value = item.date[1];
	    $("climates").value = item.climateTyp[1];
	    $("notes").value = item.extraNotes[1];
    
        //remove the initial listener from the input "save contact" button.
        completeChecklist.removeEventListener("click", storeData);
        //change the submitt button value to edit button
        $("submit").value = "Edit Vacation";
        var editSubmit = $("submit");
        //Save the key value established in this function as a properity of the editSubmit event
        // so we can use that value again when we save the data we edited
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    
    
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
     function validate(e){
	     //define elemints we want to check
	     var getIname = $("Iname");
	     var getquantity = $("quantity")	;     
         
         //reset error messeages
         errMsg.innerHTML = " ";
         getIname.style.border = "1px solid black";
         getquantity.style.border = "1px solid black";        
         
         //get error messages
         var messageAry = [];
         
          //name validation   
         if (getIname.value === ""){
	         var InameError = "Please enter an item."
	         getIname.style.border = "1px solid red";
	         messageAry.push(InameError);
             }
         if (getquantity.value === ""){
	         var quantityError = "Please enter numer of days.";    
              getquantity.style.border = "1px solid red";
              messageAry.push(quantityError);
              }
          //if there were errors, display them on the screen
         if (messageAry.length >= 1){
	         for (var i=0,  j=messageAry.length; i < j; i++){
		         var txt = document.createElement("li");
		         txt.innerHTML = messageAry[i];
		         errMsg.appendChild(txt);
	            
	         }
             e.preventDefault();
             return false;         
        } else {
	        // if its all good!! store data! send the key value (which came from edit Data function).
	        //remember this key value passed through the editSubmit event listener as a property 
	        storeData(this.key);
        }
    }     
    //var climates = ["Hot", "Raining", "Cold"];
    //climate();    
    errMsg = $("errors");
    //sets links and submits
    var displayData = $("Display");
    displayData.addEventListener("click", getData);
    var clearData = $("clear");
    clearData.addEventListener("click", clearLocal);
    var completeChecklist = $("submit");
    submit.addEventListener("click", validate);



 });




