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

    const totalReceivedArticles = newsdata.totalResults
    document.querySelector(".article-number").innerHTML = `All articles (${totalReceivedArticles})`

  	// For each article object from the API, we create a new div in HTML.
    newsdata.articles.forEach((article, index) => {
      const descriptionLength = 120
      let shortDescription = article.description
      if (article.description.length > descriptionLength) {
          shortDescription = article.description.substring (0, descriptionLength) + "..."
      }

      // const titleLength = 60
      // let shortTitle = article.title
      // if (article.title.length > titleLength) {
      //   shortTitle = article.title.substring(0, titleLength) + "..."
      // }

      if(article.urlToImage && index < 40) {
  			//Here we create and add html elements to our html file
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
              <p>${shortDescription}</p>
            </div>
          </div>`
         }

         // `<div class="article-box">
         //   <div class="article-img-box">
         //     <img src="${article.urlToImage}" onerror="imgError(this);"/>
         //   </div>
         //   <div class="article-text-box">
         //     <h6>${article.publishedAt}</h6>
         //     <a href ="${article.url}" target="_blank">
         //       <h3>${article.title}</h3>
         //     </a>
         //     <h5>${article.source.name}</h5>
         //     <p>${previewDescription}</p>
         //     <div class="readmore-button"> Read more</div>
         //     <div class="descriptionLength-readmore">
         //       <p>${article.description}</p>
         //     </div>
         //   </div>
         // </div>`

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

// Filter button for "All"
let buttonAll = document.getElementById("all-articles-button")
buttonAll.onclick = () => {
  changeFilter("");
}
