import styled from "styled-components";

import notFound from "../../assets/images/not_found.png";
import Header from "../organisms/Header";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #e7e6f5;
`;

const NotFound = () => {
	return (
		<>
			<Header />
			<Container>
				<img src={notFound} />
			</Container>
		</>
	);
};

export default NotFound;
