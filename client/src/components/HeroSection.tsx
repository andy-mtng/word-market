import JamesClearImage from "../assets/james_clear.png";
import { Rating } from "react-simple-star-rating";
import AtomicHabitsCover from "../assets/atomic_habits_cover.jpg";
import DotsImage from "../assets/dots.png";
import BlobImage from "../assets/green_blob.png";

function HeroSection(): JSX.Element {
    return (
        <section className="flex">
            {/* Left */}
            <div className="mt-12 flex w-2/5 flex-col">
                <h1 className="mb-2 text-5xl font-semibold">Atomic Habits</h1>
                <div className="mb-2 flex gap-4 text-lg">
                    <h2>James Clear</h2>
                    <h2>Self Improvement</h2>
                </div>
                <blockquote className="mb-10 border-l-2 border-gray-300 px-3 py-2 text-sm text-gray-600">
                    "Atomic Habits" by James Clear is a bestselling book that explores the
                    transformative power of small habits. It provides practical strategies and
                    examples to help readers build good habits, break bad ones, and achieve
                    remarkable results through incremental changes.
                </blockquote>
                <div className="mb-4 flex items-center">
                    <p className="mr-3 text-3xl font-semibold text-green-900">$18.30</p>
                    <p className="text-1xl mr-6 self-end font-semibold text-green-800 line-through opacity-50">
                        $23.79
                    </p>
                    <span className="rounded-md bg-pink-600 px-2 py-1 text-xs text-white">
                        30% off
                    </span>
                </div>
                <div className="flex gap-4">
                    <button className="rounded-sm bg-gray-800 px-6 py-2 text-xs font-bold tracking-wider text-white">
                        Buy Now
                    </button>
                    <button className="box-border rounded-sm border-2 border-gray-200 px-6 py-2 text-xs font-bold tracking-wider text-green-900">
                        See Details
                    </button>
                </div>
            </div>

            {/* Right */}
            <div className="flex w-3/5 justify-end">
                <div className="absolute bottom-28 z-50 flex w-64 items-center gap-4 self-start rounded-md border border-gray-200 bg-white px-5 py-3 shadow-md">
                    <img
                        src={AtomicHabitsCover}
                        alt="Atomic Habits Book Cover"
                        className="h-auto w-1/5 self-start"
                    />
                    <div className="z-50">
                        <div>
                            <h1 className="text-sm font-bold">Atomic Habits</h1>
                            <p className="text-xs text-gray-500">by James Clear</p>
                        </div>
                        <div className="flex items-end gap-8">
                            <p className="text-md bottom-0 font-bold text-green-800">$18.30</p>
                            <Rating
                                readonly={true}
                                initialValue={4.5}
                                size={15}
                                SVGstyle={{ display: "inline-block" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative z-40">
                    <img src={DotsImage} alt="Dots" className="absolute left-0 top-14 opacity-50" />

                    <img className="z-30 mr-40" src={JamesClearImage} alt="James Clear" />
                </div>
                <img
                    className="absolute right-40 top-20 z-0 h-auto w-2/5 opacity-70"
                    src={BlobImage}
                    alt="Green Blob"
                />
            </div>
        </section>
    );
}

export default HeroSection;
