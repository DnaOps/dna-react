import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Notify from "./components/pages/Notify";
import NotifyList from "./components/pages/NotifyList";
import Onboard from "./components/pages/Onboard";
import SignUp from "./components/pages/SignUp";
import WritePost from "./components/pages/WritePost";

import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Onboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/notify_list" element={<NotifyList type="notify" />} />
			<Route path="/forum_list" element={<NotifyList type="forum" />} />
			<Route path="/study_list" element={<NotifyList type="study" />} />
			<Route path="/notify/:id" element={<Notify type="notify" />} />
			<Route path="/forum/:id" element={<Notify type="forum" />} />
			<Route path="/forum_post/write" element={<WritePost type="forum" />} />
			<Route path="/study/:id" element={<Notify type="study" />} />
			<Route path="/album_post/write" element={<WritePost type="album" />} />
			<Route path="/home" element={<Home />} />
		</Routes>
	);
}

export default App;
