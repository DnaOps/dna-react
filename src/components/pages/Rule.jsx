import Header from "../organisms/Header";

import styled from "styled-components";

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

const DNATypo = styled.div`
	width: 917px;
	display: flex;
	color: #024298;
	font-size: 30px;
	font-weight: 700;
`;

const RuleContainer = styled.div`
	width: 917px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	background: #f8f8ff;
	border-top: solid 2.5px #024298;
	box-sizing: border-box;
	margin: 10px 0 0 0;
	padding: 55px 55px 60px 85px;
`;

const codes = `
<body>

<h4>제 1장 총칙</h4>

<ul>
	<li>제 1조: 본 회의 명칭은 동국대학교 리눅스 사용자 그룹(Dongguk Linux User Group) 또는 동국대학교 네트워크사용자 연합(Dongguk Network-User&#39;s Association)이라 한다.</li>
	<li>제 2조: 본 회의 회원 구성은 본 회에 가입한 동국대학교 재학생과 휴학생, 그리고 졸업생으로 한다.</li>
	<li>제 3조: 본 회는 학술 동아리로서 동아리 활동을 통한 리눅스와 네트워크의 이해와 회원 상호간의 친목 도모를 통한 자아발전을 목적으로 한다.</li>
</ul>

<h4>제 2장 회원</h4>

<ul>
	<li>제 4조: 본회의 구성은 정회원, 준회원과 명예회원을 원칙으로 하며 신규가입한 회원은 신입회원으로 정한다.
	<ul>
		<li>1항 - 정회원 :&nbsp;가입학기 한 학기 이상 되었으며, 총회나 세미나, 스터디 등 동아리 활동에&nbsp;2번 이상 참여</li>
		<li>2항 - 명예회원: 정회원으로 졸업한 회원</li>
		<li>3항 - 신입회원: 가입한지 한 학기가 되지 않은 회원</li>
	</ul>
	</li>
	<li>제 5조: 정회원은 의결권, 선거권 및 피선거권의 권리를 가지며 회칙 준수, 회비 납부 및 본 회의행사 등에 성실히 참여할 의무를 지닌다. 명예회원은 의결권을 가지지만 피선거권 및 선거권 권리는 상실되며 회비납부의 의무는 면제된다.</li>
	<li>제 6조: 정회원은 활동 년도와 재학시기에 따라 활동 회원와 비활동 회원로 구분된다.
	<ul>
		<li>1항 - 활동 회원: 3학년 이하의 정회원 또는 활동 년도 1년 이하인 4학년 1학기에 재학중인 회원.</li>
		<li>2항 - 비활동 회원: 활동 년도 2년 이상의 4학년 재학중인 정회원 및 휴학생을 원칙으로 하며 특수한 사유로 인한 활동의 불가능시 임원진 회의를 통하여 비활동 회원으로 정할 수 있다.</li>
	</ul>
	</li>
</ul>

<h4>제 3장 가입 및 탈퇴</h4>

<ul>
	<li>제 7조: 입회시기는 동국대학교에서 지정하는 동아리 회원 모집 시기에 1학년, 2학년 모집을 원칙으로 한다. 3학년 이상의 고학년 학생일 경우에는 임원진과의 면담, 회의를 거친 후 가입이 가능하다.</li>
	<li>제 8조: 탈퇴는 본인의 의사에 따라 자유롭게 할 수 있다.</li>
	<li>제 9조: 탈퇴 후 재 가입시에는 탈퇴 당시의 임원진과 현 임원진의 허가 후 가입 할 수 있다.</li>
</ul>

<h4>제 4장 임원</h4>

<ul>
	<li>제 10조: 본 회의 임원은 다음과 같이 구성한다.<br />
	- 회장, 부회장, 총무, 시스템 관리자, 서기</li>
	<li>제 11조: 임원의 자격 조건<br />
	- 다음 학기 활동 예정인 정회원으로서 본 회에 등록된 자.</li>
	<li>제 12조: 각 임원의 임무는 다음과 같다.
	<ul>
		<li>1항 - 회장: 본 회를 대표하며 본 회의 제반 업무를 총괄한다.</li>
		<li>2항 - 부회장: 회장을 보좌하며 회장의 부재시 회장의 업무를 대신한다.</li>
		<li>3항 - 총무: 회비 및 보조금을 수납하고 본 회의 재정 및 경리사무를 담당한다.</li>
		<li>4항 - 시스템 관리자: 본 회의 서버 및 모든 시스템을 유지, 관리한다.</li>
	</ul>
	</li>
	<li>제 13조: 본 회의 회장 이하 각 임원의 임기는 한 학기를&nbsp;기본으로&nbsp;한다. 1학기의 임원은 2학기에 재등록이 가능하다.</li>
	<li>제 14조: 회장이 임무를 더 이상 수행할 수 없는 경우에는 새로운 회장의 선출을 원칙으로 하되 임기완료 2개월 전일 때는 부회장이 대리한다.</li>
	<li>제 15조: 모든 임원은 임원진 3/5의 동의를 바탕으로 비상대책위원회를 소집할 수 있으며 회장의 권한을 대리할 수 있다.</li>
</ul>

<h4>제 5장 부서 및 팀</h4>

<ul>
	<li>제 16조 : 본 회는 비정기적으로 임원진 회의를 통해 다양한 행사(소풍, MT, 세미나 등)를 준비할 수 있으며, 행사 및 활동에 인원이 필요할 경우 단을 구성하여 운영할 수 있다.</li>
</ul>

<h4>제 6장 회의 및 의결</h4>

<ul>
	<li>제 17조: 본 회의 회의는 다음과 같다.
	<ul>
		<li>1항 - 정기총회(개강 및 종강 총회): 매해년도 3월, 6월, 9월, 12월에 소집하며 임원 개선과 결산보고를 하며 회칙 개정을 할 수 있다.</li>
		<li>2항 - 임시총회 : 사유 발생시 정회원 1/3 이상의 요구 또는 임원진의 의결을 거쳐서 회장이 소집한다.(단, 정기총회와 동등한 성격을 가진다.)</li>
		<li>3항 - 비상대책위원회 : 비상상황 발생시 임원진 3/5의&nbsp;동의로 비상대책 위원회를 소집할 수 있으며 구성은 임원단 위원회에 참석한 정회원으로 이루어진다. 또한 회장, 부회장, 총무에 대한 탄핵은 비상대책위원회에서 한다.</li>
	</ul>
	</li>
	<li>제 18조: 총회의 개회는 활동회원의 과반수 참석을 전제하며 의결은 참석자 중 의결권자의 과반수 찬성으로 한다.</li>
	<li>제 19조: 선거 규정
	<ul>
		<li>1항 - 임원 선출은&nbsp;각 임원을 뽑는 투표에서 다득표자로 결정한다.</li>
		<li>2항 - 입후보자는 정회원과 다음 학기 복학예정인 준회원을 원칙으로 하며, 회원 2인 이상의 추천을 받거나 자기발의로 한다.</li>
		<li>3항 - 선거는 무기명 비밀 투표로 한다.</li>
	</ul>
	</li>
</ul>

<h4>제 7장 재정</h4>

<ul>
	<li>제 20조
	<ul>
		<li>1항 - 본 회의 재정은 정기회비 및 보조회비 그리고 특별회비로 한다.</li>
		<li>2항 - 정기회비 : 매 학기 모든 회원으로 부터 걷는 회비</li>
		<li>3항 - 보조회비 : 학교에서 지원받는 회비</li>
		<li>4항 - 특별회비 : 외부에서 들어오는&nbsp;회비</li>
		<li>5항 - 회비는 매 학기 수령하여 총무가 관리한다.</li>
	</ul>
	</li>
</ul>

<h4>제 8장 포상 과 징계</h4>

<ul>
	<li>
	<dl>
		<dt>제 21조 포상</dt>
		<dd>본 회의 발전을 위해 공헌한 바가 인정되는 자는 임원단의 의결에 의해 회장이 표창할 수 있다.</dd>
	</dl>
	</li>
	<li>
	<dl>
		<dt>제 22조 징계</dt>
		<dd>본 회의 회원이 본 회의 명예를 손상시키거나 과오를 범했을 경우 비상대책위원회에 의해 징계 할 수 있다.</dd>
	</dl>
	</li>
</ul>

<h4>제 9장 회원제명</h4>

<ul>
	<li>제 23조
	<ul>
		<li>1항 - 탈퇴의사를 임원에게 통보한 자, 회비 미납자(3회 이상 통보 후)는 임원단 회의를 거쳐 즉시 제명한다.</li>
		<li>2항 - 총회 등 동아리 활동에 참여하지 않는 회원은 임원단 회의를 거쳐 제명 고려 대상자로 정한다.</li>
		<li>3항 - 제명 고려 대상자
		<ul>
			<li>제명 고려 대상자로 결정되었을 경우 본인에게 즉시 통보한다.</li>
			<li>본인 의사 및 그 후의 활동 내용에 따라 제명 여부를 결정한다.</li>
			<li>제명 고려 대상자는 그 당시의 정회원으로서의 권한이 중지된다.</li>
		</ul>
		</li>
	</ul>
	</li>
</ul>

<h4>부칙</h4>

<ul>
	<li>제 1조: 본 회의 회칙은 총회 후 즉시 시행한다.</li>
	<li>제 2조: 본 회칙에서 성문화되지 않은 조항은 일반 관례를 따른다.</li>
	<li>제 3조: 본 회는 지도교수님을 모시고 본 회의 운영을 위한 조언을 구한다.</li>
</ul>
</body>


`;

const Rule = () => {
	return (
		<>
			<Header />
			<Container>
				<DNATypo>
					DNA &nbsp;<div style={{ color: "#000" }}>회칙</div>
				</DNATypo>
				<RuleContainer>
					<div dangerouslySetInnerHTML={{ __html: codes }}></div>
				</RuleContainer>
			</Container>
		</>
	);
};

export default Rule;