import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../index";

const Model = ({
  openBox,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
  address,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="Buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title}
            <span> {head} </span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {
            loading == true ? (
              <Loader />
            ) : (
              <div className={Style.Model_box_right_name}>
                <div className={Style.Model_box_right_name_info}>
                  <Image
                    src={images.username}
                    alt="Username"
                    width={30}
                    height={30}
                  />
                  <input
                    type="text"
                    placeholder="your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={Style.Model_box_right_name_info}>
                  <Image
                    src={images.account}
                    alt="Account"
                    width={30}
                    height={30}
                  />
                  <input
                    type="text"
                    placeholder={address || "Enter Account Address"}
                    value={address}
                    onChange={(e) => setAccountAddress(e.target.value)}
                  />
                </div>

                <div className={Style.Model_box_right_name_btn}>
                  <button onClick={() => functionName({name, accountAddress})}>
                    {""}
                    <Image src={images.send} alt="send" height={30} width={30} />
                    Submit
                  </button>

                  <button onClick={() => openBox(false)}>
                    {""}
                    <Image src={images.close} alt="close" height={30} width={30} />
                    Cancel
                  </button>

                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Model;
