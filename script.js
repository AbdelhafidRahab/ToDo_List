let addButton = document.querySelector("#add");
let groups = document.querySelectorAll(".groups span");
let counter = new Map();
counter.set("Work",0);counter.set("Learning",0);counter.set("Gym",0);counter.set("Shopping",0);counter.set("Personal",0);

window.onload = function() {
    if (localStorage.length == 0) {
        Array.from(counter.keys()).forEach((ele)=>{
            localStorage.setItem(ele,0)});
    }else {
        Array.from(counter.keys()).forEach((ele)=>{
            counter.set(ele,localStorage[ele]);
        });
    }

}


addButton.onclick = function() {
    groups.forEach((ele)=>{
        ele.style.display = "none";
    });
    let popupbox = document.createElement("div");
    popupbox.className = "popup-box";
    document.body.appendChild(popupbox);
    let inputContainer = document.createElement("div");
    inputContainer.className = "input-Container";
    let inputField = document.createElement("input");
    inputField.className = "input-Field";
    inputContainer.appendChild(inputField);
    popupbox.appendChild(inputContainer);
    let groupsChoice = document.createElement("div");
    groupsChoice.style.display = "flex";
    groupsChoice.style.justifyContent = "space-around";
    groupsChoice.style.marginTop = "40px";
    groupsChoice.style.width = "100%";
    for(let i=0;i<5;i++) {
        let groupspan = document.createElement("span");
        groupspan.className = "choice";
        groupspan.innerHTML = groups[i].innerHTML;
        groupsChoice.appendChild(groupspan);
    }
    groupsChoice.childNodes.forEach((ele)=>{
        ele.style.display = "flex";
        ele.style.flexDirection = "column";
        ele.style.width = "80px";
        ele.style.alignItems = "center";
        ele.style.cursor = "pointer";
        ele.firstChild.style.width = "80px";
        ele.firstChild.style.marginBottom = "10px";
    });
    groupsChoice.childNodes.forEach((ele)=>{
        ele.onclick = function() {
            groupsChoice.childNodes.forEach((ele)=>{
                ele.style.opacity = 0.5;
            });
            ele.style.opacity = 1;
        }
    })
    popupbox.appendChild(groupsChoice);
    let inputButton = document.createElement("button");
    inputButton.innerHTML = "Add";
    inputButton.className = "input-button";
    popupbox.appendChild(inputButton);
    inputButton.onclick = function() {
        let Item = inputField.value;
        let group = 0;
            for(let i=0;i<5;i++) {
                if (groupsChoice.children[i].style.opacity == 1) {
                    group = groupsChoice.children[i].innerText;
                }
            }

        window.localStorage[`${group}${localStorage.getItem(group)}`] = Item;
        counter.set(group,((counter.get(group))+1));
        localStorage[group] = counter.get(group);
        groups.forEach((ele)=>{
            ele.style.display = "flex";
        });
        popupbox.remove();
    }
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupbox.appendChild(closeButton);
    closeButton.onclick = function() {
        groups.forEach((ele)=>{
            ele.style.display = "flex";
        });
        popupbox.remove();
    }
}
groups.forEach((elem)=>{
    elem.onclick = function() {
        let mychoice = document.createElement("span");
        mychoice.innerHTML = elem.innerHTML;
        groups.forEach((ele)=>{
            ele.style.display = "none";
        });
        addButton.style.display = "none";
        let popupbox = document.createElement("div");
        popupbox.className = "popup-box2";
        document.body.appendChild(popupbox);
        popupbox.appendChild(mychoice);
        mychoice.style.display = "flex";
        mychoice.style.flexDirection = "column";
        mychoice.style.width = "80px";
        mychoice.style.alignItems = "center";
        mychoice.style.cursor = "default";
        mychoice.style.userSelect = "none";
        mychoice.style.fontSize = "20px";
        mychoice.firstChild.style.width = "120px";
        mychoice.firstChild.style.marginBottom = "10px";
        mychoice.style.marginBottom = "20px";
        let toDoList = document.createElement("div");
        toDoList.style.width = "100%";
        popupbox.appendChild(toDoList);

        if (localStorage.getItem(elem.className)!= 0) {
            for(let i=0;i<(localStorage.getItem(elem.className));i++) {
                let toDoItem = document.createElement("span");
                toDoItem.className = "todoItem";
                toDoItem.innerHTML = window.localStorage[`${elem.className}${i}`];
                toDoList.prepend(toDoItem);
            }
        }else {
            let toDoItem = document.createElement("span");
            toDoItem.className = "void";
            toDoItem.innerHTML = "There is no work to do.";
            toDoList.appendChild(toDoItem);
        }
        let item = document.querySelectorAll(".todoItem");
        item.forEach((ele)=>{
            ele.onclick = function() {
                ele.style.opacity = 0.5;
                ele.style.borderColor = "green";
                let done = document.createElement("span");
                done.className = "done";
                ele.appendChild(done);
                ele.style.pointerEvents = "none";
                setTimeout(()=>{
                    for(let i=0;i<localStorage.getItem(elem.className);i++) {
                        if ((localStorage[`${elem.className}${i}`]) == ele.innerText) {
                            ele.remove();
                            localStorage.removeItem(`${elem.className}${i}`);
                            counter.set(elem.className,((counter.get(elem.className))-1));
                        }
                    }
                },1000);
            }
        });
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupbox.appendChild(closeButton);
        closeButton.onclick = function() {
            localStorage[elem.className] = counter.get(elem.className);
            groups.forEach((ele)=>{
                ele.style.display = "flex";
                addButton.removeAttribute("style");
            });
                popupbox.remove();
            }
            
    }
});




