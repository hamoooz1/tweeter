/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(() => {
  $("#error-message").hide();

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
    .then(function(res) {
      renderTweets(res);
    }) 
    .catch(function(error) {
      console.log("error", error)
    })
  };

 $("form").submit(function(event) {
    event.preventDefault();
    $("#error-message").slideUp();

    const textarea = $("#tweet-text")
    const tweetText = textarea.val()

    //checking validation
    if (!tweetText) {
      $("#error-message").text("Add more about your day!!").slideDown(); 
      return;
    }
    if(tweetText.length > 140) {
    $("#error-message").text("Shorten down that message wont ya.").slideDown();
     return;
    }

    //posting 
    const serializedData = $(this).serialize();

    console.log(serializedData);

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
    })
    .then(function(res) {
      textarea.val("");
      $(".counter").text(140);
      loadTweets();
    }) 
    .catch(function(error) {
      console.log("error", error)
    })
  });


  const createTweetElement = function(tweetData) {
    const safeText = $("<div>").text(tweetData.content.text).html();
    const $tweet = $(`
    <article class="tweet">
    <header>
    <span id="user-avatar"> <img src="${tweetData.user.avatars}">${tweetData.user.name}</span>
      <h5>${tweetData.user.handle}</h5>
  </header>
  <div class="content">
      <p>${safeText}</p>
  </div>
  <footer>
    <p>${timeago.format(tweetData.created_at)}</p>
    <span>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-repeat"></i>
    <i class="fa-solid fa-heart"></i>
    </span>
  </footer>
    </article>`);

    return $tweet;
  }

  const renderTweets = function (arrayOfTweets) {
  $('#tweet-list').empty();

    for (let content of arrayOfTweets) {
      const $tweet = createTweetElement(content);
      $('#tweet-list').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc
    }
  }

  loadTweets();
});