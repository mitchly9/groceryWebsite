import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import {server} from "../../config";
import HomeButton from "../components/HomeButton";
import ProfileLinkFlipped from "../components/ProfileLinkFlipped";

export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base, personName }) {

    return (
        <div className={"max-w flex items-center justify-center"}>
            <div className={"bg-background h-screen w-screen "}>
                <div className={"grid grid-cols-3"}>
                    <HomeButton/>
                    <div></div>
                    <div className={"text-right"}>
                        <Link href={server + "people/allPeople"} passHref>
                            <button className={"bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>
                                Back to All People
                            </button>
                        </Link>
                    </div>
                </div>


                <div className="bg-otherBlack text-center w-full h-12 mx-2 my-2 text-white font-mono text-3xl">
                    {personName}
                </div>
                <div className={"grid grid-cols-3 h-full w-full bg-background text-white"}>
                    {base && base.map(singleDate => (
                        <>
                            <ProfileLinkFlipped totalPrice={singleDate.totalPrice} date={singleDate.date} Name={personName} markDone={singleDate.markDone}/>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
}


export async function getServerSideProps(context) {
    const personName = context.query.single_person[0];

    const client = await clientPromise
    const db = client.db("grocery-app");

    const baseDB = await db.collection(personName).find().toArray();
    const base = await JSON.parse(JSON.stringify(baseDB));

    return {
        props: {base, personName },
    }
}
