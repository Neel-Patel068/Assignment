/*
matching the designs - it does NOT need to be pixel perfect
make clicks work on the item
make arrow key ( up/down ) navigation work
handle labels that do NOT fit into the given dimensions
the title in the right section should be editable. no need to retain it on refresh.
the entire layout should stay in the center
create a github repo ( you can use your existing github user OR you can create a new user using sprinklr email and mark the repo as private. add chinmaychaudharyspr as a collaborator )
make incremental commits and push them to the repo
make github page to host the app ( https://pages.github.com/ read for "Project site" )

Note that the width of the left column should always be 300px 

*/

// global variables

const allitems = [
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "a man and a woman trying to cook a meal together in a modern kitchen.jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2022.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-may-2022.key"
    }
];





const left = document.querySelector(".left");
const right = document.querySelector(".right");
var currentlySelectedImg = 0;
// leftcolumn.innerHTML = "<h1>How are you?</h1>"

const cropTitle = function(title) {
    if(title.length<= 30 ) 
    {
        return title;
    }
    else 
    {
        let updatedTitle= title.slice(0,15)+"..." + title.slice(-15);
        return updatedTitle;
    }
}

const updateLeft = function () {
    const unorderdList = document.querySelector("ul");
    unorderdList.innerHTML = "";
    allitems.forEach((item,index)=>{
        const row= document.createElement("li");
        row.innerHTML = `<img src=${allitems[index].previewImage} class="crop"> <span> ${cropTitle(allitems[index].title)}</span>`;
        console.log(cropTitle(allitems[index].title));
        unorderdList.append(row);
        row.addEventListener("click",()=>{
            currentlySelectedImg=index;
            // console.log("I am clicked",index);
            updateRight();
        });
    });


    left.append(unorderdList);
    
}

const updateRight = function () {
    // let rightTitle = allitems[currentlySelectedImg].title; 
    const rightImg = right.querySelector(".bigImg");
    const rightTitle = right.querySelector(".rightTitle");
    rightImg.setAttribute("src",allitems[currentlySelectedImg].previewImage);
    rightTitle.setAttribute("contenteditable","true");
    rightTitle.innerText = allitems[currentlySelectedImg].title;
    rightTitle.addEventListener("blur",()=>{
        console.log("I am blur now");
        console.log(rightTitle.innerHTML);
        allitems[currentlySelectedImg].title = rightTitle.innerHTML;
        updateLeft();
    });
}




// keyboard eventListener

window.addEventListener("keydown",(event)=>{
    // console.log(event.key);
    if(event.key == "ArrowDown")
    {
        if(currentlySelectedImg+1 < allitems.length)
        {
            currentlySelectedImg++;
            updateRight();
        }
    }
    else if(event.key == "ArrowUp")
    {
        if(currentlySelectedImg -1 >= 0)
        {
            currentlySelectedImg--;
            updateRight();
        }
    }
    // updateRight();
});


updateLeft();
updateRight();