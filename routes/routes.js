import express from "express";
import postController from "../controllers/postController";
const router = express.Router();
router.get("/api/v1/posts", postController.getPosts);
router.post("/api/v1/posts", postController.createPost);
router.get("/api/v1/posts/:id", postController.getOnePost);
router.put("/api/v1/posts/:id", postController.updatePost);
router.delete("/api/v1/posts/:id", postController.deletePost);
export default router;