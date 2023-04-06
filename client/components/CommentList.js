import React from "react";
import { supabase } from "./supabaseClient";

function CommentList(props) {
    const handleDeleteComment = async (commentId) => {
        try {
            const { data, error } = await supabase
                .from("comments")
                .delete()
                .eq("id", commentId);
            if (error) {
                throw error;
            }
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.log("Error deleting comment:", error.message);
        }
    };

    return (
        <ul className="mt-4">
            {props.comments.map((comment, index) => (
                <li key={comment.id} className="bg-gray-100 rounded-lg p-2 mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-500 text-sm">{comment.author}</p>
                        <button
                            className="text-red-500"
                            onClick={() => handleDeleteComment(comment.id)}
                        >
                            Delete
                        </button>
                    </div>
                    <p className="text-lg">{comment.content}</p>
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
