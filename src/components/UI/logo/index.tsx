import { FC } from "react";
import qencodeLogo from "../../../assets/icons/qencode.svg";
import './index.scss';

const Logo: FC = () => {
    return <div id='logo'>
        <img src={qencodeLogo} alt="Qencode Logo" />
    </div>;
}

export default Logo;