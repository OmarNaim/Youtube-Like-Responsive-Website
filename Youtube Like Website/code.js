
// Function to load data
const loadData = (id) =>{
    return fetch(
        `https://openapi.programming-hero.com/api/videos/category/${
            id ? id : 1000
        }`
        )
    .then((res) => res.json())
    .then((data) => displayData(data.data));
}

// Function to display data
const displayData = (data) =>{
    const vdoContainer = document.getElementById("video-container");

    // clearing the previous container
    vdoContainer.innerHTML = ``; 

    if(data.length === 0){
        vdoContainer.innerHTML = `
            <div class="no-data">
                <img src="Icon.png" alt="">
                <h1>Oops!! Sorry,There are no content here</h1>
            </div>`;
    }
    else{
        data.forEach((vdo, index)=>{
            const card = document.createElement("div");
            card.classList.add("box");
            card.innerHTML = `
                <div class="video-contain">
                    <div class="video-container-cover">
                        <div class="video-content">
                            <a href="#" class="video-box">
                                <img class="video-box-img" src=${vdo.thumbnail} alt="">
                                <div class="upload" id="upload-${index}">
                                </div>
                            </a>
                            <div class="video-details">
                                <div class="channel-logo">
                                    <img class="channel-logo-img" src=${vdo.authors[0].profile_picture} alt="">
                                </div>
                                <div class="detail">
                                    <h3 class="title">${vdo.title}</h3>
                                    <div class="channel-name-and-mark" id="detail-${index}">
                                        
                                        
                                        
                                    </div>
                                    
                                    <div class="views-upload">
                                        <div class="views">${vdo.others.views}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;


            vdoContainer.appendChild(card);
            showDate(vdo, index);
            showVerifying(vdo, index);
            
        })
    }
}

// Function to show date
const showDate = (vdo, index) =>{
    const postedDate = vdo.others.posted_date;
    if (!postedDate) {
        document.getElementById("upload-" + index).innerHTML = "";
    } else {
        const timeInMs = parseInt(postedDate, 10);
        if (isNaN(timeInMs)) {
            document.getElementById("upload-" + index).innerHTML = "";
        } else {
            const hours = Math.floor(timeInMs / 3600);
            const minutes = Math.floor((timeInMs % 3600) / 60);
            document.getElementById("upload-" + index).innerHTML = `${hours}hrs ${minutes}mins ago`;
        }
    }
};

const showVerifying = (vdo, index) =>{
    const verify = vdo.authors[0].verified;

    if (!verify) {
        document.getElementById("detail-" + index).innerHTML = `
        <div class="channel-name">${vdo.authors[0].profile_name} </div>
        `;
    } else {
        document.getElementById("detail-" + index).innerHTML = `
        <div class="channel-name">${vdo.authors[0].profile_name} </div>
        <img class="verify-img" src="Twitter_Verified_Badge.png" alt="">`;
    }
}


// Function to load and display data
const loadAndDisplayData = (id) => {
    loadData(id);
}

// Function to load, sort, and display data
const loadSortAndDisplayData = (id) => {

    return fetch(
        `https://openapi.programming-hero.com/api/videos/category/${
            id ? id : 1000
        }`
        )
    .then((res) => res.json())
    .then(data => {

        sortVideos(data.data);
    });

}

const sortVideos = (data) => {
    data.sort((a, b) => parseInt(b.others.views.replace("k", ""), 10) - parseInt(a.others.views.replace("k", ""), 10));

    displayData(data);
}


// Load initial data
loadData("1000");
