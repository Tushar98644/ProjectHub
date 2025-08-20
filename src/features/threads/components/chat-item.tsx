export const ChatItem = ({
    me,
    avatar,
    author,
    timestamp,
    content,
}: {
    me: boolean;
    avatar?: string;
    author: string;
    timestamp: string;
    content: string;
}) => {
    return (
        <div className={`flex items-start gap-3 ${me ? "justify-end" : ""}`}>
            {!me && (
                <img src={avatar || "/assets/logo.png"} alt={author} className="h-8 w-8 rounded-full object-cover" />
            )}
            <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 py-2 border ${
                    me ? "bg-primary/5 border-primary/10" : "bg-muted/40 border-border"
                }`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{author}</span>
                    <span className="text-[11px] text-muted-foreground">{timestamp}</span>
                </div>
                <p className="mt-1 text-sm whitespace-pre-wrap">{content}</p>
            </div>
            {me && (
                <img src={avatar || "/assets/logo.png"} alt={author} className="h-8 w-8 rounded-full object-cover" />
            )}
        </div>
    );
};
