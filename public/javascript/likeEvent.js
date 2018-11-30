function likeEvent(user_id, url) {
  console.log("Ajax like Event!");
  console.log(`User: ${user_id} URL: ${url}`);
  $.ajax({
      type: "POST",
<<<<<<< HEAD
      url: "/like_events",
      data: {
=======
      url: "/events/like",
      data: { 
>>>>>>> 64d894c997025df298186758d2d27fc5df9be4ea
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
<<<<<<< HEAD
=======

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
>>>>>>> 64d894c997025df298186758d2d27fc5df9be4ea
