import axios from "./src"

const btnGet = document.querySelector("#get-button") as HTMLButtonElement
const btnPost = document.querySelector("#post-button") as HTMLButtonElement
btnGet.addEventListener("click", () => {
  axios({
    method: "GET",
    url: "http://localhost:3000/posts?id=1", //保留已有参数 ，去掉哈希符号，序列化
    params: {
      a: 1,
      b: 2,
      date: new Date(), // utc格式
      obj: {
        name: "我是",
      },
      demo: [{ name: "12" }],
      test: null,
    },
  })
})

btnPost.addEventListener("click", () => {
  axios({
    method: "post",
    url: "http://localhost:3000/posts", //保留已有参数 ，去掉哈希符号，序列化
    headers: {
      "content-type": "application/json",
    },
    data: {
      a: 1,
      //   b: 2,
      //   date: new Date(), // utc格式
      //   obj: {
      //     name: "我是",
      //   },
      //   demo: [{ name: "12" }],
      //   test: null,
    },
  }).then((res) => {
    console.log(res)
  })
})
