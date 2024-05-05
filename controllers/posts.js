const errHandle = require('../service/errHandle');
const successHandle = require('../service/succesHandle');
const appError = require('../service/appError');

const User = require('../models/userSchema');
const Post = require('../models/postSchema');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const post = await Post.find().populate({
      path: 'user',
      select: 'name image'
    }).sort(timeSort);;
    successHandle(res, post);
  },
  async createPost(req, res, next) {
    const id = req.user;
    const { body } = req;
    if (body.content !== undefined) {
      const newPost = await Post.create(
        {
          user: id,
          content: body.content
        }
      );
      successHandle(res, newPost);
    } else {
      appError({ httpStatus: 400, errMessage: "content 為必填或錯誤", next })
    }
  },
  async editPost(req, res, next) {
    const { body } = req;
    const { id } = req.params;
    const postToEdit = await Post.findById(id);
    if (!postToEdit) {
      appError({ httpStatus: 400, errMessage: "ID 錯誤，請確認", next });
      return;
    }
    if (body.content !== undefined) {
      const editContent = {
        name: body.name,
        content: body.content,
        tags: body.tags,
        type: body.type
      };
      //更新後最新的 DATA
      const editPost = await Post.findByIdAndUpdate(id, editContent, { new: true });
      successHandle(res, editPost);
    } else {
      appError({ httpStatus: 400, errMessage: "content 為必填或錯誤", next })
    }
  },
  async deletePosts(req, res, next) {
    if (req.originalUrl === "/posts/") {
      appError({ httpStatus: 400, errMessage: "API 錯誤", next })
    } else {
      await Post.deleteMany({});
      await posts.getPosts(req, res)
    }
  },
  async deletePost(req, res, next) {
    const { id } = req.params;
    const postToDelete = await Post.findById(id);
    if (!postToDelete) {
      appError({ httpStatus: 400, errMessage: "ID 錯誤，請確認", next });
      return;
    }
    await Post.findByIdAndDelete(id);
    await posts.getPosts(req, res)
  }
}

module.exports = posts;