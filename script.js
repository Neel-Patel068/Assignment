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
// console.log(json);
var allitems=[];
fetch('./items.json')
  .then(response => response.json())
  .then((data )=> 
  {
    //   console.log(data);
      allitems=data;
      updateLeft();
      updateRight();
  })
  .catch(error => console.log(error));

/*
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
*/

const left = document.querySelector(".left");
const right = document.querySelector(".right");
var currentlySelectedImg = 0;
var previouslySelectedImg = 0;

const cropTitle = function(title) {
    const maxPossibleLength = 27;
    if(title.length<= maxPossibleLength ) 
    {
        return title;
    }
    else 
    {
        let updatedTitle= title.slice(0,13)+"..." + title.slice(-14);
        return updatedTitle;
    }
}

const updateLeft = function () {
    const unorderdList = document.querySelector("ul");
    unorderdList.innerHTML = "";
    allitems.forEach((item,index)=>{
        const row= document.createElement("li");
        row.innerHTML = `<img src=${allitems[index].previewImage} id=${index} class="crop"> <span> ${cropTitle(allitems[index].title)}</span>`;
        // console.log(cropTitle(allitems[index].title));
        unorderdList.append(row);
        row.addEventListener("click",()=>{
            previouslySelectedImg = currentlySelectedImg;
            currentlySelectedImg=index;
            updateRight();
        });
    });
    left.append(unorderdList);
}

const updateRight = function () {
    heightLightLeft();
    const rightImg = right.querySelector(".bigImg");
    const rightTitle = right.querySelector(".rightTitle");
    rightImg.setAttribute("src",allitems[currentlySelectedImg].previewImage);
    rightTitle.setAttribute("contenteditable","true");
    rightTitle.innerText = allitems[currentlySelectedImg].title;
    rightTitle.addEventListener("blur",()=>{
        allitems[currentlySelectedImg].title = rightTitle.innerHTML;
        // console.log("Blur clicked.", previouslySelectedImg,currentlySelectedImg);
        
        updateLeft();
        heightLightLeft();
    });
}




// keyboard eventListener

window.addEventListener("keydown",(event)=>{
    if(event.key == "ArrowDown")
    {
        if(currentlySelectedImg+1 < allitems.length)
        {
            previouslySelectedImg = currentlySelectedImg;
            currentlySelectedImg++;
            updateRight();
        }
    }
    else if(event.key == "ArrowUp")
    {
        if(currentlySelectedImg -1 >= 0)
        {
            previouslySelectedImg = currentlySelectedImg;
            currentlySelectedImg--;
            updateRight();
        }
    }
});

const heightLightLeft = function (){
    document.querySelectorAll("li")[previouslySelectedImg].classList.remove("active");
    document.querySelectorAll("li")[currentlySelectedImg].classList.add("active");
}
