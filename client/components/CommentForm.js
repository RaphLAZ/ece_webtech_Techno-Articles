import { useState } from "react";

function CommentForm(props) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() === "") {
            setError("Comment cannot be empty");
            return;
        }
        const newComment = {
            author: "Anonymous",
            content: comment,
        };
        props.onCommentSubmit(newComment);
        setComment("");
        setError("");
    };

    const handleInputChange = (event) => {
        setComment(event.target.value);
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
      <textarea
          value={comment}
          onChange={handleInputChange}
          placeholder="Enter your comment..."
          className="w-full rounded-lg shadow-md p-2 mb-2"
      />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
}

export default CommentForm;
