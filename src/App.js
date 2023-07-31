import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Notify from "./components/pages/Notify";
import NotifyList from "./components/pages/NotifyList";
import AlbumList from "./components/pages/AlbumList";
import AlbumCkeditor from "./components/pages/AlbumCkeditor";
import Onboard from "./components/pages/Onboard";
import SignUp from "./components/pages/SignUp";
import WritePost from "./components/pages/WritePost";
import Rule from "./components/pages/Rule";

import { Route, Routes } from "react-router-dom";
import Admin from "./components/pages/Admin";
import SocialSignUp from "./components/pages/SocialSignUp";
import NotFound from "./components/pages/NotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Onboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/notice_list" element={<NotifyList type="notice" />} />
			<Route path="/forum_list" element={<NotifyList type="forum" />} />
			<Route path="/study_list" element={<NotifyList type="study" />} />
			<Route path="/notice/:id" element={<Notify type="notice" />} />
			<Route path="/forum/:id" element={<Notify type="forum" />} />
			<Route path="/forum_post/write" element={<WritePost type="forum" />} />
			<Route path="/study_post/write" element={<WritePost type="study" />} />
			<Route path="/notice_post/write" element={<WritePost type="notice" />} />
			<Route path="/study/:id" element={<Notify type="study" />} />
			<Route path="/album_post/write" element={<WritePost type="album" />} />
			<Route path="/home" element={<Home />} />
			<Route path="/rule" element={<Rule />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/oauth" element={<SocialSignUp />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
