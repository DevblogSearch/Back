function likeEvent(user_id, url) {
  console.log("Ajax like Event!");
  console.log(`User: ${user_id} URL: ${url}`);
  $.ajax({
      type: "POST",
      url: "/events/like",
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
        url: "/events/cancel_like",
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