const editButton = document.querySelector(".edit")
const deleteButton = document.querySelector(".delete")
const doneButton = document.querySelector(".done")
const saveButton = document.querySelector("#btn-save")
const inputField = document.querySelector("#itemInput")
const container = document.querySelector(".container")


let items = []
let counter = 0


//retrieve the list of task from local storage at program start
function getListFromStorage(){
        let getLocalStorageData = localStorage.getItem("New Todo");

        if(getLocalStorageData != null){
            items = JSON.parse(getLocalStorageData); 
        }
}


//store the current list of tasks in local storage
function storeListInStorage (){
    localStorage.setItem("New Todo", JSON.stringify(items));
}


//delete a particular item from list of tasks
function deleteItem(event) {

    //first get the parent of the clicked element
    let targetElement = event.target
    let parentElement = targetElement.parentElement.parentElement
    let parentClassName = (parentElement.className)
    let parentClassNameLength = parentClassName.length

    let requiredClassName = parentClassName.substr(parentClassNameLength-1)
    let deletionIndex = Number(requiredClassName)
    items.splice(deletionIndex, 1)
    parentElement.remove()
    storeListInStorage()
    
}

// function editItem(event) {
//     let targetElement = event.target
//     let parentElement = targetElement.parentElement
//     let parentClassName = (parentElement.className)
//     let parentClassNameLength = parentClassName.length

//     let requiredClassName = parentClassName.substr(parentClassNameLength-1)
//     let deletionIndex = Number(requiredClassName)
// }

//done executing a particular task on the list, cross it out but keep in storage
function doneItem(event) {
    
    let targetElement = event.target
    let parentElement = targetElement.parentElement.parentElement
    let contentElement = parentElement.querySelector(`.content`)
    contentElement.style = "text-decoration: line-through; text-decoration-thickness:4px"
    let parentClassName = (parentElement.className)
    let parentClassNameLength = parentClassName.length
    let requiredClassName = parentClassName.substr(parentClassNameLength-1)
    let deletionIndex = Number(requiredClassName)
    
    items[deletionIndex].done = true
    targetElement.remove()
    storeListInStorage()
    
}

//function fired when the save button is clicked
saveItem = () => { 
    let newItem = {
        task: inputField.value, 
        done: false
    }
    if(inputField.value.trim() != 0){
        items.push(newItem)

        if(items.length <= 2){
            items = items.filter((element)=>{
                return element != null
            })
        }
        storeListInStorage()
        showItem((items.length)-1)
    }
}

//function fired when enter is pressed on the input bar
 kSaveItem = (event)=>{
     
    let newItem = {
        task: inputField.value, 
        done : false
    }
    
    if(inputField.value.trim() != 0 && event.code == "Enter"){
        items.push(newItem)
        

        if(items.length <= 2){
            items = items.filter((element)=>{
                return element != null
            })
        }
        
        storeListInStorage()
        showItem((items.length)-1)
    }
}


//function to render items existing in list of tasks
function showItem (newItemIndex){
    let newItem = items[newItemIndex]
    
    // let newItemHTML = `<span class="done" onclick="doneItem(event)">Done</span>`+`<span class='edit' onclick="editItem(event)">Edit</span>`+ `<span class='content'>${newItem}</span>`+`<span class="delete" onclick="deleteItem(event)">Delete</span>`

    let newItemHTML = `<span class='content'>${newItem.task}</span>`+ `<span class="button-controls"><span class="done" onclick="doneItem(event)">Done</span><span class="delete" onclick="deleteItem(event)">Delete</span></span>`

     let newElement = document.createElement('div')

     newElement.className = `item ${newItemIndex}`
     
     
     newElement.innerHTML = newItemHTML
     container.appendChild(newElement)

     console.log(items)
}


function loadItems() {
    let getLocalStorageData = localStorage.getItem("New Todo");

        if(getLocalStorageData != null){
            items = JSON.parse(getLocalStorageData); 

            items.forEach((item, index)=>{
                let Item = items[index]

                
                let newItem = Item.task
                let status = Item.done

                if(status){
                    //if the task is done already
                    let newItemHTML = `<span style='text-decoration: line-through; text-decoration-thickness:4px' class='content'>${newItem}</span>`+ `<span class="button-controls"><span class="delete" onclick="deleteItem(event)">Delete</span></span>`

                   let newElement = document.createElement('div')
            
                    newElement.className = `item ${index}`
                    
                    
                    newElement.innerHTML = newItemHTML
                    container.appendChild(newElement)
                
                    console.log(items)
                }

                else {
                   let newItemHTML = `<span class='content'>${newItem}</span>`+ `<span class="button-controls"><span class="done" onclick="doneItem(event)">Done</span><span class="delete" onclick="deleteItem(event)">Delete</span></span>`

                   let newElement = document.createElement('div')
            
                    newElement.className = `item ${index}`
                    
                    
                    newElement.innerHTML = newItemHTML
                    container.appendChild(newElement)
                
                    console.log(items)
                }
                
                 
            })
        }
}


saveButton.addEventListener("click", saveItem)
inputField.addEventListener("keyup", kSaveItem)
window.addEventListener("load", loadItems)



