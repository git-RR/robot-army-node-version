
const btnHelp = document.getElementById("btnHelp");
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

btnHelp.addEventListener('click', () => {
    helpModalBody.innerHTML = helpModalMenuHTML;
    reloadHelpModal();
});

function reloadHelpModal(){
    const helpView = document.getElementById("helpView");
    const helpAdd = document.getElementById("helpAdd");
    const helpEdit = document.getElementById("helpEdit");
    const helpDelete = document.getElementById("helpDelete");
    helpView.addEventListener('click',()=>{
        helpModalBody.innerHTML = helpObj.view;
    });
    helpAdd.addEventListener('click',()=>{
        helpModalBody.innerHTML = `<p>You've selected Add Help</p>`;
    });
    helpEdit.addEventListener('click',()=>{
        helpModalBody.innerHTML = `<p>You've selected Edit Help</p>`;
    });
    helpDelete.addEventListener('click',()=>{
        helpModalBody.innerHTML = `<p>You've selected Delete Help</p>`;
    });
}

const helpObj = {
    "view":`<p class="px-sm-5">To view a contact simply click on the contact's name or profile pic.</p>`,
}

/*
    <h3 class="fw-lighter"><i class="fa fa-eye fs-3"></i> Viewing</h3>
    <p>To view a contact simply click on the contact's name or profile pic.</p>
    <h3 class="fw-lighter"><i class="fa fa-plus fs-3"></i> Adding</h3>
    <p>To add a contact, click on the plus button at the bottom right of the screen and fill in the details.</p>
    <h3 class="fw-lighter"><i class="fa fa-pencil fs-3"></i> Editing</h3>
    <p>To edit a contact, click on the contact's name or profile pic. Then click on the pencil icon to enter edit mode. After changes have been made, click the check icon to save or cross icon to cancel.</p>
    <h3 class="fw-lighter"><i class="fa fa-trash fs-3"></i> Deleting</h3>
    <p>To delete a contact, click on the contact's name or profile pic. Then click on the trash can icon to delete it.</p>

*/