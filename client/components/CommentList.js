import React, { useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "./UserContext";
import { supabase } from "./supabaseClient";
import Link from "next/link";

export default function CommentList(props) {
    const router = useRouter();
    const { user } = useContext(UserContext);

    const handleDeleteComment = async (commentId) => {
        const { data, error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId);
        if (error) {
            alert("You can only delete your comments!");
        } else {
            router.reload();
        }
    };

    return (
        <ul className="mt-4">
            {props.comments.map((comment, index) => (
                <li key={comment.id} className="bg-gray-100 rounded-lg p-2 mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-500 text-sm">{comment.author}</p>
                        {user && user.user_id === comment.user_id && (
                            <div className="flex space-x-2">
                                <button className="text-blue-500">
                                    <Link href={`/editcomment/${comment.id}`}>Edit</Link>
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-lg">{comment.content}</p>
                </li>
            ))}
        </ul>
    );
}
