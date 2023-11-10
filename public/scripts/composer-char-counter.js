$(document).ready(function () {
  // --- our code goes here ---
  $(".new-tweet").on("input", "textarea", function () {
    let counterLength = 140 - this.value.length;
    const $counter = this.parentElement.parentElement.children[1].children[1];
    $($counter).text(counterLength);

    if (counterLength < 0) {
      $($counter).addClass("error");
    }
    else {
      $($counter).removeClasserror("error");
    }
  });
});