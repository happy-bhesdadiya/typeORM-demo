import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";

class PostController {

  static addPost = async (req: Request, res: Response) => {
    try {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      const post = getRepository(Post).create(newPost);
      const result = await getRepository(Post).save(post);
      return res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static getPosts = async (req: Request, res: Response) => {
    try {
      const result = await getRepository(Post).find();
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static getOnePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const post = await getRepository(Post).findOne(id);
      return res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static updatePost = async (req: Request, res: Response) => {
    try {
      const post = await getRepository(Post).findOne(req.params.id);
      if (post) {
        getRepository(Post).merge(post, req.body);
        const result = await getRepository(Post).save(post);
        return res.status(200).json(result);
      }
      return res.json({ msg: "Post Not Found" });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  static deletePost = async (req: Request, res: Response) => {
    try {
      const post = await getRepository(Post).delete(req.params.id);
      return res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default PostController;
