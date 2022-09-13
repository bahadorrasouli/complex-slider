// Variables *****************************

const mainBtns = Array.from(
  document.querySelectorAll(
    ".dynamic-preview .controller-section .main-panel .btns li"
  )
);
const optionLists = Array.from(
  document.querySelectorAll(
    ".dynamic-preview .controller-section .option-panel .btns .item-container"
  )
);

const optionListsUl = document.querySelectorAll(
  ".dynamic-preview .controller-section .option-panel .btns .item-container ul"
);
const optionBtns = Array.from(
  document.querySelectorAll(
    ".dynamic-preview .controller-section .option-panel .btns .item-container ul li"
  )
);

let optionBtn = [];
let index = 0;
for (let i = 0; i < optionLists.length; i++) {
  optionBtn[i] = [];
  for (let j = 0; j < optionListsUl[i].children.length; j++) {
    optionBtn[i][j] = optionBtns[index];
    index++;
  }
}

const imgs = Array.from(
  document.querySelectorAll(
    ".dynamic-preview .images-section .images-holder>div"
  )
);

const active = "active";
const deactive = "deactive";

//  Functions *****************************

let isClass = (item, className) => {
  return item.classList.contains(className);
}

let isClassInArrayIndex = (array, className) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].classList.contains(className)) {
      return i;
    }
  }
};

function addClass(item, className) {
  item.classList.add(className);
}

let removeClass = (item, className) => {
  item.classList.remove(className);
};

let toggleClass = (currentIndex, array, className, overwrite=false) => {
  let isClassIndex = isClassInArrayIndex(array, className);
  
  if(overwrite){

    removeClass(array[isClassIndex], className);
    addClass(array[currentIndex], className);
    
  } else {
    
    if (currentIndex != isClassIndex) {
      removeClass(array[isClassIndex], className);
      addClass(array[currentIndex], className);
    }

  }
  
};

let isClassIn2DArrayIndex = (firstDIndex, arr, className, lengthCondition) => {
  for (let j = 0; j < lengthCondition; j++) {
    if (arr[firstDIndex][j].classList.contains(className)) {
      return j;
    }
  }
};

let toggleClass2d = (firstDIndex,secondDIndex,arr,className,lengthCondition) => {
  let isClassItem;

  for (let j = 0; j < lengthCondition; j++) {
    if (arr[firstDIndex][j].classList.contains(className)) {
      isClassItem = arr[firstDIndex][j];
    }
  }

  if (!arr[firstDIndex][secondDIndex].classList.contains(className)) {
    removeClass(isClassItem, className);
    addClass(arr[firstDIndex][secondDIndex], className);
  }
};

// Run App *****************************

for (let i = 0; i < mainBtns.length; i++) {
  mainBtns[i].addEventListener("click", () => {
    toggleClass(i, mainBtns, active);
    toggleClass(i, optionLists, active);
  });
}

let a;
for (let i = 0; i < optionLists.length; i++) {
  
  for (let j = 0; j < optionListsUl[i].children.length; j++) {
    
    optionBtn[i][j].addEventListener("click", () => {

      a = isClassInArrayIndex(optionBtn[i], active);
      
      if(!isClass(optionBtn[i][j], active)){
        toggleClass2d(i, j, optionBtn, active, optionListsUl[i].children.length);
        toggleClass(j, imgs[isClassInArrayIndex(imgs, optionLists[i].id)].children, active);
        toggleClass(a, imgs[isClassInArrayIndex(imgs, optionLists[i].id)].children, deactive, true);
      }
      
      
    });
  }
}


