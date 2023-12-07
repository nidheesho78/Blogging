import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLayout from '../pages/admin/AdminLayout';
import Admin from '../pages/admin/screens/Admin';
import Comments from '../pages/admin/screens/comments/Comments';
import CreateNewPost from '../pages/admin/screens/posts/CreateNewPost';
import ManagePosts from '../pages/admin/screens/posts/ManagePosts.jsx';
import EditPosts from '../pages/admin/screens/posts/EditPosts.jsx';


function AdminRouters() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<CreateNewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPosts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminRouters