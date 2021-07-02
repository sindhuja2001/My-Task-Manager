const taskContainer= document.querySelector(".task__Container");

//In html, whenever the browser loads, data from the body tag gets printed, same procedure persists

const loadCardData= ()=> {
  //LocalStorage to get Data
  const getData= localStorage.getItem("Sindhuja_Sivakumar");
  //Convert it into normal object so that we can understand
  const {cards}= JSON.parse(getData);

  //Loop over the array to create HTML card, inject it into DOM
   cards.map((cardObject)=> {
    taskContainer.insertAdjacentHTML("beforeend", generateCard(cardObject));


    //Update storeImage
    storeImage.push(cardObject);

   })
  
}

//We need the collection of images so that we're using an array

let storeImage= [];

const generateCard= (taskData)=> `
<div class="col-md-6 col-lg-4">
     <div class="card">
       <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success" id= ${taskData.id} onclick= "editCard.apply(this, arguments)">
        <i class="fas fa-pencil-alt" id= ${taskData.id} onclick= "editCard.apply(this, arguments)"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" id= ${taskData.id} onclick= "deleteCard.apply(this, arguments)">
            <i class="fas fa-trash" id= ${taskData.id} onclick= "deleteCard.apply(this, arguments)" ></i>
        </button>
       </div>
       <img src="${taskData.imageUrl}" 
       class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${taskData.taskTitle}</h5>
         <p class="card-text">${taskData.taskDescription}</p>
         <a href="#" class="btn btn-primary">${taskData.taskType}</a>
       </div>
       <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary" id= ${taskData.taskType}>Open Task</button>
       </div>
     </div>
   </div>
`;

const updateLocalStorage= ()=> {
 //Store this in LocalStorage---Converting to string because it can understand only the string. 
 localStorage.setItem("Sindhuja_Sivakumar", JSON.stringify({cards: storeImage}));
}
const saveChanges= ()=>{
    const taskData={
        id: `${Date.now()}`,
        imageUrl: document.getElementById("image__url").value,
        taskType: document.getElementById("type").value,
        taskTitle: document.getElementById("title").value,
        taskDescription: document.getElementById("taskDescription").value,
    };
    taskContainer.insertAdjacentHTML("beforeend", generateCard(taskData));

    storeImage.push(taskData);

  updateLocalStorage();

};

const deleteCard= (event)=> {
  //Match the target Id with the card Id, if matched then delete
  event= window.event;
  const targetID= event.target.id;
 const tagname= event.target.tagName;
  //Either Use directly the storeImage

  storeImage= storeImage.filter((cardObject)=> cardObject.id!== targetID);
  localStorage.setItem("Sindhuja_Sivakumar", JSON.stringify({cards: storeImage}));
  updateLocalStorage();
  
  //storeImage= UpdatedDeleteCard;

  //taskContainer.removeChild(document.getElementById(targetID));
  if(tagname=== "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

}

//Edit the Card
const editCard= (event)=> {

  event= window.event;
  const targetID= event.target.id;
  const tagname= event.target.tagName;

  //We need a ParentELement to uniquely identify the child
  let parentElement;


  if(tagname=== "BUTTON"){
     parentElement=  event.target.parentNode.parentNode;
   }else{
    parentElement=  event.target.parentNode.parentNode.parentNode;
   }

   
  //Find the parent for the child
   let taskTitle= parentElement.childNodes[5].childNodes[1];
   let taskType= parentElement.childNodes[5].childNodes[3];
   let taskDescription= parentElement.childNodes[5].childNodes[5];
   let submitButton= parentElement.childNodes[7].childNodes[1];

   taskTitle.setAttribute("contenteditable", "true");
   taskType.setAttribute("contenteditable", "true");
   taskDescription.setAttribute("contenteditable", "true");
   submitButton.setAttribute("onclick", "saveEditChanges.apply(this, arguments)");
   submitButton.innerHTML= "Save Changes";

}
const saveEditChanges= (event)=> {
  event= window.event;
  const targetID= event.target.id;
  const tagname= event.target.tagName;

  //We need a ParentELement to uniquely identify the child
  let parentElement;


  if(tagname=== "BUTTON"){
     parentElement=  event.target.parentNode.parentNode;
   }else{
    parentElement=  event.target.parentNode.parentNode.parentNode;
   }

   
  //Find the parent for the child
   let taskTitle= parentElement.childNodes[5].childNodes[1];
   let taskType= parentElement.childNodes[5].childNodes[3];
   let taskDescription= parentElement.childNodes[5].childNodes[5];
   let submitButton= parentElement.childNodes[7].childNodes[1];

  const updatedData= {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };
   storeImage= storeImage.map((task)=> {
     if(task.id=== targetID){
       return{
         id: task.id,
         imageUrl: task.imageUrl,
         taskTitle: updatedData.taskTitle,
         taskType: updatedData.taskType,
         taskDescription: updatedData.taskDescription,
       }
     }
     return task;
   });
   updateLocalStorage();
   taskTitle.setAttribute("contenteditable", "false");
   taskType.setAttribute("contenteditable", "false");
   taskDescription.setAttribute("contenteditable", "false");
   submitButton.removeAttribute("onclick");
   submitButton.innerHTML= "Open Task";
  
};

//Challenges In This Project:

//To get Modal closed---> get from bootstrap----> data-bs-dismiss="modal"✔
//Make Save Changes Button to act✔
//After refreshing, the data gets deleted.✔
    //Store it in Local storage
//Click Delete button to delete the data✔
//Click Edit button to edit.
//Open the Card
