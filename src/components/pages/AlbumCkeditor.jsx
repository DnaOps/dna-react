import Header from "../organisms/Header";
import styled from "styled-components";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../assets/css/ckEditor.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postNotify, putNotify } from "../../api/request";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #e7e6f5; // css variable로 변경
  box-sizing: border-box;
  padding: 40px 55px 360px 55px;
  overflow-y: scroll;
`;

const NoticeTypo = styled.div`
  width: 917px;
  display: flex;
  box-sizing: border-box;
  padding: 0 5px;
  font-size: 28px;
  color: #024298;
`;

const Notice = styled.div`
  width: 917px;
  background: #f8f8ff;
  border-top: solid 2.5px #024298;
  box-sizing: border-box;
  margin: 10px 0 0 0;
  padding: 100px 55px 60px 85px;
`;

const NoticeButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const StyledNoticeButton = styled.div`
  width: 55px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 3.5px;
  font-size: 12px;
  color: #f8f8ff;
  cursor: pointer;
`;

// 등록, 취소 버튼
const NoticeButton = ({ typo, background, onClick }) => {
  return (
    <StyledNoticeButton style={{ background: background }} onClick={onClick}>
      {typo}
    </StyledNoticeButton>
  );
};

const UpperContainer = styled.div`
  width: 917px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleInput = styled.input.attrs({
  placeholder: "제목",
  placeholderTextColor: "#B5B5B5",
})`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: solid 1px #b5b5b5;
  box-sizing: border-box;
  padding: 22px;
  margin: 0 0 20px 0;
  font-size: 32px;
`;

const FooterContainer = styled.div`
  border-top: solid 1px #b5b5b5;
`;

const StyledFooter = styled.div`
  width: 100%;
  font-size: 12px;
  color: #b5b5b5;
  font-weight: 600;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <StyledFooter>위치 : 학생회관 2층 가장 안쪽</StyledFooter>
      <StyledFooter>
        저작자 : DNAOps - Dongguk Univ. Network User's Association, DevOps Silo
      </StyledFooter>
      <StyledFooter>Github : https://github.com/DnaOps</StyledFooter>
      <StyledFooter>Contact DNA for more information.</StyledFooter>
      <StyledFooter>ⓒ 2023. DNAOps all rights reserved.</StyledFooter>
    </FooterContainer>
  );
};

const AlbumCkeditor = ({ type }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.vallue);
  };

  const applyOnClick = () => {
    let postNotifyDTO = {};
    postNotifyDTO = {
      title: title,
      content: content,
    };

    // 수정
    if (state) {
      putNotify(
        type,
        state[`${type}Id`],
        postNotifyDTO,
        navigate(`/${type}_list`)
      );
    } else {
      postNotify(type, postNotifyDTO, navigate(`/${type}_list`));
    }
  };

  const cancelOnclick = () => {
    navigate(`/${type}_list`);
  };

  const buttonInfo = [
    { typo: "등록", background: "#024298", onClick: applyOnClick },
    { typo: "취소", background: "#828282", onClick: cancelOnclick },
  ];

  const { state } = useLocation();

  // ckeditor5 - Album Upload
  const Editor = ({ setDesc, desc, setAlbumImage }) => {
    const accessToken = localStorage.getItem("Authorization");

    const uploadAlbumAdapter = (loader) => {
      return {
        upload() {
          return new Promise((resolve, reject) => {
            const formData = new FormData();

            loader.file.then((file) => {
              formData.append(
                "file",
                new Blob([file], { type: "multipart/form-data" }),
                file.name
              );
              for (var key of formData.keys()) {
                console.log("key:", key);
              }
              for (var val of formData.values()) {
                console.log("val:", val);
              }

              axios
                .post("http://54.144.153.88:8080/albumPosts/images", formData, {
                  headers: {
                    Authorization: accessToken,
                  },
                })
                .then((res) => {
                  console.log("res:", res);
                  resolve({
                    default: res.data.url,
                  });
                })
                .catch((err) => reject(err));
            });
          });
        },
      };
    };

    function uploadAlbumPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAlbumAdapter(loader);
      };
    }

    return (
      <div className="App">
        <CKEditor
          data=""
          editor={ClassicEditor}
          className="ck ck-editor__editable"
          config={{
            placeholder: "사진과 함께 본문을 입력하세요.",
            extraPlugins: [uploadAlbumPlugin],
          }}
          onChange={(event, editor) => {
            // setContent(editor.getDate());
            console.log({ event, editor, content });
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Header />
      <Container>
        <UpperContainer>
          <NoticeTypo>{(type = "글쓰기")}</NoticeTypo>
          <NoticeButtonContainer>
            {buttonInfo.map((info) => (
              <NoticeButton
                key={info.typo}
                typo={info.typo}
                background={info.background}
                onClick={info.onClick}
              />
            ))}
          </NoticeButtonContainer>
        </UpperContainer>
        <Notice>
          <TitleInput
            onChange={handleTitleChange}
            defaultValue={state?.title}
          />
          <Editor
            onChange={handleContentChange}
            defaultValue={state?.content}
          ></Editor>
          <Footer />
        </Notice>
      </Container>
    </>
  );
};

export default AlbumCkeditor;
