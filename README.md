# Sprint 2: Team Project Group 4

## 📰 New Online Newspaper for Bonnier 

For your second sprint, you'll get the chance to discover what an API is, learn how to make API requests using Javascript and use JSON data in your own projects. This means you no longer are making static web pages but are actually building web pages with DYNAMIC content that automatically updates when new data is available - wow!

Your challenge this sprint is to build an online newspaper of your choice using the [Google News API](https://newsapi.org/). It contains articles from over 30.000 news sources with live updates and is searchable on criterias such as keyword, phrases, top stories and much more.

Have fun with this challenge, why not build a newspaper about Zlatan, bitcoins or flowers 🌼🌼🌼. Only the Google News API set the limits. So be sure to read through the documentation carefully and learn how to work with the API. Let the design reflect what type of newspaper you are building, find inspiration online.

The project is made on Bonnier Groups behalf. With over 170+ companies and close to 10.000 employees the Bonnier group is the nordic region's leading media company. To your help, you will have three days at the Bonnier office to get help from their developers along the way – so great! Next friday, you will demo your pages and code for their web team.

### How to complete this project

We will mainly focus on the main page of your newspaper. Listing all articles in a grid, writing out relevant information such as: title, image, date published for each article. When a user clicks on one article use Javascript to show more information about the article like description and a button to read the full article.

Something like this:
![Wireframes](https://i.imgur.com/oGyIrxm.png)

As you will notice when using the API is that some information will be missing in your requests. For instance, not all articles have an image or a description. This will potentially break the design and make your newspaper look broken 😱. Find a solution to fix that problem so you never end up losing a reader due to bad user experience.

### Tech Specifications

1. The project should be built in Javascript, HTML and CSS.
2. Be responsive and work well on mobile, tablet and desktop.
3. Use a grid to list all articles.
4. Print number of articles.
5. Image, article title, description, date published, article URL should be fetched from the API.
6. Fallback solution for when content is missing from the API.

### The Google News API

Google News is an open API which means anyone can access and use it for non-commercial projects as long as you have a key. To get one, you register on their website. [Read the documentation to get started](https://newsapi.org/docs/get-started)

We recommend that you use [Postman](https://www.getpostman.com/apps) to test your requests and see what you get back from the API. Postman makes the JSON look pretty and more readable for humans.

#### Here’s how you get started with Postman


![Postman-1](https://i.imgur.com/adDB9LL.png)


First you create a new GET Request.


![Postman-2](https://i.imgur.com/hXO6uM3.png)


Save the request in Postman.


![Postman-3](https://i.imgur.com/F1oHjV6.png)

Now you’re ready to play around and see what you get back from the API. 


### How to approach this as a team

A good start is to sit down as a team and sketch out how the site will look, and what type of data you’ll need. In the Google News documentation you can see how the API is structured and what type of requests are possible. Try out different requests using Postman and see what you get in return. Decide on a theme for your newspaper and get started with building the design.

_On Monday 24th you will get a lecture on how you make requests to an API._

## 💥 Success!

After completing this project, you should be more comfortable using Javascript and fetching data through an external API – a super useful skill to have as a frontend developer. You will also grow your CSS and HTML skills and how to work better as a team.

## 🏃 Stretch Goals

Done with the main task? Try to come up with some fun stretch goals within your team. Here's some ideas:

1. Make the website feel more dynamic by adding thoughtful animations and hover effects. 
2. Add a subscribe-modal that pops up whenever the page loads.
3. Add category pages to your website by adding links with a hash-symbol in the url using this format: index.html#categrory1, index.html#categrory2, etc. Use the information after the hash-symbol to to update the api requests. See these two links for more information:  [Onhashchange event](https://www.w3schools.com/jsref/event_onhashchange.asp), [Location hash property](https://www.w3schools.com/jsref/prop_loc_hash.asp)
