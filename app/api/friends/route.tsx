import { NextResponse } from "next/server";
import {promises as fs} from "fs";
import path from "path";

const friendsPath = path.join(process.cwd(), '/app/public/mocks/friends.json');

export async function GET() {
    try {
        const friends = await fs.readFile(friendsPath, 'utf-8');
        const json = JSON.parse(friends);
        return NextResponse.json(json)
    } catch (error) {
        return new NextResponse(JSON.stringify({message: 'Error fetching friends'}), {status: 404, headers: {'content-type': 'application/json'}})
    }
}