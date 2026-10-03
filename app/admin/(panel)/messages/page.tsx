import { MessageActions } from "@/components/admin/message-actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { listMessages } from "@/server/db/queries/messages";

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminMessagesPage() {
  const messages = await listMessages();

  return (
    <>
      <AdminPageHeader title="Messages" description="Submissions from the contact form." />
      {messages.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">No messages yet.</p>
      ) : (
        <ul role="list" className="flex flex-col gap-4">
          {messages.map((message) => (
            <li key={message.id}>
              <Card>
                <CardContent className="flex flex-col gap-4 pt-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="flex items-center gap-2 font-medium">
                        {message.name}
                        {!message.readAt && <Badge variant="default">New</Badge>}
                      </p>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-sm text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
                      >
                        {message.email}
                      </a>
                    </div>
                    <time dateTime={message.createdAt.toISOString()} className="text-xs text-zinc-500 dark:text-zinc-400">
                      {dateFormat.format(message.createdAt)}
                    </time>
                  </div>
                  <p className="whitespace-pre-line text-sm text-zinc-700 dark:text-zinc-300">{message.message}</p>
                  <MessageActions id={message.id} read={message.readAt !== null} label={`message from ${message.name}`} />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
