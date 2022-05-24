let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
//same as getElementById (kind of)
const ulEl  = document.querySelector("#ul-el");
//fetch any leads that are stored in localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//if they are any leads stored, render them to the app
if (leadsFromLocalStorage) {
    myLeads = [...leadsFromLocalStorage];
    render(myLeads);
}

function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}<img src="openNew.svg">
                </a>
            </li>`;
        //innerHTML makes the website recognise html code written in js
        //ulEl.innerHTML += `<li>${myLeads[i]}</li>`;
    }
    ulEl.innerHTML = listItems;
}


inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    //save myLeads array to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    //verify that the save works
    console.log(localStorage.getItem("myLeads"));
});

// adds the open tab to the list of links
tabBtn.addEventListener("click", function(){
    //gets the open tab that on the current window (works only on chrome, not local console)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //excecute this code after we get ahold of the current tab
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});