import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Startup ID is required" },
        { status: 400 }
      );
    }

    // Fetch current views
    const startup = await writeClient.fetch(STARTUP_VIEWS_QUERY, { id });

    if (!startup) {
      return NextResponse.json(
        { error: "Startup not found" },
        { status: 404 }
      );
    }

    const currentViews = startup.views || 0;
    const newViews = currentViews + 1;

    // Update views
    await writeClient
      .patch(id)
      .set({ views: newViews })
      .commit();

    return NextResponse.json({ views: newViews }, { status: 200 });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}