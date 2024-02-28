const loadData = (id) =>{
    fetch(
        `https://openapi.programming-hero.com/api/videos/category/${
            id ? id : 1000
        }`
        )
    .then((res) => res.json())
    .then((data) => displayData(data.data));
}

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
        // data.sort((a, b) => parseFloat(b.others[0]) - parseFloat(a.others[0]));

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
                                    <div class="channel-name">${vdo.authors[0].profile_name}</div>
                                    <div class="views-upload">
                                        <div class="views">${vdo.others[0]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            vdoContainer.appendChild(card);
            showDate(vdo, index);
        })
    }
    
}


const sortByView =()=>{
    fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    .then((res) => res.json())
    .then((data) => displayData(data.data));

    loadData(id).then(data => {
        data.sort((a, b) => parseViewCount(b.others[0]) - parseViewCount(a.others[0]));
        displayData(data);
    });
}

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


const sortButton = (id) =>{
    loadData(id);
};

loadData("1000");