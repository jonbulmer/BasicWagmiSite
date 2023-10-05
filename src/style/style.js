import {createGlobalStyle, styled} from 'styled-components/macro';
import Pixboy from  '../fonts/Pixeboy.ttf'



const Header = styled.div`
  background-color:#000;
  position:fixed;
  top:0;
  width:100%;
  z-index:11
`;

const InternetMoneyLink = styled.a`
  font-family: Pixboy;
  text-decoration: none;  
  color: #fba81a;
  font-weight: normal;
  font-size: 2.5em;
`;

const BodySection = styled.div`
  padding-top:2.875em;
  padding-bottom: 0em;
  padding-right:0em;
`;

const Container = styled.div` 
  margin:0 auto;
  max-width:1480px;
  padding:0 1.5em;
  width:90%;
 `;

 const NavButton = styled.button `
  align-items: center;
  background-color: ${({ color }) => '#000' || color};
  border: .075em solid #737373;
  border-radius: 3.75em;
  color: ${({ color }) => color || '#fba81a'};
  display: flex;
  font-size: 1em;
  margin-left:.5em;
  font-weight: 700;
  justify-content: space-between;
  text-transform: uppercase;
  width: -webkit-max-content;
  width: max-content;
  line-height:inherit;
  padding:.5em 1.625em;
  &:hover {
    background-color: ${({ color }) => color || '#fba81a'};
    color: ${({ color }) => '#000' || color};
  }  
`;

const NavBar = styled.div`
display:flex;
margin-left:.5em
`;

const Label = { 
  padding: "10px 20px", textAlign: "center" 
};

const FormContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
const ErrorMessage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const BannerTitle = styled.div`
  color: #fba81a;
  font-size:5.6875em;
  font-weight:700;
  line-height:1.3;
  text-align: left;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size:2.6875em;
  }`;

const BannerSubTitle = styled.div`
  color: #fff;
  font-size:1.5em;
  margin-top:.5em;
  max-width:80%
`;

const TimeFeeRow = styled.div`
    display:flex;
    flex-direction:row;
    font-size:22px;
    margin:16px 0
`;

const TimeFeeRowInfo = styled.img`
  width: 28px;
  height: 28px
`;

const TimeFeeRowTitle = styled.div`
  text-align:left;
  text-transform:uppercase;
  font-weight:bold;
  color: #fff;
  flex-grow: 1;
  padding:10px
`;

const TimeFeeRowEnds = styled.div`
  flex: 0.5;
  color: #fff;
  display:flex;
  align-items:left;
  flex-direction:row;
`;

const TimeFeeRowValue = styled.input`
  all:unset;
  flex-grow:1;
  text-overflow:ellipsis
`;

const InformationText = styled.p`
  color: #08f;
`;

const GeneralParagragh = styled.p`
  color:#fff;
`;

export const styles = {
  Container: Container,
  Header: Header,
  BodySection: BodySection,
  Label: Label,
  ErrorMessage: ErrorMessage,
  FormContainer: FormContainer,
  BannerTitle: BannerTitle,
  BannerSubTitle: BannerSubTitle,
  InternetMoneyLink: InternetMoneyLink,
  TimeFeeRow,
  TimeFeeRowInfo: TimeFeeRowInfo,
  TimeFeeRowTitle: TimeFeeRowTitle,
  TimeFeeRowEnds: TimeFeeRowEnds,
  TimeFeeRowValue: TimeFeeRowValue,
  InformationText: InformationText,
  NavButton: NavButton,
  NavBar: NavBar,
  GeneralParagragh: GeneralParagragh
}

export default createGlobalStyle`
  @font-face {
    font-family: Pixboy;
    src: url(${Pixboy}); 
  }
`;