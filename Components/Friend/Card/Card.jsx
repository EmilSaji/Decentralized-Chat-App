import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Card.module.css";
import images from "../../../assets/index";

const Card = ({ readMessage, readUser, el, i }) => {
  return (
    <Link
      href={{ pathname: "/", 
      query: { name:`${el.name}`, address: `${el.pubkey}` }
    }}
    >
      <div
        className={Style.Card}
        onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}
      >
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image
              className={Style.Card_box_right_img}
              src={images.accountName}
              width={50}
              height={50}
            />
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4>{el.name}</h4>
              <small>{el.pubkey.slice(21)}..</small>
            </div>
            <div style={Style.Card_box_right_end}>
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
