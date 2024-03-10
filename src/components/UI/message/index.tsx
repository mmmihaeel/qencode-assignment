import { FC } from "react";
import './index.scss';

interface MessageProps {
    successMessage?: string, errors?: string[]
}

const MessageComponent: FC<MessageProps> = ({ successMessage, errors }) => {
    return (
        <>
            {successMessage && <span className="success">{successMessage}</span>}
            {errors && errors?.length > 0 && (
                <div id="error-container">
                    <h2>Errors:</h2>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default MessageComponent;
