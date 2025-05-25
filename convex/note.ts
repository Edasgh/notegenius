import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllNotes = query({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("note")
      .withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const saveNote = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    link: v.optional(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    //find existing Note
    const existingNote = await ctx.db
      .query("note")
      .withIndex("by_user_and_title", (q) =>
        q.eq("userId", args.userId).eq("title", args.title)
      )
      .unique();

    // return note id
    if (existingNote) {
      return existingNote._id;
    }

    const noteId = await ctx.db.insert("note", {
      title: args.title,
      description: args.description,
      userId: args.userId,
      link: args.link,
    });

    return noteId;
  },
});

export const getNoteById = query({
  args: {
    userId: v.string(),
    noteId: v.id("note"),
  },
  async handler(ctx, args) {
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      return null;
    }
    if (note.userId !== args.userId) {
      throw new Error("Not Authorized!");
    }

    return note;
  },
});

export const deleteNoteById = mutation({
  args: {
    id: v.id("note"),
    userId: v.string(),
  },
  async handler(ctx, args) {
    const note = await ctx.db.get(args.id);
    if (!note) {
      throw new Error("Note not found!");
    }

    if (note.userId !== args.userId) {
      throw new Error("Not Authorized!");
    }
    await ctx.db.delete(args.id);

    return true;
  },
});
