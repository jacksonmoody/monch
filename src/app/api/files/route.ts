import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const userId: string = data.get("userId") as string;

    const existingGroup = await pinata.groups.list().name(userId);

    let groupId = "";
    if (existingGroup.length === 0) {
      const newGroup = await pinata.groups.create({
        name: userId,
      });
      groupId = newGroup.id;
    } else {
      groupId = existingGroup[0].id;
    }

    const uploadedFile = await pinata.upload.file(file);

    await pinata.groups.addCids({
      groupId: groupId,
      cids: [uploadedFile.IpfsHash],
    });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const file = await pinata.listFiles().name("history.json");

    const data = await pinata.gateways.get(file[0].ipfs_pin_hash);
    return NextResponse.json(data);
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
