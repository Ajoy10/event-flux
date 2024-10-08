import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FontBoldIcon as Bold,
  StrikethroughIcon as Strikethrough,
  FontItalicIcon as Italic,
  ListBulletIcon as List,
  ActivityLogIcon as ListOrdered,
} from '@radix-ui/react-icons';
import { Toggle } from '../toggle';
import { Separator } from '../separator';
import { useEffect } from 'react';

export const RichTextEditor = ({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] max-h-[350px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto',
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],
    content: value, // Set the initial content with the provided value
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Call the onChange callback with the updated HTML content
    },
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  return (
    <>
      <EditorContent editor={editor} />
      {editor ? (
        <RichTextEditorToolbar editor={editor} disabled={disabled} />
      ) : null}
    </>
  );
};

const RichTextEditorToolbar = ({
  editor,
  disabled = false,
}: {
  editor: Editor;
  disabled?: boolean;
}) => {
  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        disabled={disabled}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        disabled={disabled}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        disabled={disabled}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        disabled={disabled}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        disabled={disabled}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
