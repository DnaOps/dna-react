import React, { useEffect, useState, } from 'react'

export default function Login() {

  const [id, setId] = useState('');
  const [pw, setPw] = useState("");

  const { idValid, setIdValid } = useState(false);
  const { pwValid, setPwValid } = useState(false);
  const { notAllow, setNotAllow } = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }

  useEffect(() => {
    if (idValid && pwValid) {
      setNotAllow(false);
      return;
    }
  }, [idValid, pwValid]);


  return (
    <div className="page">
      <div className="titleWrap">
        <br />
        <br />
      </div>

      <div className="contentWrap">
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="아이디"
            value={id}
            onChange={handleId} />
        </div>
        <div className="errorMessageWrap">
          {!idValid && id.length > 0 && (
            <div>아이디를 입력해주세요.</div>
          )}
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="비밀번호"
            value={pw}
            onChange={handlePw} />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>비밀번호를 입력해주세요.</div>
          )}
        </div>

        <div className="keepIogin" style={{ marginTop: "10px" }}>로그인 상태 유지</div>
      </div>

      <div>
        <button disabled={notAllow} className="mainLoginButton">
          로그인
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button className="googleLoginButton">

          Google 로그인
        </button>
      </div>

    </div>
  );
}