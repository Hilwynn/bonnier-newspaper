//set up an empty array
let loadedArticles = [];

const fallbackImagesArray = [
  "fallback-img-1.jpg",
  "fallback-img-2.jpg",
  "fallback-img-3.jpg",
  "fallback-img-4.jpg",
  "fallback-img-5.jpg",
  "fallback-img-6.jpg"
];

// Choose random image file for fallback image
const randomFallbackImage = () => {
  let randomNumber = Math.floor(Math.random() * (fallbackImagesArray.length))
  return fallbackImagesArray[randomNumber]
}

// Replace broken images with a random image from the array
const imgError = (image) => {
  //inside the file so we are creating an image everytime instead of setting one and using it all the time.
  let randomImageSrc = randomFallbackImage()
  console.log(randomImageSrc)
  image.onerror = "";
  image.src = `./images/${randomImageSrc}`;
  return true;
}

function loadArticles(page, subquery) {

  // Setup of API fetching
  const language = "en"
  let query = "recipe+AND+cooking+AND+food+NOT+diet+NOT+restaurant+NOT+sports+NOT+chowhound+NOT+review"

  if (subquery !== undefined && subquery.length > 0) {
    query += `+AND+${subquery}`
  }

  const sortBy = "publishedAt"
  const apiKey = "8faa8f82d07f4d2791452c95b103bd5a"

  const urlArticles = `https://newsapi.org/v2/everything?language=${language}&q=${query}&sortBy=${sortBy}&apiKey=${apiKey}&page=${page}`

  const recievedArticles = (newsdata) => {
    console.log(newsdata);

    const totalReceivedArticles = newsdata.totalResults
    document.querySelector(".article-number").innerHTML = `All articles (${totalReceivedArticles})`

    // For each article object from the API, we create a new div in HTML.
    newsdata.articles.forEach((article, index) => {
      if (article.urlToImage && index < 40) {
        //Here we create and add html elements to our html file

        // store the article for the popup and keeping track of the number of the div you are creating to put in articleIndex later.
        loadedArticles.push(article);
        let storedArticleIndex = loadedArticles.length - 1;

        document.querySelector(".grid").innerHTML +=
          `<div class="article-box">
              <div class="article-img-box">
                <img src="${article.urlToImage}" onerror="imgError(this);"/>
              </div>
              <div class="article-text-box">
                <a href ="${article.url}" target="_blank">
                  <h3>${article.title}</h3>
                </a>
                <h5>${article.source.name}</h5>
                <div class="article-info">
                <img class="open" src="./images/open1.png" onclick="openNav(${storedArticleIndex})"/>
                </div>
              </div>
            </div>`
      }
    })
  }

  fetch(urlArticles).then(response => response.json()).then(recievedArticles)
}

loadArticles(1, "");

// current page
let g_currentPage = 1
let g_currentFilter = ""

// load more function
function loadMore() {
  g_currentPage += 1;
  loadArticles(g_currentPage, g_currentFilter);
}

//universal filter to feed into buttons
function changeFilter(filter) {
  document.querySelector(".grid").innerHTML = ""
  g_currentPage = 1;
  g_currentFilter = filter;
  //wipes the data in the array so we aren't storing forever
  loadedArticles = [];
  loadArticles(g_currentPage, g_currentFilter);
}

let button = document.getElementById("load-more")
button.onclick = () => {
  loadMore();
}

let buttonVegan = document.getElementById("vegan-button")
buttonVegan.onclick = () => {
  changeFilter("vegan");
}

let buttonChicken = document.getElementById("chicken-button")
buttonChicken.onclick = () => {
  changeFilter("chicken");
}

let buttonAsian = document.getElementById("asian-button")
buttonAsian.onclick = () => {
  changeFilter("asian");
}

let buttonFish = document.getElementById("fish-button")
buttonFish.onclick = () => {
  changeFilter("fish");
}

let buttonMarkle = document.getElementById("markle-button")
buttonMarkle.onclick = () => {
  changeFilter("markle");
}

// Filter button for "All"
let buttonAll = document.getElementById("all-articles-button")
buttonAll.onclick = () => {
  changeFilter("");
}


// Overlay function made at Lifestyle
//loads the information you stored in the array and puts it in the popup
function openNav(articleIndex) {
  let article = loadedArticles[articleIndex];

  document.getElementById("article-popup").style.width = "100%";
  document.getElementById("article-popup").innerHTML = `
    <div class="article-box-pop">
      <div class="article-img-box-pop">
        <img src="${article.urlToImage}" onerror="imgError(this);"/>
      </div>
      <div class="article-text-box-pop">
        <a href ="${article.url}" target="_blank">
          <h3>${article.title}</h3>
        </a>
        <h5>${article.source.name}</h5>
        <h5>${article.description}</h5>
        <img class = "close" src="./images/close2.png" onclick="closeNav()"/>
      </div>
    </div>
  `
}

function closeNav() {
  document.getElementById("article-popup").style.width = "0px";
}

//need to make this work! Just copied and pasted to remind me.
//function readNav(articleIndex) {
  //document.getElementById("article-popup").style.width = "calc(25% - 10px);";

//   let article = loadArticles[articleIndex]
//   document.getElementById("article-popup").innerHTML = `<div class="article-box-pop">
//     <div class="article-text-box">
//       <a href ="${article.url}" target="_blank">
//       </div>`
//
// }
