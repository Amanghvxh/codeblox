"use client";
import React from "react";
import PromptInput from "./PromptInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import Renderor from "./Renderor";
import { CreateFileStructure } from "../classes/CreateFile";

const ASTdata = [
  {
    id: "root",
    name: "blog-web-app",
    isFolder: true,
    children: [
      {
        id: "1",
        name: "src",
        isFolder: true,
        children: [
          {
            id: "2",
            name: "components",
            isFolder: true,
            children: [
              {
                id: "3",
                import_statements: ["import React from 'react';"],
                code: "const Header = () => {\n  return (\n    <header>\n      <h1>Blog Web App</h1>\n    </header>\n  );\n};",
                export_property_name: "Header",
                name: "Header.js",
                isFolder: false,
                ast: {},
              },
              {
                id: "4",
                name: "Footer.js",
                isFolder: false,
                ast: {},
                import_statements: ["import React from 'react';"],
                code: "const Footer = () => {\n  return (\n    <footer>\n      <p>&copy; 2024 Blog Web App. All rights reserved.</p>\n    </footer>\n  );\n};",
                export_property_name: "Footer",
              },
              {
                id: "5",
                name: "PostList.js",
                isFolder: false,
                ast: {},
                import_statements: ["import React from 'react';"],
                code: "const PostList = ({ posts }) => {\n  return (\n    <div>\n      {posts.map((post) => (\n        <div key={post.id}>\n          <h2>{post.title}</h2>\n          <p>{post.excerpt}</p>\n        </div>\n      ))}\n    </div>\n  );\n};",
                export_property_name: "PostList",
              },
              {
                id: "6",
                name: "Post.js",
                isFolder: false,
                ast: {},
                import_statements: ["import React from 'react';"],
                code: "const Post = ({ title, content }) => {\n  return (\n    <article>\n      <h1>{title}</h1>\n      <div>{content}</div>\n    </article>\n  );\n};",
                export_property_name: "Post",
              },
            ],
          },
          {
            id: "7",
            name: "pages",
            isFolder: true,
            children: [
              {
                id: "8",
                name: "HomePage.js",
                isFolder: false,
                route: true,
                ast: {},
                import_statements: [
                  "import React from 'react';",
                  "import PostList from '../components/PostList';",
                ],
                code: "const HomePage = ({ posts }) => {\n  return (\n    <div>\n      <h1>Welcome to the Blog</h1>\n      <PostList posts={posts} />\n    </div>\n  );\n};",
                export_property_name: "HomePage",
              },
              {
                id: "9",
                name: "PostPage.js",
                isFolder: false,
                route: true,
                ast: {},
                import_statements: [
                  "import React from 'react';",
                  "import Post from '../components/Post';",
                ],
                code: "const PostPage = ({ post }) => {\n  return (\n    <div>\n      <Post title={post.title} content={post.content} />\n    </div>\n  );\n};",
                export_property_name: "PostPage",
              },
            ],
          },
          {
            id: "10",
            name: "firebase",
            isFolder: true,
            children: [
              {
                id: "11",
                name: "firebase.js",
                isFolder: false,
                code: "",
                ast: {},
                import_statements: [],
                export_property_name: "firebase",
              },
              {
                id: "12",
                name: "addPost.js",
                isFolder: false,
                code: "",
                ast: {},
                import_statements: [],
                export_property_name: "addPost",
              },
              {
                id: "13",
                name: "getPosts.js",
                isFolder: false,
                ast: {},
                import_statements: [
                  "import { db } from './firebase';",
                  "import { collection, getDocs } from 'firebase/firestore';",
                ],
                code: "const getPosts = async () => {\n  try {\n    const querySnapshot = await getDocs(collection(db, 'posts'));\n    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));\n    return posts;\n  } catch (e) {\n    console.error('Error fetching documents: ', e);\n    return [];\n  }\n};",
                export_property_name: "getPosts",
              },
              {
                id: "14",
                name: "updatePost.js",
                isFolder: false,
                ast: {},
                import_statements: [
                  "import { db } from './firebase';",
                  "import { doc, updateDoc } from 'firebase/firestore';",
                ],
                code: "const updatePost = async (id, updatedPost) => {\n  try {\n    const postRef = doc(db, 'posts', id);\n    await updateDoc(postRef, updatedPost);\n    console.log('Document updated with ID: ', id);\n  } catch (e) {\n    console.error('Error updating document: ', e);\n  }\n};",
                export_property_name: "updatePost",
              },
              {
                id: "15",
                name: "deletePost.js",
                isFolder: false,
                ast: {},
                import_statements: [
                  "import { db } from './firebase';",
                  "import { doc, deleteDoc } from 'firebase/firestore';",
                ],
                code: "const deletePost = async (id) => {\n  try {\n    const postRef = doc(db, 'posts', id);\n    await deleteDoc(postRef);\n    console.log('Document deleted with ID: ', id);\n  } catch (e) {\n    console.error('Error deleting document: ', e);\n  }\n};",
                export_property_name: "deletePost",
              },
            ],
          },
          {
            id: "16",
            name: "styles",
            isFolder: true,
            children: [
              {
                id: "17",
                name: "global.css",
                isFolder: false,
                code: "body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 0;\n  background-color: #f5f5f5;\n}\n\nheader, footer {\n  background-color: #333;\n  color: white;\n  text-align: center;\n  padding: 1em 0;\n}\n\nh1, h2 {\n  margin: 0;\n}\n\np {\n  margin: 0.5em 0;\n}\n\narticle {\n  padding: 1em;\n  background-color: white;\n  margin: 1em 0;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n}",
                ast: {},
                import_statements: [],
                export_property_name: "",
              },
            ],
          },
          {
            id: "18",
            name: "App.js",
            isFolder: false,
            route: true,
            code: "",
            ast: {},
            import_statements: [],
            export_property_name: "App",
          },
          {
            id: "19",
            name: "index.js",
            isFolder: false,
            code: "",
            ast: {},
            import_statements: [],
            export_property_name: "",
          },
        ],
      },
      {
        id: "20",
        name: "public",
        isFolder: true,
        children: [
          {
            id: "21",
            name: "index.html",
            isFolder: false,
            code: "",
            ast: {},
            import_statements: [],
            export_property_name: "",
          },
        ],
      },
    ],
  },
];

function Page() {
  const fileStructure = new CreateFileStructure(ASTdata);
  const allCodeData = fileStructure.readAll(["code", "import_statements"]);
  const importCodeString = `${[
    ...new Set(...allCodeData.import_statements.flat()),
  ].join("\n")}`;

  console.log(importCodeString, "importCodeString");
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-[#2C57FF] p-4 text-white font-semibold">
        {/* Navbar content here */}
      </nav>
      <div className="flex flex-1">
        <ResizablePanelGroup className="w-full h-full" direction="horizontal">
          <ResizablePanel defaultSize={25} className="w-1/5 h-full">
            Left Panel
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} className="w-3/5 h-full">
            {/* <Renderor /> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} className="w-1/5 h-full">
            Right Panel
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="flex justify-center items-center h-1/10 w-full">
        <PromptInput />
      </div>
    </div>
  );
}

export default Page;

//file tree
//text area
//middle space for rendering(ui/app walls/nodebased editing / code editor)
//photo uploading
//white board

// dont talk anything about bundlers , dont talk anything about ci/cd pipelines , dont talk anything about initiliazing firebase , you will get the firebase initilized at the start of the project so dont worry about that , dont worry about version control, also for routes you will have to generate

// also with file structure you will generate a json structure for all the routes for the app that will be used , so that we can dynamically generate this file
