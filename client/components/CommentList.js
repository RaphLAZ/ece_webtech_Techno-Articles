import React from "react";

function CommentList(props) {
    return (
        <ul className="mt-4">
            {props.comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 rounded-lg p-2 mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-500 text-sm">{comment.author}</p>
                    </div>
                    <p className="text-lg">{comment.content}</p>
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
