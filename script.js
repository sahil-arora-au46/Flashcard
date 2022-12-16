let addQue = document.querySelector("#addQuestion");
let editer = document.querySelector(".editer");
let textArea = document.querySelectorAll("textarea");
const btnArray = document.querySelectorAll("button");
let closeIcon = document.querySelector("i");
let tempText;
let [, save] = btnArray;


addQue.addEventListener("click", () => {

    if (editer.style.display === "none") {
        editer.style.display = "block"
    } else { editer.style.display = "none" }
    alert("editer")
});
closeIcon.addEventListener("click", () => {

    alert("icon")
    editer.style.display = "none";
    textArea[0].value = "";
    textArea[1].value = ""
    save.innerText = "Save"
});

save.addEventListener("click", cardSaveUpdate)
function cardSaveUpdate(event) {
    console.log("save se")

    let cardContainer = document.querySelector(".cardContainer");
    //find id,if match replace,if not put new element
    let idArr = document.querySelectorAll(".questionCard");


    let foundId, currentDiv, tempId;

    if (idArr.length == 0) {
        foundId = false;
    }
    else {

        console.log(idArr.length, tempText)
        for (let i = 0; i < idArr.length; i++) {
            if (idArr[i].firstChild.innerText == tempText) {
                foundId = true;
                currentDiv = idArr[i];
                tempId = idArr[i].id;
            }

        }


    }
    console.log(foundId)
    if (foundId) {

        let newEle = createCard();
        let [newDiv, btnEdit, btnDelete, divID] = newEle
        newDiv.id = tempId;
        cardContainer.replaceChild(newDiv, currentDiv)//function return newelement 
        save.innerText = "Save";
        btnDelete.addEventListener("click", (event) => {
            newDiv.remove()
        })
        btnEdit.addEventListener("click", (event, id = divID) => {
            editer.style.display = "block"
            let parent = btnEdit.parentNode.parentNode;
            textArea[0].value = parent.firstChild.innerText;
            textArea[1].value = parent.firstChild.nextSibling.nextSibling.innerText;
            console.log(parent)
            save.innerText = "Update"

        })
    } else {
        let newEle = createCard();
        let [newDiv, btnEdit, btnDelete, divID] = newEle

        cardContainer.appendChild(newDiv)//function return newelement 
        save.innerText = "Save";
        btnDelete.addEventListener("click", (event) => {
            newDiv.remove()
        })
        btnEdit.addEventListener("click", (event, id = divID) => {
            editer.style.display = "block"
            let parent = btnEdit.parentNode.parentNode;
            textArea[0].value = parent.firstChild.innerText;
            textArea[1].value = parent.firstChild.nextSibling.nextSibling.innerText;
            console.log(parent)
            save.innerText = "Update"
            tempText = parent.firstChild.innerText;
            editer.style.boxShadow = "5px 5px 10px black"
        })
    }




}
function createCard() {
    let que = textArea[0].value;
    textArea[0].value = "";// clearing textarea
    let ans = textArea[1].value;
    textArea[1].value = ""; //clearing textarea
    let div = document.createElement("div");
    let divCardBtn = document.createElement("div");
    let h3 = document.createElement("h3");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");
    h3.innerText = que;
    p1.id = "showAnswer"
    p1.innerText = "Show/Hide Answer";
    p2.innerText = ans;
    p2.style.display = "none"
    btnEdit.classList.add("hover");
    btnEdit.innerText = "Edit"
    btnDelete.classList.add("hover");
    btnDelete.innerText = "Delete"
    div.classList.add("questionCard");
    divCardBtn.classList.add("cardBtn");
    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);
    divCardBtn.appendChild(btnEdit);
    divCardBtn.appendChild(btnDelete);
    /*creating dynamic id for div to mentain index */
    let divArr = document.querySelectorAll(".questionCard");
    div.id = "card" + `${divArr.length + 1}`;
    p1.addEventListener("click", () => {
        if (p2.style.display === "none") p2.style.display = "block"
        else p2.style.display = "none"
    })
    div.appendChild(divCardBtn)
    return [div, btnEdit, btnDelete, div.id]
};