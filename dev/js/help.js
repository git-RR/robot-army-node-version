
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
    const helpView = document.getElementById("helpView");
    const helpAdd = document.getElementById("helpAdd");
    const helpEdit = document.getElementById("helpEdit");
    const helpDelete = document.getElementById("helpDelete");
    helpView.addEventListener('click',async () => {
        helpSubMenu.innerText = " > view";
        helpModalBody.innerHTML = helpOptionsSummary.view;
        //const page = await getHelpPage('view'); // from database
        //helpModalBody.innerHTML = page.data;
        helpModalBody.innerHTML += helpOptions.view;
        currentPage = 0;
    });
    helpAdd.addEventListener('click', async ()=>{
        helpSubMenu.innerText = " > add";
        helpModalBody.innerHTML = helpOptionsSummary.add;
        //const page = await getHelpPage('add');
        //helpModalBody.innerHTML = page.data;
        helpModalBody.innerHTML += helpOptions.add;
        currentPage = 1;
    });
    helpEdit.addEventListener('click', async ()=>{
        helpSubMenu.innerText = " > edit";
        helpModalBody.innerHTML = helpOptionsSummary.edit;
        //const page = await getHelpPage('edit');
        //helpModalBody.innerHTML = page.data;
        helpModalBody.innerHTML += helpOptions.edit;
        currentPage = 2;
    });
    helpDelete.addEventListener('click', async ()=>{
        helpSubMenu.innerText = " > delete";
        helpModalBody.innerHTML = helpOptionsSummary.delete;
        //const page = await getHelpPage('delete');
        //helpModalBody.innerHTML = page.data;
        helpModalBody.innerHTML += helpOptions.delete;
        currentPage = 3;
    });
}


const helpOptionsSummary = {
    "view":`<p class="px-sm-5">To view a contact simply click on the contact's name or profile pic.</p>`,
    "add":`<p class="px-sm-5">To add a contact, click on the plus button at the bottom right of the screen and fill in the details.</p>`,
    "edit":`<p class="px-sm-5">To edit a contact, click on the contact's name or profile pic. Then click on the pencil icon to enter edit mode. After changes have been made, click the check icon to save or cross icon to cancel.</p>`,
    "delete":`<p class="px-sm-5">To delete a contact, click on the contact's name or profile pic. Then click on the trash can icon to delete it.</p>`,
};


// paging through help options

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

// getting pages from database

let helpOptions = {
    "view":`
            <hr>
            <h5 class="px-sm-5">Details</h5>
            <p class="px-sm-5">Once contacts have been added to the app, they will be displayed when the page loads.</p>
            <p class="px-sm-5">
                When you click on the contact, the full details will be displayed with additional 
                options such as edit and delete.
            </p>
    `,
    "add":`
            <hr>
            <h5 class="px-sm-5">Details</h5>
            <p class="px-sm-5 row">
                <button
                class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa fa-add"></i>
                </button> 
                <span class="col-10">Click on this button to begin adding a new contact.</span>
            </p>
            <p class="px-sm-5">Fill in the blank form with the details of the new contact.</p>
            <p class="px-sm-5">If you do not add a profile pic, an awesome robot pic will be added automatically.</p>
            <p class="px-sm-5 row">
                <button
                class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa-solid fa-check"></i>
                </button> 
                <span class="col-10">Click this icon to save the contact.</span>
            </p>
            <p class="px-sm-5">
                If the fields highlight in red, the info entered is invalid. 
                Fields cannot be left blank.
            </p>
            <p class="px-sm-5 row">
                <button
                class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa-solid fa-x"></i>
                </button> 
                <span class="col-10">
                    If at any point you want to cancel this operation, 
                    click this icon at the bottom of the form. 
                    It will clear the form and cancel the add operation.
                </span>
            </p>
    `,
    "edit":`
            <hr>
            <h5 class="px-sm-5">Details</h5>
            <p class="px-sm-5">Click on the contact that you would like to edit.</p>
            <p class="px-sm-5">The contact details will be loaded, but will be in read-only mode.</p>
            <p class="px-sm-5 row">
                <button
                class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa fa-pencil"></i>
                </button> 
                <span class="col-10">
                    Click this pencil icon to enter edit-mode. 
                    The fields will become writable, and you can now edit the contact's details. 
                </span>
            </p>
            <p class="px-sm-5 row">
                <button
                class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa-solid fa-check"></i>
                </button> 
                <span class="col-10">
                    Once done, click this check icon to save the changes you've made.
                    Please note, that the fields will highlight red if any of the details are invalid, 
                    and therefore the changes will not be saved.
                </span>
            </p>
            <p class="px-sm-5">
                If all changes are valid, the contact info will be saved and the form will return 
                to read-only mode.
            </p>
            <p class="px-sm-5 row">
                <button class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa-solid fa-x"></i>
                </button> 
                <span class="col-10">
                    If, at any point, you want to cancel this operation, 
                    click this cross icon at the bottom of the form. 
                    Note, all changes will be lost and the contact details will be
                    reloaded.
                </span>
            </p>
    `,
    "delete":`
            <hr>
            <h5 class="px-sm-5">Details</h5>
            <p class="px-sm-5">Click on the contact that you would like to delete.</p>
            <p class="px-sm-5">
                The contact details will be loaded. Check that you have selected the 
                correct contact.
            </p>
            <p class="px-sm-5 row">
                <button
                class="col-2 btn bg-transparent text-white border-white rounded-circle mx-2"
                style="height:40px;width:40px">
                    <i class="fa fa-trash"></i>
                </button> 
                <span class="col-10">
                    Click this trash-can icon to delete the contact. 
                    Note: this contact will be removed from the database and cannot 
                    be recovered. 
                </span>
            </p>
            <p class="px-sm-5 row">
                Once the contact is removed, the next contact's details will be 
                loaded in the details panel.
            </p>
    `,
};

async function getHelpPage(page){
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: page}),
    };
    if (helpOptions.page === ``) {
        try{
            const response = await fetch("/api/help", options);
            const json = await response.json();
            helpOptions.page = json.data;    // store locally
            return json;
        }catch(err){
            console.log(err);
        }
    }else{
        return {data:helpOptions.page};
    }
}

