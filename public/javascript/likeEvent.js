function likeEvent(user_id, url) {
  console.log("Ajax like Event!");
  console.log(`User: ${user_id} URL: ${url}`);
  $.ajax({
      type: "POST",
      url: "/like_events",
      data: { 
          user_id: user_id,
          url: url
      },
      success: function(result) {
          alert('ok');
      },
      error: function(result) {
          alert('error');
      }
  });
}

function cancelLikeEvent(user_id, url) {
    console.log("Ajax like Event!");
    console.log(`User: ${user_id} URL: ${url}`);
    $.ajax({
        type: "POST",
        url: "/cancel_like_events",
        data: {
            user_id: user_id,
            url: url
        },
        success: function(result) {
            alert('ok');
        },
        error: function(result) {
            alert('error');
        }
    });
  }