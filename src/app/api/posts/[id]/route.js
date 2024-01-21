import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    // Find the post by ID
    const post = await Post.findById(id);

    // Increment the likes count
    post.likes += 1;

    // Save the updated post
    await post.save();

    return new NextResponse(JSON.stringify({ likes: post.likes }), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params, body }) => {
  const { id } = params;
  const { text } = body || {};

  try {
    await connect();

    // Find the post by ID
    const post = await Post.findById(id);
    // Add the new comment to the post
    post.comments.push({ text });
    
    // Save the updated post
    console.log("first",body)
    // console.log("second",request)
    await post.save();

    return new NextResponse(JSON.stringify({ comments: post.comments }), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


// export const POST = async (request, { params }) => {
//   const { id } = params;
//   const { text } = JSON.parse(request.body || '{}');
// console.log(id,text)
//   try {
//     console.log('Request Body:', request.body);
//     await connect();

//     const post = await Post.findById(id);

//     if (!post) {
//       return new NextResponse('Post not found', { status: 404 });
//     }

//     post.comments.push({ text });
//     await post.save();

//     return new NextResponse(JSON.stringify(post.comments), { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse('Database Error', { status: 500 });
//   }
// };