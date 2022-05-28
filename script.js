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
// we have to make width of text less than upperlimit
const cropTitle = function(text,upperlimit) {
    let text_width = text.getBoundingClientRect().width;
    if(text_width < upperlimit) return;     // if title is already small then no need to modify it => return immediately

    let data=text.innerText;

    // we will do binary search for getting valid title
    let left=0,right=data.length-1;    // left and right boundry
    let save=data; // final string with adjusted size will be in save varible.  
    while(left<=right)
    {
        let mid=(left+right)/2;
        text.innerText = data.slice(0,mid)+'...'+data.slice(-mid);
        text_width = text.getBoundingClientRect().width;

        if(text_width >= upperlimit)
        {
            right = mid-1;
        }
        else
        {
            save=text.innerText;
            left=mid+1;
        }
    }
    text.innerText= save;
}

// This function will update the left column
const updateLeft = function () {
    const unorderdList = document.querySelector("ul");
    unorderdList.innerHTML = "";
    allitems.forEach((item,index)=>{
        const row= document.createElement("li");
        row.innerHTML = `
        <div class="leftImage">
            <img src=${allitems[index].previewImage} id=${"id"+index} class="crop"> 
        </div>
        <div class="leftTitle">
            <span class="leftTitleText"> ${allitems[index].title}</span>
        </div>
        `;
        unorderdList.append(row);
        row.addEventListener("click",()=>{
            previouslySelectedImg = currentlySelectedImg;
            currentlySelectedImg=index;
            updateRight();
        });
        const text= row.querySelector("span");
        const image = row.querySelector("img");
        const upperlimit = row.getBoundingClientRect().width-image.getBoundingClientRect().width;
        cropTitle(text,upperlimit);
    });
}

// This function will update the right column
const updateRight = function () {
    heightLightLeft();
    const rightImg = right.querySelector(".bigImg");
    rightImg.setAttribute("src",allitems[currentlySelectedImg].previewImage);

    const rightTitleWarp = right.querySelector(".rightImgWarp");
    const rightTitle = rightTitleWarp.querySelector("span");
    rightTitle.innerHTML = allitems[currentlySelectedImg].title ;

    rightTitle.addEventListener("input",(event)=>{
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

// if window size is changed then update the right title according to it.
window.addEventListener('resize', function(event){
    updateLeft();
});

const heightLightLeft = function () {
    document.querySelectorAll("li")[previouslySelectedImg].classList.remove("active");
    document.querySelectorAll("li")[currentlySelectedImg].classList.add("active");
}
