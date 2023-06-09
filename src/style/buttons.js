import styled from 'styled-components';

export const LoginBtn = styled.button`
  background: ${(props) => props.theme.color.lightBlack};
  padding: 0.375rem 0.75rem;
  color: #ffffff;
  border: 1px solid transparent;
  text-decoration: none;
  line-height: 1.5;
  display: flex;
  border-radius: 0.25rem;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  :hover {
    border: 1px solid ${(props) => props.theme.color.lightBlack};
    background: transparent;
    color: #000000;
  }
`;

export const ModelBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.lightBlack};
  :hover {
    border: 1px solid ${(props) => props.theme.color.lightBlack};
    background: #ffffff;
    color: #000000;
  }
`;

export const ModelLoadingBtn = styled(ModelBtn)`
  background: ${(props) => props.theme.color.purple};
  width: 100%;
  :hover {
    background: ${(props) => props.theme.color.purple};
    color: #ffffff;
  }
`;

export const HeroBtn = styled(LoginBtn)`
  background: #fdfdfd;
  color: ${(props) => props.theme.color.purple};
  border-radius: 49px;
  :hover {
    background: ${(props) => props.theme.color.purple};
    color: #ffffff;
    border: 1px solid transparent;
  }
`;

export const BookBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.purple};
  color: #ffffff;
  width: 156px;
  font-size: 20px;
  border-radius: 49px;
  :hover {
    border: 1px solid ${(props) => props.theme.color.purple};
    background: #ffffff;
    color: ${(props) => props.theme.color.purple};
  }
`;

export const DeletingBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.red};
  color: #ffffff;
  width: 100%;
  :hover {
    border: 1px solid ${(props) => props.theme.color.red};
    background: #ffffff;
    color: ${(props) => props.theme.color.red};
  }
`;

export const UpdateBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.purple};
  :hover {
    border: 1px solid ${(props) => props.theme.color.purple};
    color: ${(props) => props.theme.color.purple};
  }
`;
