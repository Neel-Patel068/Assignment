// allitems contains the image and title of image 
// we fetch data using fetch function from items.json file
var allitems=[];
fetch('./items.json')
  .then(response => response.json())
  .then((data )=> 
  {
      allitems=data;
      updateLeft();
      updateRight();
  })
  .catch(error => console.log(error));


const left = document.querySelector(".left");     // left component which contains the unorderd list 
const right = document.querySelector(".right");   //  right component which contains the image and caption 
var currentlySelectedImg = 0;                   // currentky selected image index
var previouslySelectedImg = 0;                  // previously selected image index

// this function cut the title text if it is larger than max possible length 
const cropTitle = function(title) {
    const maxPossibleLength = 20;
    if(title.length<= maxPossibleLength ) 
        return title;
    else 
        return title.slice(0,10)+"..." + title.slice(-10);;
}

// This function will update the left column
const updateLeft = function () {
    const unorderdList = document.querySelector("ul");
    unorderdList.innerHTML = "";
    allitems.forEach((item,index)=>{
        const row= document.createElement("li");
        row.innerHTML = `<img src=${allitems[index].previewImage} id=${"id"+index} class="crop"> <span> ${cropTitle(allitems[index].title)}</span>`;
        unorderdList.append(row);
        row.addEventListener("click",()=>{
            previouslySelectedImg = currentlySelectedImg;
            currentlySelectedImg=index;
            updateRight();
        });
    });
}

// This function will update the right column
const updateRight = function () {
    heightLightLeft();
    const rightImg = right.querySelector(".bigImg");
    const rightTitle = right.querySelector(".rightTitle");
    rightImg.setAttribute("src",allitems[currentlySelectedImg].previewImage);
    rightTitle.setAttribute("contenteditable","true");
    rightTitle.innerText = allitems[currentlySelectedImg].title;
    rightTitle.addEventListener("blur",()=>{
        allitems[currentlySelectedImg].title = rightTitle.innerHTML;
        updateLeft();
        heightLightLeft();
    });
}

// keyboard eventListener detects the arrow up and down, and response accordingly
window.addEventListener("keydown",(event)=>{
    if(event.key == "ArrowDown" && (currentlySelectedImg+1 < allitems.length) )
    {
        previouslySelectedImg = currentlySelectedImg;
        currentlySelectedImg++;
        updateRight();
    }
    else if(event.key == "ArrowUp" && (currentlySelectedImg -1 >= 0) )
    {
        previouslySelectedImg = currentlySelectedImg;
        currentlySelectedImg--;
        updateRight();
    }
});

const heightLightLeft = function () {
    document.querySelectorAll("li")[previouslySelectedImg].classList.remove("active");
    document.querySelectorAll("li")[currentlySelectedImg].classList.add("active");
}
