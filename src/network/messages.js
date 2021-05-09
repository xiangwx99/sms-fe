import request from "./request";

export function addMessages(content) {
  return request({
    url: "/addMessages",
    data: {
      content,
    },
    method: "post",
  });
}

export function queryMessages(page, size) {
  return request({
    url: "/queryMessages",
    data: {
      page,
      size,
    },
    method: "post",
  });
}

export function deleteMessage(_id) {
  return request({
    url: "/deleteMessage",
    data: {
      _id,
    },
    method: "post",
  });
}
