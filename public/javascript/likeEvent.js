function likeEvent(user_id, url, selfTag) {
  console.log(selfTag);
  console.log("Ajax like Event!");
  console.log(`User: ${user_id} URL: ${url}`);

  if (selfTag.classList.contains('liked') || selfTag.classList.contains('active')) {
    $.ajax({
      type: "POST",
      url: "/events/cancel_like",
      data: {
        user_id: user_id,
        url: url
      }
    });
  } else {
    $.ajax({
      type: "POST",
      url: "/events/like",
      data: {
        user_id: user_id,
        url: url
      }
    });
  }
}