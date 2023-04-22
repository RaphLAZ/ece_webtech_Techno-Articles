import { useState } from "react";

export default function CommentForm(props) {
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() === "") {
            alert("Comment cannot be empty");
            return;
        }
        props.onCommentSubmit(comment);
        setComment("");
    };

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
              value={comment}
              onChange={handleInputChange}
              placeholder="Enter your comment..."
              className="w-full rounded-lg shadow-md p-2 mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Submit
            </button>
        </form>
    );
}