import React from "react";
import { css } from "@emotion/core";
import Img from "react-image";
import ScaleLoader from "react-spinners/ScaleLoader";

const ShowImage = ({ image }) => {
  //   const override = css`
  //     display: block;
  //     transform: rotate(90deg);
  //   `;
  return (
    <Img
      src={[
        `https://toplearnapi.ghorbany.dev/${image}`,
        "https://via.placeholder.com/150x100",
      ]}
      className="img-responsive"
      loader={
        <div className="text-center">
          <ScaleLoader
            loading={true}
            color={"#BD10E0"}
            // css={override}
            height={35}
            width={3}
            radius={2}
            margin={2}
          />
        </div>
      }
    />
  );
};

export default ShowImage;
