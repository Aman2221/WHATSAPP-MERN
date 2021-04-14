const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1160704",
  key: "6729decb25fa19b8f6ad",
  secret: "21b2741d0896ff4de5a1",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});