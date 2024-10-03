// Utility function to format time from seconds into "hours mins ago" forma
function getTimeString(time){
    const hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minutes = parseInt( remainingSecond / 60);
    return `${hours} hrs ${minutes} min ago`;
}

// Function to remove the 'active' class from category buttons
const removeActiveClass=()=>{
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for (let button of buttons){
        button.classList.remove('active')
    }
}

// Fetch, load, and display all video categories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then( res => res.json())
    .then( data => displayCategories(data.categories))
    .catch( error => console.log(error))
}

// Fetch and display videos based on a search term (optional)
const loadVideos = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then( res => res.json())
    .then( data => displayVideos(data.videos))
    .catch( error => console.log(error))
}

// Fetch and display videos by category
const loadCategoryVIdeos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then( res => res.json())
    .then( data => {
        // remove active class from all buttons
        removeActiveClass();

        // active class for clicked button only
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active');
        console.log(activeBtn);
        displayVideos(data.category);
    })
    .catch( error => console.log(error))
}

// Fetch and display video details in a modal
const loadVideoDetails = async (videoId)=>{
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    displayVideoDetails(data.video);
}


// Function to display video details inside the modal
const displayVideoDetails = (video)=>{
    console.log(video);
    const detailContainer = document.getElementById('modal-content');

    // way - 1
    // document.getElementById('show-modal-data').click();

    // way-2
    document.getElementById('customModal').showModal();

    detailContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p class="py-2 text-justify">${video.description}</p>
    `
}

// Function to display a list of videos in the main container
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = '';

    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
           <img src="./assets/Icon.png"/>
            <h2 class="text-center text-xl font-bold">
            Oops!! Sorry, There is no content here 
            </h2>
        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }

    // Loop through each video and create a card
    videos.forEach((video) => {
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[180px] relative">
          <img
           src="${video.thumbnail}
           class="h-full w-full object-cover"
           alt="" />
           ${
            video.others.posted_date?.length === 0? "": ` <span class="absolute text-xs right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)}</span>`
           }
          
        </figure>
        <div class="px-0 py-2 flex gap-2">
           <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
           </div>
           <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${video.authors[0].profile_name} </p>
                    ${
                        video.authors[0].verified ===true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : ""
                    }
                </div>
                <p>
                    <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-sm btn-error text-white">details</button>
                </p>
           </div>
           
        </div> 
        `;
        videoContainer.append(card);
    })
}



// Function to display the list of categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    // Loop through each category and create a button
   categories.forEach((item) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
       <button id="btn-${item.category_id}" onclick="loadCategoryVIdeos(${item.category_id})" class="btn category-btn">
           ${item.category}
       </button>
    `
    categoryContainer.append(buttonContainer);
   });
}

// addEvent listener for search input
document.getElementById('search-input').addEventListener('keyup',(event)=>{
    loadVideos(event.target.value);

})

// Load categories and videos on page load
loadCategories()
loadVideos()
