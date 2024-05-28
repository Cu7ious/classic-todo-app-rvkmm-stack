import { css } from '@emotion/react';

const panel = css`
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  background-color: hsla(0, 0%, 100%, .8);
  min-height: 75px;
  line-height: 40px;
  text-align: center;
`;
const text = css`
  width: 100%;
`;
  // @media screen and (max-width: 650px) {
  //   min-height: 60px;
  // }

  // & h3 {
  //   width: 100%;

  //   @media screen and (max-width: 650px) {
  //     line-height: 20px;
  //   }
  // }

export default () => (
  <div css={panel}>
    <h3 css={text}>Things to achieve</h3>
  </div>
);
