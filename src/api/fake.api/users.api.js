const data = [
  {
    id: "1",
    name: "ivan",
    surname: "ivanov",
    sex: "Мужской",
    email: "ivan.ivanov@mail.ru",
    password: "123",
    license: true,
  },
  {
    id: "2",
    name: "kate",
    surname: "sidorova",
    sex: "Женский",
    email: "kate@kate.com",
    password: "456",
    license: true,
  },
];

const posts = [
  {
    id: "121212121212",
    userId: "1",
    categoryId: "type1",
    title: "Lorem ipsum dolor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim enim sit amet venenatis. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Mauris vitae ultricies leo integer malesuada nunc vel risus. Proin nibh nisl condimentum id venenatis a condimentum vitae.",
  },
  {
    id: "456456456",
    userId: "2",
    categoryId: "type2",
    title: "sed do eiusmod",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: "678678678678",
    userId: "2",
    categoryId: "type3",
    title: "Dignissim enim ",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim enim sit amet venenatis. Et ligula ullamcorper malesuada proin libero nunc consequat interdum.",
  },
];

const categories = [
  { id: "type1", name: "советы", color: "primary" },

  { id: "type2", name: "личный опыт", color: "info" },

  { id: "type3", name: "рецензия на отель", color: "danger" },

  { id: "type4", name: "рецензия на ресторан", color: "success" },

  { id: "type5", name: "путеводитель", color: "warning" },
];

const comments = [
  {
    commentId: "com1",
    postId: "121212121212",
    userId: "2",
    commentText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum.",
  },
  {
    commentId: "com2",
    postId: "456456456",
    userId: "1",
    commentText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
];

// const user = [
//   {
//     userId: "",
//     login: "",
//     email: "",
//     password: "",
//     gender: "",
//     license: true,
//     registrationDate: "",
//   },
// ];

// const comments = [
//   {
//     commentId: "",
//     postId: "",
//     userId: "",
//     commentText: "",
//     creationTime: "",
//   },
// ];

// const posts = [
//   {
//     postId: "",
//     userId: "",
//     categoryId: "",
//     title: "",
//     text: "",
//     creationTime: "",
//   },
// ];

// const categories = [
// 	{
// 	categoryId: "",
// 	name: "",
// 	color: ""
// 	},
// ];

let isLogged = "";

if (!localStorage.getItem("isLogged")) {
  localStorage.setItem("isLogged", JSON.stringify(isLogged));
}

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(data));
}

if (!localStorage.getItem("posts")) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

if (!localStorage.getItem("categories")) {
  localStorage.setItem("categories", JSON.stringify(categories));
}

if (!localStorage.getItem("comments")) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

const getIsLogged = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("isLogged")));
    }, 0);
  });

const setIsLogged = (param) =>
  new Promise((resolve) => {
    let isLogged = JSON.parse(localStorage.getItem("isLogged"));
    isLogged = param;
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
    resolve((data) => console.log(data));
  });

const fetchAllUsers = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("data")));
    }, 0);
  });

const fetchAllPosts = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("posts")));
    }, 0);
  });

const fetchAllCategories = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("categories")));
    }, 0);
  });

const getCommentsByPostId = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const comments = JSON.parse(localStorage.getItem("comments"));
      const neededComments = comments.filter((comment) => {
        // console.log(comment, id);
        return comment.postId === id;
      });
      resolve(neededComments);
    }, 0);
  });

const getUserById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("data")).find((user) => user.id === id)
      );
    }, 0);
  });

const getPostById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("posts")).find((user) => user.id === id)
      );
    }, 0);
  });

const getCategoryById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("categories")).find(
          (user) => user.id === id
        )
      );
    }, 0);
  });

const addUser = (user) =>
  new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem("data"));
    data.push(user);
    localStorage.setItem("data", JSON.stringify(data));
    resolve((data) => console.log(data));
  });

const addPost = (post) =>
  new Promise(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
  });

const addComment = (data) =>
  new Promise(() => {
    const comments = JSON.parse(localStorage.getItem("comments"));
    comments.push(data);
    localStorage.setItem("comments", JSON.stringify(comments));
  });

const deletePost = (postId) =>
  new Promise(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    console.log(posts);
    const updatedPosts =
      posts.filter((post) => {
        return post.id !== postId;
      }) || [];
    console.log(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  });

const deleteComment = (commentId) =>
  new Promise(() => {
    const comments = JSON.parse(localStorage.getItem("comments"));
    console.log(comments);
    const updatedComments =
      comments.filter((comment) => {
        return comment.commentId !== commentId;
      }) || [];
    console.log(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  });

const update = (id, data) =>
  new Promise((resolve) => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    const postIndex = posts.findIndex((u) => u.id === id);
    posts[postIndex] = { ...posts[postIndex], ...data };
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log(posts);
    resolve(posts[postIndex]);
  });

export default {
  update,
  addPost,
  deletePost,
  fetchAllUsers,
  fetchAllPosts,
  getUserById,
  getPostById,
  addUser,
  fetchAllCategories,
  getCategoryById,
  getCommentsByPostId,
  addComment,
  deleteComment,
  getIsLogged,
  setIsLogged,
};
