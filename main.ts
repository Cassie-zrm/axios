import axios from "./src"
console.log(axios.get)
const btnGet = document.querySelector("#get-button") as HTMLButtonElement
const btnPost = document.querySelector("#post-button") as HTMLButtonElement
console.log(22, axios.insterceptors.requset)
axios.insterceptors.requset.use(
  (config) => {
    console.log("第一")

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.insterceptors.response.use(
  (config) => {
    console.log("第2")

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
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
  // axios({
  //   method: "post",
  //   url: "http://localhost:3000/posts", //保留已有参数 ，去掉哈希符号，序列化
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   data: {
  //     a: 1,
  //     //   b: 2,
  //     //   date: new Date(), // utc格式
  //     //   obj: {
  //     //     name: "我是",
  //     //   },
  //     //   demo: [{ name: "12" }],
  //     //   test: null,
  //   },
  // }).then((res) => {
  //   console.log(res)
  // })
  axios
    .post<{ id: number }>("http://localhost:3000/posts", { id: 1 })
    .then((res) => {
      // console.log(res.data.id)
    })
})
