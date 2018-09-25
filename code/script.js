
function loadArticles(page, query) {

  // Setup of API fetching
  const language = "en"
  // const query = "recipe+AND+cooking+AND+food+NOT+diet+NOT+restaurant+NOT+sports+NOT+chowhound+NOT+review"
  const sortBy = "publishedAt"
  const apiKey = "8faa8f82d07f4d2791452c95b103bd5a"

  const urlArticles = `https://newsapi.org/v2/everything?language=${language}&q=${query}&sortBy=${sortBy}&apiKey=${apiKey}&page=${page}`

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

  let randomImageSrc = randomFallbackImage()


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


  // Replace broken images with a random image from the array
  const imgError = (image) => {
    console.log(randomImageSrc)
    image.onerror = "";
    image.src = `./images/${randomImageSrc}`;
    return true;
  }
}

loadArticles(1, "recipe+AND+cooking+AND+food+NOT+diet+NOT+restaurant+NOT+sports+NOT+chowhound+NOT+review");

let g_currentPage = 1
let button = document.getElementById("load-more")
button.onclick = () => {
    g_currentPage+=1
    loadArticles(g_currentPage);
  }


  // Filter function for vegan
  const filterFunction = () => {
    document.querySelector(".grid").innerHTML = ""
    loadArticles(1, "recipe+AND+cooking+AND+food+NOT+diet+NOT+restaurant+NOT+sports+NOT+chowhound+NOT+review+vegan")

  }

  let buttonVegan = document.getElementById("vegan-button")
  buttonVegan.onclick = () => {
      filterFunction();
    }

  // Filter button for "All"
  let buttonAll = document.getElementById("all-articles-button")
    buttonAll.onclick = () => {
      loadArticles(1, "recipe+AND+cooking+AND+food+NOT+diet+NOT+restaurant+NOT+sports+NOT+chowhound+NOT+review");
    }
