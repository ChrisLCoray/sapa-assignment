import Image from "next/image"
import Link from "next/link"
import { promises as fs } from "fs"
import { DateTime } from "luxon"
import LinkButton from "./components/linkButton"
import NavMenu from "./components/navMenu"
import NumberDot from "./components/numberDot"

export default async function Home() {
    // Somewhat mock a call to grab page data from server
    const file = await fs.readFile(process.cwd() + "/public/data.json", "utf8")
    const data = JSON.parse(file)
    const events = data.events.map((ed) => {
        // Map to format the dates
        const convertOrdinal = (dd) => {
            if (dd > 3 && dd < 21) return `th`;
            switch (dd % 10) {
                case 1:
                    return `st`;
                case 2:
                    return `nd`;
                case 3:
                    return `rd`;
                default:
                    return `th`;
            }
        }
        const dStart = DateTime.fromISO(ed.eventStartTime)
        const dEnd = DateTime.fromISO(ed.eventEndTime)
        const calDateDay = dStart.toFormat("d")
        const calDateOrd = convertOrdinal(calDateDay)

        return {
            audience: ed.audience,
            eventMonth: dStart.toFormat("LLL"),
            eventDay: calDateDay,
            eventDayOrd: calDateOrd,
            eventYear: dStart.toFormat("yyyy"),
            eventEndTime: dEnd.toFormat("t"),
            eventLink: ed.eventLink,
            eventStartTime: dStart.toFormat("t"),
            location: ed.location
        }
    })
    const faqs = data.faqs
    const menuLinks = data.menuLinks
    const pharmacies = data.pharmacies

    return (
        <div className="min-h-screen font-ubuntu">
            <header className="flex bg-(--color-green3) bg-[url(/media/TopHeaderImage.png)] bg-position-[center_bottom] bg-cover bg-no-repeat min-w-screen md:min-h-[60vh] border-b-[2rem] relative pt-5">
                <div className="flex flex-col grow items-center">
                    <NavMenu menuLinks={menuLinks} />
                    <div className="flex relative max-w-[686px] max-h-[329px] aspect-[2.09/1] w-1/2 lg:w-1/3 mt-auto -mb-4 justify-self-end">
                        <Image src="/media/UtahGrownLogoWhiteBorder.png" alt="Utah Grown Logo" fill priority={true} />
                    </div>
                </div>
            </header>
            <main className="flex flex-col justify-center items-center">
                <div className="w-[80%]">
                    <h1 className="font-montserrat text-center mb-4">Utah&apos;s Cannabis Community</h1>
                    <section className="mb-8">
                        <h3 className="font-montserrat font-bold text-2xl text-center mb-4">Upcoming Utah Medical Card Events</h3>
                        {events.map((eventItem, i) => (
                            <div key={`event-${i}`} className="border-1 border-(--color-green1) rounded-md bg-(--color-grey3) flex flex-col sm:flex-row sm:justify-between items-start sm:items-center sm:gap-[1rem] mt-4 mb-4 p-2 font-montserrat">
                                <div className="flex-none sm:flex-1 p-2 pt-0 sm:pt-2 sm:text-center">{eventItem.location}</div>
                                <div className="flex-none sm:flex-2 p-2">
                                    <div className="font-bold">
                                        {eventItem.eventMonth} {eventItem.eventDay}<sup>{eventItem.eventDayOrd}</sup>, {eventItem.eventYear}</div>
                                    <div className="event-time">{eventItem.eventStartTime} - {eventItem.eventEndTime}</div>
                                    <div className="event-info">{eventItem.audience}</div>
                                </div>
                                <div className="flex-none sm:inline-flex sm:flex-1 justify-center item-center m-2 sm:m-0">
                                    <LinkButton href={eventItem.eventLink} target="self" text="Book Time" />
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="mb-8">
                        <h3 className="font-montserrat font-bold text-2xl text-center mb-4">Things to know before your appointment</h3>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="w-full sm:w-30 flex-none text-center"><NumberDot number="1." /></div>
                            <div className="flex-2">
                                <p className="mb-4">You&apos;re going to register with the state of Utah. You can start this before you arrive.</p>
                                <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:items-baseline">
                                    <div className="grow content-stretch sm:flex-1">
                                        <LinkButton href="#" target="self" text="UtahID.org" />
                                    </div>
                                    <p className="flex-2 align-bottom">Obtain access to your Utah Digital ID</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:items-baseline">
                                    <div className="grow content-stretch sm:flex-1 ">
                                        <LinkButton href="#" target="self" text="EVS.Utah.gov" />
                                    </div>
                                    <div className="flex-2">
                                        <p className="mb-2">Fill out all the fields until you get to “Awaiting Certification” status</p>
                                        <div className="relative max-w-[256px] max-h-[108px] aspect-[2.37/1] w-full sm:w-1/2 sm:-ml-5">
                                            <Image src="/media/AwaitingCert-Image.png" alt="Image of the Awaiting Certification icon" fill />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-baseline justify-around mb-4">
                            <div className="w-full sm:w-30 flex-none text-center"><NumberDot number="2." /></div>
                            <div className="flex-1">Check in with your QMP</div>
                            <div className="flex-1">
                                <ol className="list-decimal sm:ml-3">
                                    <li>QMP Registration</li>
                                    <li>Medical Evaluation/Consultation</li>
                                    <li>Payment</li>
                                </ol>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 items-baseline justify-around mb-4">
                            <div className="w-full sm:w-30 flex-none text-center"><NumberDot number="3." /></div>
                            <div className="flex-1">Renewal or New Patient?</div>
                            <div className="flex-1">
                                <p>If this is a renewal, congratulations you are ready to shop!</p>
                                <p className="mb-4">If you are a new patient, here are some helps to get you started...</p>
                                <ol className="list-decimal ml-3 mb-4">
                                    <li>Meet with Pharmacist</li>
                                    <li>Set up your Portal Account</li>
                                    <li>Start Shopping</li>
                                </ol>
                                <p>**Dont forget to take advantage of new patient deals**</p>
                            </div>
                        </div>
                    </section>
                    <Link className="flex w-full aspect-[4/1] relative mb-8" href="#" target="_blank">
                        <Image src="/media/MockBannerAd.png" fill alt="LEAF Nation, the englightened voice. Established 2010. Now keeping Utah fresh." />
                    </Link>
                    <section className="flex gap-4 flex-row mb-8 items-stretch">
                        <div className="hidden sm:flex relative w-[50%] bg-[url(/media/Consultation.png)] bg-position-[center_top] bg-cover bg-no-repeat">&nbsp;</div>
                        <div className="flex-1">
                            <h4 className="font-montserrat text-2xl font-bold">Utah Medical Cards</h4>
                            <p className="text-sm">A medical cannabis card, also known as a medical marijuana card, is a state-issued identification card that allows qualified patients to legally purchase and use medical cannabis for the treatment of specific medical conditions. In Utah, a card is required to access and purchase medical cannabis products from state-licensed dispensaries. Having a medical card does not allow you to possess any cannabis product, but only the products you purchased under your PAT (Medical Card ID number).</p>
                        </div>
                    </section>
                    <section className="w-full p-4 bg-no-repeat bg-cover bg-(--color-green1) sm:bg-[url(/media/ReviewBanner.png)] bg-position-[right_bottom] font-montserrat mb-8">
                        <div>
                            <h4 className="text-white text-2xl mb-2">We&apos;d love to hear from you!</h4>
                            <div className="sm:w-[30%]">
                                <LinkButton href="#" target="self" text="Review us here!" />
                            </div>
                        </div>
                    </section>
                    <section className="mb-8">
                        <h4 className="font-montserrat text-4xl font-bold mb-4">FAQs...</h4>
                        <ul>
                            {faqs.map((faq, i) => (
                                <li key={`faq-${i}`} className="pb-2"><Link className="hover:border-b-1" href={faq.href}>{faq.text}</Link></li>
                            ))}
                        </ul>
                    </section>
                    <section className="mb-8">
                        <h4 className="font-montserrat text-2xl font-bold mb-4">Utah Medical Cannabis Pharmacies</h4>
                        {pharmacies.map((pharm, i) => (
                            <div className="mb-4" key={`pharm-${i}`}>
                                <h5 className="text-2xl font-bold">{pharm.name}</h5>
                                <div className="flex flex-col gap-2">
                                    {pharm.locations.map((loc, x) => (
                                        <div key={`pharm-loc-${x}`} className="flex flex-col sm:flex-row">
                                            <div className="w-[50%]">{loc.address}</div>
                                            <div className="flex-1">{loc.phone}</div>
                                            {(x === 0) ? <div className="flex-1"><Link className="hover:border-b-1" href={pharm.href} target="_blank">{pharm.href.replace("http://", "").replace("https://", "").replace("/", "")}</Link></div> : ""}
                                        </div>
                                    ))}
                                    {(pharm.special && pharm.special.length > 0) ? <div className="sm:inline-flex"><LinkButton href={pharm.specialLink} target="_blank" text={pharm.special} radius="md" /></div> : ""}
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="flex flex-col sm:flex-row mb-4 md:mb-0">
                        <div className="flex-1 w-full sm:w-[50%]">
                            <h4 className="font-montserrat text-2xl font-bold mb-4">About Utah Grown</h4>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt
                                ut laoreet dolore magna aliquam eratvolutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duisautem vel eum
                                iriure dolor in hendrerit in vulputate velit esse molestieconsequat, vel illum dolore.</p>
                            <h4 className="font-montserrat text-2xl font-bold mt-4 mb-2">Utah Grown Office</h4>
                            <p>730 State Street<br />
                                Salt Lake City, Utah 84111</p>
                        </div>
                        <div className="flex-none relative w-[50%] max-w-[573px] aspect-[.81/1]">
                            <Image src="/media/NormalizeItUtah.png" alt="Two marijuana plants grown into the shape of the state of Utah with the hashtag #NormalizeIt" fill />
                        </div>
                    </section>
                </div>
            </main>
            <section className="flex flex-col justify-center items-center border-t-3 border-(--color-green1) mt-0 md:-mt-4 w-full pt-4 pb-4">
                <div className="flex-row gap-4 w-[80%]">
                    <div className="relative w-1/4 aspect-[2.22/1]">
                        <Image src="/media/UtahGrownLogo-Green.png" fill alt="Utah Grown logo" />
                    </div>
                    <div className="inline-flex self-end">UTAH&apos;S CANNABIS COMMUNITY</div>
                </div>
            </section>
            <footer className="bg-(--color-green1) flex flex-col justify-center items-center text-white w-full pt-4 pb-12">
                <div className="w-[80%] flex flex-row-reverse gap-4">
                    <Link href="#" className="text-white hover:border-b-1">Privacy Policy</Link>
                    <Link href="#" className="text-white hover:border-b-1">Terms and Conditions</Link>
                    <div>&copy;2023 All Rights Reserved.</div>
                </div>
            </footer>
        </div>
    );
}
