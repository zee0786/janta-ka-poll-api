import moment from "moment"
import Posts from "../db/posts"

class postsController {
  static getPosts(req, res) {
    return res.json({
      message: "List of all posts",
      posts: Posts
    });
  }
  static createPost(req, res) {
    const newId = parseInt(Posts.length) + 1;
    const { title, body } = req.body;
    const errorsObj = [...(title ? [] : ['title not present']), ...(body ? [] : ['body not present'])]
    if (errorsObj.length) {
      return res.status(400).json({
        message: errorsObj
      })
    }
    const newPost = {
      id: newId,
      title,
      body,
      created_at: moment.utc().format()
    };
    Posts.push(newPost);
    return res.status(200).json({
      newId,
      message: "created a new post"
    });
  }
  static getOnePost(req, res) {
    const { id } = req.params;
    const post = Posts.find(onePost => onePost.id == id);
    if (post) {
      return res.status(200).json({
        message: "one post found",
        onePost: post
      });
    } else {
      res.status(400).json({
        error: "no post found with that id"
      });
    }
  }
  static updatePost(req, res) {
    const { id } = req.params;
    const post = Posts.find(updatePost => updatePost.id == id);
    if (post) {
      (post.title = req.body.title), (post.body = req.body.body);
      return res.status(201).json({
        message: "successfully updated",
        updatePost: post
      });
    } else {
      res.status(400).json({
        error: "post cannot be updated"
      });
    }
  }
  static deletePost(req, res) {
    let { id } = req.params;
    const findPostIndex = Posts.findIndex(post => {
      return post.id == id;
    });
    if (~findPostIndex) {
      Posts.splice(findPostIndex)
      res.status(200).json({
        message: "post successfully deleted",
        Posts
      });
    } else {
      res.status(400).json({
        error: "could not delete a post"
      });
    }
  }
}
export default postsController;