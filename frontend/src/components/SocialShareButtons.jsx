import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareReddit } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";




const SocialShareButtons = ({url,title}) => {
    return (
      <div className="w-full flex justify-between">
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://www.facebook.com/dialog/share?app_id=327111010031324&display=popup&href=${url}`}
        >
          <FaSquareFacebook className="text-[#3b5998] w-12 h-auto" />
        </a>
        <a target="_blank" rel="noreferrer" href={`http://twitter.com/intent/tweet?url=${url}`}>
          <FaSquareXTwitter className="text-[#00acee] w-12 h-auto" />
        </a>
        <a target="_blank" rel="noreferrer" href={`http://www.reddit.com/submit?url=${url}&title=${title}`}>
          <FaSquareReddit className="text-[#ff4500] w-12 h-auto" />
        </a>
        <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send/?text=${url}`}>
          <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
        </a>
      </div>
    );
}

export default SocialShareButtons;