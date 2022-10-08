
const btnHelp = document.getElementById("btnHelp");
const helpMenuBtn = document.getElementById("helpMenuBtn");
const helpSubMenu = document.getElementById("helpSubMenu");
const helpModalTitle = document.getElementById("helpModalMenu");
const helpModalBody = document.querySelector("#helpModal div.modal-body");
const helpModalMenuHTML = `
    <div id="helpView" class="row align-items-center justify-content-sm-end my-2 my-sm-4" role="button">
        <h3 class="fw-lighter col-sm-4 m-0"><i class="fa fa-eye fs-3"></i> Viewing</h3>
        <p class="col-sm-6 my-2 m-sm-0">Click on the contact</p>
    </div>
    <div id="helpAdd" class="row align-items-center justify-content-sm-end my-2 my-sm-4" role="button">
        <h3 class="fw-lighter col-sm-4 m-0"><i class="fa fa-plus fs-3"></i> Adding</h3>
        <p class="col-sm-6 my-2 m-sm-0">Click on the plus button</p>
    </div>
    <div id="helpEdit" class="row align-items-center justify-content-sm-end my-2 my-sm-4" role="button">
        <h3 class="fw-lighter col-sm-4 m-0"><i class="fa fa-pencil fs-3"></i> Editing</h3>
        <p class="col-sm-6 my-2 m-sm-0">Click on the pencil icon</p>
    </div>
    <div id="helpDelete" class="row align-items-center justify-content-sm-end my-2 my-sm-4" role="button">
        <h3 class="fw-lighter col-sm-4 m-0"><i class="fa fa-trash fs-3"></i> Deleting</h3>
        <p class="col-sm-6 my-2 m-sm-0">Click on the trash can icon</p>
    </div>
`;

let currentPage = -1;

const helpOptionsSummary = {
    "view":`<p class="px-sm-5">To view a contact simply click on the contact's name or profile pic.</p>`,
    "add":`<p class="px-sm-5">To add a contact, click on the plus button at the bottom right of the screen and fill in the details.</p>`,
    "edit":`<p class="px-sm-5">To edit a contact, click on the contact's name or profile pic. Then click on the pencil icon to enter edit mode. After changes have been made, click the check icon to save or cross icon to cancel.</p>`,
    "delete":`<p class="px-sm-5">To delete a contact, click on the contact's name or profile pic. Then click on the trash can icon to delete it.</p>`,
};

const loadingHelp = `
        <hr>
        <h5 class="px-sm-5">Details</h5>
        <i class="px-sm-5 fs-3 fa fa-spinner fa-spin"></i>
    `;

let helpOptions = {
    view:   loadingHelp,
    add:    loadingHelp,
    edit:   loadingHelp,
    delete: loadingHelp,
}

btnHelp.addEventListener('click', () => {
    reloadHelpModal();
    currentPage = -1;
});

helpMenuBtn.addEventListener('click',()=>{
    reloadHelpModal();
    currentPage = -1;
});

function reloadHelpModal(){
    helpSubMenu.innerText = "";
    helpModalBody.innerHTML = helpModalMenuHTML;
    helpModalBody.style.overflow = "hidden";
    const helpView = document.getElementById("helpView");
    const helpAdd = document.getElementById("helpAdd");
    const helpEdit = document.getElementById("helpEdit");
    const helpDelete = document.getElementById("helpDelete");
    helpView.addEventListener('click',async () => {
        currentPage = 0;
        displayHelp('view');
        await getHelpPage('view');
    });
    helpAdd.addEventListener('click', async ()=>{
        currentPage = 1;
        displayHelp('add');
        await getHelpPage('add');
    });
    helpEdit.addEventListener('click', async ()=>{
        currentPage = 2;
        displayHelp('edit');
        await getHelpPage('edit');
    });
    helpDelete.addEventListener('click', async ()=>{
        currentPage = 3;
        displayHelp('delete');
        await getHelpPage('delete');
    });
}

function displayHelp(page){
    helpSubMenu.innerText = ` > ${page}`;
    helpModalBody.innerHTML = helpOptionsSummary[page];
    helpModalBody.innerHTML += helpOptions[page];
}

/* Paging Through Help Options */

const prevNextBtn = document.querySelectorAll("#helpModal .modal-footer .btn.btn-secondary");

prevNextBtn[0].addEventListener('click',()=>{
    // prev button
    reloadHelpModal();
    currentPage--;
    //console.log('prev page : '+currentPage);
    newPage(currentPage);
});

prevNextBtn[1].addEventListener('click',()=>{
    // next button
    reloadHelpModal();
    currentPage++;
    //console.log('next page : '+currentPage);
    newPage(currentPage);
});

function newPage(page){
    switch(page){
        case(-2):   currentPage=3;
                    helpDelete.click(); 
                    break;
        case(0):    helpView.click();   break;
        case(1):    helpAdd.click();    break;
        case(2):    helpEdit.click();   break;
        case(3):    helpDelete.click(); break;
        default:    helpMenuBtn.click();
                    currentPage=-1;
    }
}

/* Getting Pages From Database */

async function getHelpPage(page){
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: page}),
    };

    if (helpOptions[page] === loadingHelp) {
        try{
            const response = await fetch("/api/help", options);
            const json = await response.json();
            helpOptions[page] = await json.data; // store locally
            displayHelp(page);
        }catch(err){
            console.log(err);
        }
    }else{
        displayHelp(page);
    }
    helpModalBody.style.overflow = "auto";
    // helpModalBody.style.background = "red";
}
